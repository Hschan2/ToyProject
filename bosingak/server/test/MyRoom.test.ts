import assert from "assert";
import { ColyseusTestServer, boot } from "@colyseus/testing";
import appConfig from "../src/app.config.js";
import { MyRoomState, type MoveInput } from "../src/rooms/schema/MyRoomState.js";
import { PLAYER_SPEED, TICK_RATE, PLAYER_STATES, WORLD_BOUNDS } from "../src/shared/constants.js";

describe("Bosingak Colyseus Server Test Suite", () => {
  let colyseus: ColyseusTestServer<typeof appConfig>;

  before(async () => {
    colyseus = await boot(appConfig);
  });

  after(async () => {
    await colyseus.shutdown();
  });

  beforeEach(async () => {
    await colyseus.cleanup();
  });

  it("advances a player from its buffered input", async () => {
    const room = await colyseus.createRoom<MyRoomState>("my_room", {});
    const client1 = await colyseus.connectTo(room);

    const player = room.state.players.get(client1.sessionId);
    assert.ok(player, "a Player is created on join");
    const startX = player.x;

    const input = client1.input<MoveInput>({ mode: "reliable" });
    input.data.moveX = 1;
    input.data.moveY = 0;
    input.send();

    await room.waitForNextMessage();  // the input reaches the server
    await room.waitForNextTimestep(); // the step that consumes it runs

    assert.ok(player.x > startX, "the buffered input advanced the player");
  });

  it("clamps input that is out of range", async () => {
    const room = await colyseus.createRoom<MyRoomState>("my_room", {});
    const client1 = await colyseus.connectTo(room);

    const player = room.state.players.get(client1.sessionId);
    const startX = player.x;

    const input = client1.input<MoveInput>({ mode: "reliable" });
    input.data.moveX = 100 as any;
    input.send();

    await room.waitForNextMessage();
    await room.waitForNextTimestep();

    assert.strictEqual(player.x, startX + PLAYER_SPEED * (1 / TICK_RATE));
  });

  it("sanitizes malicious nicknames to prevent XSS", async () => {
    const room = await colyseus.createRoom<MyRoomState>("my_room", {});
    const client = await colyseus.connectTo(room, {
      nickname: "<script>alert('xss')</script>보신각",
    });

    const player = room.state.players.get(client.sessionId);
    assert.ok(player, "Player is present in room");
    assert.ok(!player.nickname.includes("<script>"), "Tags are completely removed");
    assert.ok(player.nickname.includes("보신각"), "Valid Korean text is preserved");
  });

  it("updates and clamps 3D position safely", async () => {
    const room = await colyseus.createRoom<MyRoomState>("my_room", {});
    const client = await colyseus.connectTo(room, { nickname: "테스터" });

    const player = room.state.players.get(client.sessionId);
    assert.ok(player, "Player exists");

    // Send valid 3D coordinates
    client.send("update_position", {
      x: 12.5,
      y: 0,
      z: -18.2,
      rotationY: Math.PI / 4,
      state: PLAYER_STATES.WALKING,
    });

    await room.waitForNextMessage();

    assert.strictEqual(player.x, 12.5);
    assert.strictEqual(player.y, 0);
    assert.strictEqual(player.z, -18.2);
    assert.strictEqual(player.rotationY, Math.PI / 4);
    assert.strictEqual(player.state, PLAYER_STATES.WALKING);

    // Send extreme out-of-world coordinates (anti-exploit test)
    client.send("update_position", {
      x: 999999,
      z: -999999,
    });

    await room.waitForNextMessage();

    assert.strictEqual(player.x, WORLD_BOUNDS.maxX);
    assert.strictEqual(player.z, WORLD_BOUNDS.minZ);
  });

  it("handles player state updates and leave events", async () => {
    const room = await colyseus.createRoom<MyRoomState>("my_room", {});
    const client = await colyseus.connectTo(room, { nickname: "기도자" });

    const player = room.state.players.get(client.sessionId);
    assert.ok(player);

    client.send("set_state", PLAYER_STATES.PRAYING);
    await room.waitForNextMessage();
    assert.strictEqual(player.state, PLAYER_STATES.PRAYING);

    assert.strictEqual(room.state.players.size, 1);
    await client.leave();
    assert.strictEqual(room.state.players.size, 0);
  });
});

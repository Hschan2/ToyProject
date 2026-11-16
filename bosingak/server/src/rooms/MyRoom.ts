import { Room, Client, CloseCode, type StepContext } from "colyseus";
import { MyRoomState, Player, MoveInput } from "./schema/MyRoomState.js";
import { stepEntity } from "../shared/movement.js";
import {
  TICK_RATE,
  ARENA_WIDTH,
  ARENA_HEIGHT,
  MAX_ROOM_CLIENTS,
  WORLD_BOUNDS,
  PLAYER_STATES,
} from "../shared/constants.js";
import { sanitizeNickname, clampCoordinate } from "../shared/security.js";

interface JoinOptions {
  nickname?: string;
  [key: string]: unknown;
}

interface UpdatePositionMessage {
  x?: number;
  y?: number;
  z?: number;
  rotationY?: number;
  state?: string;
}

export class MyRoom extends Room<{ state: MyRoomState; input: MoveInput }> {
  // Up to 100 players in one virtual Bosingak space as planned
  maxClients = MAX_ROOM_CLIENTS;
  state = new MyRoomState();

  /**
   * Per-client input buffer for 2D/prediction fallback
   */
  inputs = this.defineInput(MoveInput, {
    bufferMaxSize: 64,
    sanitize: { moveX: [-1, 1], moveY: [-1, 1] },
  });

  private joinCount = 0;

  onCreate(options: unknown) {
    this.state.weather = "CLEAR";
    this.state.bellRungCount = 0;
    this.state.serverTime = Date.now();

    this.setFixedTimestep((ctx) => this.step(ctx), TICK_RATE);

    // Register 3D position synchronization message with security clamping
    this.onMessage("update_position", (client, message: UpdatePositionMessage) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;

      try {
        if (typeof message.x === "number") {
          player.x = clampCoordinate(message.x, WORLD_BOUNDS.minX, WORLD_BOUNDS.maxX, player.x);
        }
        if (typeof message.y === "number") {
          player.y = clampCoordinate(message.y, WORLD_BOUNDS.minY, WORLD_BOUNDS.maxY, player.y);
        }
        if (typeof message.z === "number") {
          player.z = clampCoordinate(message.z, WORLD_BOUNDS.minZ, WORLD_BOUNDS.maxZ, player.z);
        }
        if (typeof message.rotationY === "number" && Number.isFinite(message.rotationY)) {
          player.rotationY = message.rotationY;
        }
        if (typeof message.state === "string" && message.state in PLAYER_STATES) {
          player.state = message.state;
        }
      } catch (err) {
        console.error(`[MyRoom] Error updating position for ${client.sessionId}:`, err);
      }
    });

    // Register nickname change message with sanitization
    this.onMessage("set_nickname", (client, newNickname: unknown) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;

      player.nickname = sanitizeNickname(newNickname);
    });

    // Register state change message (e.g. PRAYING, IDLE)
    this.onMessage("set_state", (client, newState: unknown) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;

      if (typeof newState === "string" && newState in PLAYER_STATES) {
        player.state = newState;
      }
    });

    // Heartbeat clock for weather and server time
    this.clock.setInterval(() => {
      this.state.serverTime = Date.now();
    }, 1000);
  }

  onJoin(client: Client, options?: JoinOptions) {
    const rawNickname = options?.nickname;
    const nickname = sanitizeNickname(rawNickname);

    // Deterministic spawn ring
    const angle = this.joinCount++ * 2.399963;
    const spawnZ = 12 + Math.cos(angle) * 4;

    const player = new Player({
      x: ARENA_WIDTH / 2 + Math.cos(angle) * 80, // for 2D compatibility tests
      y: 0,
      z: spawnZ,
      vx: 0,
      vy: 0,
      rotationY: Math.PI, // Facing the belfry (north)
      nickname,
      state: PLAYER_STATES.IDLE,
      isHoldingRope: false,
      ropeIndex: -1,
      hasCandle: false,
      joinedAt: Date.now(),
    });

    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, code: CloseCode) {
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    // Room cleanup
  }

  /**
   * Fixed physics step for input-predicted entities
   */
  private step(ctx: StepContext) {
    for (const [sessionId, player] of this.state.players) {
      const channel = this.inputs.get(sessionId);
      if (!channel) continue;

      for (const input of channel) {
        stepEntity(player, input, ctx.dt);
      }
    }
  }

  onDrop(client: Client, code: CloseCode) {
    this.allowReconnection(client, 30).catch(() => {});
  }

  onReconnect(client: Client) {
    // Reconnected
  }
}

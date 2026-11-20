import test from "node:test";
import assert from "node:assert";
import { PLAYER_CONFIG, CAMERA_PRESETS } from "../src/constants/index.ts";

test("Player Config: Default spawn position and speeds are defined", () => {
  assert.deepStrictEqual(PLAYER_CONFIG.spawnPosition, [0, 0, 18]);
  assert.ok(PLAYER_CONFIG.walkSpeed > 0, "Walk speed should be positive");
  assert.ok(
    PLAYER_CONFIG.sprintSpeed > PLAYER_CONFIG.walkSpeed,
    "Sprint speed should be faster than walk speed"
  );
  assert.ok(PLAYER_CONFIG.colliderRadius > 0, "Collider radius should be positive");
});

test("Camera Presets: PLAYER mode is properly defined and configured", () => {
  assert.ok(CAMERA_PRESETS.PLAYER, "PLAYER view mode preset should exist");
  assert.strictEqual(CAMERA_PRESETS.PLAYER.position.length, 3);
  assert.strictEqual(CAMERA_PRESETS.PLAYER.target.length, 3);
});

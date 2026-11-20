import test from "node:test";
import assert from "node:assert";
import { getTerrainHeight, resolveCollisions } from "../src/utils/terrainCollision.ts";

test("Terrain: Plaza ground elevation is 0", () => {
  assert.strictEqual(getTerrainHeight(0, 18, 0), 0);
  assert.strictEqual(getTerrainHeight(15, 20, 0), 0);
  assert.strictEqual(getTerrainHeight(-20, -15, 0), 0);
});

test("Terrain: Front entrance stairs calculate smooth height ramp", () => {
  // At the bottom of the stairs (z = 12.3)
  const bottom = getTerrainHeight(0, 12.3, 0);
  assert.strictEqual(bottom, 0);

  // Midway up the stairs (z = 11.05)
  const midway = getTerrainHeight(0, 11.05, 0.5);
  assert.ok(midway > 0.5 && midway < 1.5, `Midway height ${midway} should be between 0.5 and 1.5`);

  // At the top entrance to the pavilion deck (z = 9.8)
  const top = getTerrainHeight(0, 9.8, 1.8);
  assert.strictEqual(top, 2.02);
});

test("Terrain: Upper pavilion deck elevation is 2.02 when on platform", () => {
  const deckHeight = getTerrainHeight(2.0, 0, 1.8);
  assert.strictEqual(deckHeight, 2.02);
});

test("Terrain: Resolves central bell collision by pushing player outward", () => {
  // Bell center is (0, 0)
  const resolved = resolveCollisions(0.5, 0.5, 2.02);
  const dist = Math.sqrt(resolved.x * resolved.x + resolved.z * resolved.z);
  assert.ok(dist >= 2.0, `Resolved distance ${dist} must be at least the bell collision radius`);
});

test("Terrain: Resolves stone lantern collision in plaza", () => {
  // Lantern at (12, 12)
  const resolved = resolveCollisions(12.1, 12.1, 0);
  const dx = resolved.x - 12;
  const dz = resolved.z - 12;
  const dist = Math.sqrt(dx * dx + dz * dz);
  assert.ok(dist >= 1.0, `Resolved distance ${dist} must push away from lantern center`);
});

test("Terrain: Clamps coordinates to world outer boundary", () => {
  const resolved = resolveCollisions(100, -100, 0);
  assert.strictEqual(resolved.x, 35);
  assert.strictEqual(resolved.z, -35);
});

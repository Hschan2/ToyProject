import { PLAYER_CONFIG } from "../constants/index.ts";

export interface Position2D {
  x: number;
  z: number;
}

export interface PillarCoords {
  x: number;
  z: number;
  radius: number;
}

/**
 * 12 Belfry Pillars layout
 */
const BELFRY_PILLARS: PillarCoords[] = [];
[-7.8, -2.6, 2.6, 7.8].forEach((x) => {
  [-4.8, 0, 4.8].forEach((z) => {
    BELFRY_PILLARS.push({ x, z, radius: 0.35 });
  });
});

/**
 * Plaza Obstacles: Stone Lanterns and Pine Trees
 */
const PLAZA_OBSTACLES: PillarCoords[] = [
  // 4 Stone Lanterns
  { x: -12, z: 12, radius: 0.75 },
  { x: 12, z: 12, radius: 0.75 },
  { x: -12, z: -12, radius: 0.75 },
  { x: 12, z: -12, radius: 0.75 },
  // 4 Pine Trees
  { x: -17, z: 6, radius: 0.7 },
  { x: 17, z: 8, radius: 0.7 },
  { x: -16, z: -8, radius: 0.7 },
  { x: 16, z: -10, radius: 0.7 },
];

/**
 * Calculates terrain elevation (Y) at position (X, Z).
 * Handles the plaza floor, front entrance stairs ramp, and belfry upper deck floor.
 */
export function getTerrainHeight(x: number, z: number, currentY: number = 0): number {
  // 1. Front Entrance Stairs corridor: X in [-3.25, 3.25]
  if (Math.abs(x) <= 3.25) {
    // Stairs start at z = 12.3 (y=0) and reach upper deck at z = 9.8 (y=2.02)
    if (z >= 9.8 && z <= 12.3) {
      const progress = (12.3 - z) / (12.3 - 9.8);
      return Math.min(2.02, Math.max(0, progress * 2.02));
    }
  }

  // 2. Belfry Upper Deck Floor: X in [-10.7, 10.7], Z in [-7.7, 7.7] (or entrance porch up to z=9.8)
  const isInsideUpperDeck = Math.abs(x) <= 10.7 && z >= -7.7 && z <= 9.8;
  if (isInsideUpperDeck) {
    // If player came up the stairs or is on the deck
    if (currentY >= 1.0 || (Math.abs(x) <= 3.25 && z <= 10.5)) {
      return 2.02;
    }
  }

  // 3. Lower stone platform rim (height 0.8)
  const isInsideLowerPlatform = Math.abs(x) <= 13.0 && Math.abs(z) <= 10.0;
  if (isInsideLowerPlatform && currentY >= 0.5) {
    return 0.8;
  }

  // 4. Default Plaza Ground
  return 0.0;
}

/**
 * Resolves obstacle and boundary collisions for player at (x, z).
 * Prevents clipping through pillars, the bell, lanterns, and world boundaries.
 */
export function resolveCollisions(
  x: number,
  z: number,
  currentY: number = 0,
  playerRadius: number = PLAYER_CONFIG.colliderRadius
): Position2D {
  let resolvedX = x;
  let resolvedZ = z;

  // 1. Clamp to Plaza World Outer Boundaries
  const maxBound = 35.0;
  resolvedX = Math.max(-maxBound, Math.min(maxBound, resolvedX));
  resolvedZ = Math.max(-maxBound, Math.min(maxBound, resolvedZ));

  // 2. Belfry Pavilion Vertical Wall Collision:
  // If player is down at ground level (currentY < 1.0), prevent entering upper deck
  // except through the south entrance stairs opening (|x| <= 3.25)
  if (currentY < 1.0) {
    const insideUpperDeckX = Math.abs(resolvedX) <= 10.7 + playerRadius;
    const insideUpperDeckZ = resolvedZ >= -7.7 - playerRadius && resolvedZ <= 8.8;

    if (insideUpperDeckX && insideUpperDeckZ) {
      // If outside the entrance stairs corridor, push player out
      if (Math.abs(resolvedX) > 3.25) {
        // Push along closest axis
        const distWest = Math.abs(resolvedX - (-10.7));
        const distEast = Math.abs(resolvedX - 10.7);
        const distNorth = Math.abs(resolvedZ - (-7.7));
        const distSouth = Math.abs(resolvedZ - 8.8);

        const minDist = Math.min(distWest, distEast, distNorth, distSouth);
        if (minDist === distWest) resolvedX = -10.7 - playerRadius;
        else if (minDist === distEast) resolvedX = 10.7 + playerRadius;
        else if (minDist === distNorth) resolvedZ = -7.7 - playerRadius;
        else resolvedZ = 8.8 + playerRadius;
      }
    }
  }

  // 3. If on Upper Deck (currentY >= 1.2), constrain within railings
  if (currentY >= 1.2) {
    // West/East railing limits
    resolvedX = Math.max(-10.1 + playerRadius, Math.min(10.1 - playerRadius, resolvedX));
    // North railing limit
    resolvedZ = Math.max(-7.3 + playerRadius, resolvedZ);
    // South railing limits (except stairs gap at |x| <= 3.25)
    if (Math.abs(resolvedX) > 3.25) {
      resolvedZ = Math.min(7.3 - playerRadius, resolvedZ);
    }
  }

  // 4. Central Grand Bell Collision (Bell + Striker area in center of pavilion)
  const bellRadius = 1.8 + playerRadius;
  const distToBellSq = resolvedX * resolvedX + resolvedZ * resolvedZ;
  if (distToBellSq < bellRadius * bellRadius && distToBellSq > 0.0001) {
    const dist = Math.sqrt(distToBellSq);
    const overlap = bellRadius - dist;
    resolvedX += (resolvedX / dist) * overlap;
    resolvedZ += (resolvedZ / dist) * overlap;
  }

  // 5. Belfry 12 Pillars Collision (relevant when on deck or near platform)
  if (currentY >= 0.6) {
    for (const pillar of BELFRY_PILLARS) {
      const minDistance = pillar.radius + playerRadius;
      const dx = resolvedX - pillar.x;
      const dz = resolvedZ - pillar.z;
      const distSq = dx * dx + dz * dz;

      if (distSq < minDistance * minDistance && distSq > 0.00001) {
        const dist = Math.sqrt(distSq);
        const push = minDistance - dist;
        resolvedX += (dx / dist) * push;
        resolvedZ += (dz / dist) * push;
      }
    }
  }

  // 6. Plaza Obstacles (Stone Lanterns & Pine Trees)
  for (const obs of PLAZA_OBSTACLES) {
    const minDistance = obs.radius + playerRadius;
    const dx = resolvedX - obs.x;
    const dz = resolvedZ - obs.z;
    const distSq = dx * dx + dz * dz;

    if (distSq < minDistance * minDistance && distSq > 0.00001) {
      const dist = Math.sqrt(distSq);
      const push = minDistance - dist;
      resolvedX += (dx / dist) * push;
      resolvedZ += (dz / dist) * push;
    }
  }

  return { x: resolvedX, z: resolvedZ };
}

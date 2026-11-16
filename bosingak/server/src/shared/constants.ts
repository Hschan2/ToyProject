/** Simulation rate in Hz. One input advances exactly one step at this rate. */
export const TICK_RATE = 30;

export const ARENA_WIDTH = 800;
export const ARENA_HEIGHT = 600;

/** Half-extent of a player square, used for wall clamping. */
export const PLAYER_HALF = 12;

/** Units per second at full stick. */
export const PLAYER_SPEED = 260;

/** Maximum concurrent clients per Bosingak room */
export const MAX_ROOM_CLIENTS = 100;

/** 3D World Boundaries (in meters) */
export const WORLD_BOUNDS = {
  minX: -40,
  maxX: 40,
  minZ: -40,
  maxZ: 40,
  minY: 0,
  maxY: 10,
} as const;

/** Player Animation / Action States */
export const PLAYER_STATES = {
  IDLE: "IDLE",
  WALKING: "WALKING",
  PRAYING: "PRAYING",
  HOLDING_ROPE: "HOLDING_ROPE",
  RINGING: "RINGING",
} as const;

export type PlayerStateKey = keyof typeof PLAYER_STATES;

/** Maximum ropes available around the bell */
export const MAX_ROPES = 5;


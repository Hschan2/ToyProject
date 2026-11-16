import { schema, t, type SchemaType } from "@colyseus/schema";

/**
 * One input frame, consumed by `Room.defineInput()`. Flat primitives only.
 */
export const MoveInput = schema({
  moveX: t.int8<-1 | 0 | 1>(),
  moveY: t.int8<-1 | 0 | 1>(),
});
export type MoveInput = SchemaType<typeof MoveInput>;

/**
 * 3D Player State schema
 */
export const Player = schema({
  // 3D coordinates & velocities
  x: t.number(),
  y: t.number(),
  z: t.number(),
  vx: t.number(),
  vy: t.number(),
  rotationY: t.number(),

  // Identification & Display
  nickname: t.string(),

  // Action / Animation state: IDLE, WALKING, PRAYING, HOLDING_ROPE, RINGING
  state: t.string(),

  // Interaction flags
  isHoldingRope: t.boolean(),
  ropeIndex: t.int8(), // -1 if not holding, 0-4 for rope slot
  hasCandle: t.boolean(),

  // Metadata
  joinedAt: t.number(),
});
export type Player = SchemaType<typeof Player>;

/**
 * Bosingak Room State schema
 */
export const MyRoomState = schema({
  players: t.map(Player),
  weather: t.string(), // "CLEAR" | "CLOUDY" | "RAIN" | "SNOW"
  bellRungCount: t.number(),
  serverTime: t.number(),
});
export type MyRoomState = SchemaType<typeof MyRoomState>;

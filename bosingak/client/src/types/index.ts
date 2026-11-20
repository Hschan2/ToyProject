/**
 * Core Types & Interfaces for Bosingak
 */

export interface RemotePlayer {
  sessionId: string;
  nickname: string;
  x: number;
  y: number;
  z: number;
  rotationY: number;
  state: string;
  isHoldingRope: boolean;
  ropeIndex: number;
  hasCandle: boolean;
  joinedAt: number;
}

export type PlayerActionState =
  | "IDLE"
  | "WALKING"
  | "PRAYING"
  | "HOLDING_ROPE"
  | "RINGING";

export type WeatherType = "CLEAR" | "CLOUDY" | "RAIN" | "SNOW";

export type CameraViewMode = "PLAYER" | "FREE" | "FRONT" | "BELL_CLOSEUP" | "OVERHEAD";

export interface AudioSettings {
  ambientVolume: number;
  sfxVolume: number;
  muted: boolean;
  windEnabled: boolean;
}

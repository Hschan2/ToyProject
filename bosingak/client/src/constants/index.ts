import type { CameraViewMode } from "../types";

/**
 * Server connection settings
 */
const isBrowser = typeof window !== "undefined";
const defaultHost = isBrowser ? window.location.hostname : "localhost";
const defaultProtocol = isBrowser && window.location.protocol === "https:" ? "wss" : "ws";

export const SERVER_ENDPOINT =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SERVER_URL) ||
  `${defaultProtocol}://${defaultHost}:2567`;

export const ROOM_NAME = "my_room";

/**
 * Camera preset views for different perspectives
 */
export const CAMERA_PRESETS: Record<
  CameraViewMode,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  PLAYER: {
    position: [0, 4.5, 24.5],
    target: [0, 1.4, 18],
  },
  FREE: {
    position: [0, 8, 26],
    target: [0, 4, 0],
  },
  FRONT: {
    position: [0, 5, 22],
    target: [0, 4.5, 0],
  },
  BELL_CLOSEUP: {
    position: [0, 4.8, 6.5],
    target: [0, 4.5, 0],
  },
  OVERHEAD: {
    position: [0, 32, 28],
    target: [0, 2, 0],
  },
};

/**
 * Player Physical and Gameplay Constants
 */
export const PLAYER_CONFIG = {
  spawnPosition: [0, 0, 18] as [number, number, number],
  walkSpeed: 4.8,
  sprintSpeed: 7.6,
  turnSpeed: 14.0,
  colliderRadius: 0.45,
  cameraDistance: 6.2,
  cameraHeight: 2.6,
  minCameraDistance: 2.5,
  maxCameraDistance: 16.0,
} as const;

/**
 * Architectural Dimensions (Korean Traditional Belfry Proportions in Meters)
 */
export const BELFRY_CONFIG = {
  // 2-tier Stone Platform (기단)
  platformLowerWidth: 26,
  platformLowerDepth: 20,
  platformLowerHeight: 0.8,
  platformUpperWidth: 22,
  platformUpperDepth: 16,
  platformUpperHeight: 1.2,

  // Pillars & Pavilion Level
  pillarCountX: 4,
  pillarCountZ: 3,
  pillarRadius: 0.28,
  pillarHeight: 4.8,
  pillarSpanX: 5.2,
  pillarSpanZ: 4.8,

  // Bell Specifications
  bellRadiusTop: 0.85,
  bellRadiusBottom: 1.35,
  bellHeight: 3.2,
  bellElevation: 3.5, // Height from ground to bell center

  // Color Palette (Traditional Dancheong & Materials)
  colors: {
    stoneBase: "#5c5c64",
    stoneFloor: "#3a3a42",
    pillarRed: "#8b2522",
    woodDark: "#2c221e",
    dancheongTeal: "#1b4d3e",
    dancheongGold: "#cda043",
    roofTiles: "#202428",
    bellBronze: "#4a3c28",
    bellHighlight: "#8a7448",
    moonGlow: "#fff8db",
    lanternGlow: "#ff9933",
    ambientNight: "#0f172a",
  },
} as const;

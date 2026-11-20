import * as THREE from "three";
import { PLAYER_CONFIG } from "../../../constants";

export const localPlayerState = {
  position: new THREE.Vector3(...PLAYER_CONFIG.spawnPosition),
  rotationY: Math.PI,
  state: "IDLE",
};

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PLAYER_CONFIG } from "../../../constants";
import { useKeyboardControls } from "../../../hooks/useKeyboardControls";
import { getTerrainHeight, resolveCollisions } from "../../../utils/terrainCollision";
import { colyseusManager } from "../../../network/colyseusClient";
import { useNetworkStore } from "../../../store/useNetworkStore";
import { CharacterModel, DEFAULT_PALETTES } from "./CharacterModel";
import { PlayerNameplate } from "./PlayerNameplate";
import { localPlayerState } from "./localPlayerState";
import type { PlayerActionState } from "../../../types";

export const LocalPlayer: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const keysRef = useKeyboardControls();
  const nickname = useNetworkStore((state) => state.nickname);

  // Position, velocity, rotation vectors (persistent across frames)
  const pos = useRef(new THREE.Vector3(...PLAYER_CONFIG.spawnPosition));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const rotationY = useRef(Math.PI); // Facing north (towards bell pavilion)
  const playerActionState = useRef<PlayerActionState>("IDLE");

  const walkProgress = useRef(0);
  const idleProgress = useRef(0);

  const lastSyncTime = useRef(0);
  const lastSyncPos = useRef(new THREE.Vector3(...PLAYER_CONFIG.spawnPosition));
  const lastSyncRotation = useRef(Math.PI);
  const lastSyncState = useRef<string>("IDLE");

  // Sync initial spawn position to server on mount
  useEffect(() => {
    colyseusManager.sendPositionUpdate(
      pos.current.x,
      pos.current.y,
      pos.current.z,
      rotationY.current,
      playerActionState.current
    );
  }, []);

  useFrame(({ camera }, delta) => {
    if (!groupRef.current) return;

    // Cap delta to prevent teleporting on tab switch or frame drops
    const dt = Math.min(delta, 0.1);

    const keys = keysRef.current;
    let inputForward = 0;
    let inputRight = 0;

    if (keys.forward) inputForward += 1;
    if (keys.backward) inputForward -= 1;
    if (keys.right) inputRight += 1;
    if (keys.left) inputRight -= 1;

    const hasInput = inputForward !== 0 || inputRight !== 0;

    // Movement calculation
    if (hasInput) {
      // Calculate movement relative to camera direction
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      camDir.y = 0;
      camDir.normalize();

      const camRight = new THREE.Vector3();
      camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

      // Desired direction vector in world space
      const desiredDir = new THREE.Vector3()
        .addScaledVector(camDir, inputForward)
        .addScaledVector(camRight, inputRight)
        .normalize();

      const speed = keys.sprint ? PLAYER_CONFIG.sprintSpeed : PLAYER_CONFIG.walkSpeed;
      const targetVel = desiredDir.multiplyScalar(speed);

      // Smooth acceleration
      vel.current.lerp(targetVel, dt * 14);
    } else {
      // Smooth deceleration / friction damping
      vel.current.lerp(new THREE.Vector3(0, 0, 0), dt * 16);
    }

    // Update position with physics velocity
    const nextX = pos.current.x + vel.current.x * dt;
    const nextZ = pos.current.z + vel.current.z * dt;

    // Resolve obstacle and boundary collisions
    const resolved = resolveCollisions(nextX, nextZ, pos.current.y);
    pos.current.x = resolved.x;
    pos.current.z = resolved.z;

    // Terrain elevation (stairs and upper pavilion deck)
    const targetY = getTerrainHeight(pos.current.x, pos.current.z, pos.current.y);
    pos.current.y = THREE.MathUtils.lerp(pos.current.y, targetY, dt * 18);

    // Speed and animation state
    const currentSpeedSq = vel.current.x * vel.current.x + vel.current.z * vel.current.z;
    const isMoving = currentSpeedSq > 0.04;

    if (isMoving) {
      playerActionState.current = "WALKING";
      walkProgress.current += dt * Math.sqrt(currentSpeedSq) * 2.8;

      // Smooth rotation towards movement direction
      const targetAngle = Math.atan2(vel.current.x, vel.current.z);
      let diff = targetAngle - rotationY.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      rotationY.current += diff * Math.min(1, dt * PLAYER_CONFIG.turnSpeed);
    } else {
      playerActionState.current = "IDLE";
      idleProgress.current += dt * 1.5;
    }

    // Apply to 3D Group
    groupRef.current.position.copy(pos.current);
    groupRef.current.rotation.y = rotationY.current;

    // Update shared state for camera follow
    localPlayerState.position.copy(pos.current);
    localPlayerState.rotationY = rotationY.current;
    localPlayerState.state = playerActionState.current;

    // Throttle network sync (~20Hz or on state change)
    const now = performance.now();
    if (now - lastSyncTime.current > 50) {
      const movedDistSq = pos.current.distanceToSquared(lastSyncPos.current);
      const rotDiff = Math.abs(rotationY.current - lastSyncRotation.current);
      const stateChanged = playerActionState.current !== lastSyncState.current;

      if (movedDistSq > 0.0009 || rotDiff > 0.02 || stateChanged) {
        lastSyncTime.current = now;
        lastSyncPos.current.copy(pos.current);
        lastSyncRotation.current = rotationY.current;
        lastSyncState.current = playerActionState.current;

        colyseusManager.sendPositionUpdate(
          pos.current.x,
          pos.current.y,
          pos.current.z,
          rotationY.current,
          playerActionState.current
        );
      }
    }
  });

  return (
    <group ref={groupRef} name="LocalPlayer">
      <CharacterModel
        state={playerActionState.current}
        walkProgress={walkProgress.current}
        idleProgress={idleProgress.current}
        palette={DEFAULT_PALETTES.local}
        isLocal
      />
      <PlayerNameplate
        nickname={nickname || "관람객"}
        state={playerActionState.current}
        isLocal
      />
    </group>
  );
};

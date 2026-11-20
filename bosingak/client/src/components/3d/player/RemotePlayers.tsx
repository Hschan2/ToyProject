import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNetworkStore } from "../../../store/useNetworkStore";
import { CharacterModel, DEFAULT_PALETTES, type CharacterPalette } from "./CharacterModel";
import { PlayerNameplate } from "./PlayerNameplate";
import type { RemotePlayer as RemotePlayerType } from "../../../types";

const PALETTE_OPTIONS: (keyof typeof DEFAULT_PALETTES)[] = [
  "emerald",
  "crimson",
  "purple",
  "charcoal",
  "amber",
];

function getPaletteForSession(sessionId: string): CharacterPalette {
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    hash = (hash << 5) - hash + sessionId.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % PALETTE_OPTIONS.length;
  const key = PALETTE_OPTIONS[index];
  return DEFAULT_PALETTES[key] || DEFAULT_PALETTES.local;
}

const SingleRemotePlayer: React.FC<{ player: RemotePlayerType }> = ({ player }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pos = useRef(new THREE.Vector3(player.x, player.y, player.z));
  const targetPos = useRef(new THREE.Vector3(player.x, player.y, player.z));
  const rotationY = useRef(player.rotationY || 0);
  const targetRotationY = useRef(player.rotationY || 0);

  const walkProgress = useRef(0);
  const idleProgress = useRef(0);

  const palette = useMemo(() => getPaletteForSession(player.sessionId), [player.sessionId]);

  // Update target when props change
  useEffect(() => {
    targetPos.current.set(player.x, player.y, player.z);
    targetRotationY.current = player.rotationY;
  }, [player.x, player.y, player.z, player.rotationY]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Smoothly interpolate position towards network target
    const distSq = pos.current.distanceToSquared(targetPos.current);
    pos.current.lerp(targetPos.current, dt * 10);

    // Smoothly interpolate rotation
    let diff = targetRotationY.current - rotationY.current;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    rotationY.current += diff * Math.min(1, dt * 12);

    // Apply to group
    groupRef.current.position.copy(pos.current);
    groupRef.current.rotation.y = rotationY.current;

    // Drive animations based on movement or remote state
    const isMoving = distSq > 0.005 || player.state === "WALKING";
    if (isMoving) {
      walkProgress.current += dt * 8.0;
    } else {
      idleProgress.current += dt * 1.5;
    }
  });

  const displayState = player.state || "IDLE";

  return (
    <group ref={groupRef} name={`RemotePlayer-${player.sessionId}`}>
      <CharacterModel
        state={displayState}
        walkProgress={walkProgress.current}
        idleProgress={idleProgress.current}
        palette={palette}
        isLocal={false}
      />
      <PlayerNameplate
        nickname={player.nickname}
        state={displayState}
        isLocal={false}
      />
    </group>
  );
};

export const RemotePlayers: React.FC = () => {
  const playersMap = useNetworkStore((state) => state.players);
  const mySessionId = useNetworkStore((state) => state.mySessionId);

  const remotePlayersList = useMemo(() => {
    const list: RemotePlayerType[] = [];
    playersMap.forEach((player, sessionId) => {
      if (sessionId !== mySessionId) {
        list.push(player);
      }
    });
    return list;
  }, [playersMap, mySessionId]);

  return (
    <group name="RemotePlayersManager">
      {remotePlayersList.map((player) => (
        <SingleRemotePlayer key={player.sessionId} player={player} />
      ))}
    </group>
  );
};

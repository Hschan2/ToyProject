import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PlayerActionState } from "../../../types";

export interface CharacterPalette {
  robe: string;
  sash: string;
  trim: string;
}

export const DEFAULT_PALETTES: Record<string, CharacterPalette> = {
  local: {
    robe: "#1e3a5f", // Deep Royal Indigo Hanbok
    sash: "#cda043", // Golden Dancheong belt
    trim: "#ffffff", // Pure white dongjeong collar
  },
  emerald: {
    robe: "#164e43",
    sash: "#e2b866",
    trim: "#ffffff",
  },
  crimson: {
    robe: "#5f1e24",
    sash: "#e8c37b",
    trim: "#ffffff",
  },
  purple: {
    robe: "#3e245a",
    sash: "#dfb05b",
    trim: "#ffffff",
  },
  charcoal: {
    robe: "#2a2d34",
    sash: "#2dd4bf",
    trim: "#ffffff",
  },
  amber: {
    robe: "#5a3d1e",
    sash: "#f1c40f",
    trim: "#ffffff",
  },
};

interface CharacterModelProps {
  state?: PlayerActionState | string;
  walkProgress?: number;
  idleProgress?: number;
  palette?: CharacterPalette;
  isLocal?: boolean;
}

/**
 * Korean Traditional Aesthetic 3D Character Model
 * Features Gat (갓), Hanbok Durumagi (두루마기), collar line, and rigged limbs
 * supporting procedural walking, breathing, and prayer animations.
 */
export const CharacterModel: React.FC<CharacterModelProps> = ({
  state = "IDLE",
  walkProgress = 0,
  idleProgress = 0,
  palette = DEFAULT_PALETTES.local,
  isLocal = false,
}) => {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  // Procedural skeletal animation updates
  useFrame(() => {
    if (!bodyRef.current || !leftArmRef.current || !rightArmRef.current || !leftLegRef.current || !rightLegRef.current) {
      return;
    }

    if (state === "WALKING") {
      // 1. Walking Cycle (Limbs swing in counter-phase)
      const legSwing = Math.sin(walkProgress) * 0.65;
      const armSwing = Math.sin(walkProgress) * 0.55;

      leftLegRef.current.rotation.x = legSwing;
      rightLegRef.current.rotation.x = -legSwing;

      leftArmRef.current.rotation.x = -armSwing;
      leftArmRef.current.rotation.z = 0.08;

      rightArmRef.current.rotation.x = armSwing;
      rightArmRef.current.rotation.z = -0.08;

      // Vertical bounce & torso tilt
      bodyRef.current.position.y = Math.abs(Math.sin(walkProgress * 2)) * 0.06;
      bodyRef.current.rotation.x = 0.06;
      bodyRef.current.rotation.z = Math.sin(walkProgress) * 0.03;

      if (headRef.current) {
        headRef.current.rotation.x = -0.03;
        headRef.current.rotation.y = Math.sin(walkProgress) * 0.04;
      }
    } else if (state === "PRAYING") {
      // 2. Prayer Pose (Hands joined at chest level, head bowed gently)
      leftLegRef.current.rotation.x = 0;
      rightLegRef.current.rotation.x = 0;

      // Fold arms to chest
      leftArmRef.current.rotation.x = -0.9;
      leftArmRef.current.rotation.y = 0.65;
      leftArmRef.current.rotation.z = -0.2;

      rightArmRef.current.rotation.x = -0.9;
      rightArmRef.current.rotation.y = -0.65;
      rightArmRef.current.rotation.z = 0.2;

      // Torso & head calm breathing
      const breath = Math.sin(idleProgress * 1.5) * 0.015;
      bodyRef.current.position.y = breath;
      bodyRef.current.rotation.x = 0.04;
      bodyRef.current.rotation.z = 0;

      if (headRef.current) {
        headRef.current.rotation.x = 0.25; // Gentle bow
        headRef.current.rotation.y = 0;
      }
    } else if (state === "HOLDING_ROPE" || state === "RINGING") {
      // 3. Rope Holding / Bell Ringing Pose
      leftLegRef.current.rotation.x = 0;
      rightLegRef.current.rotation.x = 0;

      const pull = state === "RINGING" ? Math.sin(walkProgress * 4) * 0.2 : 0;

      leftArmRef.current.rotation.x = -1.25 + pull;
      leftArmRef.current.rotation.y = 0.3;
      leftArmRef.current.rotation.z = 0;

      rightArmRef.current.rotation.x = -1.25 + pull;
      rightArmRef.current.rotation.y = -0.3;
      rightArmRef.current.rotation.z = 0;

      bodyRef.current.position.y = 0;
      bodyRef.current.rotation.x = state === "RINGING" ? -0.1 : 0;

      if (headRef.current) {
        headRef.current.rotation.x = -0.15; // Looking up at bell
      }
    } else {
      // 4. Default Idle State (Calm breathing)
      leftLegRef.current.rotation.x = 0;
      rightLegRef.current.rotation.x = 0;

      const breath = Math.sin(idleProgress * 1.8) * 0.018;
      bodyRef.current.position.y = breath;
      bodyRef.current.rotation.x = 0;
      bodyRef.current.rotation.z = 0;

      leftArmRef.current.rotation.x = 0;
      leftArmRef.current.rotation.y = 0;
      leftArmRef.current.rotation.z = 0.06 + Math.sin(idleProgress * 1.2) * 0.02;

      rightArmRef.current.rotation.x = 0;
      rightArmRef.current.rotation.y = 0;
      rightArmRef.current.rotation.z = -0.06 - Math.sin(idleProgress * 1.2) * 0.02;

      if (headRef.current) {
        headRef.current.rotation.x = 0;
        headRef.current.rotation.y = Math.sin(idleProgress * 0.8) * 0.05;
      }
    }
  });

  return (
    <group name="CharacterMesh">
      {/* 1. Ground Contact Shadow Disc */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>

      {/* Local Player Selection Aura / Ring */}
      {isLocal && (
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.48, 0.54, 32]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.4} />
        </mesh>
      )}

      {/* 2. Main Character Body Hierarchy */}
      <group ref={bodyRef} position={[0, 0, 0]}>
        {/* ============================================================ */}
        {/* HEAD & GAT (갓)                                              */}
        {/* ============================================================ */}
        <group ref={headRef} position={[0, 1.48, 0]}>
          {/* Stylized Face & Head */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <sphereGeometry args={[0.22, 20, 20]} />
            <meshStandardMaterial color="#f7e2ce" roughness={0.6} />
          </mesh>

          {/* Cute stylized eyes */}
          <mesh position={[-0.07, 0.07, 0.19]}>
            <sphereGeometry args={[0.024, 12, 12]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0.07, 0.07, 0.19]}>
            <sphereGeometry args={[0.024, 12, 12]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>

          {/* Warm blush on cheeks */}
          <mesh position={[-0.12, 0.02, 0.17]}>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshBasicMaterial color="#ff9e9e" transparent opacity={0.65} />
          </mesh>
          <mesh position={[0.12, 0.02, 0.17]}>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshBasicMaterial color="#ff9e9e" transparent opacity={0.65} />
          </mesh>

          {/* --- Traditional Gat (갓) --- */}
          <group position={[0, 0.2, 0]}>
            {/* Gat Wide Brim (양태 - 얇은 원반) */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.45, 0.45, 0.02, 32]} />
              <meshStandardMaterial
                color="#121316"
                roughness={0.8}
                transparent
                opacity={0.92}
              />
            </mesh>

            {/* Gat Crown (총모자) */}
            <mesh position={[0, 0.14, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.22, 0.26, 24]} />
              <meshStandardMaterial
                color="#16181d"
                roughness={0.7}
                transparent
                opacity={0.94}
              />
            </mesh>

            {/* Gat Top Finial Rim (정자) */}
            <mesh position={[0, 0.27, 0]}>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshStandardMaterial color="#4a4d56" roughness={0.5} />
            </mesh>

            {/* Gat Straps (갓끈 - 양 볼을 타고 내려오는 끈) */}
            <mesh position={[-0.17, -0.22, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.44, 8]} />
              <meshBasicMaterial color="#18181c" />
            </mesh>
            <mesh position={[0.17, -0.22, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.44, 8]} />
              <meshBasicMaterial color="#18181c" />
            </mesh>
          </group>
        </group>

        {/* ============================================================ */}
        {/* TORSO / HANBOK DURUMAGI (두루마기)                          */}
        {/* ============================================================ */}
        {/* White Inner Collar (동정) */}
        <mesh position={[0, 1.34, 0.03]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.18, 0.07, 0.22]} />
          <meshStandardMaterial color={palette.trim} roughness={0.5} />
        </mesh>

        {/* Upper Robe Chest */}
        <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.38, 16]} />
          <meshStandardMaterial color={palette.robe} roughness={0.65} />
        </mesh>

        {/* Waist Sash / Belt (전대 & 옷고름) */}
        <mesh position={[0, 0.94, 0]} castShadow>
          <cylinderGeometry args={[0.265, 0.265, 0.08, 16]} />
          <meshStandardMaterial color={palette.sash} roughness={0.5} />
        </mesh>

        {/* Hanging Ribbon Tails (옷고름 매듭 자락) */}
        <mesh position={[0.08, 0.78, 0.25]} rotation={[0.08, 0, -0.15]}>
          <boxGeometry args={[0.06, 0.26, 0.015]} />
          <meshStandardMaterial color={palette.sash} roughness={0.5} />
        </mesh>

        {/* Lower Robe Skirt (자연스럽게 퍼지는 두루마기 자락) */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.32, 0.42, 16]} />
          <meshStandardMaterial color={palette.robe} roughness={0.7} />
        </mesh>

        {/* ============================================================ */}
        {/* ARMS (어깨 및 한복 소매)                                     */}
        {/* ============================================================ */}
        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.3, 1.25, 0]}>
          {/* Shoulder & Sleeve */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <cylinderGeometry args={[0.085, 0.1, 0.36, 12]} />
            <meshStandardMaterial color={palette.robe} roughness={0.65} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.38, 0]} castShadow>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color="#f7e2ce" roughness={0.6} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.3, 1.25, 0]}>
          {/* Shoulder & Sleeve */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <cylinderGeometry args={[0.085, 0.1, 0.36, 12]} />
            <meshStandardMaterial color={palette.robe} roughness={0.65} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.38, 0]} castShadow>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color="#f7e2ce" roughness={0.6} />
          </mesh>
        </group>

        {/* ============================================================ */}
        {/* LEGS (한복 바지 & 버선/신발)                                 */}
        {/* ============================================================ */}
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.14, 0.5, 0]}>
          {/* Trousers (바지) */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.08, 0.36, 12]} />
            <meshStandardMaterial color="#dedede" roughness={0.8} />
          </mesh>
          {/* Traditional Shoes (버선 & 가죽신) */}
          <mesh position={[0, -0.42, 0.03]} castShadow>
            <boxGeometry args={[0.09, 0.08, 0.18]} />
            <meshStandardMaterial color="#22252a" roughness={0.7} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.14, 0.5, 0]}>
          {/* Trousers (바지) */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.08, 0.36, 12]} />
            <meshStandardMaterial color="#dedede" roughness={0.8} />
          </mesh>
          {/* Traditional Shoes (버선 & 가죽신) */}
          <mesh position={[0, -0.42, 0.03]} castShadow>
            <boxGeometry args={[0.09, 0.08, 0.18]} />
            <meshStandardMaterial color="#22252a" roughness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

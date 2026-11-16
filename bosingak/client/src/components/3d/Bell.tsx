import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BELFRY_CONFIG } from "../../constants";

interface BellProps {
  isRinging?: boolean;
}

/**
 * Korean Traditional Bronze Bell (보신각 대범종)
 * Features Yongnyu (Dragon loop), Eumtong (Acoustic pipe),
 * Sangdae, Dangjwa (Striking lotus spot), and Hadae bands.
 */
export const Bell: React.FC<BellProps> = ({ isRinging = false }) => {
  const bellGroupRef = useRef<THREE.Group>(null);
  const swingAngle = useRef(0);
  const ringProgress = useRef(0);

  // Animate gentle bell swinging / vibrating when struck
  useFrame((_, delta) => {
    if (!bellGroupRef.current) return;

    if (isRinging) {
      ringProgress.current = 1.0;
    }

    if (ringProgress.current > 0) {
      ringProgress.current = Math.max(0, ringProgress.current - delta * 0.15);
      swingAngle.current += delta * 6;
      // Gentle dampening swing around X-axis
      const amp = ringProgress.current * 0.04;
      bellGroupRef.current.rotation.x = Math.sin(swingAngle.current) * amp;
      bellGroupRef.current.rotation.z = Math.cos(swingAngle.current * 0.8) * (amp * 0.4);
    } else {
      bellGroupRef.current.rotation.x = 0;
      bellGroupRef.current.rotation.z = 0;
    }
  });

  const bronzeMat = {
    color: BELFRY_CONFIG.colors.bellBronze,
    roughness: 0.45,
    metalness: 0.8,
  };

  const bronzeGoldMat = {
    color: BELFRY_CONFIG.colors.bellHighlight,
    roughness: 0.4,
    metalness: 0.85,
  };

  return (
    <group position={[0, BELFRY_CONFIG.bellElevation + 1.2, 0]}>
      {/* ============================================================ */}
      {/* 1. UPPER HEAVY SUPPORT BEAM & CHAINS (종 지지 대들보 및 쇠사슬) */}
      {/* ============================================================ */}
      {/* Heavy Crossbeam */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[0.7, 0.7, 8.8]} />
        <meshStandardMaterial color="#2d1c15" roughness={0.7} />
      </mesh>

      {/* Hanging Bronze Straps / Chains */}
      <mesh position={[0, 1.3, -0.4]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.9, 12]} />
        <meshStandardMaterial {...bronzeMat} />
      </mesh>
      <mesh position={[0, 1.3, 0.4]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.9, 12]} />
        <meshStandardMaterial {...bronzeMat} />
      </mesh>

      {/* ============================================================ */}
      {/* 2. OSCILLATING BELL BODY (한국 전통 범종 본체)                */}
      {/* ============================================================ */}
      <group ref={bellGroupRef} position={[0, 0.8, 0]}>
        {/* Yongnyu (Dragon Hanging Loop / 용뉴) */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <torusGeometry args={[0.35, 0.12, 16, 24]} />
          <meshStandardMaterial {...bronzeGoldMat} />
        </mesh>

        {/* Eumtong (Acoustic Tube / 음통 - 한국 범종 고유 특징) */}
        <mesh position={[0.22, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.45, 16]} />
          <meshStandardMaterial {...bronzeGoldMat} />
        </mesh>

        {/* Cheonpan (Top Plate / 천판) */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.82, 0.92, 0.25, 32]} />
          <meshStandardMaterial {...bronzeMat} />
        </mesh>

        {/* Sangdae (Upper Decorative Band / 상대) */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.93, 0.96, 0.2, 32]} />
          <meshStandardMaterial {...bronzeGoldMat} />
        </mesh>

        {/* Upper Bell Body (종신 상부) */}
        <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.96, 1.15, 0.9, 32]} />
          <meshStandardMaterial {...bronzeMat} />
        </mesh>

        {/* 4 Yugwak Lotus Rectangles (유곽 - 4방향) */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={`yugwak-${idx}`} rotation={[0, angle, 0]} position={[0, -0.75, 0]}>
            <mesh position={[0, 0, 1.08]} castShadow>
              <boxGeometry args={[0.42, 0.42, 0.08]} />
              <meshStandardMaterial {...bronzeGoldMat} />
            </mesh>
          </group>
        ))}

        {/* Middle Bell Body (종신 중부) */}
        <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.34, 0.8, 32]} />
          <meshStandardMaterial {...bronzeMat} />
        </mesh>

        {/* Dangjwa: Striking Lotus Points on Front & Back (당좌 타격점) */}
        <mesh position={[0, -1.5, 1.28]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
          <meshStandardMaterial {...bronzeGoldMat} />
        </mesh>
        <mesh position={[0, -1.5, -1.28]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
          <meshStandardMaterial {...bronzeGoldMat} />
        </mesh>

        {/* Lower Bell Rim Body (종신 하부 플레어) */}
        <mesh position={[0, -2.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.34, 1.48, 0.65, 32]} />
          <meshStandardMaterial {...bronzeMat} />
        </mesh>

        {/* Hadae (Bottom Lotus Border Band / 하대) */}
        <mesh position={[0, -2.55, 0]} castShadow>
          <cylinderGeometry args={[1.49, 1.45, 0.25, 32]} />
          <meshStandardMaterial {...bronzeGoldMat} />
        </mesh>

        {/* Inner Hollow Cavity */}
        <mesh position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.7, 1.25, 2.3, 24, 1, true]} />
          <meshStandardMaterial color="#1a150f" side={THREE.BackSide} roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
};

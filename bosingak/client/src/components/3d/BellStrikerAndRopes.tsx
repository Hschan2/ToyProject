import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BellStrikerAndRopesProps {
  isRinging?: boolean;
}

/**
 * Striker (당목) & 5 Pulling Ropes (타종용 밧줄)
 * Renders the suspended wooden log mallet and the 5 pulling ropes
 * with interactive ground placement markers for 1-player and 2-5 player cooperation.
 */
export const BellStrikerAndRopes: React.FC<BellStrikerAndRopesProps> = ({ isRinging = false }) => {
  const strikerGroupRef = useRef<THREE.Group>(null);
  const swingPhase = useRef(0);
  const swingMagnitude = useRef(0);

  // 5 Rope ground anchoring / grip positions
  const ropePositions: { id: number; label: string; x: number; z: number }[] = [
    { id: 0, label: "중앙 줄 (1인/메인)", x: 0, z: 5.6 },
    { id: 1, label: "좌측 1번 줄", x: -1.5, z: 5.3 },
    { id: 2, label: "우측 1번 줄", x: 1.5, z: 5.3 },
    { id: 3, label: "좌측 2번 줄", x: -2.8, z: 5.8 },
    { id: 4, label: "우측 2번 줄", x: 2.8, z: 5.8 },
  ];

  useFrame((_, delta) => {
    if (!strikerGroupRef.current) return;

    if (isRinging) {
      swingMagnitude.current = 1.0;
    }

    if (swingMagnitude.current > 0) {
      swingMagnitude.current = Math.max(0, swingMagnitude.current - delta * 0.35);
      swingPhase.current += delta * 7;
      // Oscillate striker back and forth towards bell (Z-axis pivot)
      const offsetZ = Math.sin(swingPhase.current) * (swingMagnitude.current * 0.45);
      strikerGroupRef.current.position.z = 2.4 - offsetZ;
      strikerGroupRef.current.rotation.x = -offsetZ * 0.2;
    } else {
      strikerGroupRef.current.position.z = 2.4;
      strikerGroupRef.current.rotation.x = 0;
    }
  });

  return (
    <group position={[0, 3.2, 0]}>
      {/* ============================================================ */}
      {/* 1. SUSPENDED WOODEN STRIKER (당목 - 撞木)                     */}
      {/* ============================================================ */}
      <group ref={strikerGroupRef} position={[0, 0, 2.4]}>
        {/* Supporting Suspension Chains (Front & Back) */}
        <mesh position={[0, 1.8, -0.7]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 3.6, 8]} />
          <meshStandardMaterial color="#4a4d52" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.8, 0.7]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 3.6, 8]} />
          <meshStandardMaterial color="#4a4d52" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Heavy Cylindrical Pine Mallet Log (소나무 원목 통나무 당목) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.26, 2.8, 24]} />
          <meshStandardMaterial color="#5c3822" roughness={0.8} />
        </mesh>

        {/* Front Striking Iron/Bronze Cap (타격부 금속 보강 캡) */}
        <mesh position={[0, 0, -1.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.15, 24]} />
          <meshStandardMaterial color="#7a623a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Rear Rope Tie Rings (뒤쪽 줄 연결 고리) */}
        <mesh position={[0, 0, 1.35]}>
          <torusGeometry args={[0.16, 0.04, 12, 16]} />
          <meshStandardMaterial color="#4a4d52" metalness={0.8} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. FIVE TRADITIONAL PULLING ROPES (5개의 타종 줄 및 손잡이)    */}
      {/* ============================================================ */}
      {ropePositions.map((rope) => {
        // Draw rope from striker tail [0, 0, 3.75] down to each grip position [x, -1.1, z]
        const start = new THREE.Vector3(0, 0, 3.75);
        const end = new THREE.Vector3(rope.x, -1.1, rope.z);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        // Add subtle catenary sag
        mid.y -= 0.15;

        const curve = new THREE.CatmullRomCurve3([start, mid, end]);
        const ropeGeo = new THREE.TubeGeometry(curve, 16, 0.035, 8, false);

        return (
          <group key={`rope-${rope.id}`}>
            {/* Hanging Rope */}
            <mesh geometry={ropeGeo} castShadow>
              <meshStandardMaterial color="#d4b584" roughness={0.9} />
            </mesh>

            {/* Rope Leather/Wood Handle Knot */}
            <mesh position={[rope.x, -1.1, rope.z]} castShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.35, 12]} />
              <meshStandardMaterial color="#8a4d28" roughness={0.7} />
            </mesh>

            {/* Interactive Grip Zone Ring on Floor */}
            <mesh position={[rope.x, -1.17, rope.z]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.28, 0.36, 32]} />
              <meshBasicMaterial
                color="#f5c542"
                transparent
                opacity={0.65}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

import React from "react";

/**
 * Single Traditional Korean Octagonal Stone Lantern (팔각 석등)
 */
const StoneLantern: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const stoneMat = {
    color: "#5e616b",
    roughness: 0.9,
    metalness: 0.1,
  };

  return (
    <group position={position}>
      {/* 1. Base Pedestal (지대석 & 하대석) */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.75, 0.3, 8]} />
        <meshStandardMaterial {...stoneMat} />
      </mesh>

      {/* 2. Octagonal Pillar (간주석) */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.9, 8]} />
        <meshStandardMaterial {...stoneMat} />
      </mesh>

      {/* 3. Upper Lotus Platform (상대석) */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.35, 0.2, 8]} />
        <meshStandardMaterial {...stoneMat} />
      </mesh>

      {/* 4. Fire Chamber (화사석 - 화창이 뚫린 등실) */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.52, 0.5, 8]} />
        <meshStandardMaterial color="#43464e" roughness={0.8} />
      </mesh>

      {/* Glowing Warm Fire Inner Core */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffaa33" />
      </mesh>
      <pointLight
        position={[0, 1.65, 0]}
        color="#ffaa44"
        intensity={2.8}
        distance={9}
        decay={2}
        castShadow
      />

      {/* 5. Octagonal Roof Stone (옥개석) */}
      <mesh position={[0, 2.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.85, 0.3, 8]} />
        <meshStandardMaterial {...stoneMat} />
      </mesh>

      {/* 6. Finial Jewel Bead (보주) */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#7a7e8a" roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * Traditional Korean Pine Tree (고풍스러운 한국 소나무)
 */
const KoreanPineTree: React.FC<{ position: [number, number, number]; rotationY?: number; scale?: number }> = ({
  position,
  rotationY = 0,
  scale = 1.0,
}) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Lower Curved Trunk */}
      <mesh position={[0, 1.6, 0]} rotation={[0.08, 0, 0.12]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.45, 3.2, 12]} />
        <meshStandardMaterial color="#3d271d" roughness={0.9} />
      </mesh>

      {/* Upper Bending Trunk */}
      <mesh position={[0.3, 3.8, 0.1]} rotation={[-0.15, 0, 0.22]} castShadow>
        <cylinderGeometry args={[0.2, 0.32, 2.2, 10]} />
        <meshStandardMaterial color="#3d271d" roughness={0.9} />
      </mesh>

      {/* Pine Needle Cloud Canopies (소나무 잎 구름 층) */}
      <mesh position={[0.7, 4.4, 0.2]} castShadow>
        <sphereGeometry args={[1.5, 12, 10]} />
        <meshStandardMaterial color="#193322" roughness={0.8} />
      </mesh>
      <mesh position={[-0.4, 3.8, -0.3]} castShadow>
        <sphereGeometry args={[1.2, 12, 10]} />
        <meshStandardMaterial color="#1b3825" roughness={0.8} />
      </mesh>
      <mesh position={[0.4, 5.2, 0.3]} castShadow>
        <sphereGeometry args={[1.1, 12, 10]} />
        <meshStandardMaterial color="#21422d" roughness={0.8} />
      </mesh>
    </group>
  );
};

/**
 * Plaza Environment Objects
 * Places 4 octagonal stone lanterns, outer boundary balustrades, and pine trees.
 */
export const PlazaObjects: React.FC = () => {
  return (
    <group name="PlazaSurroundings">
      {/* 4 Traditional Octagonal Stone Lanterns around Belfry Corners */}
      <StoneLantern position={[-12, 0, 12]} />
      <StoneLantern position={[12, 0, 12]} />
      <StoneLantern position={[-12, 0, -12]} />
      <StoneLantern position={[12, 0, -12]} />

      {/* Korean Pine Trees Framing the Belfry */}
      <KoreanPineTree position={[-17, 0, 6]} rotationY={0.4} scale={1.15} />
      <KoreanPineTree position={[17, 0, 8]} rotationY={-0.6} scale={1.25} />
      <KoreanPineTree position={[-16, 0, -8]} rotationY={1.2} scale={1.05} />
      <KoreanPineTree position={[16, 0, -10]} rotationY={-1.5} scale={1.1} />

      {/* Outer Stone Guardrail Posts along Plaza front */}
      {[-8, -4, 4, 8].map((x, idx) => (
        <group key={`front-post-${idx}`} position={[x, 0, 13.5]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.18, 1.0, 12]} />
            <meshStandardMaterial color="#555861" roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.08, 0]} castShadow>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#6a6e7a" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

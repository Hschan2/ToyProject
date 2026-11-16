import React from "react";

/**
 * Lighting & Shadow Configuration for Bosingak Night Atmosphere
 * Blends cool moonlight with warm traditional Korean pavilion lanterns.
 */
export const Lighting: React.FC = () => {
  return (
    <group name="SceneLighting">
      {/* 1. Ambient Moonlight Base (Cool Midnight Slate) */}
      <ambientLight color="#141a2e" intensity={0.9} />

      {/* 2. Directional Moonlight (Cast Shadows from the Moon Position) */}
      <directionalLight
        position={[28, 38, -32]}
        color="#a9c2e6"
        intensity={1.25}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={120}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.0003}
      />

      {/* 3. Warm Interior Pavilion Light (Illuminating the Bell and Wooden Rafters) */}
      <pointLight
        position={[0, 5.8, 0]}
        color="#ffaa44"
        intensity={4.2}
        distance={16}
        decay={2}
        castShadow
      />

      {/* 4. Soft Overhead Spotlight on the Bell */}
      <spotLight
        position={[0, 8.2, 0]}
        target-position={[0, 3.5, 0]}
        color="#ffd38c"
        intensity={3.5}
        angle={Math.PI / 4}
        penumbra={0.6}
        distance={12}
        decay={2}
      />

      {/* 5. Front Pavilion Accent Light (Enhancing '普信閣' Signboard visibility) */}
      <pointLight
        position={[0, 6.2, 5.8]}
        color="#ffc766"
        intensity={2.0}
        distance={9}
        decay={2}
      />
    </group>
  );
};

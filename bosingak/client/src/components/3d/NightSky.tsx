import React, { useMemo } from "react";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural Moon Texture with subtle craters and Maria seas
 */
function createMoonTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Moon base pale ivory
  ctx.fillStyle = "#fff8e7";
  ctx.fillRect(0, 0, 512, 512);

  // Lunar Maria (Dark basalt plains)
  ctx.fillStyle = "#d8cfbc";
  const mariaPlains = [
    { x: 180, y: 160, r: 85 },
    { x: 300, y: 190, r: 70 },
    { x: 230, y: 280, r: 95 },
    { x: 340, y: 320, r: 60 },
  ];
  mariaPlains.forEach(({ x, y, r }) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Soft lunar noise
  for (let i = 0; i < 4000; i++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    const gray = Math.floor(190 + Math.random() * 55);
    ctx.fillStyle = `rgba(${gray}, ${gray - 5}, ${gray - 15}, 0.15)`;
    ctx.fillRect(px, py, 3, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Night Sky Component
 * Deep midnight sky dome, glowing full moon with halo, and shimmering stars.
 */
export const NightSky: React.FC = () => {
  const moonTexture = useMemo(() => createMoonTexture(), []);

  // Moon position high in the southern-eastern sky
  const moonPosition: [number, number, number] = [28, 38, -32];

  return (
    <group name="NightSky">
      {/* 1. Deep Midnight Dome Background */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[95, 32, 32]} />
        <meshBasicMaterial
          color="#060913"
          side={THREE.BackSide}
        />
      </mesh>

      {/* 2. Shimmering Stars in Deep Night Sky */}
      <Stars
        radius={85}
        depth={40}
        count={2500}
        factor={4.5}
        saturation={0.3}
        fade
        speed={1.2}
      />

      {/* 3. Luminous Full Moon (보름달) */}
      <group position={moonPosition}>
        {/* Moon Sphere Body */}
        <mesh>
          <sphereGeometry args={[4.2, 32, 32]} />
          <meshBasicMaterial
            map={moonTexture || undefined}
            color="#fff8e6"
          />
        </mesh>

        {/* Soft Moon Halo / Atmospheric Glow Disc */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[14, 14]} />
          <meshBasicMaterial
            color="#ffecc7"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, 0.4]}>
          <planeGeometry args={[22, 22]} />
          <meshBasicMaterial
            color="#ffe0a3"
            transparent
            opacity={0.10}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

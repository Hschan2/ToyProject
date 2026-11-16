import React, { useMemo } from "react";
import * as THREE from "three";
import { BELFRY_CONFIG } from "../../constants";

/**
 * Ground & Plaza Platform Component
 * Renders the stone tile plaza floor and surrounding environment.
 */
export const Ground: React.FC = () => {
  // Generate a procedural granite tile texture for the plaza floor
  const floorTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Base granite gray
    ctx.fillStyle = "#2b2e35";
    ctx.fillRect(0, 0, 512, 512);

    // Stone tile grid lines
    ctx.strokeStyle = "#1b1d22";
    ctx.lineWidth = 4;
    const tileSize = 64;

    for (let x = 0; x <= 512; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Subtle noise flecks for stone texture
    for (let i = 0; i < 3000; i++) {
      const px = Math.random() * 512;
      const py = Math.random() * 512;
      const gray = Math.floor(35 + Math.random() * 30);
      ctx.fillStyle = `rgb(${gray}, ${gray + 2}, ${gray + 5})`;
      ctx.fillRect(px, py, 2, 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    return texture;
  }, []);

  return (
    <group name="PlazaGround">
      {/* Main Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          map={floorTexture || undefined}
          color={BELFRY_CONFIG.colors.stoneFloor}
          roughness={0.88}
          metalness={0.12}
        />
      </mesh>

      {/* Plaza Outer Stone Border Rim */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <ringGeometry args={[24, 25.5, 64]} />
        <meshStandardMaterial
          color="#3e434d"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

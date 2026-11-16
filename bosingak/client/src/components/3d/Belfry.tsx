import React, { useMemo } from "react";
import * as THREE from "three";
import { BELFRY_CONFIG } from "../../constants";

/**
 * Procedural Signboard Canvas Texture for '普信閣' (Bosingak)
 */
function createSignboardTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Traditional dark lacquer board background
  ctx.fillStyle = "#121110";
  ctx.fillRect(0, 0, 512, 160);

  // Gold ornate border
  ctx.strokeStyle = "#c89f4b";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 492, 140);

  ctx.strokeStyle = "#5f4820";
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 472, 120);

  // Hanja calligraphy: 普 信 閣
  ctx.fillStyle = "#f5c542";
  ctx.shadowColor = "#f5c542";
  ctx.shadowBlur = 8;
  ctx.font = "bold 64px 'Noto Serif KR', 'Batang', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("普  信  閣", 256, 80);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Belfry (보신각) Traditional Wooden Pavilion Structure
 * Renders the 2-tier stone pedestal, 12 pillars, railings, bracket sets (공포),
 * eaves, hips, hip-and-gable roof (팔작지붕), and the authentic signboard.
 */
export const Belfry: React.FC = () => {
  const { colors } = BELFRY_CONFIG;

  const signboardTex = useMemo(() => createSignboardTexture(), []);

  // 12 Pillar layout coordinates: 4 on X, 3 on Z
  const pillars = useMemo(() => {
    const coords: [number, number, number][] = [];
    const xOffsets = [-7.8, -2.6, 2.6, 7.8];
    const zOffsets = [-4.8, 0, 4.8];

    xOffsets.forEach((x) => {
      zOffsets.forEach((z) => {
        coords.push([x, 2.0, z]);
      });
    });
    return coords;
  }, []);

  return (
    <group name="BosingakPavilion" position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. TWO-TIER STONE PLATFORM (2단 기단) & FRONT STAIRS         */}
      {/* ============================================================ */}
      {/* Lower Platform */}
      <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[26, 0.8, 20]} />
        <meshStandardMaterial color={colors.stoneBase} roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Upper Platform */}
      <mesh position={[0, 1.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[22, 1.2, 16]} />
        <meshStandardMaterial color={colors.stoneBase} roughness={0.8} metalness={0.15} />
      </mesh>

      {/* Front Entrance Stone Stairs (Facing South / +Z) */}
      {[0, 1, 2, 3, 4].map((step) => (
        <mesh
          key={`stair-${step}`}
          position={[0, 0.2 + step * 0.25, 10.3 + (4 - step) * 0.45]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[6.5, 0.25, 0.9]} />
          <meshStandardMaterial color="#4d4f56" roughness={0.8} metalness={0.1} />
        </mesh>
      ))}

      {/* Wooden Deck Floor on top of upper platform */}
      <mesh position={[0, 2.02, 0]} receiveShadow>
        <boxGeometry args={[21.4, 0.08, 15.4]} />
        <meshStandardMaterial color={colors.woodDark} roughness={0.65} metalness={0.05} />
      </mesh>

      {/* ============================================================ */}
      {/* 2. TWELVE TRADITIONAL PILLARS (12주 붉은 옻칠 원목 기둥)      */}
      {/* ============================================================ */}
      {pillars.map(([px, py, pz], idx) => (
        <group key={`pillar-group-${idx}`} position={[px, py, pz]}>
          {/* Stone Pillar Base (초석) */}
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.42, 0.48, 0.3, 16]} />
            <meshStandardMaterial color="#686b73" roughness={0.9} />
          </mesh>

          {/* Red Lacquer Wooden Column (배흘림 기둥) */}
          <mesh position={[0, 2.65, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.3, 4.8, 20]} />
            <meshStandardMaterial color={colors.pillarRed} roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Dancheong Capital Bracket (기둥 머리 주두 & 공포) */}
          <mesh position={[0, 5.15, 0]} castShadow>
            <boxGeometry args={[0.85, 0.4, 0.85]} />
            <meshStandardMaterial color={colors.dancheongTeal} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* 3. TRANSVERSE BEAMS & BRACKETS (창방, 평방, 도리)             */}
      {/* ============================================================ */}
      {/* Front & Back Main Beams (X-axis) */}
      {[-4.8, 0, 4.8].map((zPos, idx) => (
        <mesh key={`beam-x-${idx}`} position={[0, 7.15, zPos]} castShadow>
          <boxGeometry args={[16.8, 0.45, 0.45]} />
          <meshStandardMaterial color={colors.dancheongTeal} roughness={0.6} />
        </mesh>
      ))}

      {/* Side Main Beams (Z-axis) */}
      {[-7.8, -2.6, 2.6, 7.8].map((xPos, idx) => (
        <mesh key={`beam-z-${idx}`} position={[xPos, 7.15, 0]} castShadow>
          <boxGeometry args={[0.45, 0.45, 10.5]} />
          <meshStandardMaterial color={colors.dancheongTeal} roughness={0.6} />
        </mesh>
      ))}

      {/* Traditional Dancheong Floral / Geometric Band */}
      <mesh position={[0, 7.45, 0]}>
        <boxGeometry args={[17.2, 0.25, 10.9]} />
        <meshStandardMaterial color={colors.dancheongGold} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* ============================================================ */}
      {/* 4. BALUSTRADE / RAILING (계자난간)                            */}
      {/* ============================================================ */}
      {/* South (Front) Left & Right Railings (Leaving center entrance open) */}
      <mesh position={[-6.8, 2.6, 7.3]} castShadow>
        <boxGeometry args={[6.2, 0.9, 0.12]} />
        <meshStandardMaterial color={colors.pillarRed} roughness={0.7} />
      </mesh>
      <mesh position={[6.8, 2.6, 7.3]} castShadow>
        <boxGeometry args={[6.2, 0.9, 0.12]} />
        <meshStandardMaterial color={colors.pillarRed} roughness={0.7} />
      </mesh>

      {/* North (Back) Full Railing */}
      <mesh position={[0, 2.6, -7.3]} castShadow>
        <boxGeometry args={[20.2, 0.9, 0.12]} />
        <meshStandardMaterial color={colors.pillarRed} roughness={0.7} />
      </mesh>

      {/* West & East Side Railings */}
      <mesh position={[-10.1, 2.6, 0]} castShadow>
        <boxGeometry args={[0.12, 0.9, 14.6]} />
        <meshStandardMaterial color={colors.pillarRed} roughness={0.7} />
      </mesh>
      <mesh position={[10.1, 2.6, 0]} castShadow>
        <boxGeometry args={[0.12, 0.9, 14.6]} />
        <meshStandardMaterial color={colors.pillarRed} roughness={0.7} />
      </mesh>

      {/* ============================================================ */}
      {/* 5. KOREAN TRADITIONAL HIP-AND-GABLE ROOF (팔작지붕 & 처마곡선)  */}
      {/* ============================================================ */}
      {/* Lower Eaves Layer (처마) */}
      <mesh position={[0, 7.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[20.8, 0.45, 14.4]} />
        <meshStandardMaterial color={colors.roofTiles} roughness={0.8} />
      </mesh>

      {/* Main Roof Slope Tier 1 (Hip Gable Base) */}
      <mesh position={[0, 8.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[18.4, 0.8, 12.2]} />
        <meshStandardMaterial color={colors.roofTiles} roughness={0.75} />
      </mesh>

      {/* Main Roof Slope Tier 2 */}
      <mesh position={[0, 9.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[15.6, 0.9, 9.8]} />
        <meshStandardMaterial color={colors.roofTiles} roughness={0.75} />
      </mesh>

      {/* Gable Triangular Walls (합각) East & West */}
      <mesh position={[-6.8, 9.2, 0]} castShadow>
        <boxGeometry args={[0.2, 0.9, 8.2]} />
        <meshStandardMaterial color="#8b2522" roughness={0.6} />
      </mesh>
      <mesh position={[6.8, 9.2, 0]} castShadow>
        <boxGeometry args={[0.2, 0.9, 8.2]} />
        <meshStandardMaterial color="#8b2522" roughness={0.6} />
      </mesh>

      {/* Main Ridge (용마루 - 최상단 능선) */}
      <mesh position={[0, 9.75, 0]} castShadow>
        <boxGeometry args={[13.2, 0.35, 0.6]} />
        <meshStandardMaterial color="#191b1f" roughness={0.8} />
      </mesh>

      {/* Ridge Ornaments (취두/용두 - 용마루 양 끝 장식) */}
      <mesh position={[-6.6, 10.0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.7]} />
        <meshStandardMaterial color="#2d3036" roughness={0.7} />
      </mesh>
      <mesh position={[6.6, 10.0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.7]} />
        <meshStandardMaterial color="#2d3036" roughness={0.7} />
      </mesh>

      {/* ============================================================ */}
      {/* 6. AUTHENTIC SIGNBOARD: '普信閣' (보신각 현판)                 */}
      {/* ============================================================ */}
      {signboardTex && (
        <group position={[0, 6.75, 5.15]} rotation={[-0.1, 0, 0]}>
          {/* Signboard Backing Frame */}
          <mesh castShadow>
            <boxGeometry args={[4.2, 1.4, 0.15]} />
            <meshStandardMaterial color="#1a140f" roughness={0.8} />
          </mesh>
          {/* Front Face with Golden Calligraphy Texture */}
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[4.0, 1.25]} />
            <meshStandardMaterial
              map={signboardTex}
              roughness={0.4}
              metalness={0.2}
              emissive="#382810"
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

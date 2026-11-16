import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { CAMERA_PRESETS } from "../../constants";
import { useUIStore } from "../../store/useUIStore";
import { NightSky } from "./NightSky";
import { Lighting } from "./Lighting";
import { Ground } from "./Ground";
import { Belfry } from "./Belfry";
import { Bell } from "./Bell";
import { BellStrikerAndRopes } from "./BellStrikerAndRopes";
import { PlazaObjects } from "./PlazaObjects";

interface BosingakCanvasProps {
  isRinging?: boolean;
}

/**
 * Camera Controller that smoothly animates camera position & target on preset change
 */
const CameraController: React.FC = () => {
  const cameraMode = useUIStore((state) => state.cameraMode);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(({ camera }, delta) => {
    const preset = CAMERA_PRESETS[cameraMode];
    if (!preset) return;

    // Smooth lerp to destination
    const targetPos = new THREE.Vector3(...preset.position);
    camera.position.lerp(targetPos, delta * 3.5);

    if (controlsRef.current) {
      const targetLookAt = new THREE.Vector3(...preset.target);
      controlsRef.current.target.lerp(targetLookAt, delta * 3.5);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going below ground
      minDistance={3}
      maxDistance={65}
    />
  );
};

/**
 * Main 3D Canvas Scene for Bosingak
 */
export const BosingakCanvas: React.FC<BosingakCanvasProps> = ({ isRinging = false }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, 26], fov: 50, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
    >
      <CameraController />
      <NightSky />
      <Lighting />
      <Ground />
      <Belfry />
      <Bell isRinging={isRinging} />
      <BellStrikerAndRopes isRinging={isRinging} />
      <PlazaObjects />
    </Canvas>
  );
};

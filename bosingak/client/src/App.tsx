import React, { useState, useEffect, useCallback } from "react";
import { BosingakCanvas } from "./components/3d/BosingakCanvas";
import { Header } from "./components/ui/Header";
import { ViewModeSelector } from "./components/ui/ViewModeSelector";
import { AudioControl } from "./components/ui/AudioControl";
import { ConnectionModal } from "./components/ui/ConnectionModal";
import { DayProgressHUD } from "./components/ui/DayProgressHUD";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { useAudioStore } from "./store/useAudioStore";
import { colyseusManager } from "./network/colyseusClient";
import "./App.css";

export const App: React.FC = () => {
  const [isRinging, setIsRinging] = useState(false);
  const ringBellAudio = useAudioStore((state) => state.ringBell);

  // Auto-connect on startup with a default guest nickname
  useEffect(() => {
    const defaultNickname = `관람객_${Math.floor(1000 + Math.random() * 9000)}`;
    colyseusManager.connect(defaultNickname);

    return () => {
      colyseusManager.disconnect();
    };
  }, []);

  // Handle bell strike from UI or hotkey (Space bar)
  const handleRingBell = useCallback(() => {
    ringBellAudio();
    setIsRinging(true);
    // Reset ringing state after the impulse phase
    setTimeout(() => {
      setIsRinging(false);
    }, 400);
  }, [ringBellAudio]);

  // Spacebar key listener to strike bell
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleRingBell();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRingBell]);

  return (
    <ErrorBoundary>
      <div className="app-container">
        {/* 3D WebGL Canvas Layer */}
        <div className="canvas-wrapper">
          <BosingakCanvas isRinging={isRinging} />
        </div>

        {/* 2D Glassmorphism UI Overlay */}
        <div className="ui-overlay">
          {/* Top Navigation & Status */}
          <Header />

          {/* Milestone HUD Popup */}
          <DayProgressHUD />

          {/* Bottom Controls Bar */}
          <div className="ui-bottom-bar">
            <ViewModeSelector />
            <AudioControl onRingBell={handleRingBell} />
          </div>
        </div>

        {/* Modals */}
        <ConnectionModal />
      </div>
    </ErrorBoundary>
  );
};

export default App;

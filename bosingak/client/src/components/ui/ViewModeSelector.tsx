import React from "react";
import { useUIStore } from "../../store/useUIStore";
import type { CameraViewMode } from "../../types";

const MODES: { id: CameraViewMode; label: string; icon: string }[] = [
  { id: "PLAYER", label: "3인칭 플레이어", icon: "👤" },
  { id: "FREE", label: "자유 시점", icon: "🌐" },
  { id: "FRONT", label: "보신각 정면", icon: "🏛️" },
  { id: "BELL_CLOSEUP", label: "대범종 시점", icon: "🔔" },
  { id: "OVERHEAD", label: "전체 조감", icon: "🔭" },
];

export const ViewModeSelector: React.FC = () => {
  const { cameraMode, setCameraMode } = useUIStore();

  return (
    <div className="view-mode-selector">
      <div className="view-mode-label">카메라 시점</div>
      <div className="view-mode-buttons">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            className={`view-btn ${cameraMode === mode.id ? "active" : ""}`}
            onClick={() => setCameraMode(mode.id)}
          >
            <span className="view-icon">{mode.icon}</span>
            <span className="view-text">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

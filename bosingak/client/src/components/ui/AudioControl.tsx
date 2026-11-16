import React from "react";
import { useAudioStore } from "../../store/useAudioStore";

interface AudioControlProps {
  onRingBell: () => void;
}

export const AudioControl: React.FC<AudioControlProps> = ({ onRingBell }) => {
  const { volume, isMuted, isWindActive, setVolume, toggleMute, toggleWind } = useAudioStore();

  const handleRingClick = () => {
    onRingBell();
  };

  return (
    <div className="audio-control-panel">
      {/* Bell Strike Test Button */}
      <button className="bell-strike-btn" onClick={handleRingClick}>
        <span className="bell-emoji">🔔</span>
        <span className="bell-text">보신각 대범종 타종 (울리기)</span>
      </button>

      {/* Wind Ambient Toggle */}
      <button
        className={`wind-toggle-btn ${isWindActive ? "active" : ""}`}
        onClick={toggleWind}
        title="은은한 밤바람 환경음 On/Off"
      >
        <span className="icon">{isWindActive ? "🍃" : "💨"}</span>
        <span>{isWindActive ? "바람 소리 켜짐" : "바람 소리 끄기"}</span>
      </button>

      {/* Mute Button */}
      <button
        className={`mute-btn ${isMuted ? "muted" : ""}`}
        onClick={toggleMute}
        title={isMuted ? "음소거 해제" : "음소거"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="volume-slider"
        title={`볼륨: ${Math.round(volume * 100)}%`}
      />
    </div>
  );
};

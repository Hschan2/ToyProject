import React, { useState, useEffect } from "react";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useUIStore } from "../../store/useUIStore";

export const Header: React.FC = () => {
  const { isConnected, isConnecting, players, nickname } = useNetworkStore();
  const setShowNicknameModal = useUIStore((state) => state.setShowNicknameModal);
  const setIsHelpOpen = useUIStore((state) => state.setIsHelpOpen);
  const isHelpOpen = useUIStore((state) => state.isHelpOpen);

  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalPlayers = Math.max(1, players.size);

  return (
    <header className="bosingak-header">
      <div className="header-brand">
        <h1 className="brand-title">보신각 普信閣</h1>
        <span className="brand-subtitle">BOSINGAK · 온라인 소셜 힐링</span>
      </div>

      <div className="header-status-group">
        {/* Real-time Clock */}
        <div className="time-badge">
          <span className="time-icon">🌙</span>
          <span className="time-text">서울 {timeString}</span>
        </div>

        {/* Server Connection Status */}
        <div
          className={`server-badge ${isConnected ? "online" : isConnecting ? "connecting" : "offline"}`}
          onClick={() => setShowNicknameModal(true)}
          title="클릭하여 서버 연결 설정"
        >
          <span className="status-dot" />
          <span className="status-text">
            {isConnected
              ? `${nickname || "관람객"} (동시 접속 ${totalPlayers}명)`
              : isConnecting
              ? "서버 연결 중..."
              : "오프라인 뷰어 (클릭하여 서버 접속)"}
          </span>
        </div>

        {/* DAY 1-5 Milestone HUD Toggle */}
        <button
          className={`hud-toggle-btn ${isHelpOpen ? "active" : ""}`}
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          title="개발 현황 및 안내"
        >
          📋 개발 일정 (DAY 1~5)
        </button>
      </div>
    </header>
  );
};

import React from "react";
import { Html } from "@react-three/drei";
import type { PlayerActionState } from "../../../types";

interface PlayerNameplateProps {
  nickname: string;
  state?: PlayerActionState | string;
  isLocal?: boolean;
  position?: [number, number, number];
}

export const PlayerNameplate: React.FC<PlayerNameplateProps> = ({
  nickname,
  state = "IDLE",
  isLocal = false,
  position = [0, 2.35, 0],
}) => {
  const getStateBadge = () => {
    switch (state) {
      case "WALKING":
        return <span className="nameplate-state-tag walking">🚶 이동</span>;
      case "PRAYING":
        return <span className="nameplate-state-tag praying">🙏 기도</span>;
      case "HOLDING_ROPE":
        return <span className="nameplate-state-tag rope">🔔 줄잡음</span>;
      case "RINGING":
        return <span className="nameplate-state-tag ringing">🔔 타종</span>;
      default:
        return null;
    }
  };

  return (
    <Html
      position={position}
      center
      distanceFactor={16}
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      <div className={`player-nameplate ${isLocal ? "local-player" : "remote-player"}`}>
        <div className="nameplate-bubble">
          {isLocal ? (
            <span className="nameplate-me-badge">나</span>
          ) : (
            <span className="nameplate-icon">👤</span>
          )}
          <span className="nameplate-name">{nickname || "관람객"}</span>
          {getStateBadge()}
        </div>
      </div>
    </Html>
  );
};

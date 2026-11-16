import React, { useState } from "react";
import { useNetworkStore } from "../../store/useNetworkStore";
import { useUIStore } from "../../store/useUIStore";
import { colyseusManager } from "../../network/colyseusClient";
import { validateNickname, sanitizeInput } from "../../utils/security";

export const ConnectionModal: React.FC = () => {
  const { showNicknameModal, setShowNicknameModal } = useUIStore();
  const { isConnected, isConnecting, connectionError, nickname } = useNetworkStore();

  const [inputName, setInputName] = useState(nickname || `관람객_${Math.floor(1000 + Math.random() * 9000)}`);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!showNicknameModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const check = validateNickname(inputName);
    if (!check.valid) {
      setValidationError(check.message || "유효하지 않은 닉네임입니다.");
      return;
    }

    const clean = sanitizeInput(inputName);
    const success = await colyseusManager.connect(clean);
    if (success) {
      setShowNicknameModal(false);
    }
  };

  const handleDisconnect = () => {
    colyseusManager.disconnect();
    setShowNicknameModal(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setShowNicknameModal(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">보신각 실시간 서버 접속</h2>
          <button className="modal-close-btn" onClick={() => setShowNicknameModal(false)}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <label className="input-label" htmlFor="nickname-input">
            관람객 닉네임 설정 (최대 12자)
          </label>
          <input
            id="nickname-input"
            type="text"
            className="text-input"
            value={inputName}
            maxLength={12}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="닉네임을 입력하세요"
            disabled={isConnecting}
          />

          {validationError && <p className="error-text">{validationError}</p>}
          {connectionError && <p className="error-text warning">{connectionError}</p>}

          <div className="modal-actions">
            {isConnected ? (
              <button
                type="button"
                className="btn-danger"
                onClick={handleDisconnect}
              >
                접속 해제 (오프라인 모드)
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={isConnecting}
              >
                {isConnecting ? "접속 중..." : "서버 입장하기"}
              </button>
            )}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowNicknameModal(false)}
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

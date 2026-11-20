import React from "react";
import { useUIStore } from "../../store/useUIStore";

interface DayItem {
  day: string;
  title: string;
  status: "completed" | "in_progress" | "planned";
  items: string[];
}

const MILESTONES: DayItem[] = [
  {
    day: "DAY 1",
    title: "프로젝트 환경 구축",
    status: "completed",
    items: [
      "React + TypeScript + Vite 클라이언트 구성",
      "Three.js + React Three Fiber + Drei 3D 엔진 설치",
      "Zustand 상태 관리 & Colyseus 실시간 SDK 설치",
      "Node.js Colyseus 멀티플레이어 서버 환경 완성",
    ],
  },
  {
    day: "DAY 2",
    title: "기본 구조 및 서버 통신",
    status: "completed",
    items: [
      "관심사 분리(SoC) 기반 클라이언트/서버 폴더 아키텍처",
      "3D 위치/회전/상태 지원 Colyseus Player 스키마 정의",
      "XSS 방지 닉네임 살균(Sanitization) & 좌표 Clamping 보안",
      "서버 유닛/통합 테스트 (5/5 Passing)",
    ],
  },
  {
    day: "DAY 3",
    title: "보신각 기본 3D 공간",
    status: "completed",
    items: [
      "보신각 2단 화강암 기단 (하층/상층) & 전면 중앙 돌계단",
      "12주 전통 붉은 옻칠 원목 배흘림 기둥 & 주두",
      "창방, 평방 및 다포식 단청 목조 공포 구조",
      "우아한 처마 곡선과 용마루를 지닌 전통 팔작지붕",
      "정면 처마 아래 '普信閣' 고풍스러운 전통 현판 편액",
    ],
  },
  {
    day: "DAY 4",
    title: "종 및 주변 오브젝트",
    status: "completed",
    items: [
      "한국 고유 범종 형태: 용뉴(龍鈕), 음통(音筒), 당좌(撞座), 유곽",
      "상부 대형 원목 대들보 지지 구조 및 쇠사슬 체인",
      "종을 타격하는 거대한 원목 당목(撞木) 모델링",
      "1인 및 2~5인 협동 타종을 위한 5개의 타종 줄과 바닥 상호작용 링",
      "팔각 전통 석등(石燈) 4기 & 고풍스러운 한국 소나무 조경",
    ],
  },
  {
    day: "DAY 5",
    title: "하늘 및 조명 / 사운드",
    status: "completed",
    items: [
      "심야의 짙은 네이비 돔 밤하늘 & 2,500개의 반짝이는 별무리",
      "은은한 달무리(Halo)를 머금은 보름달(Full Moon) 구현",
      "달빛 DirectionalLight (Soft Shadow Map) & 누각 웜골드 조명",
      "Web Audio API 기반 은은한 밤바람 소리 합성 엔진",
      "한국 범종 고유의 맥놀이(Acoustic beat) & 10초 잔향 타종음",
    ],
  },
  {
    day: "DAY 6",
    title: "플레이어 생성",
    status: "completed",
    items: [
      "한국 전통미를 살린 3D 갓(Gat) & 두루마기 캐릭터 모델링",
      "보신각 전면 광장(0, 0, 18) 기본 스폰 좌표 및 라이프사이클",
      "글래스모피즘 3D 닉네임 명패 및 상태 뱃지 (나/타 플레이어 구분)",
      "3인칭 플레이어 추적 카메라 (3rd-Person Follow Camera Rig)",
    ],
  },
  {
    day: "DAY 7",
    title: "플레이어 이동",
    status: "completed",
    items: [
      "카메라 시점 연동 WASD & 화살표 키 부드러운 가감속 이동",
      "마우스 드래그 3인칭 궤도 시점 회전 및 줌 인/아웃 컨트롤",
      "기본 걷기(4.8m/s) 및 Shift 키를 이용한 전력 질주(7.6m/s)",
      "2단 화강암 기단 및 중앙 돌계단 고도 보간 (Terrain Elevation)",
      "12개 기둥, 팔각석등, 소나무, 대범종 충돌 감지 및 월드 경계 제한",
    ],
  },
  {
    day: "DAY 8",
    title: "플레이어 애니메이션",
    status: "completed",
    items: [
      "자연스러운 팔/다리 상호 진폭 보행 사이클 (Walk Cycle) 애니메이션",
      "정지 시 차분한 호흡 및 머리 미세 움직임 대기 (Idle) 애니메이션",
      "이동 방향에 맞춘 부드러운 회전 보간 (Slerp / Yaw Smoothing)",
      "Colyseus 실시간 세션 연동 타 플레이어(Remote Players) 렌더링",
      "세션 ID 기반 고유 전통 색상 팔레트 및 행동 상태(State) 동기화",
    ],
  },
];

export const DayProgressHUD: React.FC = () => {
  const { isHelpOpen, setIsHelpOpen } = useUIStore();

  if (!isHelpOpen) return null;

  return (
    <div className="milestone-hud-card">
      <div className="hud-header">
        <h3 className="hud-title">📜 보신각 개발 일정 현황 (DAY 1 ~ DAY 8)</h3>
        <button className="hud-close-btn" onClick={() => setIsHelpOpen(false)}>
          ✕
        </button>
      </div>

      <div className="hud-content">
        {MILESTONES.map((item) => (
          <div key={item.day} className={`hud-milestone ${item.status}`}>
            <div className="milestone-badge-row">
              <span className="badge-day">{item.day}</span>
              <span className="badge-title">{item.title}</span>
              <span className="badge-status">
                {item.status === "completed" ? "✅ 완료" : "진행중"}
              </span>
            </div>
            <ul className="milestone-list">
              {item.items.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

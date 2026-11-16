import { create } from "zustand";
import type { CameraViewMode } from "../types";

interface UIState {
  cameraMode: CameraViewMode;
  showHUD: boolean;
  showNicknameModal: boolean;
  isHelpOpen: boolean;

  setCameraMode: (mode: CameraViewMode) => void;
  setShowHUD: (val: boolean) => void;
  setShowNicknameModal: (val: boolean) => void;
  setIsHelpOpen: (val: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cameraMode: "FREE",
  showHUD: true,
  showNicknameModal: false,
  isHelpOpen: false,

  setCameraMode: (mode) => set({ cameraMode: mode }),
  setShowHUD: (val) => set({ showHUD: val }),
  setShowNicknameModal: (val) => set({ showNicknameModal: val }),
  setIsHelpOpen: (val) => set({ isHelpOpen: val }),
}));

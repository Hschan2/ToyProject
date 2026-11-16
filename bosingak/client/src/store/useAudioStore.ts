import { create } from "zustand";
import { soundManager } from "../audio/SoundManager";

interface AudioState {
  volume: number;
  isMuted: boolean;
  isWindActive: boolean;

  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleWind: () => void;
  ringBell: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  volume: 0.7,
  isMuted: false,
  isWindActive: false,

  setVolume: (val) => {
    soundManager.setVolume(val);
    set({ volume: val });
  },

  toggleMute: () => {
    const next = !get().isMuted;
    soundManager.setMuted(next);
    set({ isMuted: next });
  },

  toggleWind: () => {
    const next = !get().isWindActive;
    if (next) {
      soundManager.startWind();
    } else {
      soundManager.stopWind();
    }
    set({ isWindActive: next });
  },

  ringBell: () => {
    soundManager.ringBell();
  },
}));

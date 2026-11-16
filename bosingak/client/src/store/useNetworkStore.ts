import { create } from "zustand";
import type { RemotePlayer, WeatherType } from "../types";

interface NetworkState {
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  mySessionId: string | null;
  nickname: string;
  weather: WeatherType;
  bellRungCount: number;
  players: Map<string, RemotePlayer>;

  setConnecting: (val: boolean) => void;
  setConnected: (val: boolean, sessionId?: string) => void;
  setConnectionError: (err: string | null) => void;
  setNickname: (name: string) => void;
  setWeather: (weather: WeatherType) => void;
  incrementBellRung: () => void;
  upsertPlayer: (sessionId: string, player: RemotePlayer) => void;
  removePlayer: (sessionId: string) => void;
  reset: () => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: false,
  isConnecting: false,
  connectionError: null,
  mySessionId: null,
  nickname: "",
  weather: "CLEAR",
  bellRungCount: 0,
  players: new Map(),

  setConnecting: (val) => set({ isConnecting: val }),
  setConnected: (val, sessionId) =>
    set({ isConnected: val, isConnecting: false, mySessionId: sessionId || null, connectionError: null }),
  setConnectionError: (err) => set({ connectionError: err, isConnecting: false }),
  setNickname: (nickname) => set({ nickname }),
  setWeather: (weather) => set({ weather }),
  incrementBellRung: () => set((state) => ({ bellRungCount: state.bellRungCount + 1 })),
  upsertPlayer: (sessionId, player) =>
    set((state) => {
      const next = new Map(state.players);
      next.set(sessionId, player);
      return { players: next };
    }),
  removePlayer: (sessionId) =>
    set((state) => {
      const next = new Map(state.players);
      next.delete(sessionId);
      return { players: next };
    }),
  reset: () =>
    set({
      isConnected: false,
      isConnecting: false,
      connectionError: null,
      mySessionId: null,
      players: new Map(),
    }),
}));

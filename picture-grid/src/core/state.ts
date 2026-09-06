import type { AppState } from './types';

export const initialAppState: AppState = {
  currentLayout: 'overlay',
  currentRatio: '1:1',
  images: [],
  gap: 20,
  radius: 16,
  shadowIntensity: 40,
  bgType: 'color',
  bgColor: '#0f172a',
  currentFilter: 'none',
  showDateStamp: false,
  watermarkText: '',
};

export class AppStateManager {
  private state: AppState;
  private listeners: Array<(state: AppState) => void> = [];

  constructor(initial: Partial<AppState> = {}) {
    this.state = { ...initialAppState, ...initial };
  }

  public getState(): Readonly<AppState> {
    return this.state;
  }

  public setState(partial: Partial<AppState>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  public reset(keepImages = true): void {
    const currentImages = this.state.images;
    this.state = {
      ...initialAppState,
      images: keepImages ? currentImages : [],
    };
    this.notify();
  }

  public subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

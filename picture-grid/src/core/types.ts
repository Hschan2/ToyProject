export type LayoutType = 'overlay' | 'grid4' | 'vert10' | 'horiz3' | 'polaroid' | 'blurSingle' | 'splitInvert';
export type RatioType = '1:1' | '4:5' | '9:16' | '16:9';
export type BgType = 'color' | 'gradient' | 'blur';
export type FilterType =
  | 'none'
  | 'kodak'
  | 'fuji'
  | 'vintage'
  | 'noir'
  | 'cinematic'
  | 'warm'
  | 'cool'
  | 'bw'
  | 'vivid'
  | 'soft';

export interface AppState {
  currentLayout: LayoutType;
  currentRatio: RatioType;
  images: HTMLImageElement[];
  gap: number;
  radius: number;
  shadowIntensity: number;
  bgType: BgType;
  bgColor: string;
  currentFilter: FilterType;
  showDateStamp: boolean;
  watermarkText: string;
}

export interface CanvasDimensions {
  width: number;
  height: number;
}

export interface LayoutRenderContext {
  ctx: CanvasRenderingContext2D;
  dims: CanvasDimensions;
  images: HTMLImageElement[];
  pad: number;
  radius: number;
  shadowIntensity: number;
  currentFilter: FilterType;
  showDateStamp: boolean;
}

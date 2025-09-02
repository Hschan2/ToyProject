export type CssFilter = {
  brightness?: number;
  contrast?: number;
  saturate?: number;
  grayscale?: number;
  sepia?: number;
  invert?: number;
  ['hue-rotate']?: number;
  opacity?: number;
  blur?: number;
};

export enum FilterType {
  AI = 'AI',
  MOOD = 'MOOD',
}

export interface AiFilter {
  type: FilterType.AI;
  brand: string;
  tone: string;
  title: string;
}

export interface MoodFilter {
  type: FilterType.MOOD;
  title: string;
  tone: CssFilter;
}

export type Filter = AiFilter | MoodFilter;

import type { LayoutRenderContext, LayoutType } from '../types';
import { renderOverlay } from './overlay';
import { renderGrid4 } from './grid4';
import { renderVert10 } from './vert10';
import { renderHoriz3 } from './horiz3';
import { renderPolaroid } from './polaroid';
import { renderBlurSingle } from './blurSingle';
import { renderSplitInvert } from './splitInvert';

export type LayoutRenderer = (context: LayoutRenderContext) => void;

export const layoutRegistry: Record<LayoutType, LayoutRenderer> = {
  overlay: renderOverlay,
  grid4: renderGrid4,
  vert10: renderVert10,
  horiz3: renderHoriz3,
  polaroid: renderPolaroid,
  blurSingle: renderBlurSingle,
  splitInvert: renderSplitInvert,
};

export function renderLayout(type: LayoutType, context: LayoutRenderContext): void {
  const renderer = layoutRegistry[type];
  if (renderer) {
    renderer(context);
  } else {
    console.warn(`Unknown layout type: ${type}`);
  }
}

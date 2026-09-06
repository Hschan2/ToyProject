import type { LayoutRenderContext } from '../types';
import { drawImageCover } from '../engine/drawCover';

/**
 * 레이아웃 6: 단일 포커스 모드 (블러 배경과 함께 주로 사용)
 */
export function renderBlurSingle(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, currentFilter, showDateStamp } = context;

  const cellW = dims.width - pad * 4;
  const cellH = dims.height - pad * 4;
  const coverOptions = { currentFilter, showDateStamp };

  drawImageCover(ctx, images[0], pad * 2, pad * 2, cellW, cellH, radius, coverOptions);
}

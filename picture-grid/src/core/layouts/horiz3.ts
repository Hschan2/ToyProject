import type { LayoutRenderContext } from '../types';
import { drawImageCover } from '../engine/drawCover';

/**
 * 레이아웃 4: 3개 가로 그리드
 */
export function renderHoriz3(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, currentFilter, showDateStamp } = context;

  const rows = 3;
  const cellW = dims.width - pad * 2;
  const cellH = (dims.height - pad * 4) / rows;

  const coverOptions = { currentFilter, showDateStamp };

  for (let i = 0; i < 3; i++) {
    const y = pad + i * (cellH + pad);
    const img = images[i % images.length];
    drawImageCover(ctx, img, pad, y, cellW, cellH, radius, coverOptions);
  }
}

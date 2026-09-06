import type { LayoutRenderContext } from '../types';
import { drawImageCover } from '../engine/drawCover';

/**
 * 레이아웃 2: 4개 그리드 (2x2)
 */
export function renderGrid4(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, currentFilter, showDateStamp } = context;

  const cellW = (dims.width - pad * 3) / 2;
  const cellH = (dims.height - pad * 3) / 2;

  const positions = [
    { x: pad, y: pad },
    { x: pad * 2 + cellW, y: pad },
    { x: pad, y: pad * 2 + cellH },
    { x: pad * 2 + cellW, y: pad * 2 + cellH },
  ];

  const coverOptions = { currentFilter, showDateStamp };

  positions.forEach((pos, idx) => {
    const img = images[idx % images.length];
    drawImageCover(ctx, img, pos.x, pos.y, cellW, cellH, radius, coverOptions);
  });
}

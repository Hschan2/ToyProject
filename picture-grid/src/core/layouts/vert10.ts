import type { LayoutRenderContext } from '../types';
import { roundRect } from '../engine/canvasUtils';
import { drawImageCover } from '../engine/drawCover';

/**
 * 레이아웃 3: 10개 세로 스트립
 */
export function renderVert10(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, shadowIntensity, currentFilter, showDateStamp } = context;

  const cols = 10;
  const totalW = dims.width - pad * 2;
  const totalH = dims.height - pad * 2;
  const startX = pad;
  const startY = pad;

  // 카드 기본 배경 및 그림자
  if (shadowIntensity > 0) {
    ctx.save();
    ctx.fillStyle = '#0f172a';
    roundRect(ctx, startX, startY, totalW, totalH, radius);
    ctx.fill();
    ctx.restore();
  }

  // 전체 카드를 모서리 둥글기로 클리핑
  ctx.save();
  if (radius > 0) {
    roundRect(ctx, startX, startY, totalW, totalH, radius);
    ctx.clip();
  }

  const coverOptions = { currentFilter, showDateStamp };

  for (let i = 0; i < cols; i++) {
    const x1 = startX + (i * totalW) / cols;
    const x2 = startX + ((i + 1) * totalW) / cols;
    const stripW = x2 - x1;
    const img = images[i % images.length];
    drawImageCover(ctx, img, x1, startY, stripW + 0.5, totalH, 0, coverOptions);
  }
  ctx.restore();
}

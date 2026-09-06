import type { LayoutRenderContext } from '../types';
import { roundRect } from '../engine/canvasUtils';
import { drawImageCover } from '../engine/drawCover';

/**
 * 레이아웃 5: 폴라로이드 프레임 스타일
 */
export function renderPolaroid(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, currentFilter, showDateStamp } = context;

  const frameW = dims.width - pad * 4;
  const frameH = dims.height - pad * 4;
  const frameX = pad * 2;
  const frameY = pad * 2;

  // 흰색 프레임 배경
  ctx.save();
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, frameX, frameY, frameW, frameH, radius + 4);
  ctx.fill();
  ctx.restore();

  // 내부 사진 영역 (하단 캡션 공간 확보 80px)
  const photoPad = 24;
  const photoW = frameW - photoPad * 2;
  const photoH = frameH - photoPad * 2 - 80;
  const coverOptions = { currentFilter, showDateStamp };

  drawImageCover(
    ctx,
    images[0],
    frameX + photoPad,
    frameY + photoPad,
    photoW,
    photoH,
    Math.max(0, radius - 4),
    coverOptions
  );
}

import type { LayoutRenderContext } from '../types';
import { drawImageCover } from '../engine/drawCover';

/**
 * 레이아웃 1: 2장 겹침 (오버레이)
 * 배경 이미지 위에 65% 크기의 포그라운드 이미지 배치
 */
export function renderOverlay(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, shadowIntensity, currentFilter, showDateStamp } = context;

  const bgImg = images[0];
  const fgImg = images[1] || images[0];

  const coverOptions = { currentFilter, showDateStamp };

  // 배경 이미지
  drawImageCover(ctx, bgImg, pad, pad, dims.width - pad * 2, dims.height - pad * 2, radius, coverOptions);

  // 중앙 오버레이 이미지 (65% 크기)
  const overlayW = (dims.width - pad * 2) * 0.65;
  const overlayH = (dims.height - pad * 2) * 0.65;
  const overlayX = (dims.width - overlayW) / 2;
  const overlayY = (dims.height - overlayH) / 2;

  ctx.shadowColor = 'rgba(0, 0, 0, ' + (shadowIntensity / 70) + ')';
  ctx.shadowBlur = shadowIntensity * 0.8;

  drawImageCover(ctx, fgImg, overlayX, overlayY, overlayW, overlayH, radius, coverOptions);
}

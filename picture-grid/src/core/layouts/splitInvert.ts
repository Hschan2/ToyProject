import type { FilterType, LayoutRenderContext } from '../types';
import { isFilmFilter, roundRect } from '../engine/canvasUtils';
import { applyCanvasFilter, drawFilmDateStamp, drawFilmOverlay } from '../engine/effects';

interface DrawHalfOptions {
  currentFilter: FilterType;
  showDateStamp: boolean;
}

/**
 * 지정된 사각형(boxX, boxY, boxW, boxH)을 기준으로
 * 이미지를 Cover 크기로 채운 후 왼쪽 또는 오른쪽 절반만 클리핑하여 렌더링합니다.
 */
function drawCoverHalf(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  half: 'left' | 'right',
  options: DrawHalfOptions
): void {
  const midX = boxX + boxW / 2;

  ctx.save();
  ctx.beginPath();
  if (half === 'left') {
    // 0.5px 오버랩으로 경계선 서브픽셀 틈새 방지
    ctx.rect(boxX, boxY, boxW / 2 + 0.5, boxH);
  } else {
    ctx.rect(midX, boxY, boxW - boxW / 2, boxH);
  }
  ctx.clip();

  // Cover 크기 및 위치 계산 (전체 사각형 기준)
  const imgRatio = img.width / img.height;
  const rectRatio = boxW / boxH;
  let nw = boxW;
  let nh = boxH;
  let nx = boxX;
  let ny = boxY;

  if (imgRatio > rectRatio) {
    nw = boxH * imgRatio;
    nx = boxX - (nw - boxW) / 2;
  } else {
    nh = boxW / imgRatio;
    ny = boxY - (nh - boxH) / 2;
  }

  // 필터 적용 및 렌더링
  applyCanvasFilter(ctx, options.currentFilter);
  ctx.drawImage(img, nx, ny, nw, nh);
  ctx.filter = 'none';

  // 아날로그 필름 효과 (비네팅 + 그레인)
  if (isFilmFilter(options.currentFilter)) {
    drawFilmOverlay(ctx, boxX, boxY, boxW, boxH, options.currentFilter);
  }

  ctx.restore();
}

/**
 * 레이아웃: 반전 분할 (Split Invert)
 * - 배경 이미지: 왼쪽 절반은 1번째 이미지, 오른쪽 절반은 2번째 이미지
 * - 중앙 이미지: 40% 크기 오버레이로, 왼쪽 절반은 2번째 이미지, 오른쪽 절반은 1번째 이미지 (위치 반전)
 */
export function renderSplitInvert(context: LayoutRenderContext): void {
  const { ctx, dims, images, pad, radius, shadowIntensity, currentFilter, showDateStamp } = context;

  const bgLeftImg = images[0];
  const bgRightImg = images[1] || images[0];
  const fgLeftImg = images[1] || images[0];
  const fgRightImg = images[0];

  const coverOptions: DrawHalfOptions = { currentFilter, showDateStamp };

  // 1. 전체 배경 영역 계산
  const totalW = dims.width - pad * 2;
  const totalH = dims.height - pad * 2;
  const startX = pad;
  const startY = pad;

  // 2. 배경 렌더링 (모서리 둥글기 클리핑 지원)
  ctx.save();
  if (radius > 0) {
    roundRect(ctx, startX, startY, totalW, totalH, radius);
    ctx.clip();
  }
  drawCoverHalf(ctx, bgLeftImg, startX, startY, totalW, totalH, 'left', coverOptions);
  drawCoverHalf(ctx, bgRightImg, startX, startY, totalW, totalH, 'right', coverOptions);
  ctx.restore();

  // 3. 중앙 오버레이 영역 계산 (40% 크기)
  const overlayW = totalW * 0.4;
  const overlayH = totalH * 0.4;
  const overlayX = startX + (totalW - overlayW) / 2;
  const overlayY = startY + (totalH - overlayH) / 2;

  // 4. 중앙 오버레이 그림자 효과
  if (shadowIntensity > 0) {
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowIntensity / 70})`;
    ctx.shadowBlur = shadowIntensity * 0.8;
    ctx.shadowOffsetY = shadowIntensity * 0.2;
    ctx.fillStyle = '#000000';
    roundRect(ctx, overlayX, overlayY, overlayW, overlayH, radius);
    ctx.fill();
    ctx.restore();
  }

  // 5. 중앙 오버레이 렌더링 (위치 반전: 왼쪽=이미지2, 오른쪽=이미지1)
  ctx.save();
  if (radius > 0) {
    roundRect(ctx, overlayX, overlayY, overlayW, overlayH, radius);
    ctx.clip();
  }
  drawCoverHalf(ctx, fgLeftImg, overlayX, overlayY, overlayW, overlayH, 'left', coverOptions);
  drawCoverHalf(ctx, fgRightImg, overlayX, overlayY, overlayW, overlayH, 'right', coverOptions);
  ctx.restore();

  // 6. 필름 날짜 스탬프
  if (showDateStamp) {
    drawFilmDateStamp(ctx, startX, startY, totalW, totalH);
  }
}

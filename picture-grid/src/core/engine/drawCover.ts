import type { FilterType } from '../types';
import { isFilmFilter, roundRect } from './canvasUtils';
import { applyCanvasFilter, drawFilmDateStamp, drawFilmOverlay } from './effects';

export interface DrawCoverOptions {
  currentFilter: FilterType;
  showDateStamp: boolean;
}

/**
 * 캔버스 영역에 이미지를 cover 비율로 맞추어 클리핑 및 이펙트와 함께 렌더링
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  options: DrawCoverOptions
): void {
  ctx.save();
  roundRect(ctx, x, y, w, h, r);
  ctx.clip();

  const imgRatio = img.width / img.height;
  const rectRatio = w / h;
  let nw = w;
  let nh = h;
  let nx = x;
  let ny = y;

  if (imgRatio > rectRatio) {
    nw = h * imgRatio;
    nx = x - (nw - w) / 2;
  } else {
    nh = w / imgRatio;
    ny = y - (nh - h) / 2;
  }

  // 1. 필터 적용 및 이미지 드로잉
  applyCanvasFilter(ctx, options.currentFilter);
  ctx.drawImage(img, nx, ny, nw, nh);
  ctx.filter = 'none';

  // 2. 아날로그 필름 효과 (비네팅 + 그레인)
  if (isFilmFilter(options.currentFilter)) {
    drawFilmOverlay(ctx, x, y, w, h, options.currentFilter);
  }

  // 3. 필름 카메라 날짜 스탬프
  if (options.showDateStamp) {
    drawFilmDateStamp(ctx, x, y, w, h);
  }

  ctx.restore();
}

import type { CanvasDimensions, FilterType, RatioType } from '../types';

/**
 * 둥근 모서리 사각형 패스 생성
 */
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * 비율에 따른 캔버스 기본 해상도 반환
 */
export function getCanvasDimensions(ratio: RatioType): CanvasDimensions {
  switch (ratio) {
    case '4:5':
      return { width: 1080, height: 1350 };
    case '9:16':
      return { width: 1080, height: 1920 };
    case '16:9':
      return { width: 1920, height: 1080 };
    case '1:1':
    default:
      return { width: 1080, height: 1080 };
  }
}

/**
 * 아날로그 필름 효과 대상 필터 판별
 */
export function isFilmFilter(filter: FilterType): boolean {
  return ['kodak', 'fuji', 'vintage', 'noir', 'cinematic'].includes(filter);
}

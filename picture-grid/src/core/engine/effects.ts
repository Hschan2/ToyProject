import type { BgType, CanvasDimensions, FilterType } from '../types';

let cachedGrainPattern: CanvasPattern | null = null;

/**
 * 필름 그레인 텍스처 패턴 생성 (캐싱 지원)
 */
export function getGrainPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  if (cachedGrainPattern) return cachedGrainPattern;

  const pCanvas = document.createElement('canvas');
  pCanvas.width = 160;
  pCanvas.height = 160;
  const pCtx = pCanvas.getContext('2d');
  if (!pCtx) return null;

  const imgData = pCtx.createImageData(160, 160);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const isDark = Math.random() < 0.5;
    const val = isDark ? Math.floor(Math.random() * 80) : Math.floor(175 + Math.random() * 80);
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = 58; // 필름 감광 질감용 불투명도
  }
  pCtx.putImageData(imgData, 0, 0);
  cachedGrainPattern = ctx.createPattern(pCanvas, 'repeat');
  return cachedGrainPattern;
}

/**
 * CSS 캔버스 필터 적용
 */
export function applyCanvasFilter(ctx: CanvasRenderingContext2D, filter: FilterType): void {
  switch (filter) {
    case 'kodak':
      ctx.filter = 'sepia(0.32) contrast(1.15) brightness(1.03) saturate(1.25) hue-rotate(-5deg)';
      break;
    case 'fuji':
      ctx.filter = 'sepia(0.18) contrast(1.18) brightness(1.02) saturate(0.95) hue-rotate(15deg)';
      break;
    case 'vintage':
      ctx.filter = 'sepia(0.46) contrast(0.95) brightness(1.06) saturate(0.85) hue-rotate(-10deg)';
      break;
    case 'noir':
      ctx.filter = 'grayscale(1) contrast(1.45) brightness(0.92)';
      break;
    case 'cinematic':
      ctx.filter = 'contrast(1.22) saturate(1.32) hue-rotate(-15deg) brightness(0.96)';
      break;
    case 'warm':
      ctx.filter = 'sepia(0.25) saturate(1.2) contrast(1.05)';
      break;
    case 'cool':
      ctx.filter = 'hue-rotate(180deg) saturate(1.1) brightness(1.02)';
      break;
    case 'bw':
      ctx.filter = 'grayscale(1) contrast(1.15)';
      break;
    case 'vivid':
      ctx.filter = 'saturate(1.6) contrast(1.2)';
      break;
    case 'soft':
      ctx.filter = 'brightness(1.08) contrast(0.92) saturate(1.1)';
      break;
    case 'none':
    default:
      ctx.filter = 'none';
      break;
  }
}

/**
 * 비네팅 및 필름 그레인 오버레이 렌더링
 */
export function drawFilmOverlay(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  filter: FilterType
): void {
  // 비네팅 (Radial Gradient)
  const radiusDist = Math.max(w, h) * 0.72;
  const vignette = ctx.createRadialGradient(
    x + w / 2,
    y + h / 2,
    Math.min(w, h) * 0.28,
    x + w / 2,
    y + h / 2,
    radiusDist
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(0.7, 'rgba(0, 0, 0, 0.12)');
  vignette.addColorStop(
    1,
    filter === 'noir' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(35, 18, 5, 0.32)'
  );

  ctx.fillStyle = vignette;
  ctx.fillRect(x, y, w, h);

  // 필름 그레인 텍스처 (Overlay 모드)
  const pattern = getGrainPattern(ctx);
  if (pattern) {
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = pattern;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }
}

/**
 * 아날로그 필름 날짜 스탬프 렌더링 ('26 09 04)
 */
export function drawFilmDateStamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  ctx.save();
  const fontSize = Math.max(14, Math.round(w * 0.04));
  ctx.font = `bold ${fontSize}px "Courier New", monospace`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'rgba(255, 131, 0, 0.82)';

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'rgba(255, 120, 0, 0.18)';
  ctx.shadowBlur = 1.5;

  const today = new Date();
  const yy = String(today.getFullYear()).slice(-2);
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `'${yy} ${mm} ${dd}`;

  ctx.fillText(dateStr, x + w - Math.max(12, w * 0.035), y + h - Math.max(10, h * 0.03));
  ctx.restore();
}

/**
 * 배경 렌더링 (단색, 그라디언트, 블러)
 */
export function drawCanvasBackground(
  ctx: CanvasRenderingContext2D,
  dims: CanvasDimensions,
  bgType: BgType,
  bgColor: string,
  firstImage?: HTMLImageElement
): void {
  if (bgType === 'color') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, dims.width, dims.height);
  } else if (bgType === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, dims.width, dims.height);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#31103f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, dims.width, dims.height);
  } else if (bgType === 'blur' && firstImage) {
    ctx.save();
    ctx.filter = 'blur(40px) brightness(0.6)';
    ctx.drawImage(firstImage, -50, -50, dims.width + 100, dims.height + 100);
    ctx.restore();
  }
}

/**
 * 우측 하단 워터마크 / 텍스트 렌더링
 */
export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  dims: CanvasDimensions,
  pad: number,
  watermarkText: string
): void {
  if (!watermarkText.trim()) return;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 6;
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 24px Outfit, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(watermarkText, dims.width - pad - 20, dims.height - pad - 20);
  ctx.restore();
}

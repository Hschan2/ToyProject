import type { AppState, CanvasDimensions } from '../types';
import { getCanvasDimensions } from './canvasUtils';
import { drawCanvasBackground, drawWatermark } from './effects';
import { renderLayout } from '../layouts';

export class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private onDimensionsChange?: (dims: CanvasDimensions) => void;

  constructor(canvas: HTMLCanvasElement, onDimensionsChange?: (dims: CanvasDimensions) => void) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.ctx = context;
    this.onDimensionsChange = onDimensionsChange;
  }

  public render(state: AppState): void {
    const dims = getCanvasDimensions(state.currentRatio);
    this.canvas.width = dims.width;
    this.canvas.height = dims.height;

    if (this.onDimensionsChange) {
      this.onDimensionsChange(dims);
    }

    const { ctx } = this;

    // 1. 배경 그리기
    drawCanvasBackground(ctx, dims, state.bgType, state.bgColor, state.images[0]);

    if (state.images.length === 0) return;

    // 2. 기본 그림자 설정
    if (state.shadowIntensity > 0) {
      ctx.shadowColor = `rgba(0, 0, 0, ${state.shadowIntensity / 100})`;
      ctx.shadowBlur = state.shadowIntensity * 0.5;
      ctx.shadowOffsetY = state.shadowIntensity * 0.3;
    } else {
      ctx.shadowColor = 'transparent';
    }

    // 3. 레이아웃 렌더링 (전략 패턴 디스패치)
    renderLayout(state.currentLayout, {
      ctx,
      dims,
      images: state.images,
      pad: state.gap,
      radius: state.radius,
      shadowIntensity: state.shadowIntensity,
      currentFilter: state.currentFilter,
      showDateStamp: state.showDateStamp,
    });

    // 4. 워터마크 / 서명 렌더링
    drawWatermark(ctx, dims, state.gap, state.watermarkText);
  }

  public exportImage(quality = 1.0): string {
    return this.canvas.toDataURL('image/png', quality);
  }
}

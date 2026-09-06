import type { BgType, FilterType, LayoutType, RatioType } from './types';
import { AppStateManager } from './state';
import { CanvasEngine } from './engine/CanvasEngine';

const SAMPLE_IMAGE_URLS = ['/samples/sample1.jpg', '/samples/sample2.jpg'];

export function initApp(): void {
  const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
  if (!canvas) return;

  const canvasSizeInfo = document.getElementById('canvasSizeInfo');
  const slotsContainer = document.getElementById('slotsContainer');
  const gapVal = document.getElementById('gapVal');
  const radiusVal = document.getElementById('radiusVal');
  const shadowVal = document.getElementById('shadowVal');
  const gapRange = document.getElementById('gapRange') as HTMLInputElement;
  const radiusRange = document.getElementById('radiusRange') as HTMLInputElement;
  const shadowRange = document.getElementById('shadowRange') as HTMLInputElement;
  const filterSelect = document.getElementById('filterSelect') as HTMLSelectElement;
  const dateStampCheckbox = document.getElementById('dateStampCheckbox') as HTMLInputElement;
  const watermarkInput = document.getElementById('watermarkInput') as HTMLInputElement;
  const bgColorPicker = document.getElementById('bgColorPicker') as HTMLInputElement;
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const canvasLoader = document.getElementById('canvasLoader');

  const stateManager = new AppStateManager();
  const engine = new CanvasEngine(canvas, (dims) => {
    if (canvasSizeInfo) {
      canvasSizeInfo.textContent = `${dims.width} x ${dims.height}px`;
    }
  });

  // 썸네일 슬롯 업데이트
  function updateSlots(images: HTMLImageElement[]) {
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '';
    images.forEach((img, idx) => {
      const thumb = document.createElement('img');
      thumb.src = img.src;
      thumb.className = 'slot-thumb';
      thumb.title = `사진 #${idx + 1}`;
      slotsContainer.appendChild(thumb);
    });
  }

  // 상태 변화 시 캔버스 재렌더링
  stateManager.subscribe((state) => {
    engine.render(state);
  });

  // 샘플 이미지 로더
  async function loadSamples() {
    const promises = SAMPLE_IMAGE_URLS.map((url) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.src = url;
      });
    });
    const loaded = await Promise.all(promises);
    stateManager.setState({ images: loaded });
    updateSlots(loaded);
  }

  // 1. 레이아웃 선택 이벤트
  document.querySelectorAll('#layoutPresets .layout-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#layoutPresets .layout-btn').forEach((b) => b.classList.remove('active'));
      const target = e.currentTarget as HTMLElement;
      target.classList.add('active');
      const layout = target.getAttribute('data-layout') as LayoutType;
      stateManager.setState({ currentLayout: layout });
    });
  });

  // 2. 화면 비율 선택 이벤트
  document.querySelectorAll('#ratioOptions .chip-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#ratioOptions .chip-btn').forEach((b) => b.classList.remove('active'));
      const target = e.currentTarget as HTMLElement;
      target.classList.add('active');
      const ratio = target.getAttribute('data-ratio') as RatioType;
      stateManager.setState({ currentRatio: ratio });
    });
  });

  // 3. 파일 업로드 이벤트
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return;

      const loadedImgs: HTMLImageElement[] = [];
      let count = 0;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            loadedImgs.push(img);
            count++;
            if (count === files.length) {
              stateManager.setState({ images: loadedImgs });
              updateSlots(loadedImgs);
            }
          };
          img.src = event.target!.result as string;
        };
        reader.readAsDataURL(files[i]);
      }
    });
  }

  // 4. 샘플 불러오기 버튼
  document.getElementById('btnLoadSamples')?.addEventListener('click', loadSamples);

  // 5. 슬라이더 이벤트
  if (gapRange) {
    gapRange.addEventListener('input', (e) => {
      const gap = parseInt((e.target as HTMLInputElement).value, 10);
      if (gapVal) gapVal.textContent = `${gap}px`;
      stateManager.setState({ gap });
    });
  }

  if (radiusRange) {
    radiusRange.addEventListener('input', (e) => {
      const radius = parseInt((e.target as HTMLInputElement).value, 10);
      if (radiusVal) radiusVal.textContent = `${radius}px`;
      stateManager.setState({ radius });
    });
  }

  if (shadowRange) {
    shadowRange.addEventListener('input', (e) => {
      const shadowIntensity = parseInt((e.target as HTMLInputElement).value, 10);
      if (shadowVal) shadowVal.textContent = `${shadowIntensity}%`;
      stateManager.setState({ shadowIntensity });
    });
  }

  // 6. 배경 스타일 라디오 및 컬러피커
  document.querySelectorAll('input[name="bgType"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const bgType = (e.target as HTMLInputElement).value as BgType;
      stateManager.setState({ bgType });
    });
  });

  if (bgColorPicker) {
    bgColorPicker.addEventListener('input', (e) => {
      const bgColor = (e.target as HTMLInputElement).value;
      stateManager.setState({ bgColor, bgType: 'color' });
    });
  }

  // 7. 필터 셀렉트
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      const currentFilter = (e.target as HTMLSelectElement).value as FilterType;
      stateManager.setState({ currentFilter });
    });
  }

  // 8. 날짜 스탬프 체크박스
  if (dateStampCheckbox) {
    dateStampCheckbox.addEventListener('change', (e) => {
      const showDateStamp = (e.target as HTMLInputElement).checked;
      stateManager.setState({ showDateStamp });
    });
  }

  // 9. 워터마크 입력
  if (watermarkInput) {
    watermarkInput.addEventListener('input', (e) => {
      const watermarkText = (e.target as HTMLInputElement).value;
      stateManager.setState({ watermarkText });
    });
  }

  // 10. 상단 툴바 액션: 셔플
  document.getElementById('btnShuffle')?.addEventListener('click', () => {
    const currentImgs = [...stateManager.getState().images];
    currentImgs.sort(() => Math.random() - 0.5);
    stateManager.setState({ images: currentImgs });
    updateSlots(currentImgs);
  });

  // 11. 상단 툴바 액션: 리셋
  document.getElementById('btnReset')?.addEventListener('click', () => {
    stateManager.reset(true);
    if (gapRange) gapRange.value = '20';
    if (gapVal) gapVal.textContent = '20px';
    if (radiusRange) radiusRange.value = '16';
    if (radiusVal) radiusVal.textContent = '16px';
    if (shadowRange) shadowRange.value = '40';
    if (shadowVal) shadowVal.textContent = '40%';
    if (filterSelect) filterSelect.value = 'none';
    if (dateStampCheckbox) dateStampCheckbox.checked = false;
    if (watermarkInput) watermarkInput.value = '';
  });

  // 12. 상단 툴바 액션: 고화질 다운로드
  document.getElementById('btnDownload')?.addEventListener('click', () => {
    if (canvasLoader) canvasLoader.classList.remove('hidden');
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `PicGrid_${stateManager.getState().currentLayout}_${Date.now()}.png`;
      link.href = engine.exportImage(1.0);
      link.click();
      if (canvasLoader) canvasLoader.classList.add('hidden');
    }, 300);
  });

  // 초기 샘플 이미지 로드
  loadSamples();
}

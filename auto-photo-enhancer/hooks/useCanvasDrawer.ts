import { useCallback, useRef } from 'react';

export const useCanvasDrawer = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  filterRef: React.RefObject<string>
) => {
  const drawLoopRef = useRef<number | null>(null);

  const drawCanvas = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!video || !canvas || !ctx) return;

    let prevTime = -1;
    const drawFrame = () => {
      if (video.paused || video.ended) return;

      const currentTime = video.currentTime;
      if (currentTime !== prevTime) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = filterRef.current || 'none';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        prevTime = currentTime;
      }

      drawLoopRef.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [videoRef, canvasRef, filterRef]);

  const stopDrawing = () => {
    if (drawLoopRef.current) {
      cancelAnimationFrame(drawLoopRef.current);
      drawLoopRef.current = null;
    }
  };

  return { drawCanvas, stopDrawing };
};

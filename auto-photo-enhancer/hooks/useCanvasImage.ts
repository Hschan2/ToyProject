import { useCallback, useRef } from "react";

export const useCanvasImage = (imageSrc: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawImage = useCallback(
    (filter: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx!.filter = filter;
          ctx!.drawImage(img, 0, 0);
        }
      };
    },
    [imageSrc]
  );

  return { canvasRef, drawImage };
};

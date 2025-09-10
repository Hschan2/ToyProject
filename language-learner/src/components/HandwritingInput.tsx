"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Tesseract from 'tesseract.js';

type HandwritingInputProps = {
  onSubmit: (text: string) => void;
};

export type HandwritingInputRef = {
  clearCanvas: () => void;
};

const HandwritingInput = forwardRef<HandwritingInputRef, HandwritingInputProps>(({ onSubmit }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setOcrResult('');
  };

  useImperativeHandle(ref, () => ({
    clearCanvas,
  }));

  const handleRecognize = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRecognizing(true);
    setOcrResult('인식 중...');

    const dataUrl = canvas.toDataURL('image/png');

    try {
      const result = await Tesseract.recognize(dataUrl, 'eng+kor+jpn+chi_sim', {
        logger: m => console.log(m),
      });
      setOcrResult(result.data.text);
      onSubmit(result.data.text);
    } catch (error) {
      console.error(error);
      setOcrResult('인식에 실패했습니다.');
    } finally {
      setIsRecognizing(false);
    }
  };

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        width="500"
        height="200"
        className="w-full border border-gray-400 rounded-md cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div className="mt-2 flex gap-2">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer"
        >
          지우기
        </button>
        <button
          onClick={handleRecognize}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer"
          disabled={isRecognizing}
        >
          {isRecognizing ? '인식 중...' : '제출'}
        </button>
      </div>
      {ocrResult && (
        <div className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-50">
          <p className="text-sm text-gray-500">인식된 텍스트:</p>
          <p className="font-mono">{ocrResult}</p>
        </div>
      )}
    </div>
  );
});

HandwritingInput.displayName = 'HandwritingInput';

export default HandwritingInput;
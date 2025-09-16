"use client";

import { forwardRef, useImperativeHandle } from "react";
import { useCanvas } from "@/hooks/useCanvas";
import { useTesseract } from "@/hooks/useTesseract";

type HandwritingInputProps = {
  onSubmit: (text: string) => void;
};

export type HandwritingInputRef = {
  clearCanvas: () => void;
};

const HandwritingInput = forwardRef<HandwritingInputRef, HandwritingInputProps>(
  ({ onSubmit }, ref) => {
    const { canvasRef, clearCanvas, startDrawing, draw, stopDrawing } =
      useCanvas();
    const { isRecognizing, ocrResult, progress, recognize, resetOcrResult } =
      useTesseract();

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        clearCanvas();
        resetOcrResult();
      },
    }));

    const handleRecognize = async () => {
      const recognizedText = await recognize(canvasRef.current);
      if (recognizedText) {
        onSubmit(recognizedText);
      }
    };

    const handleClear = () => {
      clearCanvas();
      resetOcrResult();
    };

    return (
      <div className="w-full">
        <canvas
          ref={canvasRef}
          width="500"
          height="200"
          className="w-full border border-gray-400 rounded-md cursor-crosshair bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
        {isRecognizing && (
          <div className="w-full mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center text-gray-600 mt-1">
              인식 중... ({progress}%)
            </p>
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer"
            disabled={isRecognizing}
          >
            지우기
          </button>
          <button
            onClick={handleRecognize}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer"
            disabled={isRecognizing}
          >
            {isRecognizing ? "인식 중..." : "제출"}
          </button>
        </div>
        {ocrResult && !isRecognizing && (
          <div className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-50">
            <p className="text-sm text-gray-500">인식된 텍스트:</p>
            <p className="font-mono">{ocrResult}</p>
          </div>
        )}
      </div>
    );
  }
);

HandwritingInput.displayName = "HandwritingInput";

export default HandwritingInput;

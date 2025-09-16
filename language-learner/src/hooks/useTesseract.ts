'use client';

import { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';

export const useTesseract = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const [progress, setProgress] = useState(0);

  const recognize = useCallback(async (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    setIsRecognizing(true);
    setOcrResult('인식 중...');
    setProgress(0);

    const dataUrl = canvas.toDataURL('image/png');

    try {
      const result = await Tesseract.recognize(dataUrl, 'eng+kor+jpn+chi_sim', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
          console.log(m);
        },
      });
      const recognizedText = result.data.text;
      setOcrResult(recognizedText);
      setIsRecognizing(false);
      return recognizedText;
    } catch (error) {
      console.error(error);
      setOcrResult('인식에 실패했습니다.');
      setIsRecognizing(false);
      return null;
    }
  }, []);

  const resetOcrResult = () => {
      setOcrResult('');
  }

  return { isRecognizing, ocrResult, progress, recognize, resetOcrResult };
};

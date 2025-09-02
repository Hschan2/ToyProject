import { generateCssFilter } from "@/utils/generateCssFilter";
import { callOpenRouterAPI } from "@/utils/openRouter";
import { useRef, useState } from "react";
import { useCanvasDrawer } from "./useCanvasDrawer";
import { useMediaRecorder } from "./useMediaRecorder";

export const useVideoFilter = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filterRef = useRef<string>("none");

  const [filter, setFilter] = useState("none");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const { drawCanvas, stopDrawing } = useCanvasDrawer(videoRef, canvasRef, filterRef);
  const {
    recorderRef,
    startRecording,
    stopRecording,
    isConverting,
    errorMessage,
    downloadUrl,
    clearDownloadUrl,
    setErrorMessage
  } = useMediaRecorder(canvasRef, videoRef, stopDrawing);

  const recordWithFilter = async (key: string, newFilter: string) => {
    setSelectedKey(key);
    clearDownloadUrl();

    filterRef.current = newFilter;
    setFilter(newFilter);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.currentTime = 0;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    await video.play();

    await new Promise((resolve) => {
      const check = () => {
        if (video.currentTime > 0) resolve(null);
        else requestAnimationFrame(check);
      };
      check();
    });

    drawCanvas();
    startRecording();

    video.onended = () => stopRecording();

    setTimeout(() => {
      if (recorderRef.current?.state === "recording") {
        console.warn("녹화 타임아웃으로 종료");
        stopRecording();
      }
    }, (video.duration || 3) * 1000 + 500);
  };

  const applyAIStyle = async (brand: string, tone: string, key: string) => {
    setLoadingKey(key);

    try {
      const values = await callOpenRouterAPI(brand, tone);
      const cssFilter = generateCssFilter(values);
      await recordWithFilter(key, cssFilter);
    } catch (err) {
      console.error("AI 필터 API 오류:", err);
      setErrorMessage("AI 필터 적용에 실패했습니다.");
    } finally {
      setLoadingKey(null);
    }
  };

  const applyMoodStyle = async (title: string, tone: string) => {
    setErrorMessage(null);
    await recordWithFilter(title, tone);
  };

  const resetFilter = () => {
    stopDrawing();
    setFilter("none");
    filterRef.current = "none";
    setSelectedKey(null);
    clearDownloadUrl();
    setErrorMessage(null);
  };

  return {
    videoRef,
    canvasRef,
    filter,
    selectedKey,
    loadingKey,
    downloadUrl,
    applyAIStyle,
    applyMoodStyle,
    resetFilter,
    isConverting,
    errorMessage,
  };
};

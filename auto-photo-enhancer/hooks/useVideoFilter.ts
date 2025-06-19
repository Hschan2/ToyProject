import { convertWebMToMP4 } from "@/utils/ffmpegUtils";
import { generateCssFilter } from "@/utils/generateCssFilter";
import { callOpenRouterAPI } from "@/utils/openRouter";
import { useCallback, useRef, useState } from "react";

export const useVideoFilter = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [filter, setFilter] = useState("none");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const drawCanvas = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx) return;

    const drawFrame = () => {
      ctx.filter = filter;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };
    drawFrame();
  }, [filter]);

  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const stream = canvas.captureStream();
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const webmBlob = new Blob(chunksRef.current, { type: "video/webm" });

      try {
        setIsConverting(true);
        const mp4Blob = await convertWebMToMP4(webmBlob);
        const url = URL.createObjectURL(mp4Blob);
        setDownloadUrl(url);
        setErrorMessage(null);
      } catch (err) {
        console.error(err);
        setErrorMessage("MP4 변환에 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setIsConverting(false);
      }
    };

    recorderRef.current = recorder;
    recorder.start();
  };

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const recordWithFilter = async (key: string, newFilter: string) => {
    setSelectedKey(key);
    setFilter(newFilter);
    drawCanvas();
    startRecording();

    await new Promise((res) => setTimeout(res, 3000));
    stopRecording();
  };

  const applyAIStyle = async (brand: string, tone: string, key: string) => {
    setLoadingKey(key);

    try {
      const values = await callOpenRouterAPI(brand, tone);
      const cssFilter = generateCssFilter(values);
      await recordWithFilter(key, cssFilter);
    } catch (err) {
      console.error("AI 필터 API 오류:", err);
    } finally {
      setLoadingKey(null);
    }
  };

  const applyMoodStyle = async (title: string, tone: string) => {
    await recordWithFilter(title, tone);
  };

  const resetFilter = () => {
    setFilter("none");
    setSelectedKey(null);
    setDownloadUrl(null);
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

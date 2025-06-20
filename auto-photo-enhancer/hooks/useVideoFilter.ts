import { generateCssFilter } from "@/utils/generateCssFilter";
import { callOpenRouterAPI } from "@/utils/openRouter";
import { useCallback, useRef, useState } from "react";

export const useVideoFilter = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const drawLoopRef = useRef<number | null>(null);
  const filterRef = useRef<string>("none");

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

    let prevTime = -1;
    const drawFrame = () => {
      if (video.paused || video.ended) return;

      const currentTime = video.currentTime;
      if (currentTime !== prevTime) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = filter;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        prevTime = currentTime;
      }

      drawLoopRef.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [filter]);

  const stopDrawing = () => {
    if (drawLoopRef.current) {
      cancelAnimationFrame(drawLoopRef.current);
      drawLoopRef.current = null;
    }
  };

  const startRecording = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const canvasStream = canvas.captureStream();
    const audioTracks = video.captureStream().getAudioTracks();
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioTracks,
    ]);

    streamRef.current = combinedStream;

    const recorder = new MediaRecorder(combinedStream, {
      mimeType: "video/webm",
    });
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      stopDrawing();
      setIsConverting(true);
      setErrorMessage(null);

      try {
        const webmBlob = new Blob(chunksRef.current, { type: "video/webm" });
        const formData = new FormData();
        formData.append("file", webmBlob, "input.webm");

        const response = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        if (!response) throw new Error("MP4 변환 실패");

        const mp4Blob = await response.blob();

        if (downloadUrl) {
          URL.revokeObjectURL(downloadUrl);
        }

        const url = URL.createObjectURL(mp4Blob);
        setDownloadUrl(url);
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

    const video = videoRef.current;
    if (video && video.srcObject) {
      video.srcObject = null;
    }
  }, []);

  const recordWithFilter = async (key: string, newFilter: string) => {
    setSelectedKey(key);
    setDownloadUrl(null);

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

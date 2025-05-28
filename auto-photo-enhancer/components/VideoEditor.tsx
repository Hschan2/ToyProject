"use client";

import { useRef, useState } from "react";
import { moodStyles, styles } from "@/constants/filterStyles";
import { generateCssFilter } from "@/utils/generateCssFilter";
import { Palette, Sparkle } from "lucide-react";
import { callOpenRouterAPI } from "@/utils/openRouter";

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-gray-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const FilterButton = ({
  label,
  selected,
  loading,
  onClick,
  mood,
}: {
  label: string;
  selected: boolean;
  loading?: boolean;
  onClick: () => void;
  mood: boolean;
}) => {
  const base =
    "flex items-center justify-center w-auto text-sm px-3 py-2 rounded-full";
  const selectedStyle = "bg-black text-white border hover:bg-neutral-700";
  const unselectedStyle = "bg-white text-black border hover:bg-neutral-200";

  return (
    <button
      className={`${base} ${selected ? selectedStyle : unselectedStyle}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {mood === true ? (
            <Palette className="w-4 h-4 mr-1" />
          ) : (
            <Sparkle className="w-4 h-4 mr-1" />
          )}
          {label}
        </>
      )}
    </button>
  );
};

let ffmpegInstance: any = null;

const getFFmpegInstance = async () => {
  if (!ffmpegInstance) {
    const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");
    ffmpegInstance = createFFmpeg({ log: true });
    (ffmpegInstance as any).fetchFile = fetchFile;
  }

  return ffmpegInstance;
};

const VideoEditor = ({ videoSrc }: { videoSrc: string }) => {
  const [filter, setFilter] = useState("none");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [mp4Url, setMp4Url] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasStream = canvas.captureStream();
    const audioTracks = video.captureStream().getAudioTracks();
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioTracks,
    ]);

    mediaRecorderRef.current = new MediaRecorder(combinedStream);
    chunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) =>
      chunksRef.current.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      convertToMp4(blob);
    };

    mediaRecorderRef.current.start();

    const draw = () => {
      ctx.filter = filter;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    };
    draw();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const convertToMp4 = async (webmBlob: Blob) => {
    setConverting(true);
    try {
      const ffmpeg = await getFFmpegInstance();
      if (!ffmpeg.isLoaded()) await ffmpeg.load();
      await ffmpeg.FS(
        "writeFile",
        "input.webm",
        await ffmpeg.fetchFile(webmBlob)
      );

      await ffmpeg.run(
        "-i",
        "input.webm",
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "output.mp4"
      );

      const data = ffmpeg.FS("readFile", "output.mp4");
      const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
      const url = URL.createObjectURL(mp4Blob);
      setMp4Url(url);
    } catch (error) {
      console.error("MP4 변환 오류:", error);
    } finally {
      setConverting(false);
    }
  };

  const handleStyleSelect = async (brand: string, tone: string) => {
    const key = `${brand}-${tone}`;
    setSelectedKey(key);
    setLoadingKey(key);
    setMp4Url(null);

    try {
      const values = await callOpenRouterAPI(brand, tone);
      setFilter(generateCssFilter(values));

      const video = videoRef.current;
      if (!video) return;

      video.currentTime = 0;
      await video.play();

      startRecording();
      await new Promise((resolve) =>
        setTimeout(resolve, video.duration * 1000)
      );
      stopRecording();
    } catch (err) {
      console.error("API 오류:", err);
    } finally {
      setLoadingKey(null);
    }
  };

  const handleMoodStyleClick = (title: string, tone: string) => {
    setSelectedKey(title);
    setFilter(tone);
  };

  const isSelected = (key: string) => selectedKey === key;

  return (
    <div className="flex flex-col items-center mt-6">
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        style={{ filter }}
        className="max-w-[30%] border mb-4 shadow"
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {styles.map(({ brand, tone, title }) => {
          const key = `${brand}-${tone}`;
          return (
            <FilterButton
              key={key}
              label={`AI ${brand} - ${title}`}
              selected={isSelected(key)}
              loading={loadingKey === key}
              onClick={() => handleStyleSelect(brand, tone)}
              mood={false}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {moodStyles.map(({ title, tone }) => (
          <FilterButton
            key={title}
            label={`Default - ${title}`}
            selected={isSelected(title)}
            onClick={() => handleMoodStyleClick(title, generateCssFilter(tone))}
            mood={true}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-3">
        {converting && (
          <span className="text-sm text-gray-500">MP4 변환 중</span>
        )}
        {mp4Url && (
          <a
            href={mp4Url}
            download="filtered-video.mp4"
            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700"
          >
            MP4 다운로드
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;

"use client";

import { useEffect } from "react";
import { moodStyles, styles } from "@/constants/filterStyles";
import { generateCssFilter } from "@/utils/generateCssFilter";
import FilterButton from "./ui/FilterButton";
import { useVideoFilter } from "@/hooks/useVideoFilter";

const VideoEditor = ({ videoSrc }: { videoSrc: string }) => {
  const {
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
  } = useVideoFilter();

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const setCanvasSize = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    if (video.readyState >= 1) {
      setCanvasSize();
    } else {
      video.onloadedmetadata = setCanvasSize;
    }
  }, [videoRef, canvasRef]);

  return (
    <div className="flex flex-col items-center mt-6">
      <video
        ref={videoRef}
        src={videoSrc}
        className="max-w-[30%] border mb-4 shadow"
        crossOrigin="anonymous"
        style={{ filter }}
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {styles.map(({ brand, tone, title }) => {
          const key = `${brand}-${tone}`;
          return (
            <FilterButton
              key={key}
              label={`AI ${brand} - ${title}`}
              selected={selectedKey === key}
              loading={loadingKey === key}
              onClick={() => applyAIStyle(brand, tone, key)}
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
            selected={selectedKey === title}
            onClick={() => applyMoodStyle(title, generateCssFilter(tone))}
            mood={true}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-3">
        <button
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          onClick={resetFilter}
        >
          필터 초기화
        </button>

        {isConverting && (
          <p className="text-sm text-gray-500 animate-pulse">MP4 변환 중...</p>
        )}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="filtered-video.mp4"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            영상 다운로드
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;

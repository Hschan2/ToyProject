"use client";

import ImageEditor from "../components/ImageEditor";
import VideoEditor from "@/components/VideoEditor";
import { useUploader } from "@/hooks/useUploader";
import Uploader from "@/components/Uploader";

export default function Home() {
  const { imageSrc, videoSrc, handleUpload } = useUploader();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">사진/동영상 AI 자동 보정</h1>
      <Uploader onFileSelect={handleUpload} />
      {imageSrc && <ImageEditor imageSrc={imageSrc} />}
      {videoSrc && <VideoEditor videoSrc={videoSrc} />}
    </div>
  );
}

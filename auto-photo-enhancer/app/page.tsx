"use client";

import { useState } from "react";
import ImageEditor from "../components/ImageEditor";
import VideoEditor from "@/components/VideoEditor";

export default function Home() {
  const [imageSrc, setImageSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
    }

    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">사진 AI 자동 보정</h1>
      <label className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer mb-4">
        사진 첨부
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
      {imageSrc && <ImageEditor imageSrc={imageSrc} />}
      {videoSrc && <VideoEditor videoSrc={videoSrc} />}
    </div>
  );
}

import { useRef, useState } from "react";

export function useUploader() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const previousRef = useRef<string | null>(null);

  const handleUpload = (file: File | null) => {
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
      setVideoSrc(null);
    } else if (isVideo) {
      const url = URL.createObjectURL(file);
      if (previousRef.current) URL.revokeObjectURL(previousRef.current);
      previousRef.current = url;
      setVideoSrc(url);
      setImageSrc("");
    }
  };

  return {
    imageSrc,
    videoSrc,
    handleUpload,
  };
}

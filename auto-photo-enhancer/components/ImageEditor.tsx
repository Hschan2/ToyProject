import { EditProps } from "@/types/Edit";
import { useEffect, useRef, useState } from "react";

const ImageEditor = ({ imageSrc }: EditProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filter, setFilter] = useState("");

  const drawImage = (currentFilter: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.filter = currentFilter;
      ctx!.drawImage(img, 0, 0);
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    if (imageSrc) drawImage(filter);
  });

  return (
    <div className="flex flex-col items-center mt-6">
      <canvas
        ref={canvasRef}
        className="border shadow-md mb-4 max-w-[70%] h-auto"
      />

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
          onClick={() => {
            setFilter("brightness(1.2) saturate(1.4)");
            drawImage("brightness(1.2) saturate(1.4)");
          }}
        >
          따뜻하게
        </button>
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer"
          onClick={() => {
            setFilter("brightness(0.9) contrast(1.3)");
            drawImage("brightness(0.9) contrast(1.3)");
          }}
        >
          차갑게
        </button>
        <button
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 cursor-pointer"
          onClick={() => {
            setFilter("saturate(1.8)");
            drawImage("saturate(1.8)");
          }}
        >
          강한 색감
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            setFilter("contrast(1.4)");
            drawImage("contrast(1.4)");
          }}
        >
          고대비
        </button>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          onClick={() => {
            setFilter("none");
            drawImage("none");
          }}
        >
          초기화
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          onClick={handleDownload}
        >
          다운로드
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;

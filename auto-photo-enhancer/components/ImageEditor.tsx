import { useCanvasImage } from "@/hooks/useCanvasImage";
import { EditProps } from "@/types/Edit";
import { useEffect, useState } from "react";
import { FilterButtons } from "./FilterButtons";
import { downloadCanvas } from "@/utils/downloadCanvas";

const filters = [
  {
    label: "따뜻하게",
    value: "brightness(1.2) saturate(1.4)",
  },
  {
    label: "차갑게",
    value: "brightness(0.9) contrast(1.3)",
  },
  {
    label: "강한 색감",
    value: "saturate(1.8)",
  },
  {
    label: "고대비",
    value: "contrast(1.4)",
  },
];

const ImageEditor = ({ imageSrc }: EditProps) => {
  const [filter, setFilter] = useState("none");
  const { canvasRef, drawImage } = useCanvasImage(imageSrc);

  useEffect(() => {
    drawImage(filter);
  }, [drawImage, filter]);

  return (
    <div className="flex flex-col items-center mt-6">
      <canvas
        ref={canvasRef}
        className="border shadow-md mb-4 max-w-[70%] h-auto"
      />

      <FilterButtons
        filters={filters}
        selected={filter}
        onSelect={(value) => setFilter(value)}
      />

      <div className="flex gap-4 justify-center">
        <button
          className="bg-gray-200 border-gray-600 text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          onClick={() => {
            setFilter("none");
          }}
        >
          초기화
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => downloadCanvas(canvasRef.current)}
        >
          다운로드
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;

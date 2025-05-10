import { useCanvasImage } from "@/hooks/useCanvasImage";
import { EditProps } from "@/types/Edit";
import { useEffect, useState } from "react";
import { downloadCanvas } from "@/utils/downloadCanvas";
import { callOpenRouterAPI } from "@/utils/openRouter";
import { moodStyles, styles } from "@/constants/filterStyles";
import { generateCssFilter } from "@/utils/generateCssFilter";

const ImageEditor = ({ imageSrc }: EditProps) => {
  const [filter, setFilter] = useState("none");
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { canvasRef, drawImage } = useCanvasImage(imageSrc);

  useEffect(() => {
    drawImage(filter);
  }, [drawImage, filter]);

  const handleStyleSelect = async (brand: string, tone: string) => {
    const key = `${brand}-${tone}`;
    setLoadingButton(key);
    try {
      const values = await callOpenRouterAPI(brand, tone);
      const cssFilter = generateCssFilter(values);
      setFilter(cssFilter);
    } catch (error) {
      console.error("API 오류:", error);
    } finally {
      setLoadingButton(null);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <canvas
        ref={canvasRef}
        className="border shadow-md mb-4 max-w-[50%] h-auto"
      />

      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {styles.map(({ brand, tone }) => {
          const key = `${brand}-${tone}`;
          const isLoading = loadingButton === key;

          return (
            <button
              key={`${brand}-${tone}`}
              className={`${
                selectedKey === `${brand} - ${tone}`
                  ? "bg-black text-white"
                  : "bg-white text-black border"
              } flex items-center justify-center w-auto text-sm px-3 py-2 rounded-full hover:bg-neutral-200`}
              onClick={() => {
                handleStyleSelect(brand, tone);
                setSelectedKey(`${brand} - ${tone}`);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
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
              ) : (
                `AI ${brand} - ${tone}`
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {moodStyles.map(({ title, tone }) => (
          <button
            key={`${title}-${tone}`}
            className={`${
              selectedKey === `${title}`
                ? "bg-black text-white"
                : "bg-white text-black border"
            } flex items-center justify-center w-auto text-sm px-3 py-2 rounded-full hover:bg-neutral-200`}
            onClick={() => {
              setFilter(generateCssFilter(tone));
              setSelectedKey(title);
            }}
          >
            기본 - {title}
          </button>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          className="bg-gray-200 border-gray-600 text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          onClick={() => {
            setFilter("none");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => downloadCanvas(canvasRef.current)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;

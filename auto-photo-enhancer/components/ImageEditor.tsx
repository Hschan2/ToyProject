import { downloadCanvas } from "@/utils/downloadCanvas";
import { useImageFilter } from "@/hooks/useImageFilter";
import FilterButtonList from "./FilterButtonList";

const ImageEditor = ({ imageSrc }: { imageSrc: string }) => {
  const {
    canvasRef,
    loadingKey,
    selectedKey,
    selectAIStyle,
    selectMoodStyle,
    resetFilter,
  } = useImageFilter(imageSrc);

  return (
    <div className="flex flex-col items-center mt-6">
      <canvas
        ref={canvasRef}
        className="border shadow-md mb-4 max-w-[50%] h-auto"
      />

      <FilterButtonList
        selectedKey={selectedKey}
        loadingKey={loadingKey}
        onSelectAIStyle={(brand, tone, key) => selectAIStyle(brand, tone)}
        onSelectMoodStyle={selectMoodStyle}
      />

      <div className="flex gap-4 justify-center mt-3">
        <button
          className="bg-gray-200 border-gray-600 text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          onClick={resetFilter}
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

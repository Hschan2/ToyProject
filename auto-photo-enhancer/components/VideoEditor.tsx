import { useRef, useState } from "react";
import { moodStyles, styles } from "@/constants/filterStyles";
import { generateCssFilter } from "@/utils/generateCssFilter";
import { Palette, Sparkle } from "lucide-react";
import { callOpenRouterAPI } from "@/utils/openRouter";

const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });

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

const VideoEditor = ({ videoSrc }: { videoSrc: string }) => {
  const [filter, setFilter] = useState("none");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [converting, setConverting] = useState(false);
  const [mp4Url, setMp4Url] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stream = canvas.captureStream();
    let audioTracks: MediaStreamTrack[] = [];
    if (typeof video.captureStream === "function") {
      try {
        const audioStream = video.captureStream();
        audioTracks = audioStream.getAudioTracks();
      } catch (err) {
        console.warn("오디오 스트림 캡처 실패:", err);
      }
    } else {
      console.warn("video.captureStream() 미지원 브라우저입니다.");
    }
    const combinedStream = new MediaStream([
      ...stream.getVideoTracks(),
      ...audioTracks,
    ]);

    mediaRecorderRef.current = new MediaRecorder(combinedStream);

    const chunks: Blob[] = [];
    mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
    };

    mediaRecorderRef.current.start();
    setRecording(true);

    const draw = () => {
      if (!recording) return;
      ctx.filter = filter;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    };

    draw();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleStyleSelect = async (brand: string, tone: string) => {
    const key = `${brand}-${tone}`;
    setSelectedKey(key);
    setLoadingKey(key);
    try {
      const values = await callOpenRouterAPI(brand, tone);
      setFilter(generateCssFilter(values));
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

  const convertToMp4 = async () => {
    if (!recordedUrl) return;
    setConverting(true);
    try {
      if (!ffmpeg.isLoaded()) await ffmpeg.load();

      const webmBlob = await fetch(recordedUrl).then((res) => res.blob());
      ffmpeg.FS("writeFile", "input.webm", await fetchFile(webmBlob));

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
        {!recording ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={startRecording}
          >
            녹화 시작
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={stopRecording}
          >
            녹화 중지
          </button>
        )}

        {recordedUrl && (
          <a
            href={recordedUrl}
            download="filtered-video.webm"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            WebM 다운로드
          </a>
        )}

        {recordedUrl && (
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={convertToMp4}
            disabled={converting}
          >
            {converting ? "MP4 변환 중..." : "MP4로 저장"}
          </button>
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

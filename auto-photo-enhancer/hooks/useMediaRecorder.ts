import { useCallback, useRef, useState } from 'react';

export const useMediaRecorder = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
  onRecordingStop: () => void
) => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startRecording = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const canvasStream = canvas.captureStream();
    const audioTracks = video.captureStream().getAudioTracks();
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioTracks,
    ]);

    streamRef.current = combinedStream;

    const recorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm',
    });
    chunksRef.current = [];

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      onRecordingStop();
      setIsConverting(true);
      setErrorMessage(null);

      try {
        const webmBlob = new Blob(chunksRef.current, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('file', webmBlob, 'input.webm');

        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('MP4 변환 실패');

        const mp4Blob = await response.blob();

        if (downloadUrl) {
          URL.revokeObjectURL(downloadUrl);
        }

        const url = URL.createObjectURL(mp4Blob);
        setDownloadUrl(url);
      } catch (err) {
        console.error(err);
        setErrorMessage('MP4 변환에 실패했습니다. 다시 시도해 주세요.');
      } finally {
        setIsConverting(false);
      }
    };

    recorderRef.current = recorder;
    recorder.start();
  };

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    const video = videoRef.current;
    if (video && video.srcObject) {
      video.srcObject = null;
    }
  }, [videoRef]);
  
  const clearDownloadUrl = () => {
    if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
    }
    setDownloadUrl(null);
  }

  return {
    recorderRef,
    startRecording,
    stopRecording,
    isConverting,
    errorMessage,
    downloadUrl,
    clearDownloadUrl,
    setErrorMessage
  };
};

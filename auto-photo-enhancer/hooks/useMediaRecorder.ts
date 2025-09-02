import { useCallback, useRef, useState } from 'react';
import { convertWebMToMP4 } from '@/utils/api';

export const useMediaRecorder = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>,
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
        const mp4Blob = await convertWebMToMP4(webmBlob);

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

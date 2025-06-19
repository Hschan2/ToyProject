export const convertWebMToMP4 = async (webmBlob: Blob): Promise<Blob> => {
  const formData = new FormData();
  formData.append("file", webmBlob, "input.webm");

  const response = await fetch("/api/convert", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("MP4 변환 실패");

  return await response.blob();
};

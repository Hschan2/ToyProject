export const downloadCanvas = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

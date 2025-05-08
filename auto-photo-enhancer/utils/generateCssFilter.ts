export const generateCssFilter = (values: {
  brightness?: number;
  contrast?: number;
  saturate?: number;
  grayscale?: number;
  sepia?: number;
  invert?: number;
  hueRotate?: number;
  opacity?: number;
  blur?: number;
}) => {
  const {
    brightness = 1,
    contrast = 1,
    saturate = 1,
    grayscale = 0,
    sepia = 0,
    invert = 0,
    hueRotate = 0,
    opacity = 1,
    blur = 0,
  } = values;

  return `
      brightness(${brightness})
      contrast(${contrast})
      saturate(${saturate})
      grayscale(${grayscale})
      sepia(${sepia})
      invert(${invert})
      hue-rotate(${hueRotate}deg)
      opacity(${opacity})
      blur(${blur}px)
    `
    .replace(/\s+/g, " ")
    .trim();
};

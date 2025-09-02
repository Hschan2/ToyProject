import { CssFilter } from "@/types/filter";

export const generateOpenRouterPrompt = (brand: string, tone: string) => {
  const jsonFormat: Record<keyof CssFilter, string> = {
    brightness: "number",
    contrast: "number",
    saturate: "number",
    grayscale: "number",
    sepia: "number",
    invert: "number",
    "hue-rotate": "number",
    opacity: "number",
    blur: "number",
  };

  return `
      You are an expert in image color correction. Referencing the photo styles of pillter_, 5gilsu, and picn2k, I want to create a photo with a ${tone} mood from a ${brand} camera.
      Please return only the filter adjustment values in the following JSON format so they can be used as a CSS filter. Do not include any explanations.

      Example:
      ${JSON.stringify(jsonFormat, null, 2)}
    `;
};

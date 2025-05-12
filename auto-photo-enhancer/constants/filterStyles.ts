export const styles = [
  { brand: "Canon", tone: "따뜻하게", title: "Warm" },
  { brand: "Canon", tone: "차갑게", title: "Cool" },
  { brand: "Canon", tone: "은은하게", title: "Soft" },
  { brand: "Canon", tone: "화사하게", title: "Bright" },
  { brand: "Sony", tone: "따뜻하게", title: "Warm" },
  { brand: "Sony", tone: "차갑게", title: "Cool" },
  { brand: "Sony", tone: "은은하게", title: "Soft" },
  { brand: "Sony", tone: "화사하게", title: "Bright" },
  { brand: "Nikon", tone: "따뜻하게", title: "Warm" },
  { brand: "Nikon", tone: "차갑게", title: "Cool" },
  { brand: "Nikon", tone: "은은하게", title: "Soft" },
  { brand: "Nikon", tone: "화사하게", title: "Bright" },
];

export const moodStyles = [
  {
    title: "Cinematic",
    tone: {
      contrast: 1.4,
      saturation: 0.8,
      brightness: 0.9,
      "hue-rotate": 210,
    },
  },
  {
    title: "Film",
    tone: {
      contrast: 1.1,
      saturation: 1.1,
      "hue-rotate": 35,
      sepia: 0.3,
      grayscale: 0.1,
    },
  },
  {
    title: "Neutral",
    tone: {
      contrast: 1,
      saturation: 1,
    },
  },
  {
    title: "Warm Mood",
    tone: {
      "hue-rotate": 25,
      sepia: 0.2,
      saturation: 1.1,
      brightness: 1.05,
    },
  },
  {
    title: "Cool Mood",
    tone: {
      "hue-rotate": 190,
      saturation: 0.9,
    },
  },
  {
    title: "Vintage",
    tone: {
      contrast: 0.9,
      sepia: 0.5,
      "hue-rotate": 50,
      saturation: 0.8,
      grayscale: 0.15,
    },
  },
  {
    title: "Mono Classic",
    tone: {
      grayscale: 1,
    },
  },
  {
    title: "Minimal Clean",
    tone: {
      brightness: 1.15,
      contrast: 0.95,
      saturation: 0.9,
    },
  },
];

import { Filter, FilterType } from "@/types/filter";

export const FILTERS: Filter[] = [
  // AI Filters
  { type: FilterType.AI, brand: "Canon", tone: "따뜻하게", title: "Warm" },
  { type: FilterType.AI, brand: "Canon", tone: "차갑게", title: "Cool" },
  { type: FilterType.AI, brand: "Canon", tone: "은은하게", title: "Soft" },
  { type: FilterType.AI, brand: "Canon", tone: "화사하게", title: "Bright" },
  { type: FilterType.AI, brand: "Sony", tone: "따뜻하게", title: "Warm" },
  { type: FilterType.AI, brand: "Sony", tone: "차갑게", title: "Cool" },
  { type: FilterType.AI, brand: "Sony", tone: "은은하게", title: "Soft" },
  { type: FilterType.AI, brand: "Sony", tone: "화사하게", title: "Bright" },
  { type: FilterType.AI, brand: "Nikon", tone: "따뜻하게", title: "Warm" },
  { type: FilterType.AI, brand: "Nikon", tone: "차갑게", title: "Cool" },
  { type: FilterType.AI, brand: "Nikon", tone: "은은하게", title: "Soft" },
  { type: FilterType.AI, brand: "Nikon", tone: "화사하게", title: "Bright" },

  // Mood Filters
  {
    type: FilterType.MOOD,
    title: "Cinematic",
    tone: {
      contrast: 1.4,
      saturate: 0.8,
      brightness: 0.9,
      "hue-rotate": 210,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Film",
    tone: {
      contrast: 1.1,
      saturate: 1.1,
      "hue-rotate": 35,
      sepia: 0.3,
      grayscale: 0.1,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Neutral",
    tone: {
      contrast: 1,
      saturate: 1,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Warm Mood",
    tone: {
      "hue-rotate": 25,
      sepia: 0.2,
      saturate: 1.1,
      brightness: 1.05,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Cool Mood",
    tone: {
      "hue-rotate": 190,
      saturate: 0.9,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Vintage",
    tone: {
      contrast: 0.9,
      sepia: 0.5,
      "hue-rotate": 50,
      saturate: 0.8,
      grayscale: 0.15,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Mono Classic",
    tone: {
      grayscale: 1,
    },
  },
  {
    type: FilterType.MOOD,
    title: "Minimal Clean",
    tone: {
      brightness: 1.15,
      contrast: 0.95,
      saturate: 0.9,
    },
  },
];

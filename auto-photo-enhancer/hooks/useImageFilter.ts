import { useEffect, useState } from "react";
import { useCanvasImage } from "./useCanvasImage";
import { callOpenRouterAPI } from "@/utils/api";
import { generateCssFilter } from "@/utils/generateCssFilter";

export const useImageFilter = (imageSrc: string) => {
  const [filter, setFilter] = useState("none");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { canvasRef, drawImage } = useCanvasImage(imageSrc);

  useEffect(() => {
    drawImage(filter);
  }, [filter, drawImage]);

  const selectAIStyle = async (brand: string, tone: string) => {
    const key = `${brand}-${tone}`;
    setSelectedKey(`${brand}-${tone}`);
    setLoadingKey(key);
    try {
      const values = await callOpenRouterAPI(brand, tone);
      setFilter(generateCssFilter(values));
    } catch (error) {
      console.error("API 오류:", error);
    } finally {
      setLoadingKey(null);
    }
  };

  const selectMoodStyle = (title: string, tone: string) => {
    setSelectedKey(title);
    setFilter(tone);
  };

  const resetFilter = () => setFilter("none");

  return {
    canvasRef,
    filter,
    selectedKey,
    loadingKey,
    selectAIStyle,
    selectMoodStyle,
    resetFilter,
  };
};

import { CssFilter } from "@/types/filter";

export const callOpenRouterAPI = async (brand: string, tone: string): Promise<CssFilter> => {
  const response = await fetch("/api/openrouter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brand, tone }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API call failed");
  }

  return await response.json();
};

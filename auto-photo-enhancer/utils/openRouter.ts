export const callOpenRouterAPI = async (brand: string, tone: string) => {
  const response = await fetch("/api/openrouter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brand, tone }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API 호출 실패");
  }

  return await response.json();
};

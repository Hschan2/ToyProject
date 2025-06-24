import { OPENROUTER_API_KEY } from "./env.server";

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text.trim()) return "";

  const prompt = `다음 문장을 ${targetLang}로 번역해 주세요:\n\n"${text}"`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: "system",
              content: "You are a professional subtitle translator.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return "[번역 실패]";
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();

    return result || "[번역 실패]";
  } catch (err) {
    console.error("번역 오류:", err);
    return "[번역 실패]";
  }
}

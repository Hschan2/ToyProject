import { OPENROUTER_API_KEY } from "./env.server";

export async function translateText(text: string): Promise<string> {
  if (!text.trim()) return "";

  const prompt = text;

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
              content:
                "You are a professional subtitle translator. Keep formatting (brackets, punctuation, symbols) and translate only the dialogue.",
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
    return data.choices?.[0]?.message?.content?.trim() || "[번역 실패]";
  } catch (err) {
    console.error("번역 오류:", err);
    return "[번역 실패]";
  }
}

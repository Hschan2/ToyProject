export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const prompt = `다음 문장을 ${targetLang} 언어로 번역해 주세요: \n\n"${text}"`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-7b",
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

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "[번역 실패]";
}

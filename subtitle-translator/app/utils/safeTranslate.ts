import { translateText } from "./translateText";

const MAX_RETRY = 3;

export async function safeTranslate(prompt: string): Promise<string> {
  for (let attempt = 0; attempt < MAX_RETRY; attempt++) {
    const result = await translateText(prompt);
    if (result && !result.includes("[번역 실패]")) return result;
    await new Promise((res) => setTimeout(res, 1000));
  }
  return "[번역 실패]";
}

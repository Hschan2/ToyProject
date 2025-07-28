import { SubtitleItem } from "@/types/subtitle";
import { translateViaPapago, translateViaLingva } from "./translateSubtitles";

/**
 * Papago 실패 시 Lingva로 fallback하는 테스트 전용 함수 (p-limit 제거)
 */
export async function translateSubtitlesForTest(
  parsedSubtitles: SubtitleItem[],
  targetLang: string,
  sourceLang: string
): Promise<SubtitleItem[]> {
  const results: SubtitleItem[] = [];

  for (const item of parsedSubtitles) {
    let translated: string;

    try {
      translated = await translateViaPapago(item.text, sourceLang, targetLang);
    } catch (error) {
      translated = await translateViaLingva(item.text, sourceLang, targetLang);
      console.error(`파파고 번역 실패 뒤 Lingva 번역 시도: ${error}`);
    }

    results.push({
      ...item,
      text: translated,
    });
  }

  return results;
}

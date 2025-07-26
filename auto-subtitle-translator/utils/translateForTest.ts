import { SubtitleItem } from "@/types/subtitle";
import { translateLine } from "./translateSubtitles";

/**
 * p-limit 없이 간단히 순차적으로 처리하는 테스트 전용 함수
 */
export async function translateSubtitlesForTest(
  parsedSubtitles: SubtitleItem[],
  targetLang: string,
  sourceLang: string
): Promise<SubtitleItem[]> {
  const results: SubtitleItem[] = [];

  for (const item of parsedSubtitles) {
    const translated = await translateLine(item.text, sourceLang, targetLang);
    results.push({
      ...item,
      text: translated,
    });
  }

  return results;
}

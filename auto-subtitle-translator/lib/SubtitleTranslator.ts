import { SubtitleItem } from "@/types/subtitle";
import axios from "axios";

export class SubtitleTranslator {
  static async translate(text: string, targetLang: string): Promise<string> {
    const response = await axios.post(
      "https://libretranslate.com/translate",
      {
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
      },
      {
        headers: { accept: "application/json" },
      }
    );

    return response.data.translatedText;
  }

  static async translateSubtitles(
    subtitles: SubtitleItem[],
    targetLang: string
  ): Promise<SubtitleItem[]> {
    const translated: SubtitleItem[] = [];
    for (const item of subtitles) {
      const translatedText = await this.translate(item.text, targetLang);
      translated.push({ ...item, text: translatedText });
      await new Promise((res) => setTimeout(res, 1000));
    }

    return translated;
  }
}

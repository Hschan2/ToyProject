import { SubtitleItem } from "@/types/subtitle";
import axios from "axios";

const API_URL = "https://libretranslate.de/translate";

export class SubtitleTranslator {
  static async translate(text: string, targetLang: string): Promise<string> {
    if (!text || text.trim().length === 0) {
      return text;
    }

    const response = await axios.post(
      API_URL,
      {
        q: text,
        source: "ko",
        target: targetLang,
        format: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

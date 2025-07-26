import axios, { AxiosError } from "axios";
import pLimit from "p-limit";
import { SubtitleItem } from "@/types/subtitle";

const MAX_CONCURRENT = 5;
const limit = pLimit(MAX_CONCURRENT);

const cache = new Map<string, string>();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function translateViaPapago(
  text: string,
  source: string,
  target: string
): Promise<string> {
  try {
    const res = await axios.post(
      "https://papago.naver.com/apis/n2mt/translate",
      {
        deviceId: "web",
        dict: false,
        honorific: false,
        instant: false,
        paging: false,
        source,
        target,
        text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const translated = res.data?.translatedText;
    if (typeof translated === "string" && translated.trim() !== "") {
      return translated;
    }
    throw new Error("Papago empty result");
  } catch (err) {
    throw err;
  }
}

async function translateViaLingva(
  text: string,
  source: string,
  target: string
): Promise<string> {
  try {
    const res = await axios.post(
      "https://translate.plausible.io/api/v1/translate",
      {
        q: text,
        source,
        target,
        format: "text",
      }
    );

    return res.data?.translatedText ?? `[번역 실패] ${text}`;
  } catch (err) {
    return `[번역 실패] ${text}\n [에러] ${err}`;
  }
}

export async function translateLine(
  text: string,
  source: string,
  target: string
): Promise<string> {
  if (!text || text.trim() === "") return text;
  if (cache.has(text)) return cache.get(text)!;

  let translated = "";

  try {
    translated = await translateViaPapago(text, source, target);
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error.response?.status === 429) {
      console.warn("Papago rate limited. Waiting...");
      await sleep(3000);
    }

    console.warn("Papago 실패. Lingva로 fallback:", text);
    translated = await translateViaLingva(text, source, target);
  }

  cache.set(text, translated);
  return translated;
}

export async function translateSubtitles(
  parsedSubtitles: SubtitleItem[],
  targetLang: string,
  sourceLang: string
): Promise<SubtitleItem[]> {
  const tasks = parsedSubtitles.map((item) =>
    limit(async () => {
      const translated = await translateLine(item.text, sourceLang, targetLang);
      return {
        ...item,
        text: translated,
      };
    })
  );

  const results = await Promise.all(tasks);
  return results;
}

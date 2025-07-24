// utils/translatePapagoSingleLine.ts (새 파일로 분리 추천)
import axios from "axios";

// p-limit, cache 사용 X
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function translateViaPapago(
  text: string,
  source: string,
  target: string
): Promise<string> {
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
}

async function translateViaLingva(
  text: string,
  source: string,
  target: string
): Promise<string> {
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
}

export async function translateLineForTest(
  text: string,
  source: string,
  target: string
): Promise<string> {
  try {
    return await translateViaPapago(text, source, target);
  } catch (err) {
    console.warn("Papago 실패, Lingva fallback:", text);
    console.error(err);
    return await translateViaLingva(text, source, target);
  }
}

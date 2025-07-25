// src/utils/translatePapagoSingleLine.ts
import axios from "axios";

// 실제 Papago 호출 함수
export async function translateViaPapago(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const res = await axios.post("https://naveropenapi.fake/papago", {
    text,
    source: sourceLang,
    target: targetLang,
  });

  return res.data.translatedText;
}

// 테스트용 함수
export async function translateLineForTest(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  try {
    return await translateViaPapago(text, sourceLang, targetLang);
  } catch (e) {
    console.warn("Papago 번역 실패:", e);
    return "번역 실패";
  }
}

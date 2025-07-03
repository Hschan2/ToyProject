import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { safeTranslate } from "~/utils/safeTranslate";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const language = formData.get("language") as string;
  const chunkIndex = Number(formData.get("chunkIndex"));
  const startIndex = Number(formData.get("startIndex"));
  const subtitles = JSON.parse(formData.get("subtitles") as string);

  const joined = subtitles
    .map((s: { text: string }, i: number) => `[${i}]: ${s.text}`)
    .join("\n");

  const targetLangName =
    {
      ko: "한국어",
      en: "영어",
      ja: "일본어",
      zh: "중국어",
    }[language] || language;

  const prompt = `다음은 영상 자막입니다. 형식은 유지하고 번역만 ${targetLangName}로 해 주세요:\n\n${joined}`;

  const result = await safeTranslate(prompt);
  const lines = result.split("\n");

  if (lines.length !== subtitles.length) {
    return new Response("번역 줄 수 불일치", { status: 500 });
  }

  const translated: Record<number, string> = {};
  lines.forEach((line: string, i: number) => {
    const realIndex = startIndex + i;
    translated[realIndex] = line.replace(/^\[\d+\]:\s*/, "") || "[번역 실패]";
  });

  return json({ translated });
};

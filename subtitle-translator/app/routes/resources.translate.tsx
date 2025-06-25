import {
  ActionFunctionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { parseSRT, stringifySRT, Subtitle } from "~/utils/parseSRT";
import { translateText } from "~/utils/translateText";
import path from "path";
import { parseSMI, SmiSubtitle, stringifySMI } from "~/utils/parseSMI";

const langNameMap: Record<string, string> = {
  ko: "한국어",
  en: "영어",
  ja: "일본어",
  zh: "중국어",
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response("허용되지 않은 메소드입니다.", { status: 405 });
  }

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 5_000_000,
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const file = formData.get("file") as File;
  const lang = formData.get("language") as string;
  const buffer = await file.arrayBuffer();
  const content = new TextDecoder().decode(buffer);
  const ext = path.extname(file.name).toLowerCase();
  const targetLangName = langNameMap[lang] || lang;

  let output: string;

  if (ext === ".srt") {
    const parsed: Subtitle[] = parseSRT(content);
    const translated: Subtitle[] = [];

    for (const subtitle of parsed) {
      const prompt = `다음은 영상 자막의 한 줄입니다. 괄호, 기호, 효과음 등 자막 형식은 그대로 두고, 안의 텍스트만 ${targetLangName}로 번역해 주세요.\n\n"${subtitle.text}"\n\n출력 (형식 유지, 번역된 문장만 반환):`;

      let result = await translateText(prompt);
      if (!result || result === "[번역 실패]") {
        result = "[번역 실패]";
      }

      translated.push({ ...subtitle, text: result });
      await new Promise((r) => setTimeout(r, 500));
    }

    output = stringifySRT(translated);
  } else if (ext === ".smi") {
    const parsed: SmiSubtitle[] = parseSMI(content);
    const translated: SmiSubtitle[] = [];

    for (const subtitle of parsed) {
      const prompt = `다음은 영상 자막의 한 줄입니다. 괄호, 기호, 효과음 등 자막 형식은 그대로 두고, 안의 텍스트만 ${targetLangName}로 번역해 주세요.\n\n"${subtitle.text}"\n\n출력 (형식 유지, 번역된 문장만 반환):`;

      let result = await translateText(prompt);
      if (!result || result === "[번역 실패]") {
        result = "[번역 실패]";
      }

      translated.push({ ...subtitle, text: result });
      await new Promise((r) => setTimeout(r, 500));
    }

    output = stringifySMI(translated);
  } else {
    return new Response("지원하지 않는 파일 형식입니다.", { status: 400 });
  }

  console.log("최종 번역 결과: \n", output.slice(0, 500));

  const encodedFilename = encodeURIComponent(`translated_${file.name}`);
  return new Response(Buffer.from(output, "utf-8"), {
    status: 200,
    headers: {
      "Content-Type":
        ext === ".srt" ? "text/srt; charset=utf-8" : "text/smi; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}`,
    },
  });
};

// no component needed
export default null;

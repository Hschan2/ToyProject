import {
  ActionFunctionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { parseSRT, stringifySRT, Subtitle } from "~/utils/parseSRT";
import { translateText } from "~/utils/translateText";
import path from "path";
import { parseSMI, SmiSubtitle, stringifySMI } from "~/utils/parseSMI";

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

  let output: string;
  const batchSize = 10;

  if (ext === ".srt") {
    const parsed: Subtitle[] = parseSRT(content);
    const translated: Subtitle[] = [];

    for (let i = 0; i < parsed.length; i += batchSize) {
      const batch = parsed.slice(i, i + batchSize);
      const joined = batch.map((s, j) => `[${j}]: ${s.text}`).join("\n");
      const result = await translateText(joined, lang);
      const lines = result.split("\n");

      for (let j = 0; j < batch.length; j++) {
        const original = batch[j];
        const line = lines[j] || "[번역 실패]";
        const clean = line.replace(/^\[\d+\]:\s*/, "");
        translated.push({ ...original, text: clean });
      }
    }

    output = stringifySRT(translated);
  } else if (ext === ".smi") {
    const parsed: SmiSubtitle[] = parseSMI(content);
    const translated: SmiSubtitle[] = [];

    for (let i = 0; i < parsed.length; i += batchSize) {
      const batch = parsed.slice(i, i + batchSize);
      const joined = batch.map((s, j) => `[${j}]: ${s.text}`).join("\n");
      const result = await translateText(joined, lang);
      const lines = result.split("\n");

      for (let j = 0; j < batch.length; j++) {
        const original = batch[j];
        const line = lines[j] || "[번역 실패]";
        const clean = line.replace(/^\[\d+\]:\s*/, "");
        translated.push({ ...original, text: clean });
      }
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

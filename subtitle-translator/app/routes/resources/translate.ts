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
  if (ext === ".srt") {
    const parsed: Subtitle[] = parseSRT(content);
    const translated: Subtitle[] = await Promise.all(
      parsed.map(async (entry) => ({
        ...entry,
        text: await translateText(entry.text, lang),
      }))
    );
    output = stringifySRT(translated);
  } else if (ext === ".smi") {
    const parsed: SmiSubtitle[] = parseSMI(content);
    const translated: SmiSubtitle[] = await Promise.all(
      parsed.map(async (entry) => ({
        ...entry,
        text: await translateText(entry.text, lang),
      }))
    );
    output = stringifySMI(translated);
  } else {
    return new Response("지원하지 않는 파일 형식입니다.", { status: 400 });
  }

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": ext === ".srt" ? "text/srt" : "text/smi",
      "Content-Disposition": `attachment; filename="translated_${file.name}"`,
    },
  });
};

import {
  ActionFunctionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { parseSRT, stringifySRT, Subtitle } from "~/utils/parseSRT";
import { translateText } from "~/utils/translateText";
import path from "path";
import { parseSMI, SmiSubtitle, stringifySMI } from "~/utils/parseSMI";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { CACHE_DIR } from "~/utils/constants";
import { applyCacheToSubtitles } from "~/utils/applyCacheToSubtitles";

const langNameMap: Record<string, string> = {
  ko: "한국어",
  en: "영어",
  ja: "일본어",
  zh: "중국어",
};

const BATCH_SIZE = 10;
const MAX_RETRY = 3;

async function safeTranslate(prompt: string): Promise<string> {
  for (let attempt = 0; attempt < MAX_RETRY; attempt++) {
    const result = await translateText(prompt);
    if (result && !result.includes("[번역 실패]")) return result;
    await new Promise((res) => setTimeout(res, 1000));
  }
  return "[번역 실패]";
}

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
  const sessionKey = (formData.get("session") as string) || uuidv4();
  const retryFailedOnly = formData.get("retryFailedOnly") === "true";

  const cacheFilePath = path.join(CACHE_DIR, `${sessionKey}_${file.name}.json`);
  await fs.mkdir(CACHE_DIR, { recursive: true });

  let output = "";

  const isSRT = ext === ".srt";
  const isSMI = ext === ".smi";

  if (!isSRT && !isSMI) {
    return new Response("지원하지 않는 파일 형식입니다.", { status: 400 });
  }

  const parsed = isSRT ? parseSRT(content) : parseSMI(content);
  let cache: Record<number, string> = {};

  try {
    const existing = await fs.readFile(cacheFilePath, "utf8").catch(() => "");
    if (existing) cache = JSON.parse(existing);
  } catch (err) {
    console.error(`캐시 에러 ${err}`);
  }

  for (let i = 0; i < parsed.length; i += BATCH_SIZE) {
    const batch = parsed.slice(i, i + BATCH_SIZE);
    const indices = batch.map((_, j) => i + j);

    const toTranslate = indices.filter((idx) => {
      const val = cache[idx];
      return retryFailedOnly ? val === "[번역 실패]" : !val;
    });
    if (toTranslate.length === 0) continue;

    const joined = toTranslate
      .map((idx, j) => `[${j}]: ${parsed[idx].text}`)
      .join("\n");

    const prompt = `다음은 영상 자막의 여러 줄입니다. 괄호, 기호, 효과음 등 자막 형식은 그대로 유지하고, 각 줄의 텍스트만 ${targetLangName}로 번역해 주세요.\n\n예시:\n(晴田真帆･心の声)≪あの人は・\n→\n(하루다 마호 · 마음의 목소리) «그 사람은・\n\n각 줄은 독립적으로 번역해 주세요. 줄 순서를 바꾸지 말고, 포맷을 유지한 채 번역만 반환해 주세요.\n\n${joined}`;

    const result = await safeTranslate(prompt);
    const lines = result.split("\n");
    if (lines.length !== toTranslate.length) {
      return new Response("번역 줄 수가 일치하지 않습니다.", { status: 500 });
    }

    toTranslate.forEach((idx, j) => {
      cache[idx] = lines[j].replace(/^\[\d+\]:\s*/, "") || "[번역 실패]";
    });

    await fs.writeFile(cacheFilePath, JSON.stringify(cache));
  }

  if (isSRT) {
    const updated = applyCacheToSubtitles(parsed as Subtitle[], cache);
    output = stringifySRT(updated);
  } else if (isSMI) {
    const updated = applyCacheToSubtitles(parsed as SmiSubtitle[], cache);
    output = stringifySMI(updated);
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

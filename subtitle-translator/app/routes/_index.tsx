import { type MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { applyCacheToSubtitles } from "~/utils/applyCacheToSubtitles";
import { parseSMI, SmiSubtitle, stringifySMI } from "~/utils/parseSMI";
import { parseSRT, stringifySRT, Subtitle } from "~/utils/parseSRT";

export const meta: MetaFunction = () => {
  return [
    { title: "자막 번역기" },
    { name: "description", content: "자막을 번역해드립니다." },
  ];
};

export default function Index() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [targetLang, setTargetLang] = useState("ko");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file") as File;
    const language = formData.get("language") as string;

    const session = crypto.randomUUID();
    setSessionId(session);
    setFileName(file.name);
    setTargetLang(language);
    setIsTranslating(true);

    const buffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(buffer);
    const ext = file.name.split(".").pop()?.toLowerCase();
    const isSRT = ext === "srt";
    const isSMI = ext === "smi";

    if (!isSRT && !isSMI) {
      alert("지원하지 않는 파일 형식입니다.");
      return;
    }

    const parsed = isSRT ? parseSRT(content) : parseSMI(content);
    const chunkSize = 50;
    const chunkCount = Math.ceil(parsed.length / chunkSize);
    const cache: Record<number, string> = {};

    for (let i = 0; i < chunkCount; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, parsed.length);
      const chunk = parsed.slice(start, end);

      const chunkFormData = new FormData();
      chunkFormData.append("session", session);
      chunkFormData.append("language", language);
      chunkFormData.append("chunkIndex", i.toString());
      chunkFormData.append("startIndex", start.toString());
      chunkFormData.append("subtitles", JSON.stringify(chunk));
      chunkFormData.append("fileName", file.name);

      const res = await fetch("/resources/translate/chunk", {
        method: "POST",
        body: chunkFormData,
      });

      if (!res.ok) {
        alert("❌ 번역 중 문제가 발생했습니다.");
        setIsTranslating(false);
        return;
      }

      const result = await res.json();
      Object.assign(cache, result.translated);
    }

    const finalOutput = isSRT
      ? stringifySRT(
          applyCacheToSubtitles<Subtitle>(parsed as Subtitle[], cache)
        )
      : stringifySMI(
          applyCacheToSubtitles<SmiSubtitle>(parsed as SmiSubtitle[], cache)
        );

    const blob = new Blob([finalOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translated_${file.name}`;
    a.click();
    URL.revokeObjectURL(url);
    setIsTranslating(false);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🎬 자막 번역기</h1>
      <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".srt,.smi" required />
        <select name="language" defaultValue="ko">
          <option value="ko">한국어</option>
          <option value="ja">일본어</option>
          <option value="en">영어</option>
          <option value="zh">중국어</option>
        </select>
        <button type="submit">번역 시작</button>
      </Form>
      {isTranslating && <p>⏳ 번역 중입니다...</p>}
    </main>
  );
}

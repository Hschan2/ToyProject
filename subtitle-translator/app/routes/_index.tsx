import { type MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import TranslateProgressAutoDownload from "~/components/TranslateProgressAutoDownload";

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
    const session = crypto.randomUUID();

    formData.append("session", session);
    setSessionId(session);
    setFileName(file.name);
    setTargetLang(formData.get("language") as string);
    setIsTranslating(true);
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

      {isTranslating && sessionId && fileName && (
        <TranslateProgressAutoDownload
          session={sessionId}
          filename={fileName}
          language={targetLang}
        />
      )}
    </main>
  );
}

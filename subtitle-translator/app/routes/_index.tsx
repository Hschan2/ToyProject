import { type MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "자막 번역기" },
    { name: "description", content: "자막을 번역해드립니다." },
  ];
};

export default function Index() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/resources/translate", {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translated_subtitle.srt";
    a.click();
    URL.revokeObjectURL(url);
    setIsLoading(false);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>자막 번역기</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" accept=".srt,.smi" required />
        <select name="language">
          <option value="ko">한국어</option>
          <option value="ja">일본어</option>
          <option value="zh">중국어</option>
          <option value="en">영어</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "번역 중" : "번역하기"}
        </button>
      </Form>
    </main>
  );
}

"use client";

import { SubtitleFormatter } from "@/lib/SubtitleFormatter";
import { SubtitleParser } from "@/lib/SubtitleParser";
import { SubtitleTranslator } from "@/lib/SubtitleTranslator";
import React, { useState } from "react";
import { saveAs } from "file-saver";

export default function SubtitleUploader() {
  const [language, setLanguage] = useState("kr");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const content = await file.text();
    const isSMI = SubtitleParser.isSMI(content);
    const subtitles = isSMI
      ? SubtitleParser.parseSMI(content)
      : SubtitleParser.parseSRT(content);

    const translated = await SubtitleTranslator.translateSubtitles(
      subtitles,
      language
    );

    const output = isSMI
      ? SubtitleFormatter.toSMI(translated)
      : SubtitleFormatter.toSRT(translated);

    const extension = isSMI ? ".smi" : ".srt";
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `translated_${file.name.replace(/\.[^/.]+$/, extension)}`);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <label className="block mb-2">자막 파일 (.srt) 선택:</label>
      <input type="file" accept=".srt,.smi" onChange={handleFileUpload} />

      <label className="block mt-4 mb-2">번역 언어 선택:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">영어</option>
        <option value="ko">한국어</option>
        <option value="ja">일본어</option>
        <option value="zh">중국어</option>
      </select>

      {loading && <p className="mt-4">번역 중입니다...</p>}
    </div>
  );
}

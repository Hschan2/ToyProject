"use client";

import { SubtitleFormatter } from "@/lib/SubtitleFormatter";
import { SubtitleParser } from "@/lib/SubtitleParser";
import React, { useState } from "react";
import { SubtitleItem } from "@/types/subtitle";
import { detectLang } from "@/utils/DetectLang";
import axios from "axios";
import pLimit from "p-limit";

export default function SubtitleUploader() {
  const [targetLang, setTargetLang] = useState("en");
  const [sourceLang, setSourceLang] = useState("auto");
  const [loading, setLoading] = useState(false);

  const translateText = async (
    text: string,
    target: string,
    source: string
  ) => {
    if (!text || text.trim().length === 0) return text;

    const actualSource = source === "auto" ? detectLang(text) : source;

    try {
      const res = await axios.post("/api/translate", {
        q: text,
        source: actualSource,
        target: target,
        format: "text",
      });

      return res.data.translatedText;
    } catch (error) {
      console.error("Unknown error:", error);
      alert("⚠️ 번역 실패: 일부 자막 문장을 번역할 수 없습니다.");
      return `[번역 실패] ${text}`;
    }
  };

  const translateSubtitles = async (
    parsed: SubtitleItem[],
    targetLang: string,
    sourceLang: string
  ) => {
    const limit = pLimit(3);
    let hasFailure = false;
    const failedLines: string[] = [];

    const translatedSubtitles = await Promise.all(
      parsed.map((item) =>
        limit(async () => {
          const translated = await translateText(
            item.text,
            targetLang,
            sourceLang
          );
          if (translated.startsWith("[번역 실패]")) {
            hasFailure = true;
            failedLines.push(item.text);
          }
          return { ...item, text: translated };
        })
      )
    );

    if (hasFailure) {
      alert(
        `⚠️ ${
          failedLines.length
        }개의 문장이 번역되지 않았습니다.\n예시:\n${failedLines
          .slice(0, 3)
          .join("\n")}`
      );
    }
    return translatedSubtitles;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const content = await file.text();
      const isSMI = SubtitleParser.isSMI(content);
      const parsed = isSMI
        ? SubtitleParser.parseSMI(content)
        : SubtitleParser.parseSRT(content);

      const translated = await translateSubtitles(
        parsed,
        targetLang,
        sourceLang
      );

      const output = isSMI
        ? SubtitleFormatter.toSMI(translated)
        : SubtitleFormatter.toSRT(translated);

      const ext = isSMI ? ".smi" : ".srt";
      const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `translated_${file.name.replace(/\.[^/.]+$/, ext)}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error(error);
      alert("⚠️ 자막 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto bg-white shadow">
      <h2 className="text-xl font-bold mb-4">자막 자동 번역기</h2>

      <label className="block mb-2">자막 파일 (.srt, .smi):</label>
      <input
        type="file"
        accept=".srt,.smi"
        onChange={handleFileUpload}
        className="cursor-pointer"
      />

      <label className="block mt-4 mb-2">원본 언어 선택:</label>
      <select
        value={sourceLang}
        onChange={(e) => setSourceLang(e.target.value)}
        className="border px-2 py-1"
      >
        <option value="auto">자동 감지</option>
        <option value="ko">한국어</option>
        <option value="en">영어</option>
        <option value="ja">일본어</option>
        <option value="zh">중국어</option>
      </select>

      <label className="block mt-4 mb-2">번역 언어 선택:</label>
      <select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="border px-2 py-1"
      >
        <option value="en">영어</option>
        <option value="ko">한국어</option>
        <option value="ja">일본어</option>
        <option value="zh">중국어</option>
      </select>

      {loading && <p className="mt-4 text-blue-600">🔄 번역 중입니다...</p>}
    </div>
  );
}

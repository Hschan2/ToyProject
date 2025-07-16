"use client";

import { SubtitleFormatter } from "@/lib/SubtitleFormatter";
import { SubtitleParser } from "@/lib/SubtitleParser";
import React, { useState } from "react";
import { SubtitleItem } from "@/types/subtitle";
import axios from "axios";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function SubtitleUploader() {
  const [targetLang, setTargetLang] = useState("en");
  const [sourceLang, setSourceLang] = useState("auto");
  const [loading, setLoading] = useState(false);

  const translationCache = new Map<string, string>();

  const translateText = async (
    text: string,
    target: string,
    source: string
  ) => {
    if (!text || text.trim().length === 0) return text;

    // 캐시 hit
    if (translationCache.has(text)) {
      return translationCache.get(text)!;
    }

    try {
      const res = await axios.post("/api/translate", {
        q: text,
        source,
        target,
      });

      const translated = res.data.translatedText;
      translationCache.set(text, translated);
      await delay(800); // 요청 사이 딜레이
      return translated;
    } catch (error) {
      console.error("번역 실패:", error);
      return `[번역 실패] ${text}`;
    }
  };

  const translateSubtitles = async (
    parsed: SubtitleItem[],
    targetLang: string,
    sourceLang: string
  ) => {
    const result: SubtitleItem[] = [];
    let failedCount = 0;

    for (const item of parsed) {
      const translated = await translateText(item.text, targetLang, sourceLang);

      if (translated.startsWith("[번역 실패]")) {
        failedCount++;
      }

      result.push({ ...item, text: translated });
    }

    if (failedCount > 0) {
      alert(`⚠️ ${failedCount}개의 문장이 번역되지 않았습니다.`);
    }

    return result;
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
      alert("파일 처리 중 오류가 발생했습니다.");
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

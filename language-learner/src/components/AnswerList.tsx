"use client";

import React from "react";
import { Result, Meaning, Example } from "@/types/words";

const langCodeMap = {
  english: "en-US",
  japanese: "ja-JP",
  chinese: "zh-CN",
  korean: "ko-KR",
};

const langNameMap = {
  english: "영어",
  japanese: "일본어",
  chinese: "중국어",
  korean: "한국어",
};

type AnswerListProps = {
  results: Result[];
};

export default function AnswerList({ results }: AnswerListProps) {
  const speakWord = (word: string, lang: keyof Meaning) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = langCodeMap[lang] || "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {results.map((result, index) => {
        const foreignLang = result.question.quizLanguage;
        const foreignWord = result.question.wordData.meaning[foreignLang];
        const koreanWord = result.question.wordData.meaning.korean;

        let exampleSentence = "예문을 불러올 수 없습니다.";
        let translationSentence = "해석 정보가 없습니다.";

        if (
          typeof result.question.wordData.example === "object" &&
          result.question.wordData.example !== null
        ) {
          const examples = result.question.wordData.example as Example;
          exampleSentence =
            examples[foreignLang as keyof Example] || examples.english;

          if (examples.korean) {
            translationSentence = examples.korean;
          }
        } else if (typeof result.question.wordData.example === "string") {
          exampleSentence = result.question.wordData.example;
        }

        return (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              result.isCorrect
                ? "border-green-300 bg-green-50"
                : "border-red-300 bg-red-50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold text-lg text-gray-800">
                  {koreanWord} / {foreignWord}
                </p>
              </div>
              <button
                onClick={() => speakWord(foreignWord, foreignLang)}
                className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 text-sm whitespace-nowrap self-start sm:self-center"
              >
                듣기 ({langNameMap[foreignLang]})
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                입력한 답:{" "}
                <span
                  className={
                    result.isCorrect
                      ? "text-green-700 font-semibold"
                      : "text-red-700 font-semibold"
                  }
                >
                  {result.answer}
                </span>
              </p>
              {!result.isCorrect && (
                <p className="text-sm text-gray-500">
                  정답:{" "}
                  <span className="font-semibold text-gray-700">
                    {result.question.correctAnswer}
                  </span>
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500 italic">
                예문 ({langNameMap[foreignLang]}): {exampleSentence}
              </p>
              <p className="mt-1 text-sm text-gray-500 italic">
                해석 (한국어): {translationSentence}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

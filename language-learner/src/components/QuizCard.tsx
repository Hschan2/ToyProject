"use client";

import React from "react";
import { QuizQuestion, Language } from "@/types/words";
import HandwritingInput, {
  HandwritingInputRef,
} from "@/components/HandwritingInput";

type QuizCardProps = {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  handleSubmit: (e: React.FormEvent, recognizedText?: string) => void;
  inputMode: "keyboard" | "handwriting";
  setInputMode: (mode: "keyboard" | "handwriting") => void;
  handwritingInputRef: React.RefObject<HandwritingInputRef | null>;
};

const languageMap: { [key in Language]: string } = {
  english: "영어",
  japanese: "일본어",
  chinese: "중국어",
};

export default function QuizCard({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  userAnswer,
  setUserAnswer,
  handleSubmit,
  inputMode,
  setInputMode,
  handwritingInputRef,
}: QuizCardProps) {
  const isKoreanQuestion =
    currentQuestion.question === currentQuestion.wordData.meaning.korean;
  const languageName = languageMap[currentQuestion.quizLanguage as Language];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-800">
      <div className="w-full max-w-2xl p-6 sm:p-8 bg-white rounded-lg shadow-xl">
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            문제 {currentQuestionIndex + 1} / {totalQuestions}
          </p>
          <div className="mt-2 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-base sm:text-lg font-medium text-gray-600 mb-2">
            {isKoreanQuestion
              ? `제시된 단어의 ${languageName}는 무엇인가요?`
              : "제시된 단어의 한국어 뜻은 무엇인가요?"}
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-indigo-700 break-words">
            {currentQuestion.question}
          </p>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            onClick={() =>
              setInputMode(
                inputMode === "keyboard" ? "handwriting" : "keyboard"
              )
            }
            className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 cursor-pointer"
          >
            {inputMode === "keyboard"
              ? "손글씨로 입력(인식률 낮음)"
              : "키보드로 입력"}
          </button>
        </div>

        {inputMode === "keyboard" ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 border rounded-md shadow-sm text-base sm:text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="정답을 입력하세요..."
              autoFocus
            />
            <button
              type="submit"
              className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-base sm:text-lg font-semibold cursor-pointer"
            >
              제출
            </button>
          </form>
        ) : (
          <HandwritingInput
            ref={handwritingInputRef}
            onSubmit={(text) => {
              setUserAnswer(text);
              const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
              handleSubmit(fakeEvent, text);
            }}
          />
        )}
      </div>
    </div>
  );
}

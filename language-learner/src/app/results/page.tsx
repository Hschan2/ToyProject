"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Updated Types
type Meaning = {
  english: string;
  korean: string;
  japanese: string;
  chinese: string;
};

type Example = {
  english: string;
  japanese: string;
  chinese: string;
  korean?: string;
};

type Word = {
  id: number;
  meaning: Meaning;
  example: Example | string; // Handle both old and new example structures
};

type QuizQuestion = {
  wordData: Word;
  question: string;
  correctAnswer: string;
  quizLanguage: keyof Meaning;
};

type Result = {
  question: QuizQuestion;
  answer: string;
  isCorrect: boolean;
};

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

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("quizResults");
    if (storedResults) {
      const parsedResults: Result[] = JSON.parse(storedResults);
      setResults(parsedResults);
      const correctAnswers = parsedResults.filter((r) => r.isCorrect).length;
      setScore(correctAnswers);
    } else {
      router.push("/");
    }
  }, [router]);

  const handlePlayAgain = () => {
    router.push("/");
  };

  const speakWord = (word: string, lang: keyof Meaning) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = langCodeMap[lang] || "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        결과를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">퀴즈 결과</h1>
          <p className="text-2xl mt-2 text-gray-800">
            총 {results.length}문제 중 {score}개를 맞혔습니다!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {results.map((result, index) => {
            const foreignLang = result.question.quizLanguage;
            const foreignWord = result.question.wordData.meaning[foreignLang];
            const koreanWord = result.question.wordData.meaning.korean;

            let exampleSentence = "예문을 불러올 수 없습니다.";
            let translationSentence = "해석 정보가 없습니다."; // Default fallback message

            if (
              typeof result.question.wordData.example === "object" &&
              result.question.wordData.example !== null
            ) {
              const examples = result.question.wordData.example as any;
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
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {koreanWord} / {foreignWord}
                    </p>
                  </div>
                  <button
                    onClick={() => speakWord(foreignWord, foreignLang)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 text-sm whitespace-nowrap"
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

        <div className="text-center">
          <button
            onClick={handlePlayAgain}
            className="w-full max-w-xs mx-auto bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold"
          >
            다시 풀기
          </button>
        </div>
      </div>
    </div>
  );
}

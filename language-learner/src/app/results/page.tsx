"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Result } from "@/types/words";
import ScoreSummary from "@/components/ScoreSummary";
import AnswerList from "@/components/AnswerList";

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
      // 결과가 없으면 홈 이동
      router.push("/");
    }
  }, [router]);

  const handlePlayAgain = () => {
    router.push("/");
  };

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        결과를 불러오는 중... 또는 퀴즈를 먼저 풀어주세요.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 sm:p-8">
        <ScoreSummary totalQuestions={results.length} correctAnswers={score} />
        <AnswerList results={results} />
        <div className="text-center">
          <button
            onClick={handlePlayAgain}
            className="w-full max-w-xs mx-auto bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-lg font-semibold cursor-pointer"
          >
            다시 풀기
          </button>
        </div>
      </div>
    </div>
  );
}

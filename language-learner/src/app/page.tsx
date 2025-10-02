"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Language, Difficulty, QuizQuestion } from "@/types/words";
import { useQuiz } from "@/hooks/useQuiz";
import HandwritingInput, {
  HandwritingInputRef,
} from "@/components/HandwritingInput";
import LanguageSelector from "@/components/LanguageSelector";
import LevelSelector from "@/components/LevelSelector";
import QuizCard from "@/components/QuizCard";

// --- Component ---
export default function Home() {
  const [quizState, dispatch] = useQuiz();
  const { status, questions, currentQuestionIndex, results } = quizState;

  const [userAnswer, setUserAnswer] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([
    "english",
  ]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("beginner");
  const [inputMode, setInputMode] = useState<"keyboard" | "handwriting">(
    "keyboard"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handwritingInputRef = useRef<HandwritingInputRef>(null);
  const router = useRouter();

  const startQuiz = async () => {
    if (selectedLanguages.length === 0) {
      alert("언어를 하나 이상 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      selectedLanguages.forEach((lang) => params.append("lang", lang));
      params.append("level", selectedDifficulty);

      const response = await fetch(`/api/words?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch words.");
      }

      const generatedQuestions: QuizQuestion[] = await response.json();
      dispatch({ type: "START_QUIZ", payload: generatedQuestions });
    } catch (error) {
      console.error(error);
      alert(
        "퀴즈를 시작하는 중 오류가 발생했습니다. 선택하신 조건에 맞는 단어가 부족할 수 있습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleSubmit = (e: React.FormEvent, recognizedText?: string) => {
    e.preventDefault();
    const answer = recognizedText || userAnswer;
    if (!answer.trim()) return;

    dispatch({ type: "ANSWER_QUESTION", payload: answer });
    setUserAnswer("");
    if (inputMode === "handwriting" && handwritingInputRef.current) {
      handwritingInputRef.current.clearCanvas();
    }
  };

  useEffect(() => {
    if (status === "finished") {
      sessionStorage.setItem("quizResults", JSON.stringify(results));
      router.push("/results");
    }
  }, [status, results, router]);

  if (status === "idle") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-800">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">언어 퀴즈</h1>
          <LanguageSelector
            selectedLanguages={selectedLanguages}
            onLanguageChange={handleLanguageChange}
          />
          <LevelSelector
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
          <button
            onClick={startQuiz}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-base sm:text-lg font-semibold cursor-pointer disabled:bg-indigo-400"
            disabled={isLoading}
          >
            {isLoading ? "퀴즈 생성 중..." : "퀴즈 시작"}
          </button>
        </div>
      </div>
    );
  }

  if (status === "finished") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        퀴즈 결과를 집계 중입니다...
      </div>
    );
  }

  if (status === "active" && questions.length > 0) {
    return (
      <QuizCard
        currentQuestion={questions[currentQuestionIndex]}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        handleSubmit={handleSubmit}
        inputMode={inputMode}
        setInputMode={setInputMode}
        handwritingInputRef={handwritingInputRef}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      퀴즈를 준비 중이거나, 문제가 발생했습니다.
    </div>
  );
}

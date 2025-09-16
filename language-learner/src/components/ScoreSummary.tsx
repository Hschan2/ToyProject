"use client";

import React from "react";

type ScoreSummaryProps = {
  totalQuestions: number;
  correctAnswers: number;
};

export default function ScoreSummary({
  totalQuestions,
  correctAnswers,
}: ScoreSummaryProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700">
        퀴즈 결과
      </h1>
      <p className="text-xl sm:text-2xl mt-2 text-gray-800">
        총 {totalQuestions}문제 중 {correctAnswers}개를 맞혔습니다!
      </p>
    </div>
  );
}

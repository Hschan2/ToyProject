"use client";

import { LEVELS } from "@/lib/constants";
import { Difficulty } from "@/types/words";

type LevelSelectorProps = {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
};

export default function LevelSelector({
  selectedDifficulty,
  onDifficultyChange,
}: LevelSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
        2. 난이도 선택
      </label>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
        {LEVELS.map((level) => (
          <button
            key={level.code}
            onClick={() => onDifficultyChange(level.code)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              selectedDifficulty === level.code
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  );
}

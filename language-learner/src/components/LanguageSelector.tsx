"use client";

import { LANGUAGES } from "@/lib/constants";
import { Language } from "@/types/words";

type LanguageSelectorProps = {
  selectedLanguages: Language[];
  onLanguageChange: (language: Language) => void;
};

export default function LanguageSelector({
  selectedLanguages,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
        1. 언어 선택 (중복 선택 가능)
      </label>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code as Language)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              selectedLanguages.includes(lang.code as Language)
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}

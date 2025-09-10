export type Meaning = {
  english: string;
  korean: string;
  japanese: string;
  chinese: string;
};

export type Example = {
  english: string;
  japanese: string;
  chinese: string;
  korean?: string;
};

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Word = {
  id: number;
  difficulty: Difficulty;
  meaning: Meaning;
  example: Example | string;
};

export type QuizQuestion = {
  wordData: Word;
  question: string;
  correctAnswer: string;
  quizLanguage: keyof Meaning;
};

export type Language = "english" | "japanese" | "chinese";

export type Result = {
  question: QuizQuestion;
  answer: string;
  isCorrect: boolean;
};

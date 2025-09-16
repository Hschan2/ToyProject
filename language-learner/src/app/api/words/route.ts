import { NextResponse } from "next/server";
import wordsData from "@/data/words.json";
import { Word, Meaning } from "@/types/words";

// --- Seeded Shuffle Logic (서버 사이드) ---
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const seededShuffle = <T>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const languages = searchParams.getAll("lang");
  const level = searchParams.get("level");

  if (!languages.length || !level) {
    return NextResponse.json(
      { error: "Language and level are required" },
      { status: 400 }
    );
  }

  const typedWordsData: Word[] = wordsData as Word[];

  // 선택된 난이도에 맞는 단어 필터링
  const filteredWords = typedWordsData.filter(
    (word) => word.difficulty === level
  );

  // 날짜를 기반으로 시드 생성 (매일 같은 문제 세트 제공)
  const today = new Date();
  const dateSeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  // 시드 기반으로 단어 섞기
  const dailyShuffledWords = seededShuffle(filteredWords, dateSeed);

  const questions = [];
  let wordIndex = 0;

  // 20개의 유효한 질문을 찾을 때까지 반복
  while (questions.length < 20 && wordIndex < dailyShuffledWords.length) {
    const word = dailyShuffledWords[wordIndex];
    wordIndex++;

    // 단어에 대해 사용자가 선택한 언어 중 유효한(뜻이 비어있지 않은) 언어 목록 필터링
    const availableLanguages = languages.filter(
      (lang) => word.meaning[lang as keyof Meaning]
    );

    // 유효한 언어가 없거나, 한국어 뜻이 없으면 해당 단어는 건너뛰기
    if (availableLanguages.length === 0 || !word.meaning.korean) {
      continue;
    }

    // 유효한 언어 중 하나를 랜덤으로 선택
    const langIndex = Math.floor(
      seededRandom(dateSeed + word.id) * availableLanguages.length
    );
    const foreignLanguage = availableLanguages[langIndex];

    const koreanMeaning = word.meaning.korean;
    const foreignMeaning = word.meaning[foreignLanguage as keyof Meaning];

    // 문제 유형 결정 (뜻 -> 단어 or 단어 -> 뜻)
    const isForeignQuestion: boolean =
      seededRandom(dateSeed + word.id + questions.length) > 0.5;

    questions.push({
      wordData: word,
      question: isForeignQuestion ? foreignMeaning : koreanMeaning,
      correctAnswer: isForeignQuestion ? koreanMeaning : foreignMeaning,
      quizLanguage: foreignLanguage,
    });
  }

  // 유효한 질문이 20개 미만일 경우 에러 응답
  if (questions.length < 20) {
    return NextResponse.json(
      { error: "퀴즈를 풀기 위한 충분한 단어가 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(questions);
}

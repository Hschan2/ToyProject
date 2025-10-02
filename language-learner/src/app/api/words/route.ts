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
  const TOTAL_QUESTIONS = 20;

  if (!languages.length || !level) {
    return NextResponse.json(
      { error: "Language and level are required" },
      { status: 400 }
    );
  }

  const typedWordsData: Word[] = wordsData as Word[];

  // 1. 난이도에 맞는 단어 필터링
  const filteredWords = typedWordsData.filter(
    (word) => word.difficulty === level
  );

  // 2. 날짜 기반 시드로 단어 목록을 매일 동일하게 섞기
  const today = new Date();
  const dateSeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const dailyShuffledWords = seededShuffle(filteredWords, dateSeed);

  // 3. 문제 유형 비율 고정 (단어->뜻 10개, 뜻->단어 10개)
  const questionTypes = Array(TOTAL_QUESTIONS / 2)
    .fill(true)
    .concat(Array(TOTAL_QUESTIONS / 2).fill(false));
  const shuffledQuestionTypes = seededShuffle(questionTypes, dateSeed + 1); // 다른 시드 사용

  // 4. 언어별 문제 수 균등 분배
  const questionsPerLang = Math.floor(TOTAL_QUESTIONS / languages.length);
  const remainder = TOTAL_QUESTIONS % languages.length;
  
  const langDistribution = languages.map((lang, index) => ({
    lang,
    count: questionsPerLang + (index < remainder ? 1 : 0),
  }));

  let allQuestions = [];
  let usedWordIds = new Set();

  for (const dist of langDistribution) {
    const { lang, count } = dist;
    const langSpecificQuestions = [];
    
    // 해당 언어의 뜻이 있는 단어만 필터링
    const availableWordsForLang = dailyShuffledWords.filter(word => 
        word.meaning[lang as keyof Meaning] && !usedWordIds.has(word.id)
    );

    for (let i = 0; i < count && i < availableWordsForLang.length; i++) {
      const word = availableWordsForLang[i];
      usedWordIds.add(word.id); // 중복 사용 방지

      const koreanMeaning = word.meaning.korean;
      const foreignMeaning = word.meaning[lang as keyof Meaning];
      
      if (!koreanMeaning || !foreignMeaning) continue;

      // 미리 섞어둔 문제 유형 배열에서 하나씩 꺼내 사용
      const isForeignQuestion = shuffledQuestionTypes.pop() ?? false;

      langSpecificQuestions.push({
        wordData: word,
        question: isForeignQuestion ? foreignMeaning : koreanMeaning,
        correctAnswer: isForeignQuestion ? koreanMeaning : foreignMeaning,
        quizLanguage: lang,
      });
    }
    allQuestions.push(...langSpecificQuestions);
  }

  // 5. 최종 문제 목록이 20개가 안되면 에러 처리
  if (allQuestions.length < TOTAL_QUESTIONS) {
    return NextResponse.json(
      { error: "퀴즈를 만들기에 단어 수가 부족합니다. 다른 난이도나 언어를 선택해주세요." },
      { status: 404 }
    );
  }

  // 6. 최종 문제 목록을 다시 섞어서 언어가 섞여서 나오도록 함
  const finalShuffledQuestions = seededShuffle(allQuestions, dateSeed + 2);

  return NextResponse.json(finalShuffledQuestions);
}

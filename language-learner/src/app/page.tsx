'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import wordsData from '@/data/words.json';
import {
  Word,
  QuizQuestion,
  Language,
  Difficulty,
  Meaning,
} from '@/types/words';
import HandwritingInput, { HandwritingInputRef } from '@/components/HandwritingInput';

// --- Seeded Shuffle Logic ---
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const seededShuffle = <T,>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Component ---
export default function Home() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState<
    Array<{ question: QuizQuestion; answer: string; isCorrect: boolean }>
  >([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([
    'english',
  ]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>('beginner');
  const [inputMode, setInputMode] = useState<'keyboard' | 'handwriting'>(
    'keyboard'
  );
  const handwritingInputRef = useRef<HandwritingInputRef>(null);
  const router = useRouter();

  const startQuiz = () => {
    if (selectedLanguages.length === 0) {
      alert('Please select at least one language.');
      return;
    }

    const homeLanguage: keyof Meaning = 'korean';
    const totalQuestions = 20;

    const words: Word[] = wordsData as Word[];
    const wordsOfSelectedDifficulty = words.filter(
      (word) => word.difficulty === selectedDifficulty
    );

    if (wordsOfSelectedDifficulty.length < totalQuestions) {
      alert('선택하신 난이도에 해당하는 단어가 부족하여 퀴즈를 시작할 수 없습니다.');
      return;
    }

    const today = new Date();
    const dateSeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();

    const dailyShuffledWords = seededShuffle(
      wordsOfSelectedDifficulty,
      dateSeed
    );
    const selectedWords = dailyShuffledWords.slice(0, totalQuestions);

    const questionsPerLanguage = Math.floor(
      totalQuestions / selectedLanguages.length
    );
    const remainder = totalQuestions % selectedLanguages.length;

    const questionLanguages: Language[] = [];
    selectedLanguages.forEach((lang, index) => {
      const count = questionsPerLanguage + (index < remainder ? 1 : 0);
      for (let i = 0; i < count; i++) {
        questionLanguages.push(lang);
      }
    });

    const shuffledQuestionLanguages = seededShuffle(
      questionLanguages,
      dateSeed + 1
    ); // Use a different seed

    const generatedQuestions = selectedWords.map(
      (word, index): QuizQuestion => {
        const foreignLanguage = shuffledQuestionLanguages[index];
        const questionTypeSeed = dateSeed + word.id;
        const isForeignQuestion = seededRandom(questionTypeSeed) > 0.5;

        if (isForeignQuestion) {
          return {
            wordData: word,
            question: word.meaning[foreignLanguage],
            correctAnswer: word.meaning[homeLanguage],
            quizLanguage: foreignLanguage,
          };
        } else {
          return {
            wordData: word,
            question: word.meaning[homeLanguage],
            correctAnswer: word.meaning[foreignLanguage],
            quizLanguage: foreignLanguage,
          };
        }
      }
    );

    setQuizQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setResults([]);
    setQuizStarted(true);
    setQuizFinished(false);
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

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect =
      answer.trim().toLowerCase() ===
      currentQuestion.correctAnswer.toLowerCase();

    const newResults = [
      ...results,
      { question: currentQuestion, answer: answer, isCorrect },
    ];
    setResults(newResults);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      if (inputMode === 'handwriting' && handwritingInputRef.current) {
        handwritingInputRef.current.clearCanvas();
      }
    } else {
      setQuizFinished(true);
    }
  };

  useEffect(() => {
    if (quizFinished) {
      sessionStorage.setItem('quizResults', JSON.stringify(results));
      router.push('/results');
    }
  }, [quizFinished, results, router]);

  if (!quizStarted) {
    return (
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-800'>
        <div className='w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-4'>언어 퀴즈</h1>

          <div className='mb-6'>
            <label className='block text-base sm:text-lg font-medium text-gray-700 mb-2'>
              1. 언어 선택 (중복 선택 가능)
            </label>
            <div className='flex flex-col sm:flex-row sm:justify-center gap-2'>
              {(['english', 'japanese', 'chinese'] as Language[]).map(
                (lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      selectedLanguages.includes(lang)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <div className='mb-8'>
            <label className='block text-base sm:text-lg font-medium text-gray-700 mb-2'>
              2. 난이도 선택
            </label>
            <div className='flex flex-col sm:flex-row sm:justify-center gap-2'>
              {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(
                (level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      selectedDifficulty === level
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            onClick={startQuiz}
            className='w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-base sm:text-lg font-semibold cursor-pointer'
          >
            퀴즈 시작
          </button>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        선택하신 난이도에 해당하는 단어가 부족하여 퀴즈를 시작할 수 없습니다.
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isKoreanQuestion =
    currentQuestion.question === currentQuestion.wordData.meaning.korean;

  const languageMap: { [key in Language]: string } = {
    english: '영어',
    japanese: '일본어',
    chinese: '중국어',
  };

  const languageName = languageMap[currentQuestion.quizLanguage as Language];

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-800'>
      <div className='w-full max-w-2xl p-6 sm:p-8 bg-white rounded-lg shadow-xl'>
        <div className='mb-6'>
          <p className='text-sm text-gray-500'>
            문제 {currentQuestionIndex + 1} / {quizQuestions.length}
          </p>
          <div className='mt-2 bg-gray-200 rounded-full h-2.5'>
            <div
              className='bg-indigo-600 h-2.5 rounded-full'
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / quizQuestions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className='text-center mb-8'>
          <p className='text-base sm:text-lg font-medium text-gray-600 mb-2'>
            {isKoreanQuestion
              ? `제시된 단어의 ${languageName}는 무엇인가요?`
              : '제시된 단어의 한국어 뜻은 무엇인가요?'}
          </p>
          <p className='text-3xl sm:text-4xl font-bold text-indigo-700 break-words'>
            {currentQuestion.question}
          </p>
        </div>

        <div className='mb-4 flex justify-end'>
          <button
            onClick={() =>
              setInputMode(inputMode === 'keyboard' ? 'handwriting' : 'keyboard')
            }
            className='px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 cursor-pointer'
          >
            {inputMode === 'keyboard' ? '손글씨로 입력(인식률 낮음)' : '키보드로 입력'}
          </button>
        </div>

        {inputMode === 'keyboard' ? (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className='w-full p-4 border rounded-md shadow-sm text-base sm:text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='정답을 입력하세요...'
              autoFocus
            />
            <button
              type='submit'
              className='w-full mt-4 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-base sm:text-lg font-semibold cursor-pointer'
            >
              제출
            </button>
          </form>
        ) : (
          <HandwritingInput
            ref={handwritingInputRef}
            onSubmit={(text) => {
              setUserAnswer(text);
              // handleSubmit expects a form event, so we create a synthetic one.
              const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
              handleSubmit(fakeEvent, text);
            }}
          />
        )}
      </div>
    </div>
  );
}

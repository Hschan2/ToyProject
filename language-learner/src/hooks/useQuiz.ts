'use client';

import { useReducer } from 'react';
import { QuizQuestion, Result } from '@/types/words';

// 1. 상태(State) 타입 정의
type QuizState = {
  status: 'idle' | 'active' | 'finished';
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  results: Result[];
};

// 2. 액션(Action) 타입 정의
type QuizAction = 
  | { type: 'START_QUIZ'; payload: QuizQuestion[] }
  | { type: 'ANSWER_QUESTION'; payload: string }
  | { type: 'RESTART_QUIZ' };

// 3. 초기 상태 정의
const initialState: QuizState = {
  status: 'idle',
  questions: [],
  currentQuestionIndex: 0,
  results: [],
};

// 4. 리듀서(Reducer) 함수 정의
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        status: 'active',
        questions: action.payload,
      };
    case 'ANSWER_QUESTION': {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = action.payload.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      
      const newResults = [
        ...state.results,
        { question: currentQuestion, answer: action.payload, isCorrect },
      ];

      const isQuizFinished = state.currentQuestionIndex === state.questions.length - 1;

      return {
        ...state,
        results: newResults,
        currentQuestionIndex: isQuizFinished ? state.currentQuestionIndex : state.currentQuestionIndex + 1,
        status: isQuizFinished ? 'finished' : 'active',
      };
    }
    case 'RESTART_QUIZ':
      return initialState;
    default:
      return state;
  }
}

// 5. 커스텀 훅(Custom Hook) 생성
export function useQuiz() {
  return useReducer(quizReducer, initialState);
}

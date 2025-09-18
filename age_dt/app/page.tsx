"use client";
import { FormEvent, useState } from "react";
import { NumberType, StringType } from "./constants/types";
import { differenceInDays, intervalToDuration, isValid } from "date-fns";
import AgeInputForm from "./components/AgeInputForm";
import AgeDisplay from "./components/AgeDisplay";

const AGE_PERIODS = [
  {
    maxDays: 4745,
    message: "이제는 초등학생에서 중학생으로 새로운 시작을 하는 당신을 응원합니다.",
  },
  {
    maxDays: 6935,
    message: "어엿한 성인이 되신 걸 축하합니다. 꿈을 향해 나아갈 당신을 응원합니다.",
  },
  {
    maxDays: 10585,
    message: "곧 20대를 벗어나 새로운 시작을 하시네요. 너무 걱정하지 마세요.",
  },
  {
    maxDays: 14235,
    message: "30대가 되어보시니 어떠신가요? 그래도 당신은 아직 젊으니 즐겁게 살아보아요.",
  },
  {
    maxDays: Infinity,
    message: "이제는 어른이 되어 책임감을 가진 채 살아갈 당신을 응원합니다. 행복하세요.",
  },
];

const calculateElapsed = (days: number): StringType => {
  if (days < 0) {
    return "미래에서 오셨군요! 날짜를 다시 확인해주세요.";
  }

  const period = AGE_PERIODS.find((p) => days <= p.maxDays);

  if (period) {
    return `${days}일을 사셨어요.\n${period.message}`;
  }

  return "얼마나 살아오셨는지 확인할 수 없어요.";
};

export default function Home() {
  const [elapsed, setElapsed] = useState<{
    days: NumberType;
    months: NumberType;
    years: NumberType;
  }>({
    days: undefined,
    months: undefined,
    years: undefined,
  });
  const [message, setMessage] = useState<StringType>("");
  const [errorMessage, setErrorMessage] = useState<StringType>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const formDataEntries = Object.fromEntries(formData) as Record<
      string,
      string
    >;
    const { day, month, year } = formDataEntries;

    // Reset states on new submission
    setElapsed({ days: undefined, months: undefined, years: undefined });
    setMessage("");

    if (!day || !month || !year) {
      setErrorMessage("년, 월, 일을 모두 입력해주세요.");
      return;
    }

    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setErrorMessage("숫자만 입력해 주세요.");
      return;
    }

    const inputDate = new Date(yearNum, monthNum - 1, dayNum);
    if (
      !isValid(inputDate) ||
      inputDate.getFullYear() !== yearNum ||
      inputDate.getMonth() !== monthNum - 1 ||
      inputDate.getDate() !== dayNum
    ) {
      setErrorMessage("유효하지 않은 날짜입니다.");
      return;
    }

    const currentDate = new Date();
    if (inputDate > currentDate) {
      setErrorMessage("미래 날짜는 계산할 수 없습니다.");
      return;
    }

    // If all checks pass, clear error message
    setErrorMessage("");

    const duration = intervalToDuration({ start: inputDate, end: currentDate });
    const allDays = differenceInDays(currentDate, inputDate);

    setElapsed({
      years: duration.years,
      months: duration.months,
      days: duration.days,
    });
    setMessage(calculateElapsed(allDays));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-96 rounded-xl bg-white p-8">
        <AgeInputForm handleSubmit={handleSubmit} />

        <AgeDisplay
          years={elapsed.years}
          months={elapsed.months}
          days={elapsed.days}
        />

        {errorMessage && (
          <div className="relative">
            <hr className="my-8 w-full border-b-gray-400" />
            <p className="text-xl text-red-500">{errorMessage}</p>
          </div>
        )}

        {message && (
          <div className="relative">
            <hr className="my-8 w-full border-b-gray-400" />
            <p className="text-xs whitespace-pre-line">{message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
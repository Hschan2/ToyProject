"use client"
import Head from "next/head";
import { FormEvent, useState } from "react";

export default function Home() {
  const [elapsed, setElapsed] = useState<{
    days: number | undefined,
    months: number | undefined,
    years: number | undefined,
  }>({
    days: undefined,
    months: undefined,
    years: undefined,
  })
  const [allDay, setAllDay] = useState<number | undefined>(0)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const formDataEntries = Object.fromEntries(formData) as Record<string, string>;
    const { day, month, year } = formDataEntries;
    const inputDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();

    const timeDiff: number = currentDate.getTime() - inputDate.getTime();
    const elapsedYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const remainingTime = timeDiff % (1000 * 60 * 60 * 24 * 365);

    const elapsedMonths = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 30));
    const remainingDays = Math.floor((remainingTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    
    const allDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    setElapsed({
      years: elapsedYears,
      months: elapsedMonths,
      days: remainingDays,
    });
    setAllDay(allDays)
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/public/images/icons8-age-office-16.png" />
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
        <div className='w-96 rounded-xl bg-white p-8'>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className='flex flex-col gap-1'>
                <label className="text-xs" htmlFor="year">년</label>
                <input
                  className="w-16 border border-gray-400 px-3 py-2 rounded-lg"
                  placeholder='1900'
                  id='year'
                  name='year'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className="text-xs" htmlFor="month">월</label>
                <input
                  className="w-16 border border-gray-400 px-3 py-2 rounded-lg"
                  placeholder='1'
                  id='month'
                  name='month'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className="text-xs" htmlFor="day">일</label>
                <input
                  className="w-16 border border-gray-400 px-3 py-2 rounded-lg"
                  placeholder='1'
                  id='day'
                  name='day'
                />
              </div>
            </div>

            <div className="relative">
              <hr className="my-8 w-full border-b-gray-400" />
              <button className="absolute -top-5 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-green-500" type="submit">
                <img className="h-8 w-8" src="https://www.freeiconspng.com/uploads/white-down-arrow-png-2.png" loading="lazy" />
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <span className="text-4xl font-bold text-green-500">
                {elapsed.years ? elapsed.years : "- -"}
              </span>
              <span className="text-4xl font-bold">년</span>
            </div>
            <div className="flex gap-2">
              <span className="text-4xl font-bold text-green-500">
                {elapsed.months ? elapsed.months : "- -"}
              </span>
              <span className="text-4xl font-bold">월</span>
            </div>
            <div className="flex gap-2">
              <span className="text-4xl font-bold text-green-500">
                {elapsed.days ? elapsed.days : "- -"}
              </span>
              <span className="text-4xl font-bold">일</span>
            </div>
          </div>

          {allDay ? (
            <div className="relative">
              <hr className="my-8 w-full border-b-gray-400" />
              <p className="text-xs">{allDay}</p>
            </div>
          ) : ''}
        </div>
      </main>
    </>
  )
}

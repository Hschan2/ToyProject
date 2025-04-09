import React, { useEffect, useRef } from "react";
import { ContractProps } from "../types/contract-type";

function MoneyLending({ date, onRenderComplete }: ContractProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      onRenderComplete();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center bg-gray-50 p-6"
    >
      <header className="w-full max-w-4xl p-6 text-center font-bold text-2xl">
        금전대차 계약서
      </header>

      <main className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4 text-sm">
          {/* 대여인 정보 */}
          <div>
            <label>대여인 (채권자) 성명 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
          </div>
          <div>
            <label>주소 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-64"
            />
          </div>
          <div>
            <label>연락처 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
          </div>

          {/* 차용인 정보 */}
          <div>
            <label>차용인 (채무자) 성명 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
          </div>
          <div>
            <label>주소 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-64"
            />
          </div>
          <div>
            <label>연락처 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
          </div>

          {/* 차용 금액 */}
          <div>
            <label>차용 금액 (원) :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-32"
            />
          </div>

          {/* 이자 및 변제 방법 */}
          <div>
            <label>이자율 (%):</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-16"
            />
          </div>
          <div>
            <label>이자 지급일 :</label>
            <input type="date" className="border-b-1 border-b px-2 py-1 ml-2" />
          </div>
          <div>
            <label>원금 상환 기한 :</label>
            <input type="date" className="border-b-1 border-b px-2 py-1 ml-2" />
          </div>

          {/* 특약사항 */}
          <div>
            <label>특약사항 :</label>
            <textarea className="border rounded px-2 py-1 w-full h-20"></textarea>
          </div>

          {/* 서명란 */}
          <div className="flex justify-between">
            <div>
              <label>대여인 서명 :</label>
              <input
                type="text"
                className="border-b-1 border-b px-2 py-1 ml-2 w-48"
              />
            </div>
            <div>
              <label>차용인 서명 :</label>
              <input
                type="text"
                className="border-b-1 border-b px-2 py-1 ml-2 w-48"
              />
            </div>
          </div>
        </form>
      </main>

      <div className="text-center mt-6">
        <p>
          날짜: {date.year}년 {date.month}월 {date.day}일
        </p>
      </div>
    </div>
  );
}

export default MoneyLending;

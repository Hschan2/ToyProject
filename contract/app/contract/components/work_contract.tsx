import React, { useEffect, useRef } from "react";
import { ContractProps } from "../types/contract-type";

function WorkContract({ date, onRenderComplete }: ContractProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      onRenderComplete?.();
    }
  }, []);

  return (
    <div
      id="contract-root"
      ref={containerRef}
      className="flex-grow w-full max-w-4xl bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-center text-lg font-bold mb-4">표준근로 계약서</h2>
      <main className="space-y-4 text-sm">
        <div>
          <label>1. 근로계약기간 :</label>
          <input
            type="text"
            className="border-b-1 border-b-black px-2 py-1 ml-2 w-20"
            placeholder="0년"
          />
          <input
            type="text"
            className="border-b-1 border-b-black px-2 py-1 ml-2 w-12"
            placeholder="0월"
          />
          <input
            type="text"
            className="border-b-1 border-b-black px-2 py-1 ml-2 w-12"
            placeholder="0일"
          />
        </div>
        <div>
          <label>2. 근무장소 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-96"
          />
        </div>
        <div>
          <label>3. 업무의 내용 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-96"
          />
        </div>
        <div>
          <label>4. 소정근로시간 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-12"
            placeholder="0시"
          />
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-12"
            placeholder="0분"
          />
          <span className="ml-2">부터</span>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-12"
            placeholder="0시"
          />
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-12"
            placeholder="0분"
          />
          <span className="ml-2">까지</span>
        </div>
        <div>
          <label>5. 휴게시간 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-12"
            placeholder="0시"
          />
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-12"
            placeholder="0분"
          />
        </div>
        <div>
          <label>6. 임 금 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-32"
            placeholder="0원"
          />
        </div>
        <div>
          <label>7. 지급방법 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-96"
          />
        </div>
        <div>
          <label>8. 연차유급휴가 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-96"
          />
        </div>
        <div>
          <label>9. 기타 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-96"
          />
        </div>

        {/* 날짜 */}
        <div className="text-center mt-6">
          <p>
            날짜: {date.year}년 {date.month}월 {date.day}일
          </p>
        </div>

        {/* 사인 */}
        <div className="flex justify-between">
          <div>
            <label>(갑) 사업체명 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
            <span className="ml-4">(서명)</span>
          </div>
          <div>
            <label>(을) 성 명 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
            <span className="ml-4">(서명)</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WorkContract;

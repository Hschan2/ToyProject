import React from "react";
import { ContractProps } from "../types/contract-type";

function LongAgreement({ date }: ContractProps) {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-6">
      <h2 className="text-center text-lg font-bold mb-4">차용증</h2>

      <main className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {/* 채권자 정보 */}
        <div>
          <label>채권자 성명 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-48"
          />
        </div>
        <div>
          <label>주민등록번호 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            placeholder="000000-0000000"
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

        {/* 채무자 정보 */}
        <div>
          <label>채무자 성명 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-48"
          />
        </div>
        <div>
          <label>주민등록번호 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            placeholder="000000-0000000"
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

        {/* 차용금액 및 조건 */}
        <div>
          <label>차용금액 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-32"
            placeholder="₩0"
          />
        </div>
        <div>
          <label>이자율 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-20"
            placeholder="0%"
          />
        </div>
        <div>
          <label>변제기한 :</label>
          <input
            type="text"
            className="border-b-1 border-b px-2 py-1 ml-2 w-16"
            placeholder="0년"
          />
          <input
            type="text"
            className="border-b-1 border-bd px-2 py-1 ml-2 w-16"
            placeholder="0월"
          />
        </div>

        {/* 서명란 */}
        <div className="flex justify-between">
          <div>
            <label>채권자 서명 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
          </div>
          <div>
            <label>채무자 서명 :</label>
            <input
              type="text"
              className="border-b-1 border-b px-2 py-1 ml-2 w-48"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p>
            날짜: {date.year}년 {date.month}월 {date.day}일
          </p>
        </div>
      </main>
    </div>
  );
}

export default LongAgreement;

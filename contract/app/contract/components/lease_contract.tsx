import { DateProps } from "@/app/types/date_type";
import React, { useState } from "react";

function LeaseContract({ date }: DateProps) {
  const [leaseType, setLeaseType] = useState(""); // 전세 or 월세 선택

  return (
    <div className="max-w-3xl mx-auto p-10 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-center mb-6">
        부동산 임대차 계약서
      </h2>

      {/* 전세/월세 선택 */}
      <div className="mb-6">
        <label className="font-semibold">계약 유형:</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="leaseType"
              value="전세"
              className="form-radio"
              checked={leaseType === "전세"}
              onChange={() => setLeaseType("전세")}
            />
            전세
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="leaseType"
              value="월세"
              className="form-radio"
              checked={leaseType === "월세"}
              onChange={() => setLeaseType("월세")}
            />
            월세
          </label>
        </div>
      </div>

      {/* 부동산 정보 */}
      <section className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">1. 부동산의 표시</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border p-2 bg-gray-100 w-1/4">소재지</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">토지 지목</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">면적</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">건물 구조</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 계약 내용 */}
      <section className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">2. 계약 내용</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border p-2 bg-gray-100 w-1/4">전세금</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">월세금</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">계약기간</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">지불일</td>
              <td className="border p-2">
                <input type="date" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 특약사항 */}
      <section className="border border-gray-300 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">3. 특약사항</h3>
        <textarea
          className="w-full border p-2 rounded-md h-24"
          placeholder="특약사항을 입력하세요."
        ></textarea>
      </section>

      {/* 계약자 정보 */}
      <section className="border border-gray-300 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">계약자 정보</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border p-2 bg-gray-100 w-1/4">임대인 성명</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">임대인 주소</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">임차인 성명</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 bg-gray-100">임차인 주소</td>
              <td className="border p-2">
                <input type="text" className="w-full border p-2 rounded-md" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 날짜 */}
      <div className="text-center mt-6">
        <p>
          날짜: {date.year}년 {date.month}월 {date.day}일
        </p>
      </div>
    </div>
  );
}

export default LeaseContract;

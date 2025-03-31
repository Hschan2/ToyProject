import { DateProps } from "@/app/types/date_type";
import React from "react";

function NonDisclosureAgreement({ date }: DateProps) {
  return (
    <div>
      <h2 className="text-center text-lg font-bold mb-4">비밀유지협약서</h2>
      <form className="space-y-4 text-sm">
        <div>
          <label>1. 계약 당사자 :</label>
          <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
        </div>
        {/* 내용 추가 */}
        {/* 날짜 */}
        <div className="text-center py-3">
          <label>날짜 :</label>
          <span className=" rounded px-1 py-1 ml-1 w-12">{date.year}년</span>
          <span className=" rounded px-1 py-1 ml-1 w-12">{date.month}월</span>
          <span className=" rounded px-1 py-1 ml-1 w-12">{date.day}일</span>
        </div>
      </form>
    </div>
  );
}

export default NonDisclosureAgreement;

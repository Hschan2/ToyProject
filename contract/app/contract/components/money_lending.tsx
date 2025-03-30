import React from "react";

function MoneyLending() {
  return (
    <div>
      <h2 className="text-center text-lg font-bold mb-4">금전대차 계약서</h2>
      <form className="space-y-4 text-sm">
        <div>
          <label>1. 대여금 :</label>
          <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
        </div>
        <div>
          <label>2. 상환 기한 :</label>
          <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
        </div>
        {/* 내용 추가 */}
      </form>
    </div>
  );
}

export default MoneyLending;

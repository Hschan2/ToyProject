import React from "react";

function LongAgreement() {
  return (
    <div>
      <h2 className="text-center text-lg font-bold mb-4">차용증</h2>
      <form className="space-y-4 text-sm">
        <div>
          <label>1. 채권자 :</label>
          <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
        </div>
        <div>
          <label>2. 채무자 :</label>
          <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
        </div>
        {/* 내용 추가 */}
      </form>
    </div>
  );
}

export default LongAgreement;

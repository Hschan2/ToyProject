import React from "react";

function NonDisclosureAgreement() {
  return (
    <div>
      <h2 className="text-center text-lg font-bold mb-4">비밀유지협약서</h2>
      <form className="space-y-4 text-sm">
        <div>
          <label>1. 계약 당사자 :</label>
          <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
        </div>
        {/* 내용 추가 */}
      </form>
    </div>
  );
}

export default NonDisclosureAgreement;

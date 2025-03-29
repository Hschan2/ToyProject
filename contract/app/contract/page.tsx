"use client";

import { useState } from "react";

function ContractPage() {
  const [selectedTab, setSelectedTab] = useState("근로계약서");
  const tabs = [
    "기본계약서",
    "근로계약서",
    "차용증",
    "임대차계약서",
    "금전대차",
    "비밀유지협약서",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <header className="w-full max-w-4xl p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">안전의증서</h1>
        <button className="text-gray-600 hover:underline">로그인</button>
      </header>

      {/* Tabs */}
      <nav className="w-full max-w-4xl border-b mb-6">
        <div className="flex gap-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                selectedTab === tab
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Contract Form */}
      <main className="flex-grow w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-lg font-bold mb-4">표준근로 계약서</h2>
        <form className="space-y-4 text-sm">
          <div>
            <label>1. 근로계약기간 :</label>
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-20"
              placeholder="년"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="월"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="일"
            />
          </div>
          <div>
            <label>2. 근무장소 :</label>
            <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
          </div>
          <div>
            <label>3. 업무의 내용 :</label>
            <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
          </div>
          <div>
            <label>4. 소정근로시간 :</label>
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="시"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="분"
            />
            <span className="ml-2">부터</span>
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="시"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="분"
            />
            <span className="ml-2">까지</span>
          </div>
          <div>
            <label>5. 휴게시간 :</label>
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="시"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="분"
            />
          </div>
          <div>
            <label>6. 임 금 :</label>
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-32"
              placeholder="원"
            />
          </div>
          <div>
            <label>7. 지급방법 :</label>
            <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
          </div>
          <div>
            <label>8. 연차유급휴가 :</label>
            <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
          </div>
          <div>
            <label>9. 기타 :</label>
            <input type="text" className="border rounded px-2 py-1 ml-2 w-96" />
          </div>

          {/* Date */}
          <div className="text-center">
            <label>날짜 :</label>
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="년"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="월"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 ml-2 w-12"
              placeholder="일"
            />
          </div>

          {/* Signatures */}
          <div className="flex justify-between">
            <div>
              <label>(갑) 사업체명 :</label>
              <input
                type="text"
                className="border rounded px-2 py-1 ml-2 w-48"
              />
              <span className="ml-4">(서명)</span>
            </div>
            <div>
              <label>(을) 성 명 :</label>
              <input
                type="text"
                className="border rounded px-2 py-1 ml-2 w-48"
              />
              <span className="ml-4">(서명)</span>
            </div>
          </div>
        </form>
      </main>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg">
          📄 PDF로 내보내기
        </button>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          📝 한글로 내보내기
        </button>
        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg">
          📂 워드로 내보내기
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm mt-auto py-4">
        Copyright © 홍성찬. All rights reserved.
      </footer>
    </div>
  );
}

export default ContractPage;

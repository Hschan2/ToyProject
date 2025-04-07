"use client";

import { ReactNode } from "react";

const tabs = [
  "기본계약서",
  "근로계약서",
  "차용증",
  "임대차계약서",
  "금전대차",
  "비밀유지협약서",
] as const;

type ContractType = (typeof tabs)[number];

interface LayoutProps {
  children: ReactNode;
  selectedTab: ContractType;
  setSelectedTab: (tab: ContractType) => void;
  onExportPDF: () => void;
  onExportWord: () => void;
}

const Layout = ({
  children,
  selectedTab,
  setSelectedTab,
  onExportPDF,
  onExportWord,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* 로고(+ 로그인) */}
      <header className="w-full max-w-4xl p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold select-none">안전의증서</h1>
        <button className="text-gray-600 cursor-pointer hover:underline">
          로그인
        </button>
      </header>

      {/* 메뉴 */}
      <nav className="w-full max-w-4xl border-b border-gray-200 mb-6">
        <div className="flex gap-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 cursor-pointer ${
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

      {/* 계약서 내용 */}
      <main className="flex-grow w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {children}
      </main>

      {/* 내보내기 버튼 */}
      <div className="mt-6 my-6 flex gap-4">
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg cursor-pointer"
          onClick={onExportPDF}
        >
          📄 PDF로 내보내기
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer"
          onClick={onExportWord}
        >
          📂 워드로 내보내기
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm mt-auto py-4">
        Copyright © 홍성찬. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;

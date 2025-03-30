"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/contract");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-32 h-32 mx-auto my-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-xl font-semibold my-4">
          모든 계약 사항에 있어서 책임은 본인에게 있습니다.
        </p>
        <p className="mb-6 text-lg">
          확인하셨다면, 아래의 버튼을 눌러 작성 페이지로 이동하세요.
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer text-lg"
          onClick={handleConfirm}
        >
          확인했습니다.
        </button>
      </div>
    </div>
  );
}

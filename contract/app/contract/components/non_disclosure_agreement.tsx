import { DateProps } from "@/app/types/date_type";
import React, { useState } from "react";

function NonDisclosureAgreement({ date }: DateProps) {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    company: "",
    address: "",
    contractDate: "",
    signer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="contract-root" className="flex flex-col items-center bg-gray-100 p-6">
      <header className="w-full max-w-4xl p-6 text-center font-bold text-2xl">
        비밀유지계약서
      </header>

      <main className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4 text-sm">
          <p>아래와 같이 비밀유지 계약을 체결합니다.</p>

          <div>
            <label className="block font-semibold">주소:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">성명:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">주민등록번호:</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">소속:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <section className="border-t pt-4">
            <p>
              본인은, 회사의 기밀을 보호하기 위해 아래 사항을 준수할 것을
              서약합니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>비밀 정보를 제3자에게 제공하지 않으며, 보안을 유지할 것</li>
              <li>회사의 승인 없이 내부 정보를 무단 사용하지 않을 것</li>
              <li>계약 종료 후에도 기밀 유지 의무를 지속할 것</li>
            </ul>
          </section>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <label className="block font-semibold">계약 날짜:</label>
              <input
                type="date"
                name="contractDate"
                value={formData.contractDate}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">서명자:</label>
              <input
                type="text"
                name="signer"
                value={formData.signer}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>

          <div className="text-center pt-6">
            <p className="text-sm">서명:</p>
            <input
              type="text"
              className="border-b border-black w-48 text-center"
              placeholder="서명 입력"
            />
          </div>
        </form>
      </main>

      <div className="text-center mt-6">
        <p>
          날짜: {date.year}년 {date.month}월 {date.day}일
        </p>
      </div>
    </div>
  );
}

export default NonDisclosureAgreement;

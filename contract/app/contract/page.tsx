"use client";

import { useRef, useState } from "react";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import Layout from "../components/layout";
import WorkContract from "./components/work_contract";
import LongAgreement from "./components/long_agreement";
import LeaseContract from "./components/lease_contract";
import MoneyLending from "./components/money_lending";
import NonDisclosureAgreement from "./components/non_disclosure_agreement";
import useTodayDate from "../hooks/useTodayDate";

type ContractType =
  | "근로계약서"
  | "차용증"
  | "임대차계약서"
  | "금전대차"
  | "비밀유지협약서";

function ContractPage() {
  const [selectedTab, setSelectedTab] = useState<ContractType>("근로계약서");
  const printRef = useRef<HTMLDivElement>(null);
  const today = useTodayDate();

  const removePlaceholder = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.removeAttribute("placeholder");
    });
  };

  const replaceEmptyInputsWithSpan = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        const span = document.createElement("span");
        span.className = input.className;
        span.textContent = "";
        input.parentNode?.replaceChild(span, input);
      }
    });
  };

  const exportAsTextPDF = async () => {
    if (!printRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;

    await new Promise((resolve) => setTimeout(resolve, 100));

    removePlaceholder();
    replaceEmptyInputsWithSpan();

    html2pdf()
      .set({
        margin: 0,
        filename: `${selectedTab}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(printRef.current)
      .save()
      .catch((error: any) => console.error(`PDF 생성 오류: ${error}`));
  };

  const exportAsWord = () => {
    const element = document.querySelector("#contract-root");
    if (!element) return;

    removePlaceholder();
    replaceEmptyInputsWithSpan();

    const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body>${element.innerHTML}</body>
    </html>
  `;

    const converted = htmlDocx.asBlob(html);
    saveAs(converted, `${selectedTab}.docx`);
  };

  const renderContract = () => {
    switch (selectedTab) {
      case "근로계약서":
        return <WorkContract date={today} />;
      case "차용증":
        return <LongAgreement date={today} />;
      case "임대차계약서":
        return <LeaseContract date={today} />;
      case "금전대차":
        return <MoneyLending date={today} />;
      case "비밀유지협약서":
        return <NonDisclosureAgreement date={today} />;
    }
  };

  return (
    <Layout
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      onExportPDF={exportAsTextPDF}
      onExportWord={exportAsWord}
    >
      <div id="contract-root" ref={printRef} className="flex justify-center">
        {renderContract() || <span>계약서 내용을 불러오는 중입니다.</span>}
      </div>
    </Layout>
  );
}

export default ContractPage;

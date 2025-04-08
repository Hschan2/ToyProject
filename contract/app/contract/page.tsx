"use client";

import { useState } from "react";
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
  | "기본계약서"
  | "근로계약서"
  | "차용증"
  | "임대차계약서"
  | "금전대차"
  | "비밀유지협약서";

function ContractPage() {
  const [selectedTab, setSelectedTab] = useState<ContractType>("근로계약서");
  const [isRendered, setIsRendered] = useState(false);
  const today = useTodayDate();

  const exportAsTextPDF = async () => {
    const element = document.querySelector("#contract-root");
    if (!element) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: 1,
      filename: `${selectedTab}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const exportAsWord = () => {
    const element = document.querySelector("#contract-root");
    if (!element) return;

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

  const handleExportPDF = () => {
    if (!isRendered) {
      alert("계약서 로딩이 아직 완료되지 않았습니다.");
      return;
    }
    exportAsTextPDF();
  };

  const handleExportWord = () => {
    if (!isRendered) {
      alert("계약서 로딩이 아직 완료되지 않았습니다.");
      return;
    }
    exportAsWord();
  };

  const handleTabChange = (tab: ContractType) => {
    setSelectedTab(tab);
    setIsRendered(false);
  };

  const renderContract = () => {
    switch (selectedTab) {
      case "근로계약서":
        return (
          <WorkContract
            date={today}
            onRenderComplete={() => setIsRendered(true)}
          />
        );
      case "차용증":
        return (
          <LongAgreement
            date={today}
            onRenderComplete={() => setIsRendered(true)}
          />
        );
      case "임대차계약서":
        return (
          <LeaseContract
            date={today}
            onRenderComplete={() => setIsRendered(true)}
          />
        );
      case "금전대차":
        return (
          <MoneyLending
            date={today}
            onRenderComplete={() => setIsRendered(true)}
          />
        );
      case "비밀유지협약서":
        return (
          <NonDisclosureAgreement
            date={today}
            onRenderComplete={() => setIsRendered(true)}
          />
        );
      default:
        return <div className="text-center">계약서를 선택하세요.</div>;
    }
  };

  return (
    <Layout
      selectedTab={selectedTab}
      setSelectedTab={handleTabChange}
      onExportPDF={handleExportPDF}
      onExportWord={handleExportWord}
    >
      {renderContract()}
    </Layout>
  );
}

export default ContractPage;

"use client";

import { useState } from "react";
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
  const today = useTodayDate();

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
      default:
        return <div className="text-center">계약서를 선택하세요.</div>;
    }
  };

  return (
    <Layout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      {renderContract()}
    </Layout>
  );
}

export default ContractPage;

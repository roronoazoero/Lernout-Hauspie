import React, { useState } from "react";

import BottomNavigation from "../components/BottomNavigation";
import MortgageCalculator from "../components/MortgageCalculator";
import MortgageResults from "../components/MortgageResults";
import MortgageChat from "../components/MortgageChat";
import MortgageApplicationForm from "../components/MortgageApplicationForm";
import ApplicationSummary from "../components/ApplicationSummary";
import UploadDocuments from "../components/UploadDocuments";
import ApplicationSuccess from "../components/ApplicationSuccess";
import ApplicationStatus from "../components/ApplicationStatus";
import EditDetails from "../components/EditDetails";

import {
  MortgageInputs,
  MortgageResults as CalcResults,
  calculateMortgage,
} from "../lib/mortgage";

type ActiveTab = "calculator" | "chat" | "documents" | "profile";
type CalculatorView = "input" | "results";
type ChatView =
  | "choice"       // MortgageChat splash (your two buttons)
  | "application"  // MortgageApplicationForm
  | "summary"
  | "documents"
  | "success"
  | "status"
  | "edit";

export default function Index() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("calculator");
  const [calculatorView, setCalculatorView] = useState<CalculatorView>("input");
  const [chatView, setChatView] = useState<ChatView>("choice");
  const [results, setResults] = useState<CalcResults | null>(null);

  // --- Calculator handlers ---
  const handleCalculate = (inputs: MortgageInputs) => {
    const r = calculateMortgage(inputs);
    setResults(r);
    setCalculatorView("results");
  };

  const handleRecalculate = () => {
    setCalculatorView("input");
  };

  const handleStartApplication = () => {
    // from Results → go to Chat tab (MortgageChat renders the splash with two choices)
    setActiveTab("chat");
    setChatView("choice");
  };

  // --- Chat flow handlers (everything after you land in the Chat tab) ---
  const handleFillApplication = () => setChatView("application");
  const backToCalculator = () => {
    setActiveTab("calculator");
    setChatView("choice");
  };
  const backToChatSplash = () => setChatView("choice");

  const handleApplicationSubmit = (_data: any) => setChatView("summary");
  const handleSummaryBack = () => setChatView("application");
  const handleSummarySubmit = () => setChatView("documents");
  const handleSummaryEdit = (_section: string) => setChatView("edit");

  const handleDocsBack = () => setChatView("summary");
  const handleDocsSubmit = () => setChatView("success");

  const handleSuccessBack = () => setChatView("documents");
  const handleCheckStatus = () => setChatView("status");

  const handleStatusBack = () => setChatView("success");
  const handleEditApplication = () => setChatView("edit");
  const handleEditBack = () => setChatView("status");
  const handleEditSave = (_data: any) => setChatView("status");

  // --- Screen renderers by tab ---
  const renderCalculator = () => {
    if (calculatorView === "results" && results) {
      return (
        <MortgageResults
          results={results}
          onBack={handleRecalculate}
          onRecalculate={handleRecalculate}
          onStartApplication={handleStartApplication}
        />
      );
    }
    return <MortgageCalculator onCalculate={handleCalculate} />;
  };

  const renderChat = () => {
    // post‑splash flows
    if (chatView === "application") {
      return (
        <MortgageApplicationForm
          onBack={backToChatSplash}
          onSubmit={handleApplicationSubmit}
        />
      );
    }
    if (chatView === "summary") {
      return (
        <ApplicationSummary
          onBack={handleSummaryBack}
          onSubmit={handleSummarySubmit}
          onEdit={handleSummaryEdit}
        />
      );
    }
    if (chatView === "documents") {
      return (
        <UploadDocuments onBack={handleDocsBack} onSubmit={handleDocsSubmit} />
      );
    }
    if (chatView === "success") {
      return (
        <ApplicationSuccess
          onBack={handleSuccessBack}
          onCheckStatus={handleCheckStatus}
        />
      );
    }
    if (chatView === "status") {
      return (
        <ApplicationStatus
          onBack={handleStatusBack}
          onEditApplication={handleEditApplication}
        />
      );
    }
    if (chatView === "edit") {
      return <EditDetails onBack={handleEditBack} onSave={handleEditSave} />;
    }

    // splash + chat (Start Application Chat lives inside MortgageChat and
    // toggles its internal chatStarted state—no extra props needed)
    return (
      <MortgageChat
        mortgageResults={results}
        onFillApplication={handleFillApplication}
        onBack={backToCalculator}
      />
    );
  };

  const renderDocuments = () => (
    <UploadDocuments onBack={() => setActiveTab("calculator")} onSubmit={() => alert("Documents submitted")} />
  );

  const renderProfile = () => (
    <ApplicationStatus onBack={() => setActiveTab("calculator")} onEditApplication={() => setChatView("edit")} />
  );

  const renderActive = () => {
    switch (activeTab) {
      case "calculator":
        return renderCalculator();
      case "chat":
        return renderChat();
      case "documents":
        return renderDocuments();
      case "profile":
        return renderProfile();
      default:
        return renderCalculator();
    }
  };

  return (
    <div className="flex h-screen w-full max-w-[390px] mx-auto flex-col bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto">{renderActive()}</div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

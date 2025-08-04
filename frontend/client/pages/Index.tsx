import React, { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import MortgageCalculator from "../components/MortgageCalculator";
import MortgageResults from "../components/MortgageResults";
import BankSelection from "../components/BankSelection";
import MortgageChat from "../components/MortgageChat";
import MortgageApplicationForm from "../components/MortgageApplicationForm";
import ApplicationSummary from "../components/ApplicationSummary";
import UploadDocuments from "../components/UploadDocuments";
import ApplicationSuccess from "../components/ApplicationSuccess";
import ApplicationStatus from "../components/ApplicationStatus";
import EditDetails from "../components/EditDetails";
import {
  MortgageInputs,
  MortgageResults as ResultsType,
  calculateMortgage,
} from "../lib/mortgage";

type CalculatorView = "input" | "results";
type ActiveTab = "chat" | "calculator" | "documents" | "profile";
type ChatView =
  | "choice"
  | "chat"
  | "application"
  | "summary"
  | "documents"
  | "success"
  | "status"
  | "edit";

export default function Index() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("calculator");
  const [calculatorView, setCalculatorView] = useState<CalculatorView>("input");
  const [chatView, setChatView] = useState<ChatView>("choice");
  const [mortgageResults, setMortgageResults] = useState<ResultsType | null>(
    null,
  );

  // Chat screen component
  const ChatScreen = () => {
    const handleFillApplication = () => {
      setChatView("application");
    };

    const handleBackToCalculator = () => {
      setActiveTab("calculator");
      setChatView("choice");
    };

    const handleBackToChat = () => {
      setChatView("choice");
    };

    const handleApplicationSubmit = (data: any) => {
      console.log("Application submitted:", data);
      // Move to summary screen after form submission
      setChatView("summary");
    };

    const handleSummarySubmit = () => {
      console.log("Moving to documents upload");
      setChatView("documents");
    };

    const handleSummaryEdit = (section: string) => {
      console.log("Edit section:", section);
      // Navigate to edit details screen
      setChatView("edit");
    };

    const handleDocumentsSubmit = () => {
      console.log("Documents submitted successfully!");
      setChatView("success");
    };

    const handleDocumentsBack = () => {
      setChatView("summary");
    };

    const handleSuccessBack = () => {
      setChatView("documents");
    };

    const handleCheckStatus = () => {
      console.log("Check status clicked");
      setChatView("status");
    };

    const handleStatusBack = () => {
      setChatView("success");
    };

    const handleEditApplication = () => {
      setChatView("edit");
    };

    const handleEditBack = () => {
      setChatView("status");
    };

    const handleEditSave = (data: any) => {
      console.log("Edit details saved:", data);
      setChatView("status");
    };

    const handleSummaryBack = () => {
      setChatView("application");
    };

    // Show edit details screen if in edit view
    if (chatView === "edit") {
      return <EditDetails onBack={handleEditBack} onSave={handleEditSave} />;
    }

    // Show application status screen if in status view
    if (chatView === "status") {
      return (
        <ApplicationStatus
          onBack={handleStatusBack}
          onEditApplication={handleEditApplication}
        />
      );
    }

    // Show success screen if in success view
    if (chatView === "success") {
      return (
        <ApplicationSuccess
          onBack={handleSuccessBack}
          onCheckStatus={handleCheckStatus}
        />
      );
    }

    // Show upload documents if in documents view
    if (chatView === "documents") {
      return (
        <UploadDocuments
          onBack={handleDocumentsBack}
          onSubmit={handleDocumentsSubmit}
        />
      );
    }

    // Show application summary if in summary view
    if (chatView === "summary") {
      return (
        <ApplicationSummary
          onBack={handleSummaryBack}
          onSubmit={handleSummarySubmit}
          onEdit={handleSummaryEdit}
        />
      );
    }

    // Show application form if in application view
    if (chatView === "application") {
      return (
        <MortgageApplicationForm
          onBack={handleBackToChat}
          onSubmit={handleApplicationSubmit}
        />
      );
    }

    // Show chat interface
    return (
      <MortgageChat
        mortgageResults={mortgageResults}
        onFillApplication={handleFillApplication}
        onBack={handleBackToCalculator}
      />
    );
  };

  // Documents screen
  const DocumentsScreen = () => {
    const handleDocumentsBack = () => {
      setActiveTab("calculator");
    };

    const handleDocumentsSubmit = () => {
      console.log("Documents submitted from Documents tab");
      alert("Documents submitted successfully!");
    };

    return (
      <UploadDocuments
        onBack={handleDocumentsBack}
        onSubmit={handleDocumentsSubmit}
      />
    );
  };

  // Profile screen with bank selection
  const ProfileScreen = () => {
    const handleBankSelect = (bankId: string) => {
      console.log("Selected bank:", bankId);
      // TODO: Implement bank authentication flow
      alert(`Connecting to ${bankId}...`);
    };

    const handleCancel = () => {
      console.log("Cancelled bank login");
      // Could navigate back or show a different view
    };

    return (
      <BankSelection onBankSelect={handleBankSelect} onCancel={handleCancel} />
    );
  };

  const handleCalculate = (inputs: MortgageInputs) => {
    const results = calculateMortgage(inputs);
    setMortgageResults(results);
    setCalculatorView("results");
  };

  const handleRecalculate = () => {
    setCalculatorView("input");
  };

  const handleStartApplication = () => {
    // Switch to chat tab for application process
    setActiveTab("chat");
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "calculator":
        if (calculatorView === "results" && mortgageResults) {
          return (
            <MortgageResults
              results={mortgageResults}
              onBack={handleRecalculate}
              onRecalculate={handleRecalculate}
              onStartApplication={handleStartApplication}
            />
          );
        }
        return <MortgageCalculator onCalculate={handleCalculate} />;
      case "chat":
        return <ChatScreen />;
      case "documents":
        return <DocumentsScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <MortgageCalculator onCalculate={handleCalculate} />;
    }
  };

  return (
    <div className="flex h-screen w-full max-w-[390px] mx-auto flex-col bg-white overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderActiveScreen()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

"use client"

import { useState } from "react"
import { BottomNav } from "./bottom-nav"
import { HomeScreen } from "./home-screen"
import { AnalysisScreen } from "./analysis-screen"
import { BudgetWarningScreen } from "./budget-warning-screen"
import { BudgetOnTrackScreen } from "./budget-ontrack-screen"
import { InsufficientDataScreen } from "./insufficient-data-screen"
import { SpendingBreakdownScreen } from "./spending-breakdown-screen"
import { TransactionsScreen } from "./transactions-screen"
import { SettingsScreen } from "./settings-screen"
import { PhoneFrame } from "./phone-frame"

type Screen =
  | "home"
  | "analysis"
  | "budget-warning"
  | "budget-ontrack"
  | "insufficient-data"
  | "spending-breakdown"
  | "transactions"
  | "settings"

type Tab = "home" | "transactions" | "settings"

export function BankingApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [activeTab, setActiveTab] = useState<Tab>("home")

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setCurrentScreen(tab)
  }

  /** const handleCheckBudget = () => {
    setCurrentScreen("analysis")
  } **/

  const handleCheckBudget = async () => {
  const isPinValid = await validateUserPin()
  if (isPinValid) {
    setCurrentScreen("analysis")
  }
}

  const handleAnalysisComplete = (
    status: "warning" | "on-track" | "insufficient"
  ) => {
    if (status === "warning") {
      setCurrentScreen("budget-warning")
    } else if (status === "on-track") {
      setCurrentScreen("budget-ontrack")
    } else {
      setCurrentScreen("insufficient-data")
    }
  }

  const handleBackToHome = () => {
    setCurrentScreen("home")
    setActiveTab("home")
  }

  const handleViewDetails = () => {
    setCurrentScreen("spending-breakdown")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onCheckBudget={handleCheckBudget}
            onTransactionsClick={() => handleTabChange("transactions")}
            onSettingsClick={() => handleTabChange("settings")}
          />
        )
      case "analysis":
        return (
          <AnalysisScreen
            onBack={handleBackToHome}
            onComplete={handleAnalysisComplete}
          />
        )
      case "budget-warning":
        return (
          <BudgetWarningScreen
            onBack={handleBackToHome}
            onViewDetails={handleViewDetails}
          />
        )
      case "budget-ontrack":
        return (
          <BudgetOnTrackScreen
            onBack={handleBackToHome}
            onViewDetails={handleViewDetails}
          />
        )
      case "insufficient-data":
        return (
          <InsufficientDataScreen
            onBack={handleBackToHome}
            onAddTransactions={handleBackToHome}
          />
        )
      case "spending-breakdown":
        return <SpendingBreakdownScreen onBack={handleBackToHome} />
      case "transactions":
        return <TransactionsScreen onBack={handleBackToHome} />
      case "settings":
        return <SettingsScreen onBack={handleBackToHome} />
      default:
        return null
    }
  }

  return (
    <PhoneFrame>
      <div className="bg-background h-full relative flex flex-col">
        <div className="flex-1 overflow-auto pt-12">
          {renderScreen()}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </PhoneFrame>
  )
}

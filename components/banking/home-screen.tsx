"use client"

import { StatusBar } from "./status-bar"
import { QuickStats } from "./quick-stats"
import { PredictiveCard } from "./predictive-card"
import { ManageSection } from "./manage-section"
import { Wallet } from "lucide-react"

interface HomeScreenProps {
  onCheckBudget: () => void
  onTransactionsClick: () => void
  onSettingsClick: () => void
}

export function HomeScreen({
  onCheckBudget,
  onTransactionsClick,
  onSettingsClick,
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <StatusBar />

      <div className="px-5 py-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Your Money</h1>
        </div>

        <QuickStats />

        <PredictiveCard onCheckBudget={onCheckBudget} />

        <ManageSection
          onTransactionsClick={onTransactionsClick}
          onSettingsClick={onSettingsClick}
        />
      </div>
    </div>
  )
}

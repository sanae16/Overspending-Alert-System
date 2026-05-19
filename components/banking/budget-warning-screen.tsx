"use client"

import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  AlertTriangle,
  Utensils,
  ShoppingBag,
  CreditCard,
  Sparkles,
} from "lucide-react"

interface BudgetWarningScreenProps {
  onBack: () => void
  onViewDetails: () => void
}

export function BudgetWarningScreen({
  onBack,
  onViewDetails,
}: BudgetWarningScreenProps) {
  const spendingData = [
    { label: "Food", percentage: 45, color: "bg-chart-4" },
    { label: "Transport", percentage: 25, color: "bg-primary" },
    { label: "Bills", percentage: 20, color: "bg-chart-2" },
    { label: "Other", percentage: 10, color: "bg-muted-foreground" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <StatusBar />

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">
            Budget Status: Warning
          </h1>
          <div className="w-5" />
        </div>

        <Card className="p-5 bg-warning/10 border-warning/30 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning-foreground" />
            </div>
            <h2 className="font-semibold text-foreground">Budget Warning</h2>
          </div>
          <p className="text-muted-foreground">
            Risk of overspending on Food & Entertainment.
          </p>
        </Card>

        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-4">
            Spending Breakdown
          </h3>

          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let cumulativePercentage = 0
                  return spendingData.map((item, index) => {
                    const strokeDasharray = `${item.percentage} ${100 - item.percentage}`
                    const strokeDashoffset = -cumulativePercentage
                    cumulativePercentage += item.percentage
                    const colors = [
                      "stroke-chart-4",
                      "stroke-primary",
                      "stroke-chart-2",
                      "stroke-muted-foreground",
                    ]
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="20"
                        className={colors[index]}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        pathLength="100"
                      />
                    )
                  })
                })()}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {spendingData.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-muted-foreground">
                  {item.label} {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 bg-card border-border text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">Spent</p>
            <p className="text-lg font-bold text-foreground">R5,600</p>
          </Card>
          <Card className="p-3 bg-card border-border text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">Left</p>
            <p className="text-lg font-bold text-foreground">R2,400</p>
          </Card>
          <Card className="p-3 bg-card border-border text-center">
            <p className="text-xs text-muted-foreground uppercase mb-1">Days</p>
            <p className="text-lg font-bold text-foreground">12 left</p>
          </Card>
        </div>

        <Card className="p-4 bg-card border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Smart Suggestions
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              AI Optimized
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <Utensils className="h-4 w-4 text-foreground" />
              </div>
              <p className="text-sm text-foreground">
                Skip eating out twice this week to save ±R450.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <ShoppingBag className="h-4 w-4 text-foreground" />
              </div>
              <p className="text-sm text-foreground">
                Delay non-essential shopping until after payday.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <CreditCard className="h-4 w-4 text-foreground" />
              </div>
              <p className="text-sm text-foreground">
                Pay key bills early to avoid penalty fees.
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Recommendation based on past 30 days of transactions + your budget
            target.
          </p>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={onViewDetails}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            View Spending Details
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            Check Again Later
          </Button>
        </div>
      </div>
    </div>
  )
}

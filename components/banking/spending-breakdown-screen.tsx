"use client"

import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Utensils, Car, Receipt, AlertCircle, CheckCircle } from "lucide-react"

interface SpendingBreakdownScreenProps {
  onBack: () => void
}

const categories = [
  {
    icon: Utensils,
    label: "Food & Dining",
    amount: "R2,500",
    status: "alert",
    statusText: "Alert",
    description: "Over budget by R300",
    period: "This month",
  },
  {
    icon: Car,
    label: "Transport",
    amount: "R1,400",
    status: "stable",
    statusText: "Stable",
    description: "On track",
    period: "This month",
  },
  {
    icon: Receipt,
    label: "Monthly Bills",
    amount: "R1,200",
    status: "stable",
    statusText: "Stable",
    description: "On track",
    period: "This month",
  },
]

export function SpendingBreakdownScreen({
  onBack,
}: SpendingBreakdownScreenProps) {
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
            Spending Breakdown
          </h1>
          <div className="w-5" />
        </div>

        <p className="text-muted-foreground mb-6">
          Detailed view showing categories, amounts, and how the AI reached this
          result.
        </p>

        <div className="mb-4">
          <span className="text-sm text-muted-foreground uppercase tracking-wide">
            Categories
          </span>
          <p className="text-lg font-semibold text-foreground">Total: R5,100</p>
        </div>

        <div className="space-y-3 mb-6">
          {categories.map((category) => {
            const Icon = category.icon
            const isAlert = category.status === "alert"

            return (
              <Card
                key={category.label}
                className={`p-4 border ${
                  isAlert
                    ? "bg-warning/5 border-warning/20"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isAlert ? "bg-warning/20" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isAlert ? "text-warning-foreground" : "text-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {category.label}
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {category.amount}
                      </p>
                      <p
                        className={`text-sm ${
                          isAlert ? "text-warning-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isAlert
                          ? "bg-warning/20 text-warning-foreground"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {isAlert ? (
                        <AlertCircle className="h-3 w-3" />
                      ) : (
                        <CheckCircle className="h-3 w-3" />
                      )}
                      {category.statusText}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.period}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-3 bg-muted/50 border-border mb-6">
          <p className="text-sm text-muted-foreground text-center">
            These category amounts were used by the predictive model to estimate
            overspend risk.
          </p>
        </Card>

        <Button
          onClick={onBack}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

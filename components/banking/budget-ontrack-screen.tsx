"use client"

import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  PiggyBank,
  Sparkles,
} from "lucide-react"

interface BudgetOnTrackScreenProps {
  onBack: () => void
  onViewDetails: () => void
}

export function BudgetOnTrackScreen({
  onBack,
  onViewDetails,
}: BudgetOnTrackScreenProps) {
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
            Budget Status: On Track
          </h1>
          <div className="w-5" />
        </div>

        <Card className="p-5 bg-success/10 border-success/30 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-success/20">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                {"You're doing great!"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {"Low risk - you're managing well."}
              </p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-2xl font-bold text-success">32% below budget</span>
          </div>
        </Card>

        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-2">
            Spending Progress
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on current transaction velocity
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="text-muted-foreground">Budget</span>
            </div>
            <Progress value={40} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 bg-card border-border">
              <p className="text-xs text-muted-foreground uppercase mb-1">
                Spent So Far
              </p>
              <p className="text-lg font-bold text-foreground">R3,200</p>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </Card>
            <Card className="p-3 bg-card border-border">
              <p className="text-xs text-muted-foreground uppercase mb-1">
                Remaining
              </p>
              <p className="text-lg font-bold text-foreground">R4,800</p>
              <p className="text-xs text-muted-foreground">Safety buffer</p>
            </Card>
            <Card className="p-3 bg-card border-border">
              <p className="text-xs text-muted-foreground uppercase mb-1">
                Days Left
              </p>
              <p className="text-lg font-bold text-foreground">18 Days</p>
              <p className="text-xs text-muted-foreground">Until payday</p>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-3">
            40% of budget used
          </p>
        </div>

        <Card className="p-4 bg-card border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">
              Healthy Habits Guidance
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              AI Forecast
            </span>
          </div>

          <Card className="p-3 bg-success/5 border-success/20 mb-4">
            <p className="text-sm text-foreground italic">
              {'"Your current spending velocity predicts you will finish the month with R1,250 in savings."'}
            </p>
          </Card>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <TrendingUp className="h-4 w-4 text-foreground" />
              </div>
              <p className="text-sm text-foreground">
                Keep following your current plan - {"you're"} well within healthy
                limits.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <PiggyBank className="h-4 w-4 text-foreground" />
              </div>
              <p className="text-sm text-foreground">
                Consider moving R500 to your savings account today to secure your
                buffer.
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Predictive model note: Analysis based on stable recurring
            transactions.
          </p>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={onViewDetails}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            View Spending Details
          </Button>
          <Button onClick={onBack} variant="outline" className="w-full">
            Check Again Later
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  AlertCircle,
  Upload,
  Clock,
  Target,
  Plus,
  Shield,
} from "lucide-react"

interface InsufficientDataScreenProps {
  onBack: () => void
  onAddTransactions: () => void
}

export function InsufficientDataScreen({
  onBack,
  onAddTransactions,
}: InsufficientDataScreenProps) {
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
            Cannot check budget
          </h1>
          <div className="w-5" />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex p-4 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Insufficient Transaction Data
          </h2>
          <p className="text-muted-foreground">
            Our AI needs a consistent history to predict your spending patterns
            accurately.
          </p>
        </div>

        <Card className="p-4 bg-destructive/5 border-destructive/20 mb-6">
          <p className="font-medium text-foreground mb-2">System Alert</p>
          <p className="text-sm text-muted-foreground">
            Not enough transactions in the last 30 days to analyse your budget.
          </p>
          <p className="text-sm text-muted-foreground mt-2 italic">
            {'"Predictive models require at least 15 unique transactions to establish a reliable baseline."'}
          </p>
        </Card>

        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">
            How to Recover
          </h3>

          <div className="space-y-4">

            <Card className="p-4 bg-card border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Wait for Patterns</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue using the app normally. Once you reach the minimum
                    transaction threshold, analysis becomes available.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Adjust Your Target
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ensure your monthly budget target is realistic (above R5,000)
                    for better model precision.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onAddTransactions}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Go back home 
          </Button>
          <Button onClick={onBack} variant="outline" className="w-full">
            Try Again Later
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <Shield className="h-3 w-3" />
          Your data security is our priority. We only use anonymized transaction
          meta-data for predictive modeling.
        </p>
      </div>
    </div>
  )
}

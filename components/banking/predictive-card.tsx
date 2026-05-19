"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ChevronRight } from "lucide-react"

interface PredictiveCardProps {
  onCheckBudget: () => void
}

export function PredictiveCard({ onCheckBudget }: PredictiveCardProps) {
  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Predictive Analytics</h3>
          <p className="text-sm text-muted-foreground mt-1">
            AI checks your past 30 days of spending to forecast overspending risks.
          </p>
        </div>
      </div>
      <Button
        onClick={onCheckBudget}
        className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Check Budget Risk
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </Card>
  )
}

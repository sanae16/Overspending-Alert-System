"use client"

import { Card } from "@/components/ui/card"
import { Wallet, TrendingUp } from "lucide-react"

export function QuickStats() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Quick Stats</h2>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Updated just now
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Current Balance
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">R2,450</p>
          <p className="text-xs text-muted-foreground mt-1">
            Safe to spend for next 5 days
          </p>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-chart-4/10">
              <TrendingUp className="h-4 w-4 text-chart-4" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Monthly Spending
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">R5,600</p>
          <p className="text-xs text-chart-4 mt-1">
            R400 more than last month
          </p>
        </Card>
      </div>
    </div>
  )
}

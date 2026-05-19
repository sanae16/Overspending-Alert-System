"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeftRight, Settings, ChevronRight } from "lucide-react"

interface ManageSectionProps {
  onTransactionsClick: () => void
  onSettingsClick: () => void
}

export function ManageSection({
  onTransactionsClick,
  onSettingsClick,
}: ManageSectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Manage
      </h2>

      <div className="space-y-2">
        <Card
          className="p-4 bg-card border-border cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={onTransactionsClick}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <ArrowLeftRight className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Transactions</p>
                <p className="text-sm text-muted-foreground">
                  Review your recent history
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>

        <Card
          className="p-4 bg-card border-border cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={onSettingsClick}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <Settings className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Settings</p>
                <p className="text-sm text-muted-foreground">
                  Customise alerts & profile
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>
      </div>
    </div>
  )
}

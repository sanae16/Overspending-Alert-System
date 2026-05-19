"use client"

import { Home, ArrowLeftRight, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "home" | "transactions" | "settings"

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as Tab, label: "Home", icon: Home },
    { id: "transactions" as Tab, label: "Transactions", icon: ArrowLeftRight },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

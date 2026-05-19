"use client"

import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
} from "lucide-react"

interface SettingsScreenProps {
  onBack: () => void
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile",
          description: "Manage your personal details",
          action: "chevron",
        },
        {
          icon: CreditCard,
          label: "Linked Accounts",
          description: "Manage bank connections",
          action: "chevron",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Budget alerts & reminders",
          action: "toggle",
          defaultChecked: true,
        },
        {
          icon: Moon,
          label: "Dark Mode",
          description: "Switch to dark theme",
          action: "toggle",
          defaultChecked: false,
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: Shield,
          label: "Privacy & Security",
          description: "Password, biometrics, 2FA",
          action: "chevron",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & FAQ",
          description: "Get support or report issues",
          action: "chevron",
        },
      ],
    },
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
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
          <div className="w-5" />
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">JD</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">John Doe</p>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
              <p className="text-xs text-primary mt-1">Premium Member</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {group.title}
              </p>
              <Card className="divide-y divide-border">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary">
                          <Icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {item.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.action === "chevron" ? (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Switch defaultChecked={item.defaultChecked} />
                      )}
                    </div>
                  )
                })}
              </Card>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 text-destructive border-destructive/30 hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          MoneyWise v1.0.0
        </p>
      </div>
    </div>
  )
}

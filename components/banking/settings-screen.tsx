"use client"

import { useState } from "react"
import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface SettingsScreenProps {
  onBack: () => void
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [showPinModal, setShowPinModal] = useState(false)
  const [pinStep, setPinStep] = useState<"current" | "new" | "confirm">("current")
  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [pinError, setPinError] = useState("")
  const [pinSuccess, setPinSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPinSet, setIsPinSet] = useState(true) // Assume user has PIN set

  const handlePinReset = () => {
    setCurrentPin("")
    setNewPin("")
    setConfirmPin("")
    setPinStep("current")
    setShowPinModal(false)
    setPin Error("")
    setPinSuccess(false)
  }

  const handleCurrentPinSubmit = async () => {
    if (currentPin.length !== 4) {
      setPinError("PIN must be 4 digits")
      return
    }

    setIsLoading(true)
    try {
      // TODO: Validate current PIN with backend
      // For now, we'll assume it's valid
      const response = await fetch("/api/auth/validate-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: currentPin }),
      })

      if (!response.ok) {
        setPinError("Incorrect PIN. Please try again.")
        setCurrentPin("")
        return
      }

      setPinError("")
      setPinStep("new")
    } catch (error) {
      setPinError("Error validating PIN")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPinSubmit = () => {
    if (newPin.length !== 4) {
      setPinError("PIN must be 4 digits")
      return
    }

    setPinError("")
    setPinStep("confirm")
  }

  const handleConfirmPinSubmit = async () => {
    if (confirmPin.length !== 4) {
      setPinError("PIN must be 4 digits")
      return
    }

    if (newPin !== confirmPin) {
      setPinError("PINs do not match. Please try again.")
      setConfirmPin("")
      return
    }

    setIsLoading(true)
    try {
      // TODO: Save new PIN to backend
      const response = await fetch("/api/auth/update-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newPin }),
      })

      if (!response.ok) {
        setPinError("Failed to update PIN")
        return
      }

      setPinSuccess(true)
      setPinError("")
      setIsPinSet(true)

      // Close modal after 2 seconds
      setTimeout(() => {
        handlePinReset()
      }, 2000)
    } catch (error) {
      setPinError("Error updating PIN")
    } finally {
      setIsLoading(false)
    }
  }

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
        {
          icon: Lock,
          label: "Change PIN",
          description: "Update your 4-digit PIN for Predictive Analytics",
          action: "button",
          onClick: () => {
            handlePinReset()
            setShowPinModal(true)
          },
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
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
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
                      className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
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
                      ) : item.action === "toggle" ? (
                        <Switch defaultChecked={item.defaultChecked} />
                      ) : item.action === "button" ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={item.onClick}
                          className="h-8 px-3"
                        >
                          Edit
                        </Button>
                      ) : null}
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

      {/* PIN Change Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {pinStep === "current" && "Verify Current PIN"}
              {pinStep === "new" && "Enter New PIN"}
              {pinStep === "confirm" && "Confirm New PIN"}
            </DialogTitle>
            <DialogDescription>
              {pinStep === "current" && "Enter your current 4-digit PIN to proceed"}
              {pinStep === "new" && "Create a new 4-digit PIN for Predictive Analytics"}
              {pinStep === "confirm" && "Re-enter your new PIN to confirm"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {pinError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{pinError}</AlertDescription>
              </Alert>
            )}

            {pinSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  PIN updated successfully!
                </AlertDescription>
              </Alert>
            )}

            {!pinSuccess && (
              <>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={
                      pinStep === "current"
                        ? currentPin
                        : pinStep === "new"
                          ? newPin
                          : confirmPin
                    }
                    onChange={(value) => {
                      if (pinStep === "current") setCurrentPin(value)
                      else if (pinStep === "new") setNewPin(value)
                      else setConfirmPin(value)
                    }}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePinReset()}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (pinStep === "current") handleCurrentPinSubmit()
                      else if (pinStep === "new") handleNewPinSubmit()
                      else handleConfirmPinSubmit()
                    }}
                    disabled={
                      (pinStep === "current" && currentPin.length !== 4) ||
                      (pinStep === "new" && newPin.length !== 4) ||
                      (pinStep === "confirm" && confirmPin.length !== 4) ||
                      isLoading
                    }
                    className="flex-1"
                  >
                    {isLoading ? "Processing..." : "Continue"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

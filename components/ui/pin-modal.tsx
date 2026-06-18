"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { validatePinLocally } from "@/lib/auth/pin-validator"

interface PinModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (pin: string) => Promise<boolean>
  isLoading?: boolean
}

// Test PIN for local testing - Change this value as needed
const TEST_PIN = "1234"

export function PinModal({ isOpen, onClose, onSubmit, isLoading = false }: PinModalProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 5

  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    try {
      // Local testing validation
      const isLocallyValid = validatePinLocally(pin, TEST_PIN)
      if (isLocallyValid) {
        // If local validation passes, proceed with onSubmit
        const isValid = await onSubmit(pin)
        if (isValid) {
          setPin("")
          setError("")
          setAttempts(0)
          onClose()
        } else {
          const newAttempts = attempts + 1
          setAttempts(newAttempts)
          setError("Incorrect PIN")
          setPin("")

          if (newAttempts >= maxAttempts) {
            setError("Too many failed attempts. Please try again later.")
          }
        }
      } else {
        // Local validation failed
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        setError("Incorrect PIN")
        setPin("")

        if (newAttempts >= maxAttempts) {
          setError("Too many failed attempts. Please try again later.")
        }
      }
    } catch (err) {
      setError("Error validating PIN. Please try again.")
    }
  }

  const isLockedOut = attempts >= maxAttempts

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Identity</DialogTitle>
          <DialogDescription>
            Enter your 4-digit PIN to access Predictive Analytics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant={isLockedOut ? "destructive" : "default"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLockedOut && (
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={setPin}
                disabled={isLoading || isLockedOut}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}

          {attempts > 0 && !isLockedOut && (
            <p className="text-sm text-muted-foreground text-center">
              Attempts remaining: {maxAttempts - attempts}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={pin.length !== 4 || isLoading || isLockedOut}
              className="flex-1"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

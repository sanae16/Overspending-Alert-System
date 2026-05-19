"use client"

import { useEffect, useState } from "react"
import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Check,
  Loader2,
  Shield,
  ChevronRight,
} from "lucide-react"

interface AnalysisScreenProps {
  onBack: () => void
  onComplete: (status: "warning" | "on-track" | "insufficient") => void
}

const analysisSteps = [
  { id: 1, label: "Processing transactions..." },
  { id: 2, label: "Checking last 30 days of data" },
  { id: 3, label: "Scanning categorised spend" },
  { id: 4, label: "Identifying recurring bills" },
  { id: 5, label: "Predicting month-end trends" },
]

export function AnalysisScreen({ onBack, onComplete }: AnalysisScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * analysisSteps.length)
    setCurrentStep(Math.min(stepIndex, analysisSteps.length - 1))
  }, [progress])

  const handleContinue = () => {
    // Randomly select a result for demo purposes
    const results: ("warning" | "on-track" | "insufficient")[] = [
      "warning",
      "on-track",
      "insufficient",
    ]
    const randomResult = results[Math.floor(Math.random() * results.length)]
    onComplete(randomResult)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <StatusBar />

      <div className="px-5 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-xl font-bold text-foreground">
            Analysing your spending...
          </h1>
          <p className="text-muted-foreground">
            Our predictive model is generating your budget health report.
          </p>
        </div>

        <Card className="p-5 bg-card border-border mb-6">
          <div className="space-y-4">
            {analysisSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {index < currentStep || progress >= 100 ? (
                    <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
                      <Check className="h-3 w-3 text-success-foreground" />
                    </div>
                  ) : index === currentStep ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                  )}
                </div>
                <span
                  className={
                    index <= currentStep || progress >= 100
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-2xl font-bold text-primary">
              {progress}%
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-primary/5 border-primary/20 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm uppercase tracking-wide">
                Predictive Analytics
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Model analyses past transactions + your budget to estimate
                overspend risk.
              </p>
            </div>
          </div>
        </Card>

        <Button
          onClick={handleContinue}
          disabled={!isComplete}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <Shield className="h-3 w-3" />
          Secured by end-to-end encryption
        </p>
      </div>
    </div>
  )
}

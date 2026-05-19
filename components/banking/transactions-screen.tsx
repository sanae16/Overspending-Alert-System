"use client"

import { StatusBar } from "./status-bar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Coffee, ShoppingCart, Zap, Train, CreditCard, ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface TransactionsScreenProps {
  onBack: () => void
}

const transactions = [
  {
    id: 1,
    icon: Coffee,
    label: "Starbucks",
    category: "Food & Dining",
    amount: -45.00,
    date: "Today, 09:42",
  },
  {
    id: 2,
    icon: ArrowDownLeft,
    label: "Salary Deposit",
    category: "Income",
    amount: 12500.00,
    date: "Yesterday",
  },
  {
    id: 3,
    icon: ShoppingCart,
    label: "Pick n Pay",
    category: "Groceries",
    amount: -856.32,
    date: "Yesterday",
  },
  {
    id: 4,
    icon: Zap,
    label: "Electricity Bill",
    category: "Utilities",
    amount: -450.00,
    date: "May 18",
  },
  {
    id: 5,
    icon: Train,
    label: "Gautrain",
    category: "Transport",
    amount: -120.00,
    date: "May 17",
  },
  {
    id: 6,
    icon: CreditCard,
    label: "Netflix",
    category: "Entertainment",
    amount: -199.00,
    date: "May 15",
  },
  {
    id: 7,
    icon: ArrowUpRight,
    label: "Transfer to Savings",
    category: "Savings",
    amount: -500.00,
    date: "May 15",
  },
]

export function TransactionsScreen({ onBack }: TransactionsScreenProps) {
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
          <h1 className="text-lg font-semibold text-foreground">Transactions</h1>
          <div className="w-5" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">Recent activity</p>
          <Badge variant="secondary" className="text-xs">
            Last 30 days
          </Badge>
        </div>

        <div className="space-y-2">
          {transactions.map((transaction) => {
            const Icon = transaction.icon
            const isPositive = transaction.amount > 0

            return (
              <Card
                key={transaction.id}
                className="p-4 bg-card border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isPositive ? "bg-success/10" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isPositive ? "text-success" : "text-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        isPositive ? "text-success" : "text-foreground"
                      }`}
                    >
                      {isPositive ? "+" : ""}R
                      {Math.abs(transaction.amount).toLocaleString("en-ZA", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

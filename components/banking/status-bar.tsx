"use client"

import { Signal, Wifi, BatteryFull } from "lucide-react"

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 py-2 text-foreground">
      <span className="text-sm font-semibold">9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="h-4 w-4" />
        <Wifi className="h-4 w-4" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  )
}

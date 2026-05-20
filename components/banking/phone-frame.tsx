"use client"

interface PhoneFrameProps {
  children: React.ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 p-4">
      <div className="relative">
        {/* Power button - right side */}
        <div className="absolute -right-[3px] top-28 w-[3px] h-12 bg-zinc-700 rounded-r-sm" />
        
        {/* Volume buttons - left side */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-zinc-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
        
        {/* Silent switch - left side */}
        <div className="absolute -left-[3px] top-16 w-[3px] h-4 bg-zinc-700 rounded-l-sm" />

        {/* Phone body */}
        <div className="relative w-[375px] h-[812px] bg-zinc-900 rounded-[50px] p-[12px] shadow-2xl">
          {/* Screen bezel */}
          <div className="relative w-full h-full bg-background rounded-[38px] overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-3">
              <div className="w-[120px] h-[34px] bg-zinc-900 rounded-full flex items-center justify-center gap-2">
                {/* Front camera */}
                <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-[3px] ml-[3px]" />
                </div>
                {/* Speaker */}
                <div className="w-12 h-1 bg-zinc-800 rounded-full" />
              </div>
            </div>

            {/* Screen content */}
            <div className="h-full overflow-hidden">
              {children}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

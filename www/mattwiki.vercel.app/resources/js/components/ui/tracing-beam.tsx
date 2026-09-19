import type { ReactNode, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface TracingBeamProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function TracingBeam({ children, className, ...props }: TracingBeamProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {/* Decorative vertical beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 top-0 h-full w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(99,102,241,0.5) 20%, rgba(139,92,246,0.4) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 top-0 h-4 w-4 -translate-x-1.5"
      >
        <div className="h-4 w-4 rounded-full border border-indigo-500/40 bg-indigo-500/20 backdrop-blur-sm" />
        <div className="absolute inset-1 rounded-full bg-indigo-400/60" />
      </div>
      {children}
    </div>
  )
}

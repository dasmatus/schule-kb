import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
}

const variants: Record<string, string> = {
  default: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  secondary: "bg-white/8 text-white/70 border border-white/12",
  outline: "bg-transparent text-white/70 border border-white/20",
  success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  destructive: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

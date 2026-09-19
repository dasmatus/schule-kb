import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg"
}

interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
}

const sizes: Record<string, string> = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
}

export function Avatar({ size = "md", className, children, ...props }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full glass",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full text-white/70 font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

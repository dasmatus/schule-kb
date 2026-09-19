import React, { useState, type ReactNode, type HTMLAttributes, cloneElement, isValidElement } from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: ReactNode
}

interface TooltipTriggerProps {
  children?: ReactNode
  render?: ReactNode
  className?: string
}

interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function Tooltip({ children }: TooltipProps) {
  return <>{children}</>
}

export function TooltipTrigger({ children, render, className }: TooltipTriggerProps) {
  const [visible, setVisible] = useState(false)

  const target = render ?? children

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {isValidElement(target)
        ? cloneElement(target as React.ReactElement<HTMLAttributes<HTMLElement>>, {
            className: cn((target.props as HTMLAttributes<HTMLElement>).className),
          })
        : target}
      {visible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 pointer-events-none">
          <span id="tooltip-content" />
        </div>
      )}
    </span>
  )
}

export function TooltipContent({ children, className, ...props }: TooltipContentProps) {
  return (
    <div
      role="tooltip"
      className={cn(
        "whitespace-nowrap rounded-lg glass-strong px-3 py-1.5 text-xs text-white/90 shadow-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

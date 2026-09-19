import type { HTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Breadcrumb({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)} {...props}>
      {children}
    </nav>
  )
}

export function BreadcrumbList({ className, children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={cn("flex items-center gap-1.5 text-sm text-white/50", className)} {...props}>
      {children}
    </ol>
  )
}

export function BreadcrumbItem({ className, children, ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("flex items-center gap-1.5", className)} {...props}>
      {children}
    </li>
  )
}

export function BreadcrumbLink({
  className,
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  return (
    <a
      href={href}
      className={cn("hover:text-white/90 transition-colors cursor-pointer", className)}
      {...props}
    >
      {children}
    </a>
  )
}

export function BreadcrumbPage({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-current="page" className={cn("text-white/80 font-medium", className)} {...props}>
      {children}
    </span>
  )
}

export function BreadcrumbSeparator({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-hidden className={cn("text-white/25 select-none", className)} {...props}>
      /
    </span>
  )
}

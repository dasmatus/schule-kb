import type { ReactNode } from "react"
import { usePage } from "@inertiajs/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import type { SharedProps } from "@/types"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const page = usePage<SharedProps>()
  const { flash } = page.props
  const { url } = page

  return (
    <div className="relative min-h-screen">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Flash messages */}
      {flash?.success && (
        <div className="fixed top-4 right-4 z-50 glass rounded-xl px-5 py-3 text-sm text-emerald-300 border-emerald-500/30">
          {flash.success}
        </div>
      )}
      {flash?.error && (
        <div className="fixed top-4 right-4 z-50 glass rounded-xl px-5 py-3 text-sm text-rose-300 border-rose-500/30">
          {flash.error}
        </div>
      )}

      <div key={url} className="animate-slide-up">
        {children}
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  )
}

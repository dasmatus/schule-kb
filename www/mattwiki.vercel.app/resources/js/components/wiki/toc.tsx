import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { TocEntry } from "@/lib/wiki-markdown"

interface TocProps {
  entries: TocEntry[]
}

export function Toc({ entries }: TocProps) {
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (entries.length === 0) return

    const headingIds = entries.map((e) => e.id)

    // Track the topmost visible heading
    const visibleHeadings = new Map<string, number>()

    observerRef.current = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const id = record.target.id
          if (record.isIntersecting) {
            visibleHeadings.set(id, record.boundingClientRect.top)
          } else {
            visibleHeadings.delete(id)
          }
        }

        if (visibleHeadings.size === 0) return

        // Pick the heading closest to the top of the viewport
        const topId = [...visibleHeadings.entries()].sort((a, b) => a[1] - b[1])[0][0]
        setActiveId(topId)
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    )

    for (const id of headingIds) {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <aside className="hidden xl:block w-56 shrink-0 py-6">
      <div className="sticky top-24 glass rounded-2xl p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40 px-2">
          On this page
        </p>
        <nav className="space-y-0.5">
          {entries.map((entry) => {
            const isActive = entry.id === activeId
            return (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className={cn(
                  "block rounded-lg py-1.5 text-sm transition-colors duration-150 cursor-pointer",
                  entry.level === 2 ? "px-2" : "px-4 text-xs",
                  isActive
                    ? "text-indigo-300 font-medium bg-indigo-500/15"
                    : "text-white/50 hover:text-white/85",
                )}
              >
                {isActive && entry.level === 2 && (
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-400 mr-1.5 mb-0.5" />
                )}
                {entry.text}
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "mattwiki_read_articles"

function loadReadSlugs(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function saveReadSlugs(slugs: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]))
}

export function useReadArticles() {
  const [readSlugs, setReadSlugs] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    setReadSlugs(loadReadSlugs())
  }, [])

  const markRead = useCallback((slug: string) => {
    setReadSlugs((prev) => {
      if (prev.has(slug)) return prev
      const next = new Set(prev)
      next.add(slug)
      saveReadSlugs(next)
      return next
    })
  }, [])

  return { readSlugs, markRead }
}

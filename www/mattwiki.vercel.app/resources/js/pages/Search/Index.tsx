import { Link, router } from "@inertiajs/react"
import { useState } from "react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Clock01Icon } from "@hugeicons/core-free-icons"
import type { FeaturedArticle } from "@/types"

interface SearchProps {
  query: string
  results: FeaturedArticle[]
}

export default function SearchPage({ query, results }: SearchProps) {
  const [q, setQ] = useState(query)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.get("/search", { q }, { preserveState: true })
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Search</h1>
          <p className="mt-1 text-white/50">
            {query
              ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
              : "Search the knowledge base"}
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-8 flex items-center gap-3">
          <div className="relative flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40 pointer-events-none"
            />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles…"
              className="h-13 w-full rounded-2xl glass pl-12 pr-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-indigo-400/50 transition-all"
            />
          </div>
          <button
            type="submit"
            className="h-13 px-6 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium border border-indigo-500/40 cursor-pointer transition-all"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {query && results.length === 0 && (
          <div className="glass rounded-2xl p-16 text-center">
            <HugeiconsIcon icon={Search01Icon} className="mx-auto mb-4 size-12 text-white/20" />
            <p className="text-white/40">No results found for "{query}"</p>
          </div>
        )}

        <div className="space-y-3">
          {results.map((article) => (
            <Link
              key={article.slug}
              href={`/wiki/${article.slug}`}
              className="block glass glass-hover rounded-2xl p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-200 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/55 line-clamp-2">{article.description}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-xs text-white/35">
                  <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
                  {article.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </AppLayout>
  )
}

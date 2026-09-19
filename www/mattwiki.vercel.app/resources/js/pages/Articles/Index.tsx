import { Link } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, BookOpen01Icon, Add01Icon } from "@hugeicons/core-free-icons"
import type { FeaturedArticle, SharedProps } from "@/types"
import { usePage } from "@inertiajs/react"

interface ArticlesIndexProps {
  articles: (FeaturedArticle & { author: string })[] | undefined
}

export default function ArticlesIndex({ articles }: ArticlesIndexProps) {
  const { auth } = usePage<SharedProps>().props

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Articles</h1>
            <p className="mt-1 text-white/50">
              {articles === undefined ? <span className="inline-block w-24 h-4 bg-white/10 rounded animate-pulse" /> : `${articles.length} articles published`}
            </p>
          </div>
          {auth.user && (
            <Link
              href="/articles/new"
              className="flex items-center gap-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 px-4 py-2.5 text-sm text-white font-medium border border-indigo-500/40 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
              New article
            </Link>
          )}
        </div>

        {articles === undefined ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="mb-3 h-5 w-20 rounded-full bg-white/10" />
                <div className="mb-2 h-5 w-3/4 rounded bg-white/10" />
                <div className="mb-1 h-3 w-full rounded bg-white/10" />
                <div className="mb-1 h-3 w-5/6 rounded bg-white/10" />
                <div className="mb-4 h-3 w-2/3 rounded bg-white/10" />
                <div className="flex gap-3">
                  <div className="h-3 w-16 rounded bg-white/10" />
                  <div className="h-3 w-20 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <HugeiconsIcon icon={BookOpen01Icon} className="mx-auto mb-4 size-12 text-white/20" />
            <p className="text-white/40">No articles yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/wiki/${article.slug}`}
                className="block glass glass-hover rounded-2xl p-6 cursor-pointer group"
              >
                <Badge variant="secondary" className="mb-3">
                  {article.category}
                </Badge>
                <h2 className="mb-2 font-semibold text-white group-hover:text-indigo-200 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="mb-4 text-sm text-white/55 line-clamp-3">{article.description}</p>
                <div className="flex items-center gap-3 text-xs text-white/35">
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
                    {article.readTime}
                  </span>
                  <span>{article.updated}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  )
}

import { router } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, StarOffIcon } from "@hugeicons/core-free-icons"
import type { PublishedArticleForFeature } from "@/types"

interface AdminFeatureProps {
  articles: PublishedArticleForFeature[]
}

export default function AdminFeature({ articles }: AdminFeatureProps) {
  function toggle(slug: string) {
    router.put(`/admin/feature/${slug}`)
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Featured articles</h1>
          <p className="mt-1 text-white/50">Toggle which articles appear on the homepage</p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/8">
            {articles.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-white/40">No published articles.</p>
            ) : (
              articles.map((article) => (
                <div key={article.slug} className="flex items-center gap-4 px-5 py-3.5">
                  <button
                    onClick={() => toggle(article.slug)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border cursor-pointer transition-all ${
                      article.featured
                        ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                        : "glass border-white/12 text-white/30 hover:text-white/60"
                    }`}
                    aria-label={article.featured ? "Unfeature" : "Feature"}
                  >
                    <HugeiconsIcon icon={article.featured ? StarIcon : StarOffIcon} className="size-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-white/85 text-sm">{article.title}</div>
                    <div className="text-xs text-white/40">{article.category}</div>
                  </div>
                  {article.featured && (
                    <Badge variant="warning">Featured</Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  )
}

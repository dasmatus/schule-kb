import { Link } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { HugeiconsIcon } from "@hugeicons/react"
import { Folder01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import type { Category } from "@/types"

interface CategoriesIndexProps {
  categories?: Category[]
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="mt-1 text-white/50">{categories ? `${categories.length} categories` : <span className="inline-block h-4 w-24 animate-pulse rounded bg-white/10" />}</p>
        </div>

        {!categories ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                  <div className="h-9 w-9 rounded-xl bg-white/10" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-1/2 rounded bg-white/10" />
                    <div className="h-3 w-1/3 rounded bg-white/10" />
                  </div>
                </div>
                <div className="p-2 space-y-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-8 rounded-xl bg-white/5 mx-1" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.name} className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/25">
                  <HugeiconsIcon icon={Folder01Icon} className="size-4 text-indigo-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">{category.name}</h2>
                  <p className="text-xs text-white/40">{category.count} articles</p>
                </div>
              </div>
              <ul className="p-2">
                {category.articles.slice(0, 5).map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/wiki/${article.slug}`}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/6 transition-all cursor-pointer group"
                    >
                      <span className="truncate">{article.title}</span>
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="size-3.5 text-white/25 group-hover:text-white/50 shrink-0 ml-2"
                      />
                    </Link>
                  </li>
                ))}
                {category.articles.length > 5 && (
                  <li className="px-3 py-2 text-xs text-white/30 text-center">
                    +{category.articles.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        )}
      </main>
    </AppLayout>
  )
}

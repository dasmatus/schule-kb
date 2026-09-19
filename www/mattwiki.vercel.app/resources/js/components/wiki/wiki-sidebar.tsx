import { Link } from "@inertiajs/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Folder01Icon, ArrowRight01Icon, BookOpen01Icon, CheckmarkCircleIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

interface WikiSidebarProps {
  currentSlug?: string
  categories: Category[]
  readSlugs?: Set<string>
}

export function WikiSidebar({ currentSlug, categories, readSlugs = new Set() }: WikiSidebarProps) {
  const totalArticles = categories.reduce((sum, c) => sum + c.count, 0)
  const totalRead = categories.reduce(
    (sum, c) => sum + c.articles.filter((a) => readSlugs.has(a.slug)).length,
    0,
  )

  return (
    <aside className="hidden lg:block w-64 shrink-0 py-6">
      <div className="sticky top-24 glass rounded-2xl p-4 space-y-1">
        <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b border-white/10">
          <HugeiconsIcon icon={BookOpen01Icon} className="size-4 text-indigo-400" />
          <span className="text-sm font-semibold text-white/80">Contents</span>
          {totalArticles > 0 && (
            <span className="ml-auto text-xs text-white/35">
              {totalRead}/{totalArticles}
            </span>
          )}
        </div>

        {totalArticles > 0 && (
          <div className="px-2 pb-2 mb-1">
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500/70 transition-all duration-500"
                style={{ width: `${Math.round((totalRead / totalArticles) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {categories.map((category) => (
          <CategorySection
            key={category.name}
            category={category}
            currentSlug={currentSlug}
            readSlugs={readSlugs}
          />
        ))}
      </div>
    </aside>
  )
}

function CategorySection({
  category,
  currentSlug,
  readSlugs,
}: {
  category: Category
  currentSlug?: string
  readSlugs: Set<string>
}) {
  const readCount = category.articles.filter((a) => readSlugs.has(a.slug)).length
  const allRead = readCount === category.articles.length && category.articles.length > 0

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5 rounded-lg px-2 py-1.5">
        <HugeiconsIcon
          icon={Folder01Icon}
          className={cn("size-3.5 shrink-0", allRead ? "text-emerald-400/70" : "text-indigo-400/70")}
        />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
          {category.name}
        </span>
        <span className="ml-auto text-xs text-white/25">
          {readCount > 0 ? `${readCount}/` : ""}{category.count}
        </span>
      </div>

      {category.articles.map((article) => {
        const isActive = article.slug === currentSlug
        const isRead = readSlugs.has(article.slug)
        return (
          <Link
            key={article.slug}
            href={`/wiki/${article.slug}`}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all duration-150 cursor-pointer",
              isActive
                ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/25"
                : "text-white/55 hover:text-white/85 hover:bg-white/6",
            )}
          >
            {isActive ? (
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5 text-indigo-400 shrink-0" />
            ) : isRead ? (
              <HugeiconsIcon icon={CheckmarkCircleIcon} className="size-3.5 text-emerald-400/80 shrink-0" />
            ) : (
              <span className="size-3.5 shrink-0" />
            )}
            <span className="truncate">{article.title}</span>
          </Link>
        )
      })}
    </div>
  )
}

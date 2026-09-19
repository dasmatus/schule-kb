import { Link } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Clock01Icon,
  BookOpen01Icon,
  Folder01Icon,
  ArrowRight01Icon,
  Search01Icon,
  Edit02Icon,
  User02Icon,
} from "@hugeicons/core-free-icons"
import type { FeaturedArticle, RecentChange, Category } from "@/types"

interface HomeProps {
  featured: FeaturedArticle[]
  recentChanges: RecentChange[]
  categories: Category[]
  stats: { articles: number; categories: number; editors: number }
}

export default function Home({ featured, recentChanges, categories, stats }: HomeProps) {
  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white sm:text-6xl tracking-tight">
            MatthiasWiki
          </h1>
          <p className="mb-8 mx-auto max-w-xl text-lg text-white/60">
            A free knowledge base for curious minds.
          </p>

          {/* Search bar */}
          <form
            action="/search"
            method="get"
            className="mx-auto flex max-w-xl items-center gap-2"
          >
            <div className="relative flex-1">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40 pointer-events-none"
              />
              <input
                type="search"
                name="q"
                placeholder="Search articles, categories…"
                className="h-14 w-full rounded-2xl glass pl-12 pr-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-indigo-400/50 transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-14 px-6 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium border border-indigo-500/40 cursor-pointer transition-all"
            >
              Search
            </button>
          </form>
        </section>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { label: "Articles", value: stats.articles, icon: BookOpen01Icon },
            { label: "Categories", value: stats.categories, icon: Folder01Icon },
            { label: "Editors", value: stats.editors, icon: User02Icon },
          ].map(({ label, value, icon }) => (
            <div key={label} className="glass rounded-2xl p-4 text-center">
              <HugeiconsIcon icon={icon} className="mx-auto mb-1.5 size-5 text-indigo-400" />
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-white/50">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Featured articles */}
          <div className="lg:col-span-2 space-y-4">
            <SectionHeader icon={BookOpen01Icon} title="Featured Articles" href="/articles" />
            {featured.length === 0 ? (
              <EmptyState message="No featured articles yet." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {featured.map((article) => (
                  <FeaturedCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent changes */}
            <div>
              <SectionHeader icon={Edit02Icon} title="Recent Changes" />
              <div className="mt-4 glass rounded-2xl divide-y divide-white/8 overflow-hidden">
                {recentChanges.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-white/40">No recent changes.</p>
                ) : (
                  recentChanges.slice(0, 5).map((change, i) => (
                    <RecentChangeRow key={i} change={change} />
                  ))
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <SectionHeader icon={Folder01Icon} title="Categories" href="/categories" />
              <div className="mt-4 glass rounded-2xl p-3 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/categories`}
                    className="flex items-center gap-1.5 rounded-xl glass-sm px-3 py-1.5 text-sm text-white/65 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {cat.name}
                    <span className="text-xs text-white/30">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  )
}

function SectionHeader({
  icon,
  title,
  href,
}: {
  icon: typeof BookOpen01Icon
  title: string
  href?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={icon} className="size-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          View all
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
        </Link>
      )}
    </div>
  )
}

function FeaturedCard({ article }: { article: FeaturedArticle }) {
  return (
    <Link
      href={`/wiki/${article.slug}`}
      className="block glass glass-hover rounded-2xl p-5 transition-all duration-200 cursor-pointer group"
    >
      <Badge variant="secondary" className="mb-3">
        {article.category}
      </Badge>
      <h3 className="mb-2 font-semibold text-white group-hover:text-indigo-200 transition-colors leading-snug">
        {article.title}
      </h3>
      <p className="mb-3 text-sm text-white/55 line-clamp-2">{article.description}</p>
      <div className="flex items-center gap-3 text-xs text-white/35">
        <span className="flex items-center gap-1">
          <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
          {article.readTime}
        </span>
        <span>{article.updated}</span>
      </div>
    </Link>
  )
}

function RecentChangeRow({ change }: { change: RecentChange }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full glass text-xs font-medium text-white/70">
        {change.initials}
      </div>
      <div className="min-w-0 flex-1">
        <Link
          href={`/wiki/${change.slug}`}
          className="block truncate text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          {change.title}
        </Link>
        <p className="truncate text-xs text-white/40">{change.summary}</p>
      </div>
      <span className="shrink-0 text-xs text-white/30">{change.time}</span>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="glass rounded-2xl p-10 text-center">
      <p className="text-white/40">{message}</p>
    </div>
  )
}

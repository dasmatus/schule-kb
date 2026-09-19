import { Link } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  User02Icon,
  Edit02Icon,
  Clock01Icon,
  Add01Icon,
  Settings01Icon,
  StarIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import type { AdminStats, AdminArticle } from "@/types"

interface AdminIndexProps {
  stats: AdminStats
  recentArticles: AdminArticle[]
}

const statusVariants: Record<string, "default" | "success" | "warning" | "secondary"> = {
  published: "success",
  draft: "secondary",
  review: "warning",
}

export default function AdminIndex({ stats, recentArticles }: AdminIndexProps) {
  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-white/50">Manage your wiki</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 px-4 py-2.5 text-sm text-white font-medium border border-indigo-500/40 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
              New article
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total articles", value: stats.totalArticles, delta: stats.totalArticlesDelta, icon: BookOpen01Icon },
            { label: "Registered users", value: stats.registeredUsers, delta: stats.registeredUsersDelta, icon: User02Icon },
            { label: "Edits today", value: stats.editsToday, delta: stats.editsTodayDelta, icon: Edit02Icon },
            { label: "Pending review", value: stats.pendingReview, delta: stats.pendingReviewDelta, icon: Clock01Icon },
          ].map(({ label, value, delta, icon }) => (
            <div key={label} className="glass rounded-2xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-white/50">{label}</span>
                <HugeiconsIcon icon={icon} className="size-4 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
              {delta && (
                <div className="mt-1 text-xs text-emerald-400">{delta} this week</div>
              )}
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { href: "/admin/articles/new", icon: Add01Icon, label: "New article", desc: "Create a new wiki article" },
            { href: "/admin/feature", icon: StarIcon, label: "Featured articles", desc: "Manage homepage featured" },
            { href: "/admin/settings", icon: Settings01Icon, label: "Site settings", desc: "Configure your wiki" },
          ].map(({ href, icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 glass glass-hover rounded-2xl p-4 cursor-pointer group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                <HugeiconsIcon icon={icon} className="size-5 text-indigo-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white group-hover:text-indigo-200 transition-colors">{label}</div>
                <div className="text-xs text-white/45 truncate">{desc}</div>
              </div>
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 text-white/25 group-hover:text-white/50 shrink-0" />
            </Link>
          ))}
        </div>

        {/* Recent articles */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Recent articles</h2>
            <Link href="/admin/feature" className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-white/8">
            {recentArticles.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-white/40">No articles yet.</p>
            ) : (
              recentArticles.map((article) => (
                <div key={article.slug} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-white/85 text-sm">{article.title}</div>
                    <div className="text-xs text-white/40">{article.category} · {article.lastEdit}</div>
                  </div>
                  <Badge variant={statusVariants[article.status] ?? "secondary"}>
                    {article.status}
                  </Badge>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/articles/${article.slug}/edit`}
                      className="flex items-center justify-center h-8 w-8 rounded-lg glass cursor-pointer hover:bg-white/12 transition-all"
                    >
                      <HugeiconsIcon icon={Edit02Icon} className="size-3.5 text-white/60" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  )
}

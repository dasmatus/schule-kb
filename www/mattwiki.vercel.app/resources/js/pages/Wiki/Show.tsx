import { useEffect, useMemo } from "react"
import { Link, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { WikiSidebar } from "@/components/wiki/wiki-sidebar"
import { Toc } from "@/components/wiki/toc"
import { MarkdownRenderer } from "@/components/wiki/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit01Icon, Calendar01Icon, Clock01Icon, User02Icon } from "@hugeicons/core-free-icons"
import { preprocessMarkdown, extractToc } from "@/lib/wiki-markdown"
import { ShareButtons } from "@/components/wiki/share-buttons"
import { useReadArticles } from "@/lib/read-articles"
import type { WikiArticle, Category, SharedProps } from "@/types"

interface WikiShowProps {
  article: WikiArticle
  categories: Category[]
}

export default function WikiShow({ article, categories }: WikiShowProps) {
  const { auth } = usePage<SharedProps>().props
  const isAdmin = auth.user?.is_admin ?? false
  const processed = useMemo(() => preprocessMarkdown(article.content), [article.content])
  const toc = useMemo(() => extractToc(article.content), [article.content])
  const { readSlugs, markRead } = useReadArticles()

  useEffect(() => {
    markRead(article.slug)
  }, [article.slug, markRead])

  return (
    <AppLayout>
      <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
        <WikiHeader />

        <div className="mx-auto flex max-w-screen-xl gap-8 px-4">
          {/* Left sidebar */}
          <WikiSidebar currentSlug={article.slug} categories={categories} readSlugs={readSlugs} />

          {/* Main content with TracingBeam */}
          <main className="min-w-0 flex-1 py-6">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/categories">{article.category}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{article.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Article header */}
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Avatar size="sm">
                    <AvatarFallback>
                      <HugeiconsIcon icon={User02Icon} strokeWidth={2} className="size-3" />
                    </AvatarFallback>
                  </Avatar>
                  Written by <strong className="text-foreground">{article.author}</strong>
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-4" />
                  Last updated: {article.updatedAt}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-4" />
                  {article.readTime}
                </span>
              </div>
              <div className="mt-4">
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Markdown article body with TracingBeam */}
            <TracingBeam className="px-0">
              <article>
                <MarkdownRenderer content={processed} />
              </article>

              {/* Edit footer */}
              <Separator className="my-8" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  This article was last modified on{" "}
                  <strong className="text-foreground">{article.updatedAt}</strong> by{" "}
                  <strong className="text-foreground">{article.author}</strong>.
                </p>
                {isAdmin && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Link href={`/admin/articles/${article.slug}/edit`}>
                          <Button variant="outline" size="sm" className="rounded-full gap-2" />
                        </Link>
                      }
                    >
                      <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
                      Edit article
                    </TooltipTrigger>
                    <TooltipContent>Edit this article</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TracingBeam>
          </main>

          {/* Right TOC */}
          <Toc entries={toc} />
        </div>
      </div>
    </AppLayout>
  )
}

import * as React from "react";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import type { SharedProps } from "@/types";
import AppLayout from "@/layouts/AppLayout";
import { WikiHeader } from "@/components/wiki/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "@/components/ui/sparkles";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, ArrowRight01Icon, Edit01Icon, BookOpen01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { ContributeButtons } from "@/components/wiki/contribute-buttons";
import type { FeaturedArticle, RecentChange, Category } from "@/types";

const CATEGORY_COLORS = ["default", "secondary", "outline"] as const;
const FLIP_WORDS = ["knowledge", "collaboration", "discovery", "learning"];

interface HomeProps {
    featured?: FeaturedArticle[];
    recentChanges?: RecentChange[];
    categories?: Category[];
}

export default function Home({ featured, recentChanges, categories }: HomeProps) {
    const { settings } = usePage<SharedProps>().props;
    const { data, setData } = useForm({ q: "" });

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.visit(`/search?q=${encodeURIComponent(data.q)}`);
    }

    return (
        <AppLayout>
            <div className="relative min-h-screen bg-background">
                <WikiHeader />

                {/* Hero Section with Sparkles + Background Beams */}
                <section className="relative overflow-hidden border-b bg-muted/30 py-20">
                    <Sparkles
                        id="hero-sparkles"
                        particleDensity={60}
                        minSize={0.6}
                        maxSize={1.2}
                        className="opacity-50"
                    />
                    <BackgroundBeams beamCount={15} />
                    <div className="relative z-10 mx-auto max-w-screen-xl px-4 text-center">
                        <div className="mx-auto max-w-2xl">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                                {settings.site_name}
                            </h1>
                            <p className="mb-2 text-lg text-muted-foreground">
                                Your hub for{" "}
                                <FlipWords
                                    words={FLIP_WORDS}
                                    className="text-primary"
                                />
                            </p>
                            <p className="mb-8 text-base text-muted-foreground/80">
                                {settings.site_description}
                            </p>
                            <form onSubmit={handleSearch} className="relative mx-auto max-w-lg">
                                <HugeiconsIcon
                                    icon={Search01Icon}
                                    strokeWidth={2}
                                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search for articles"
                                    className="h-12 rounded-full pl-12 pr-28 text-base bg-white/8 border-white/15 text-white placeholder:text-white/40 backdrop-blur-md focus-visible:ring-indigo-400/50 focus-visible:border-indigo-400/40"
                                    value={data.q}
                                    onChange={(e) => setData("q", e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full"
                                    size="sm"
                                >
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-screen-xl px-4 py-12">
                    {/* Featured Articles with CardContainer (3D hover effect) */}
                    <section className="mb-12">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Featured Articles</h2>
                            <Link
                                href="/articles"
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                Browse all
                                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-3.5" />
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {featured === undefined
                                ? Array.from({ length: 3 }).map((_, i) => (
                                      <Card key={i} className="h-full animate-pulse">
                                          <CardHeader>
                                              <div className="mb-1 h-5 w-20 rounded bg-muted" />
                                              <div className="h-4 w-3/4 rounded bg-muted" />
                                              <div className="space-y-1.5 pt-1">
                                                  <div className="h-3 w-full rounded bg-muted" />
                                                  <div className="h-3 w-5/6 rounded bg-muted" />
                                                  <div className="h-3 w-4/6 rounded bg-muted" />
                                              </div>
                                          </CardHeader>
                                          <CardFooter className="gap-3">
                                              <div className="h-3 w-14 rounded bg-muted" />
                                              <div className="h-3 w-14 rounded bg-muted" />
                                          </CardFooter>
                                      </Card>
                                  ))
                                : featured.map((article, i) => (
                                      <Link
                                          key={article.slug}
                                          href={`/wiki/${article.slug}`}
                                          className="group block animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both"
                                          style={{ animationDelay: `${i * 80}ms` }}
                                      >
                                          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                                              <CardHeader>
                                                  <div className="mb-1">
                                                      <Badge variant="secondary">{article.category}</Badge>
                                                  </div>
                                                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                                                      {article.title}
                                                  </CardTitle>
                                                  <CardDescription className="line-clamp-3">
                                                      {article.description}
                                                  </CardDescription>
                                              </CardHeader>
                                              <CardFooter className="gap-3 text-xs text-muted-foreground">
                                                  <span className="flex items-center gap-1">
                                                      <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-3.5" />
                                                      {article.readTime}
                                                  </span>
                                                  <Separator orientation="vertical" className="h-3.5" />
                                                  <span className="flex items-center gap-1">
                                                      <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} className="size-3.5" />
                                                      {article.updated}
                                                  </span>
                                              </CardFooter>
                                          </Card>
                                      </Link>
                                  ))}
                        </div>
                    </section>

                    <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                        {/* Recent Changes */}
                        <section>
                            <div className="mb-4 flex items-center gap-2">
                                <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} className="size-5 text-muted-foreground" />
                                <h2 className="text-xl font-semibold">Recent Changes</h2>
                            </div>
                            <Card>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Article</TableHead>
                                                <TableHead className="hidden sm:table-cell">Summary</TableHead>
                                                <TableHead className="hidden md:table-cell">Editor</TableHead>
                                                <TableHead className="text-right">Time</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentChanges === undefined
                                                ? Array.from({ length: 5 }).map((_, i) => (
                                                      <TableRow key={i} className="animate-pulse">
                                                          <TableCell>
                                                              <div className="flex flex-col gap-1.5">
                                                                  <div className="h-3.5 w-32 rounded bg-muted" />
                                                                  <div className="h-4 w-16 rounded bg-muted" />
                                                              </div>
                                                          </TableCell>
                                                          <TableCell className="hidden sm:table-cell">
                                                              <div className="h-3 w-48 rounded bg-muted" />
                                                          </TableCell>
                                                          <TableCell className="hidden md:table-cell">
                                                              <div className="flex items-center gap-2">
                                                                  <div className="size-6 rounded-full bg-muted" />
                                                                  <div className="h-3 w-20 rounded bg-muted" />
                                                              </div>
                                                          </TableCell>
                                                          <TableCell className="text-right">
                                                              <div className="ml-auto h-3 w-14 rounded bg-muted" />
                                                          </TableCell>
                                                      </TableRow>
                                                  ))
                                                : recentChanges.map((change, i) => (
                                                      <TableRow
                                                          key={change.slug}
                                                          className="animate-in fade-in-0 duration-300"
                                                          style={{ animationDelay: `${i * 40}ms` }}
                                                      >
                                                          <TableCell>
                                                              <div className="flex flex-col gap-1">
                                                                  <Link
                                                                      href={`/wiki/${change.slug}`}
                                                                      className="font-medium text-primary hover:underline"
                                                                  >
                                                                      {change.title}
                                                                  </Link>
                                                                  <Badge variant="outline" className="w-fit">
                                                                      {change.category}
                                                                  </Badge>
                                                              </div>
                                                          </TableCell>
                                                          <TableCell className="hidden max-w-xs text-sm text-muted-foreground sm:table-cell">
                                                              {change.summary}
                                                          </TableCell>
                                                          <TableCell className="hidden md:table-cell">
                                                              <div className="flex items-center gap-2">
                                                                  <Avatar size="sm">
                                                                      <AvatarFallback className="text-[10px]">
                                                                          {change.initials}
                                                                      </AvatarFallback>
                                                                  </Avatar>
                                                                  <span className="text-sm text-muted-foreground">
                                                                      {change.editor}
                                                                  </span>
                                                              </div>
                                                          </TableCell>
                                                          <TableCell className="text-right text-sm text-muted-foreground">
                                                              {change.time}
                                                          </TableCell>
                                                      </TableRow>
                                                  ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Browse by Category with Bento Grid */}
                        <section className="w-full lg:w-64">
                            <div className="mb-4 flex items-center gap-2">
                                <HugeiconsIcon
                                    icon={BookOpen01Icon}
                                    strokeWidth={2}
                                    className="size-5 text-muted-foreground"
                                />
                                <h2 className="text-xl font-semibold">Browse</h2>
                            </div>
                            <Card>
                                <CardContent className="flex flex-col gap-2">
                                    {categories === undefined
                                        ? Array.from({ length: 4 }).map((_, i) => (
                                              <div
                                                  key={i}
                                                  className="flex animate-pulse items-center justify-between rounded-xl px-3 py-2.5"
                                              >
                                                  <div className="h-3.5 w-24 rounded bg-muted" />
                                                  <div className="h-5 w-16 rounded-full bg-muted" />
                                              </div>
                                          ))
                                        : categories.map((cat, i) => (
                                              <Link
                                                  key={cat.name}
                                                  href="/categories"
                                                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                                              >
                                                  <span className="text-sm font-medium">{cat.name}</span>
                                                  <Badge variant={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}>
                                                      {cat.count} articles
                                                  </Badge>
                                              </Link>
                                          ))}
                                </CardContent>
                            </Card>

                            <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle className="text-sm">Contribute</CardTitle>
                                    <CardDescription className="text-xs">
                                        Help improve the wiki by writing or editing articles.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ContributeButtons />
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

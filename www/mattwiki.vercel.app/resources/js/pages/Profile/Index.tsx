import { Link, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  Edit01Icon,
  Calendar01Icon,
  ArrowLeft01Icon,
  Settings01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"
import type { SharedProps } from "@/types"

interface RecentEdit {
  title: string
  slug: string
  summary: string
  time: string
}

interface ProfileUser {
  username: string
  member_since: string
}

interface ProfileIndexProps {
  profileUser: ProfileUser
  recentEdits: RecentEdit[]
}

export default function ProfileIndex({ profileUser, recentEdits }: ProfileIndexProps) {
  const { auth } = usePage<SharedProps>().props
  const isOwnProfile = auth.user?.username === profileUser.username
  const initials = profileUser.username.substring(0, 2).toUpperCase()

  return (
    <AppLayout>
      <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
        <WikiHeader />

        <div className="mx-auto max-w-screen-md px-4 py-10">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground">
                <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
                Back
              </Button>
            </Link>
          </div>

          {/* Profile card */}
          <Card className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardContent className="pt-8 pb-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                <Avatar className="size-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold uppercase">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{profileUser.username}</h1>
                  <p className="text-muted-foreground italic text-sm mt-0.5">Member</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Badge variant="outline" className="gap-1.5">
                      <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} className="size-3" />
                      Member since {profileUser.member_since}
                    </Badge>
                  </div>
                </div>
                {isOwnProfile && (
                  <Link href="/settings">
                    <Button variant="outline" size="sm" className="rounded-full gap-2">
                      <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} className="size-4" />
                      Edit profile
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats row with BentoGrid */}
          <BentoGrid className="mb-6 grid-cols-2 sm:grid-cols-3 md:auto-rows-[8rem]">
            {[
              { label: "Articles contributed", value: recentEdits.length > 0 ? String(recentEdits.length) : "—", icon: BookOpen01Icon },
              { label: "Total edits", value: "—", icon: Edit01Icon },
              { label: "Last active", value: "Today", icon: Clock01Icon },
            ].map((stat) => (
              <BentoGridItem
                key={stat.label}
                title={<span className="text-2xl font-bold">{stat.value}</span>}
                description={<span className="text-xs text-muted-foreground">{stat.label}</span>}
                header={
                  <div className="flex items-center justify-center">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <HugeiconsIcon icon={stat.icon} strokeWidth={2} className="size-6 text-primary" />
                    </div>
                  </div>
                }
              />
            ))}
          </BentoGrid>

          {/* Recent contributions */}
          <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: "240ms" }}>
            <CardHeader>
              <CardTitle className="text-base">Recent Contributions</CardTitle>
              <CardDescription>Articles recently edited</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              {recentEdits.length > 0 ? (
                <ul>
                  {recentEdits.map((edit, i) => (
                    <li key={i} className="flex items-center justify-between px-6 py-4 border-b last:border-0 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={2} className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <Link
                            href={`/wiki/${edit.slug}`}
                            className="text-sm font-medium hover:text-primary hover:underline"
                          >
                            {edit.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">{edit.summary}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 ml-4">{edit.time}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                  <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} className="size-8 opacity-30" />
                  <p className="text-sm">No contributions yet.</p>
                  <Link href="/">
                    <Button variant="outline" size="sm" className="mt-2 rounded-full">
                      Browse articles
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

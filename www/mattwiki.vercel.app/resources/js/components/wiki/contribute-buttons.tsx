import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit01Icon, User02Icon } from "@hugeicons/core-free-icons"
import type { SharedProps } from "@/types"

export function ContributeButtons() {
  const { auth } = usePage<SharedProps>().props
  const loggedIn = auth.user !== null
  const writeHref = loggedIn ? "/articles/new" : "/login"

  return (
    <div className="flex flex-col gap-2">
      <Link href={writeHref}>
        <Button variant="gradient" size="sm" className="rounded-full w-full">
          <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
          Write an article
        </Button>
      </Link>
      {!loggedIn && (
        <Link href="/signup">
          <Button variant="outline" size="sm" className="rounded-full w-full">
            <HugeiconsIcon icon={User02Icon} strokeWidth={2} />
            Create account
          </Button>
        </Link>
      )}
    </div>
  )
}

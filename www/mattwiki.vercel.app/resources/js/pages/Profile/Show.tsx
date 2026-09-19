import { usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { HugeiconsIcon } from "@hugeicons/react"
import { User02Icon, Calendar01Icon, ShieldUserIcon } from "@hugeicons/core-free-icons"
import type { SharedProps } from "@/types"

export default function ProfileShow() {
  const { auth } = usePage<SharedProps>().props

  if (!auth.user) {
    return null
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="max-w-lg">
          <h1 className="mb-6 text-3xl font-bold text-white">Profile</h1>

          <div className="glass rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30">
                <HugeiconsIcon icon={User02Icon} className="size-7 text-indigo-300" />
              </div>
              <div>
                <div className="text-xl font-semibold text-white">{auth.user.username}</div>
                {auth.user.is_admin && (
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-amber-400">
                    <HugeiconsIcon icon={ShieldUserIcon} className="size-3.5" />
                    Administrator
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <HugeiconsIcon icon={User02Icon} className="size-4 text-white/40 shrink-0" />
                <span className="text-white/50">User ID:</span>
                <span className="text-white/80">{auth.user.id}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  )
}

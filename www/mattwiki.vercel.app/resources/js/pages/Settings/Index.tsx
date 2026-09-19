import { useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserCircleIcon, LockPasswordIcon, Delete02Icon } from "@hugeicons/core-free-icons"

export default function SettingsIndex() {
  const usernameForm = useForm({ username: "" })
  const passwordForm = useForm({ current_password: "", password: "", password_confirmation: "" })
  const deleteForm = useForm({ confirmed: false })

  function handleUsername(e: React.FormEvent) {
    e.preventDefault()
    usernameForm.put("/settings/username")
  }

  function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    passwordForm.put("/settings/password")
  }

  function handleDeleteAccount(e: React.FormEvent) {
    e.preventDefault()
    deleteForm.delete("/settings/account")
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <h1 className="mb-8 text-3xl font-bold text-white">Settings</h1>

        <div className="max-w-lg space-y-6">
          {/* Username */}
          <section className="glass rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-3">
              <HugeiconsIcon icon={UserCircleIcon} className="size-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">Change username</h2>
            </div>
            <form onSubmit={handleUsername} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-white/70">
                  New username
                </label>
                <input
                  type="text"
                  value={usernameForm.data.username}
                  onChange={(e) => usernameForm.setData("username", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
                  placeholder="newusername"
                />
                {usernameForm.errors.username && (
                  <p className="mt-1.5 text-xs text-rose-400">{usernameForm.errors.username}</p>
                )}
              </div>
              <Button type="submit" disabled={usernameForm.processing} size="sm">
                {usernameForm.processing ? "Saving…" : "Save"}
              </Button>
            </form>
          </section>

          {/* Password */}
          <section className="glass rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-3">
              <HugeiconsIcon icon={LockPasswordIcon} className="size-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">Change password</h2>
            </div>
            <form onSubmit={handlePassword} className="space-y-4">
              {(
                [
                  { key: "current_password", label: "Current password" },
                  { key: "password", label: "New password" },
                  { key: "password_confirmation", label: "Confirm new password" },
                ] as const
              ).map(({ key, label }) => (
                <div key={key}>
                  <label className="block mb-2 text-sm font-medium text-white/70">{label}</label>
                  <input
                    type="password"
                    value={passwordForm.data[key]}
                    onChange={(e) => passwordForm.setData(key, e.target.value)}
                    className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    placeholder="••••••••"
                  />
                  {passwordForm.errors[key] && (
                    <p className="mt-1.5 text-xs text-rose-400">{passwordForm.errors[key]}</p>
                  )}
                </div>
              ))}
              <Button type="submit" disabled={passwordForm.processing} size="sm">
                {passwordForm.processing ? "Saving…" : "Save"}
              </Button>
            </form>
          </section>

          {/* Danger zone */}
          <section className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
            <div className="mb-5 flex items-center gap-3">
              <HugeiconsIcon icon={Delete02Icon} className="size-5 text-rose-400" />
              <h2 className="text-lg font-semibold text-rose-400">Danger zone</h2>
            </div>
            <p className="mb-4 text-sm text-white/60">
              Permanently deletes your account. This cannot be undone. Your articles will remain but will no longer be attributed to you.
            </p>
            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={deleteForm.data.confirmed}
                  onChange={(e) => deleteForm.setData("confirmed", e.target.checked)}
                  className="size-4 rounded accent-rose-500"
                />
                <span className="text-sm text-white/70">I understand this is permanent and cannot be undone</span>
              </label>
              <Button
                type="submit"
                variant="destructive"
                disabled={!deleteForm.data.confirmed || deleteForm.processing}
                size="sm"
              >
                {deleteForm.processing ? "Deleting…" : "Delete account"}
              </Button>
            </form>
          </section>
        </div>
      </main>
    </AppLayout>
  )
}

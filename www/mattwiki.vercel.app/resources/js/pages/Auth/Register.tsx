import { Link, useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, LockPasswordIcon, UserAdd01Icon, UserCircleIcon } from "@hugeicons/core-free-icons"

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post("/signup")
  }

  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30">
              <span className="text-2xl font-bold text-indigo-300">W</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="mt-1.5 text-sm text-white/50">Join MatthiasWiki</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
            <FormField
              id="username"
              label="Username"
              type="text"
              icon={UserCircleIcon}
              value={data.username}
              onChange={(v) => setData("username", v)}
              placeholder="johndoe"
              error={errors.username}
              autoComplete="username"
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              icon={Mail01Icon}
              value={data.email}
              onChange={(v) => setData("email", v)}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              icon={LockPasswordIcon}
              value={data.password}
              onChange={(v) => setData("password", v)}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="new-password"
            />
            <FormField
              id="password_confirmation"
              label="Confirm password"
              type="password"
              icon={LockPasswordIcon}
              value={data.password_confirmation}
              onChange={(v) => setData("password_confirmation", v)}
              placeholder="••••••••"
              error={errors.password_confirmation}
              autoComplete="new-password"
            />

            <Button type="submit" disabled={processing} className="w-full h-11 gap-2">
              <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
              {processing ? "Creating account…" : "Create account"}
            </Button>

            <p className="text-center text-sm text-white/45">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

function FormField({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: {
  id: string
  label: string
  type: string
  icon: typeof Mail01Icon
  value: string
  onChange: (v: string) => void
  placeholder: string
  error?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white/70">
        {label}
      </label>
      <div className="relative">
        <HugeiconsIcon
          icon={icon}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/35 pointer-events-none"
        />
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl glass-sm pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-400/50 transition-all"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  )
}

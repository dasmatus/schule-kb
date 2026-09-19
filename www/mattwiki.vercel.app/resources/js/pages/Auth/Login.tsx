import { Link, useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, LockPasswordIcon, Login01Icon } from "@hugeicons/core-free-icons"

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post("/login")
  }

  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30">
              <span className="text-2xl font-bold text-indigo-300">W</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-1.5 text-sm text-white/50">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white/70">
                Email
              </label>
              <div className="relative">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/35 pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="h-11 w-full rounded-xl glass-sm pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-400/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white/70">
                Password
              </label>
              <div className="relative">
                <HugeiconsIcon
                  icon={LockPasswordIcon}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/35 pointer-events-none"
                />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="h-11 w-full rounded-xl glass-sm pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-400/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full h-11 gap-2"
            >
              <HugeiconsIcon icon={Login01Icon} className="size-4" />
              {processing ? "Signing in…" : "Sign in"}
            </Button>

            <p className="text-center text-sm text-white/45">
              Don't have an account?{" "}
              <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

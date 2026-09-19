import { Link, usePage, router } from "@inertiajs/react"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  Menu01Icon,
  Cancel01Icon,
  Home01Icon,
  BookOpen01Icon,
  Folder01Icon,
  User02Icon,
  Settings01Icon,
  Logout01Icon,
  Login01Icon,
} from "@hugeicons/core-free-icons"
import type { SharedProps } from "@/types"

export function WikiHeader() {
  const { auth, settings } = usePage<SharedProps>().props
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.get("/search", { q: searchQuery })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 pt-4">
        <nav className="mx-auto max-w-screen-xl glass rounded-2xl px-4 py-3 glow-sm">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 font-semibold text-white transition-opacity hover:opacity-80"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/30 border border-indigo-400/30">
                <span className="text-sm font-bold text-indigo-300">W</span>
              </div>
              <span className="hidden sm:block">{settings.site_name}</span>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1 text-sm">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/articles">Articles</NavLink>
              <NavLink href="/categories">Categories</NavLink>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-3 size-4 text-white/40 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="h-9 w-48 rounded-xl bg-white/8 pl-9 pr-3 text-sm text-white placeholder:text-white/35 border border-white/12 backdrop-blur-sm focus:outline-none focus:border-indigo-400/50 focus:bg-white/12 transition-all lg:w-64"
              />
            </form>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-2">
              {auth.user ? (
                <>
                  {auth.user.is_admin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
                    >
                      <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
                  >
                    <HugeiconsIcon icon={User02Icon} className="size-4" />
                    {auth.user.username}
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer"
                  >
                    <HugeiconsIcon icon={Logout01Icon} className="size-4" />
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600/70 hover:bg-indigo-600 px-3 py-2 text-sm text-white border border-indigo-500/40 transition-all cursor-pointer"
                >
                  <HugeiconsIcon icon={Login01Icon} className="size-4" />
                  Sign in
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl glass cursor-pointer"
              aria-label="Toggle menu"
            >
              <HugeiconsIcon
                icon={mobileOpen ? Cancel01Icon : Menu01Icon}
                className="size-5 text-white/80"
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mx-auto mt-2 max-w-screen-xl glass rounded-2xl px-4 py-4 md:hidden">
            <form onSubmit={handleSearch} className="relative mb-4">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles…"
                className="h-10 w-full rounded-xl bg-white/8 pl-9 pr-3 text-sm text-white placeholder:text-white/35 border border-white/12 focus:outline-none"
              />
            </form>
            <div className="flex flex-col gap-1 text-sm">
              <MobileNavLink href="/" icon={Home01Icon} onClick={() => setMobileOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/articles" icon={BookOpen01Icon} onClick={() => setMobileOpen(false)}>Articles</MobileNavLink>
              <MobileNavLink href="/categories" icon={Folder01Icon} onClick={() => setMobileOpen(false)}>Categories</MobileNavLink>
              <div className="mt-2 pt-2 border-t border-white/10">
                {auth.user ? (
                  <>
                    <MobileNavLink href="/profile" icon={User02Icon} onClick={() => setMobileOpen(false)}>{auth.user.username}</MobileNavLink>
                    {auth.user.is_admin && (
                      <MobileNavLink href="/admin" icon={Settings01Icon} onClick={() => setMobileOpen(false)}>Admin</MobileNavLink>
                    )}
                  </>
                ) : (
                  <MobileNavLink href="/login" icon={Login01Icon} onClick={() => setMobileOpen(false)}>Sign in</MobileNavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string
  icon: typeof Home01Icon
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
    >
      <HugeiconsIcon icon={icon} className="size-4 shrink-0" />
      {children}
    </Link>
  )
}

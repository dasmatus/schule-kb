import {
  BookOpen01Icon,
  Cancel01Icon,
  Folder01Icon,
  Home01Icon,
  HugeiconsIcon,
  Login01Icon,
  Logout01Icon,
  Menu01Icon,
  Search01Icon,
  Settings01Icon,
  User02Icon
} from "./chunk-pskbp0f7.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime,
  require_react,
  router3,
  usePage
} from "./chunk-xyr75gjm.js";

// resources/js/components/wiki/header.tsx
var import_react2 = __toESM(require_react(), 1);
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function WikiHeader() {
  const { auth, settings } = usePage().props;
  const [mobileOpen, setMobileOpen] = import_react2.useState(false);
  const [searchQuery, setSearchQuery] = import_react2.useState("");
  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router3.get("/search", { q: searchQuery });
    }
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(jsx_dev_runtime.Fragment, {
    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("header", {
      className: "sticky top-0 z-40 w-full px-4 pt-4",
      children: [
        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("nav", {
          className: "mx-auto max-w-screen-xl glass rounded-2xl px-4 py-3 glow-sm",
          children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "flex items-center gap-4",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                href: "/",
                className: "flex shrink-0 items-center gap-2.5 font-semibold text-white transition-opacity hover:opacity-80",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/30 border border-indigo-400/30",
                    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                      className: "text-sm font-bold text-indigo-300",
                      children: "W"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                    className: "hidden sm:block",
                    children: settings.site_name
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "hidden md:flex items-center gap-1 text-sm",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(NavLink, {
                    href: "/",
                    children: "Home"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(NavLink, {
                    href: "/articles",
                    children: "Articles"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(NavLink, {
                    href: "/categories",
                    children: "Categories"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "flex-1"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
                onSubmit: handleSearch,
                className: "relative hidden sm:flex items-center",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                    icon: Search01Icon,
                    className: "absolute left-3 size-4 text-white/40 pointer-events-none"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                    type: "search",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: "Search…",
                    className: "h-9 w-48 rounded-xl bg-white/8 pl-9 pr-3 text-sm text-white placeholder:text-white/35 border border-white/12 backdrop-blur-sm focus:outline-none focus:border-indigo-400/50 focus:bg-white/12 transition-all lg:w-64"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "hidden md:flex items-center gap-2",
                children: auth.user ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV(jsx_dev_runtime.Fragment, {
                  children: [
                    auth.user.is_admin && /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                      href: "/admin",
                      className: "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                          icon: Settings01Icon,
                          className: "size-4"
                        }, undefined, false, undefined, this),
                        "Admin"
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                      href: "/profile",
                      className: "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-all cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                          icon: User02Icon,
                          className: "size-4"
                        }, undefined, false, undefined, this),
                        auth.user.username
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                      href: "/logout",
                      method: "post",
                      as: "button",
                      className: "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/60 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer",
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: Logout01Icon,
                        className: "size-4"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this) : /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                  href: "/login",
                  className: "flex items-center gap-1.5 rounded-xl bg-indigo-600/70 hover:bg-indigo-600 px-3 py-2 text-sm text-white border border-indigo-500/40 transition-all cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                      icon: Login01Icon,
                      className: "size-4"
                    }, undefined, false, undefined, this),
                    "Sign in"
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("button", {
                onClick: () => setMobileOpen((v) => !v),
                className: "md:hidden flex items-center justify-center h-9 w-9 rounded-xl glass cursor-pointer",
                "aria-label": "Toggle menu",
                children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                  icon: mobileOpen ? Cancel01Icon : Menu01Icon,
                  className: "size-5 text-white/80"
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        }, undefined, false, undefined, this),
        mobileOpen && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
          className: "mx-auto mt-2 max-w-screen-xl glass rounded-2xl px-4 py-4 md:hidden",
          children: [
            /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
              onSubmit: handleSearch,
              className: "relative mb-4",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                  icon: Search01Icon,
                  className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40 pointer-events-none"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                  type: "search",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search articles…",
                  className: "h-10 w-full rounded-xl bg-white/8 pl-9 pr-3 text-sm text-white placeholder:text-white/35 border border-white/12 focus:outline-none"
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "flex flex-col gap-1 text-sm",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(MobileNavLink, {
                  href: "/",
                  icon: Home01Icon,
                  onClick: () => setMobileOpen(false),
                  children: "Home"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(MobileNavLink, {
                  href: "/articles",
                  icon: BookOpen01Icon,
                  onClick: () => setMobileOpen(false),
                  children: "Articles"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(MobileNavLink, {
                  href: "/categories",
                  icon: Folder01Icon,
                  onClick: () => setMobileOpen(false),
                  children: "Categories"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mt-2 pt-2 border-t border-white/10",
                  children: auth.user ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV(jsx_dev_runtime.Fragment, {
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(MobileNavLink, {
                        href: "/profile",
                        icon: User02Icon,
                        onClick: () => setMobileOpen(false),
                        children: auth.user.username
                      }, undefined, false, undefined, this),
                      auth.user.is_admin && /* @__PURE__ */ jsx_dev_runtime.jsxDEV(MobileNavLink, {
                        href: "/admin",
                        icon: Settings01Icon,
                        onClick: () => setMobileOpen(false),
                        children: "Admin"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this) : /* @__PURE__ */ jsx_dev_runtime.jsxDEV(MobileNavLink, {
                    href: "/login",
                    icon: Login01Icon,
                    onClick: () => setMobileOpen(false),
                    children: "Sign in"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
function NavLink({ href, children }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
    href,
    className: "rounded-lg px-3 py-2 text-white/60 hover:text-white hover:bg-white/8 transition-all cursor-pointer",
    children
  }, undefined, false, undefined, this);
}
function MobileNavLink({
  href,
  icon,
  children,
  onClick
}) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
    href,
    onClick,
    className: "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-all cursor-pointer",
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
        icon,
        className: "size-4 shrink-0"
      }, undefined, false, undefined, this),
      children
    ]
  }, undefined, true, undefined, this);
}

export { WikiHeader };

//# debugId=877E09A64D9718CD64756E2164756E21
//# sourceMappingURL=chunk-9vwc7w90.js.map

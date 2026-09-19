import {
  Badge
} from "./chunk-0kz3jgz1.js";
import {
  WikiHeader
} from "./chunk-9vwc7w90.js";
import"./chunk-30kgvwqp.js";
import {
  Add01Icon,
  AppLayout,
  ArrowRight01Icon,
  BookOpen01Icon,
  Clock01Icon,
  Edit02Icon,
  HugeiconsIcon,
  Settings01Icon,
  StarIcon,
  User02Icon
} from "./chunk-pskbp0f7.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Admin/Index.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var statusVariants = {
  published: "success",
  draft: "secondary",
  review: "warning"
};
function AdminIndex({ stats, recentArticles }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8 flex flex-wrap items-center justify-between gap-4",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                    className: "text-3xl font-bold text-white",
                    children: "Admin Dashboard"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                    className: "mt-1 text-white/50",
                    children: "Manage your wiki"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "flex items-center gap-3",
                children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                  href: "/admin/articles/new",
                  className: "flex items-center gap-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 px-4 py-2.5 text-sm text-white font-medium border border-indigo-500/40 cursor-pointer transition-all",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                      icon: Add01Icon,
                      className: "size-4"
                    }, undefined, false, undefined, this),
                    "New article"
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4",
            children: [
              { label: "Total articles", value: stats.totalArticles, delta: stats.totalArticlesDelta, icon: BookOpen01Icon },
              { label: "Registered users", value: stats.registeredUsers, delta: stats.registeredUsersDelta, icon: User02Icon },
              { label: "Edits today", value: stats.editsToday, delta: stats.editsTodayDelta, icon: Edit02Icon },
              { label: "Pending review", value: stats.pendingReview, delta: stats.pendingReviewDelta, icon: Clock01Icon }
            ].map(({ label, value, delta, icon }) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "glass rounded-2xl p-5",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mb-3 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                      className: "text-sm text-white/50",
                      children: label
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                      icon,
                      className: "size-4 text-indigo-400"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "text-3xl font-bold text-white",
                  children: value
                }, undefined, false, undefined, this),
                delta && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mt-1 text-xs text-emerald-400",
                  children: [
                    delta,
                    " this week"
                  ]
                }, undefined, true, undefined, this)
              ]
            }, label, true, undefined, this))
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3",
            children: [
              { href: "/admin/articles/new", icon: Add01Icon, label: "New article", desc: "Create a new wiki article" },
              { href: "/admin/feature", icon: StarIcon, label: "Featured articles", desc: "Manage homepage featured" },
              { href: "/admin/settings", icon: Settings01Icon, label: "Site settings", desc: "Configure your wiki" }
            ].map(({ href, icon, label, desc }) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
              href,
              className: "flex items-center gap-4 glass glass-hover rounded-2xl p-4 cursor-pointer group",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/20",
                  children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                    icon,
                    className: "size-5 text-indigo-400"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "font-medium text-white group-hover:text-indigo-200 transition-colors",
                      children: label
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "text-xs text-white/45 truncate",
                      children: desc
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                  icon: ArrowRight01Icon,
                  className: "size-4 text-white/25 group-hover:text-white/50 shrink-0"
                }, undefined, false, undefined, this)
              ]
            }, href, true, undefined, this))
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "glass rounded-2xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "flex items-center justify-between px-5 py-4 border-b border-white/10",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                    className: "font-semibold text-white",
                    children: "Recent articles"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                    href: "/admin/feature",
                    className: "text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors",
                    children: "View all"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "divide-y divide-white/8",
                children: recentArticles.length === 0 ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                  className: "px-5 py-8 text-center text-sm text-white/40",
                  children: "No articles yet."
                }, undefined, false, undefined, this) : recentArticles.map((article) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "flex items-center gap-4 px-5 py-3.5",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                          className: "truncate font-medium text-white/85 text-sm",
                          children: article.title
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                          className: "text-xs text-white/40",
                          children: [
                            article.category,
                            " · ",
                            article.lastEdit
                          ]
                        }, undefined, true, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Badge, {
                      variant: statusVariants[article.status] ?? "secondary",
                      children: article.status
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "flex items-center gap-2 shrink-0",
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                        href: `/admin/articles/${article.slug}/edit`,
                        className: "flex items-center justify-center h-8 w-8 rounded-lg glass cursor-pointer hover:bg-white/12 transition-all",
                        children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                          icon: Edit02Icon,
                          className: "size-3.5 text-white/60"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this)
                  ]
                }, article.slug, true, undefined, this))
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  AdminIndex as default
};

//# debugId=BFCBC35E269F7C7664756E2164756E21
//# sourceMappingURL=chunk-dx1vynve.js.map

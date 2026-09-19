import {
  Badge
} from "./chunk-0kz3jgz1.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-1r5bk0he.js";
import {
  AppLayout,
  ArrowRight01Icon,
  BookOpen01Icon,
  Clock01Icon,
  Edit02Icon,
  Folder01Icon,
  HugeiconsIcon,
  Search01Icon,
  User02Icon
} from "./chunk-00jn6zq7.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Home/Index.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Home({ featured, recentChanges, categories, stats }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("section", {
            className: "mb-12 text-center",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                className: "mb-4 text-5xl font-bold text-white sm:text-6xl tracking-tight",
                children: "MatthiasWiki"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "mb-8 mx-auto max-w-xl text-lg text-white/60",
                children: "A free knowledge base for curious minds."
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
                action: "/search",
                method: "get",
                className: "mx-auto flex max-w-xl items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "relative flex-1",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: Search01Icon,
                        className: "absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40 pointer-events-none"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        type: "search",
                        name: "q",
                        placeholder: "Search articles, categories…",
                        className: "h-14 w-full rounded-2xl glass pl-12 pr-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-indigo-400/50 transition-all"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("button", {
                    type: "submit",
                    className: "h-14 px-6 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium border border-indigo-500/40 cursor-pointer transition-all",
                    children: "Search"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-10 grid grid-cols-3 gap-4 max-w-lg mx-auto",
            children: [
              { label: "Articles", value: stats.articles, icon: BookOpen01Icon },
              { label: "Categories", value: stats.categories, icon: Folder01Icon },
              { label: "Editors", value: stats.editors, icon: User02Icon }
            ].map(({ label, value, icon }) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "glass rounded-2xl p-4 text-center",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                  icon,
                  className: "mx-auto mb-1.5 size-5 text-indigo-400"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "text-2xl font-bold text-white",
                  children: value
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "text-xs text-white/50",
                  children: label
                }, undefined, false, undefined, this)
              ]
            }, label, true, undefined, this))
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "grid grid-cols-1 gap-8 lg:grid-cols-3",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "lg:col-span-2 space-y-4",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(SectionHeader, {
                    icon: BookOpen01Icon,
                    title: "Featured Articles",
                    href: "/articles"
                  }, undefined, false, undefined, this),
                  featured.length === 0 ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV(EmptyState, {
                    message: "No featured articles yet."
                  }, undefined, false, undefined, this) : /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "grid gap-4 sm:grid-cols-2",
                    children: featured.map((article) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV(FeaturedCard, {
                      article
                    }, article.slug, false, undefined, this))
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(SectionHeader, {
                        icon: Edit02Icon,
                        title: "Recent Changes"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        className: "mt-4 glass rounded-2xl divide-y divide-white/8 overflow-hidden",
                        children: recentChanges.length === 0 ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                          className: "px-4 py-3 text-sm text-white/40",
                          children: "No recent changes."
                        }, undefined, false, undefined, this) : recentChanges.slice(0, 5).map((change, i) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV(RecentChangeRow, {
                          change
                        }, i, false, undefined, this))
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(SectionHeader, {
                        icon: Folder01Icon,
                        title: "Categories",
                        href: "/categories"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        className: "mt-4 glass rounded-2xl p-3 flex flex-wrap gap-2",
                        children: categories.map((cat) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                          href: `/categories`,
                          className: "flex items-center gap-1.5 rounded-xl glass-sm px-3 py-1.5 text-sm text-white/65 hover:text-white hover:bg-white/10 transition-all cursor-pointer",
                          children: [
                            cat.name,
                            /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                              className: "text-xs text-white/30",
                              children: cat.count
                            }, undefined, false, undefined, this)
                          ]
                        }, cat.name, true, undefined, this))
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function SectionHeader({
  icon,
  title,
  href
}) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    className: "flex items-center justify-between",
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
            icon,
            className: "size-5 text-indigo-400"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
            className: "text-lg font-semibold text-white",
            children: title
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      href && /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
        href,
        className: "flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer",
        children: [
          "View all",
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
            icon: ArrowRight01Icon,
            className: "size-3.5"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function FeaturedCard({ article }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
    href: `/wiki/${article.slug}`,
    className: "block glass glass-hover rounded-2xl p-5 transition-all duration-200 cursor-pointer group",
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Badge, {
        variant: "secondary",
        className: "mb-3",
        children: article.category
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h3", {
        className: "mb-2 font-semibold text-white group-hover:text-indigo-200 transition-colors leading-snug",
        children: article.title
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
        className: "mb-3 text-sm text-white/55 line-clamp-2",
        children: article.description
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
        className: "flex items-center gap-3 text-xs text-white/35",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                icon: Clock01Icon,
                className: "size-3.5"
              }, undefined, false, undefined, this),
              article.readTime
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
            children: article.updated
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function RecentChangeRow({ change }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    className: "flex items-start gap-3 px-4 py-3",
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
        className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full glass text-xs font-medium text-white/70",
        children: change.initials
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
        className: "min-w-0 flex-1",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
            href: `/wiki/${change.slug}`,
            className: "block truncate text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer",
            children: change.title
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
            className: "truncate text-xs text-white/40",
            children: change.summary
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
        className: "shrink-0 text-xs text-white/30",
        children: change.time
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function EmptyState({ message }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    className: "glass rounded-2xl p-10 text-center",
    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
      className: "text-white/40",
      children: message
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
export {
  Home as default
};

//# debugId=FE746F73ECA6D55164756E2164756E21
//# sourceMappingURL=chunk-w312by0m.js.map

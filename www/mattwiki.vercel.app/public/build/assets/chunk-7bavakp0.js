import {
  Badge
} from "./chunk-0kz3jgz1.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-gnxecgnj.js";
import {
  Add01Icon,
  AppLayout,
  BookOpen01Icon,
  Clock01Icon,
  HugeiconsIcon
} from "./chunk-5fxvs7ay.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime,
  usePage
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Articles/Index.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function ArticlesIndex({ articles }) {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                    className: "text-3xl font-bold text-white",
                    children: "All Articles"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                    className: "mt-1 text-white/50",
                    children: articles === undefined ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                      className: "inline-block w-24 h-4 bg-white/10 rounded animate-pulse"
                    }, undefined, false, undefined, this) : `${articles.length} articles published`
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              auth.user && /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                href: "/articles/new",
                className: "flex items-center gap-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 px-4 py-2.5 text-sm text-white font-medium border border-indigo-500/40 cursor-pointer transition-all",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                    icon: Add01Icon,
                    className: "size-4"
                  }, undefined, false, undefined, this),
                  "New article"
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this),
          articles === undefined ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
            children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "glass rounded-2xl p-6 animate-pulse",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mb-3 h-5 w-20 rounded-full bg-white/10"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mb-2 h-5 w-3/4 rounded bg-white/10"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mb-1 h-3 w-full rounded bg-white/10"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mb-1 h-3 w-5/6 rounded bg-white/10"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "mb-4 h-3 w-2/3 rounded bg-white/10"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "flex gap-3",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "h-3 w-16 rounded bg-white/10"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "h-3 w-20 rounded bg-white/10"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              ]
            }, i, true, undefined, this))
          }, undefined, false, undefined, this) : articles.length === 0 ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "glass rounded-2xl p-16 text-center",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                icon: BookOpen01Icon,
                className: "mx-auto mb-4 size-12 text-white/20"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "text-white/40",
                children: "No articles yet."
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this) : /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
            children: articles.map((article) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
              href: `/wiki/${article.slug}`,
              className: "block glass glass-hover rounded-2xl p-6 cursor-pointer group",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Badge, {
                  variant: "secondary",
                  className: "mb-3",
                  children: article.category
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                  className: "mb-2 font-semibold text-white group-hover:text-indigo-200 transition-colors leading-snug",
                  children: article.title
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                  className: "mb-4 text-sm text-white/55 line-clamp-3",
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
            }, article.slug, true, undefined, this))
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  ArticlesIndex as default
};

//# debugId=112FE1D1C7D950DE64756E2164756E21
//# sourceMappingURL=chunk-7bavakp0.js.map

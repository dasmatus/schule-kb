import {
  WikiHeader
} from "./chunk-9vwc7w90.js";
import {
  AppLayout,
  ArrowRight01Icon,
  Folder01Icon,
  HugeiconsIcon
} from "./chunk-pskbp0f7.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Categories/Index.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function CategoriesIndex({ categories }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                className: "text-3xl font-bold text-white",
                children: "Categories"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "mt-1 text-white/50",
                children: [
                  categories.length,
                  " categories"
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
            children: categories.map((category) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "glass rounded-2xl overflow-hidden",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "flex items-center gap-3 px-5 py-4 border-b border-white/10",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/25",
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: Folder01Icon,
                        className: "size-4 text-indigo-400"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                          className: "font-semibold text-white",
                          children: category.name
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                          className: "text-xs text-white/40",
                          children: [
                            category.count,
                            " articles"
                          ]
                        }, undefined, true, undefined, this)
                      ]
                    }, undefined, true, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("ul", {
                  className: "p-2",
                  children: [
                    category.articles.slice(0, 5).map((article) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("li", {
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                        href: `/wiki/${article.slug}`,
                        className: "flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/6 transition-all cursor-pointer group",
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                            className: "truncate",
                            children: article.title
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                            icon: ArrowRight01Icon,
                            className: "size-3.5 text-white/25 group-hover:text-white/50 shrink-0 ml-2"
                          }, undefined, false, undefined, this)
                        ]
                      }, undefined, true, undefined, this)
                    }, article.slug, false, undefined, this)),
                    category.articles.length > 5 && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("li", {
                      className: "px-3 py-2 text-xs text-white/30 text-center",
                      children: [
                        "+",
                        category.articles.length - 5,
                        " more"
                      ]
                    }, undefined, true, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              ]
            }, category.name, true, undefined, this))
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  CategoriesIndex as default
};

//# debugId=F998719E9953D48864756E2164756E21
//# sourceMappingURL=chunk-01w889b3.js.map

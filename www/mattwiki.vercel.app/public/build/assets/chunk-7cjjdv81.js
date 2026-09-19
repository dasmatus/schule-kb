import {
  Badge
} from "./chunk-0kz3jgz1.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-9vwc7w90.js";
import {
  AppLayout,
  Clock01Icon,
  HugeiconsIcon,
  Search01Icon
} from "./chunk-pskbp0f7.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime,
  require_react,
  router3
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Search/Index.tsx
var import_react2 = __toESM(require_react(), 1);
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function SearchPage({ query, results }) {
  const [q, setQ] = import_react2.useState(query);
  function handleSearch(e) {
    e.preventDefault();
    router3.get("/search", { q }, { preserveState: true });
  }
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
                children: "Search"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "mt-1 text-white/50",
                children: query ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"` : "Search the knowledge base"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
            onSubmit: handleSearch,
            className: "mb-8 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "relative flex-1",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                    icon: Search01Icon,
                    className: "absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40 pointer-events-none"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                    autoFocus: true,
                    type: "search",
                    value: q,
                    onChange: (e) => setQ(e.target.value),
                    placeholder: "Search articles…",
                    className: "h-13 w-full rounded-2xl glass pl-12 pr-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-indigo-400/50 transition-all"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("button", {
                type: "submit",
                className: "h-13 px-6 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium border border-indigo-500/40 cursor-pointer transition-all",
                children: "Search"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          query && results.length === 0 && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "glass rounded-2xl p-16 text-center",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                icon: Search01Icon,
                className: "mx-auto mb-4 size-12 text-white/20"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "text-white/40",
                children: [
                  'No results found for "',
                  query,
                  '"'
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "space-y-3",
            children: results.map((article) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
              href: `/wiki/${article.slug}`,
              className: "block glass glass-hover rounded-2xl p-5 cursor-pointer group",
              children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "flex items-start justify-between gap-4",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "min-w-0 flex-1",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        className: "mb-1.5 flex items-center gap-2",
                        children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Badge, {
                          variant: "secondary",
                          children: article.category
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h3", {
                        className: "font-semibold text-white group-hover:text-indigo-200 transition-colors",
                        children: article.title
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                        className: "mt-1 text-sm text-white/55 line-clamp-2",
                        children: article.description
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "shrink-0 flex items-center gap-1 text-xs text-white/35",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: Clock01Icon,
                        className: "size-3.5"
                      }, undefined, false, undefined, this),
                      article.readTime
                    ]
                  }, undefined, true, undefined, this)
                ]
              }, undefined, true, undefined, this)
            }, article.slug, false, undefined, this))
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  SearchPage as default
};

//# debugId=DEF1F80D5DC4BB3064756E2164756E21
//# sourceMappingURL=chunk-7cjjdv81.js.map

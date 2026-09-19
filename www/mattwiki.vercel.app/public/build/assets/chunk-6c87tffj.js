import {
  Badge
} from "./chunk-0kz3jgz1.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-1r5bk0he.js";
import {
  AppLayout,
  HugeiconsIcon,
  StarIcon,
  StarOffIcon
} from "./chunk-00jn6zq7.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  router3
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Admin/Feature.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function AdminFeature({ articles }) {
  function toggle(slug) {
    router3.put(`/admin/feature/${slug}`);
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
                children: "Featured articles"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "mt-1 text-white/50",
                children: "Toggle which articles appear on the homepage"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "glass rounded-2xl overflow-hidden",
            children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "divide-y divide-white/8",
              children: articles.length === 0 ? /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "px-5 py-10 text-center text-sm text-white/40",
                children: "No published articles."
              }, undefined, false, undefined, this) : articles.map((article) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "flex items-center gap-4 px-5 py-3.5",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("button", {
                    onClick: () => toggle(article.slug),
                    className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border cursor-pointer transition-all ${article.featured ? "bg-amber-500/20 border-amber-500/30 text-amber-400" : "glass border-white/12 text-white/30 hover:text-white/60"}`,
                    "aria-label": article.featured ? "Unfeature" : "Feature",
                    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                      icon: article.featured ? StarIcon : StarOffIcon,
                      className: "size-4"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "min-w-0 flex-1",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        className: "truncate font-medium text-white/85 text-sm",
                        children: article.title
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        className: "text-xs text-white/40",
                        children: article.category
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  article.featured && /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Badge, {
                    variant: "warning",
                    children: "Featured"
                  }, undefined, false, undefined, this)
                ]
              }, article.slug, true, undefined, this))
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  AdminFeature as default
};

//# debugId=0EDB09B0D74212A764756E2164756E21
//# sourceMappingURL=chunk-6c87tffj.js.map

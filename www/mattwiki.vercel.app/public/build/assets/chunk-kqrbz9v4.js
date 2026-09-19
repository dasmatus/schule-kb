import {
  Button
} from "./chunk-d90hctpn.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-9vwc7w90.js";
import {
  AppLayout,
  BookOpen01Icon,
  HugeiconsIcon
} from "./chunk-pskbp0f7.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  useForm
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Admin/Articles/Create.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function AdminArticleCreate({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    slug: "",
    content: "",
    category_id: "",
    tags: "",
    status: "draft"
  });
  function handleSubmit(e) {
    e.preventDefault();
    post("/admin/articles");
  }
  function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                icon: BookOpen01Icon,
                className: "size-6 text-indigo-400"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                className: "text-3xl font-bold text-white",
                children: "New article"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
            onSubmit: handleSubmit,
            className: "grid grid-cols-1 gap-6 lg:grid-cols-3",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "lg:col-span-2 space-y-5",
                children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "glass rounded-2xl p-6 space-y-5",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Title",
                      error: errors.title,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        type: "text",
                        value: data.title,
                        onChange: (e) => {
                          setData("title", e.target.value);
                          setData("slug", generateSlug(e.target.value));
                        },
                        className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50",
                        placeholder: "Article title"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Slug",
                      error: errors.slug,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        type: "text",
                        value: data.slug,
                        onChange: (e) => setData("slug", e.target.value),
                        className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50",
                        placeholder: "article-slug"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Content (Markdown)",
                      error: errors.content,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("textarea", {
                        value: data.content,
                        onChange: (e) => setData("content", e.target.value),
                        rows: 22,
                        className: "w-full rounded-xl glass-sm px-4 py-3 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50 resize-y min-h-80",
                        placeholder: `# Heading

Write your article in Markdown…`
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "space-y-5",
                children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "glass rounded-2xl p-5 space-y-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h3", {
                      className: "font-semibold text-white",
                      children: "Publish"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Status",
                      error: errors.status,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("select", {
                        value: data.status,
                        onChange: (e) => setData("status", e.target.value),
                        className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50",
                        style: { background: "rgba(255,255,255,0.06)" },
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("option", {
                            value: "draft",
                            children: "Draft"
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("option", {
                            value: "review",
                            children: "In review"
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("option", {
                            value: "published",
                            children: "Published"
                          }, undefined, false, undefined, this)
                        ]
                      }, undefined, true, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Category",
                      error: errors.category_id,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("select", {
                        value: data.category_id,
                        onChange: (e) => setData("category_id", e.target.value),
                        className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50",
                        style: { background: "rgba(255,255,255,0.06)" },
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("option", {
                            value: "",
                            children: "Select category…"
                          }, undefined, false, undefined, this),
                          categories.map((cat) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("option", {
                            value: cat.name,
                            children: cat.name
                          }, cat.name, false, undefined, this))
                        ]
                      }, undefined, true, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Tags",
                      error: errors.tags,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        type: "text",
                        value: data.tags,
                        onChange: (e) => setData("tags", e.target.value),
                        className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50",
                        placeholder: "math, vectors"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                      type: "submit",
                      disabled: processing,
                      className: "w-full",
                      children: processing ? "Saving…" : "Create article"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function Field({ label, error, children }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
        className: "block mb-1.5 text-sm font-medium text-white/70",
        children: label
      }, undefined, false, undefined, this),
      children,
      error && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
        className: "mt-1 text-xs text-rose-400",
        children: error
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  AdminArticleCreate as default
};

//# debugId=500988976A8FECA264756E2164756E21
//# sourceMappingURL=chunk-kqrbz9v4.js.map

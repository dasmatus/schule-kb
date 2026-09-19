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

// resources/js/pages/Article/Create.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function ArticleCreate({ categories }) {
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
    post("/articles");
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
                        className: "input-glass",
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
                        className: "input-glass",
                        placeholder: "article-slug"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                      label: "Content (Markdown)",
                      error: errors.content,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("textarea", {
                        value: data.content,
                        onChange: (e) => setData("content", e.target.value),
                        rows: 20,
                        className: "input-glass font-mono text-sm resize-y min-h-80",
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
                        className: "input-glass",
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
                        className: "input-glass",
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
                      label: "Tags (comma separated)",
                      error: errors.tags,
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        type: "text",
                        value: data.tags,
                        onChange: (e) => setData("tags", e.target.value),
                        className: "input-glass",
                        placeholder: "math, algebra, vectors"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                      type: "submit",
                      disabled: processing,
                      className: "w-full",
                      children: processing ? "Publishing…" : "Publish article"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("style", {
        children: `
        .input-glass {
          width: 100%;
          border-radius: 12px;
          padding: 0.5rem 0.875rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          font-size: 0.875rem;
          backdrop-filter: blur(8px);
          outline: none;
          transition: border-color 150ms;
        }
        .input-glass::placeholder { color: rgba(255,255,255,0.3); }
        .input-glass:focus { border-color: rgba(99,102,241,0.5); }
        .input-glass option { background: #1e1b4b; color: white; }
      `
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
        className: "block mb-2 text-sm font-medium text-white/70",
        children: label
      }, undefined, false, undefined, this),
      children,
      error && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
        className: "mt-1.5 text-xs text-rose-400",
        children: error
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  ArticleCreate as default
};

//# debugId=2A32184B6A24C86364756E2164756E21
//# sourceMappingURL=chunk-w3z2mdmh.js.map

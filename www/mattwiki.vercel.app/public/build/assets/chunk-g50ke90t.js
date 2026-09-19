import {
  Button
} from "./chunk-d90hctpn.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-gnxecgnj.js";
import {
  AppLayout,
  HugeiconsIcon,
  Settings01Icon
} from "./chunk-5fxvs7ay.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  useForm
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Admin/Settings.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function AdminSettings({ settings }) {
  const { data, setData, put, processing, errors } = useForm({
    site_name: settings.site_name ?? "",
    site_description: settings.site_description ?? "",
    primary_hue: settings.primary_hue ?? "230",
    primary_chroma: settings.primary_chroma ?? "0.15",
    primary_l: settings.primary_l ?? "0.80"
  });
  function handleSubmit(e) {
    e.preventDefault();
    put("/admin/settings");
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
                icon: Settings01Icon,
                className: "size-6 text-indigo-400"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                className: "text-3xl font-bold text-white",
                children: "Site settings"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
            onSubmit: handleSubmit,
            className: "max-w-lg space-y-6",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("section", {
                className: "glass rounded-2xl p-6 space-y-5",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                    className: "font-semibold text-white border-b border-white/10 pb-3",
                    children: "General"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                    label: "Site name",
                    error: errors.site_name,
                    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                      type: "text",
                      value: data.site_name,
                      onChange: (e) => setData("site_name", e.target.value),
                      className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50",
                      placeholder: "MatthiasWiki"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                    label: "Site description",
                    error: errors.site_description,
                    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("textarea", {
                      value: data.site_description,
                      onChange: (e) => setData("site_description", e.target.value),
                      rows: 3,
                      className: "w-full rounded-xl glass-sm px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50 resize-none",
                      placeholder: "A wiki you know…"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("section", {
                className: "glass rounded-2xl p-6 space-y-5",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                    className: "font-semibold text-white border-b border-white/10 pb-3",
                    children: "Primary colour (OKLCH)"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "grid grid-cols-3 gap-3",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                        label: "Lightness",
                        error: errors.primary_l,
                        children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                          type: "number",
                          step: "0.01",
                          min: "0",
                          max: "1",
                          value: data.primary_l,
                          onChange: (e) => setData("primary_l", e.target.value),
                          className: "h-10 w-full rounded-xl glass-sm px-3 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                        label: "Chroma",
                        error: errors.primary_chroma,
                        children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                          type: "number",
                          step: "0.01",
                          min: "0",
                          max: "0.4",
                          value: data.primary_chroma,
                          onChange: (e) => setData("primary_chroma", e.target.value),
                          className: "h-10 w-full rounded-xl glass-sm px-3 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Field, {
                        label: "Hue",
                        error: errors.primary_hue,
                        children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                          type: "number",
                          step: "1",
                          min: "0",
                          max: "360",
                          value: data.primary_hue,
                          onChange: (e) => setData("primary_hue", e.target.value),
                          className: "h-10 w-full rounded-xl glass-sm px-3 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "h-8 rounded-xl border border-white/10",
                    style: { background: `oklch(${data.primary_l} ${data.primary_chroma} ${data.primary_hue})` }
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                type: "submit",
                disabled: processing,
                className: "w-full",
                children: processing ? "Saving…" : "Save settings"
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
  AdminSettings as default
};

//# debugId=F457C81FC385AC9D64756E2164756E21
//# sourceMappingURL=chunk-g50ke90t.js.map

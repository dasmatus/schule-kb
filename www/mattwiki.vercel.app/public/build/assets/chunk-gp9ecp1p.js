import {
  WikiHeader
} from "./chunk-9vwc7w90.js";
import {
  AppLayout,
  HugeiconsIcon,
  ShieldUserIcon,
  User02Icon
} from "./chunk-pskbp0f7.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  usePage
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Profile/Show.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function ProfileShow() {
  const { auth } = usePage().props;
  if (!auth.user) {
    return null;
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
          className: "max-w-lg",
          children: [
            /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
              className: "mb-6 text-3xl font-bold text-white",
              children: "Profile"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
              className: "glass rounded-2xl p-6 space-y-5",
              children: [
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "flex items-center gap-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30",
                      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: User02Icon,
                        className: "size-7 text-indigo-300"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                          className: "text-xl font-semibold text-white",
                          children: auth.user.username
                        }, undefined, false, undefined, this),
                        auth.user.is_admin && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                          className: "mt-1 flex items-center gap-1.5 text-sm text-amber-400",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                              icon: ShieldUserIcon,
                              className: "size-3.5"
                            }, undefined, false, undefined, this),
                            "Administrator"
                          ]
                        }, undefined, true, undefined, this)
                      ]
                    }, undefined, true, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                  className: "border-t border-white/10 pt-4 space-y-3",
                  children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "flex items-center gap-3 text-sm",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: User02Icon,
                        className: "size-4 text-white/40 shrink-0"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                        className: "text-white/50",
                        children: "User ID:"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                        className: "text-white/80",
                        children: auth.user.id
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  ProfileShow as default
};

//# debugId=A2C82AB8B6487A2464756E2164756E21
//# sourceMappingURL=chunk-gp9ecp1p.js.map

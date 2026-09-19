import {
  Button
} from "./chunk-d90hctpn.js";
import"./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-1r5bk0he.js";
import {
  AppLayout,
  HugeiconsIcon,
  LockPasswordIcon,
  UserCircleIcon
} from "./chunk-00jn6zq7.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  useForm
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Settings/Index.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function SettingsIndex() {
  const usernameForm = useForm({ username: "" });
  const passwordForm = useForm({ current_password: "", password: "", password_confirmation: "" });
  function handleUsername(e) {
    e.preventDefault();
    usernameForm.put("/settings/username");
  }
  function handlePassword(e) {
    e.preventDefault();
    passwordForm.put("/settings/password");
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("main", {
        className: "mx-auto max-w-screen-xl px-4 py-10 animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
            className: "mb-8 text-3xl font-bold text-white",
            children: "Settings"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "max-w-lg space-y-6",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("section", {
                className: "glass rounded-2xl p-6",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "mb-5 flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: UserCircleIcon,
                        className: "size-5 text-indigo-400"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                        className: "text-lg font-semibold text-white",
                        children: "Change username"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
                    onSubmit: handleUsername,
                    className: "space-y-4",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
                            className: "block mb-2 text-sm font-medium text-white/70",
                            children: "New username"
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                            type: "text",
                            value: usernameForm.data.username,
                            onChange: (e) => usernameForm.setData("username", e.target.value),
                            className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none",
                            placeholder: "newusername"
                          }, undefined, false, undefined, this),
                          usernameForm.errors.username && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                            className: "mt-1.5 text-xs text-rose-400",
                            children: usernameForm.errors.username
                          }, undefined, false, undefined, this)
                        ]
                      }, undefined, true, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                        type: "submit",
                        disabled: usernameForm.processing,
                        size: "sm",
                        children: usernameForm.processing ? "Saving…" : "Save"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("section", {
                className: "glass rounded-2xl p-6",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "mb-5 flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: LockPasswordIcon,
                        className: "size-5 text-indigo-400"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h2", {
                        className: "text-lg font-semibold text-white",
                        children: "Change password"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
                    onSubmit: handlePassword,
                    className: "space-y-4",
                    children: [
                      [
                        { key: "current_password", label: "Current password" },
                        { key: "password", label: "New password" },
                        { key: "password_confirmation", label: "Confirm new password" }
                      ].map(({ key, label }) => /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
                            className: "block mb-2 text-sm font-medium text-white/70",
                            children: label
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                            type: "password",
                            value: passwordForm.data[key],
                            onChange: (e) => passwordForm.setData(key, e.target.value),
                            className: "h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none",
                            placeholder: "••••••••"
                          }, undefined, false, undefined, this),
                          passwordForm.errors[key] && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                            className: "mt-1.5 text-xs text-rose-400",
                            children: passwordForm.errors[key]
                          }, undefined, false, undefined, this)
                        ]
                      }, key, true, undefined, this)),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                        type: "submit",
                        disabled: passwordForm.processing,
                        size: "sm",
                        children: passwordForm.processing ? "Saving…" : "Save"
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
export {
  SettingsIndex as default
};

//# debugId=0F13237A69DC5A8864756E2164756E21
//# sourceMappingURL=chunk-1h99bxff.js.map

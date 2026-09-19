import {
  Button
} from "./chunk-d90hctpn.js";
import"./chunk-30kgvwqp.js";
import {
  AppLayout,
  HugeiconsIcon,
  LockPasswordIcon,
  Login01Icon,
  Mail01Icon
} from "./chunk-pskbp0f7.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime,
  useForm
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Auth/Login.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: ""
  });
  function handleSubmit(e) {
    e.preventDefault();
    post("/login");
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AppLayout, {
    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
      className: "flex min-h-screen items-center justify-center px-4 py-20",
      children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
        className: "w-full max-w-md animate-fade-in",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
            className: "mb-8 text-center",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30",
                children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
                  className: "text-2xl font-bold text-indigo-300",
                  children: "W"
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h1", {
                className: "text-2xl font-bold text-white",
                children: "Welcome back"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "mt-1.5 text-sm text-white/50",
                children: "Sign in to your account"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
            onSubmit: handleSubmit,
            className: "glass rounded-2xl p-8 space-y-5",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
                    htmlFor: "email",
                    className: "block mb-2 text-sm font-medium text-white/70",
                    children: "Email"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "relative",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: Mail01Icon,
                        className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/35 pointer-events-none"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        id: "email",
                        type: "email",
                        autoComplete: "email",
                        value: data.email,
                        onChange: (e) => setData("email", e.target.value),
                        className: "h-11 w-full rounded-xl glass-sm pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-400/50 transition-all",
                        placeholder: "you@example.com"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  errors.email && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                    className: "mt-1.5 text-xs text-rose-400",
                    children: errors.email
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
                    htmlFor: "password",
                    className: "block mb-2 text-sm font-medium text-white/70",
                    children: "Password"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
                    className: "relative",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                        icon: LockPasswordIcon,
                        className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/35 pointer-events-none"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
                        id: "password",
                        type: "password",
                        autoComplete: "current-password",
                        value: data.password,
                        onChange: (e) => setData("password", e.target.value),
                        className: "h-11 w-full rounded-xl glass-sm pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-400/50 transition-all",
                        placeholder: "••••••••"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  errors.password && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                    className: "mt-1.5 text-xs text-rose-400",
                    children: errors.password
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                type: "submit",
                disabled: processing,
                className: "w-full h-11 gap-2",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                    icon: Login01Icon,
                    className: "size-4"
                  }, undefined, false, undefined, this),
                  processing ? "Signing in…" : "Sign in"
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "text-center text-sm text-white/45",
                children: [
                  "Don't have an account?",
                  " ",
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                    href: "/signup",
                    className: "text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer",
                    children: "Sign up"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
export {
  Login as default
};

//# debugId=F1F1595443156F5864756E2164756E21
//# sourceMappingURL=chunk-4t8e27jx.js.map

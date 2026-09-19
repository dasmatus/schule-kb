import {
  Button
} from "./chunk-d90hctpn.js";
import"./chunk-30kgvwqp.js";
import {
  AppLayout,
  HugeiconsIcon,
  LockPasswordIcon,
  Mail01Icon,
  UserAdd01Icon,
  UserCircleIcon
} from "./chunk-mjs1svns.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime,
  useForm
} from "./chunk-xyr75gjm.js";

// resources/js/pages/Auth/Register.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Register() {
  const { data, setData, post, processing, errors } = useForm({
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  function handleSubmit(e) {
    e.preventDefault();
    post("/signup");
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
                children: "Create account"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "mt-1.5 text-sm text-white/50",
                children: "Join MatthiasWiki"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("form", {
            onSubmit: handleSubmit,
            className: "glass rounded-2xl p-8 space-y-5",
            children: [
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(FormField, {
                id: "username",
                label: "Username",
                type: "text",
                icon: UserCircleIcon,
                value: data.username,
                onChange: (v) => setData("username", v),
                placeholder: "johndoe",
                error: errors.username,
                autoComplete: "username"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(FormField, {
                id: "email",
                label: "Email",
                type: "email",
                icon: Mail01Icon,
                value: data.email,
                onChange: (v) => setData("email", v),
                placeholder: "you@example.com",
                error: errors.email,
                autoComplete: "email"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(FormField, {
                id: "password",
                label: "Password",
                type: "password",
                icon: LockPasswordIcon,
                value: data.password,
                onChange: (v) => setData("password", v),
                placeholder: "••••••••",
                error: errors.password,
                autoComplete: "new-password"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(FormField, {
                id: "password_confirmation",
                label: "Confirm password",
                type: "password",
                icon: LockPasswordIcon,
                value: data.password_confirmation,
                onChange: (v) => setData("password_confirmation", v),
                placeholder: "••••••••",
                error: errors.password_confirmation,
                autoComplete: "new-password"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Button, {
                type: "submit",
                disabled: processing,
                className: "w-full h-11 gap-2",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
                    icon: UserAdd01Icon,
                    className: "size-4"
                  }, undefined, false, undefined, this),
                  processing ? "Creating account…" : "Create account"
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
                className: "text-center text-sm text-white/45",
                children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsx_dev_runtime.jsxDEV(Link_default, {
                    href: "/login",
                    className: "text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer",
                    children: "Sign in"
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
function FormField({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  placeholder,
  error,
  autoComplete
}) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("label", {
        htmlFor: id,
        className: "block mb-2 text-sm font-medium text-white/70",
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
        className: "relative",
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV(HugeiconsIcon, {
            icon,
            className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/35 pointer-events-none"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
            id,
            type,
            autoComplete,
            value,
            onChange: (e) => onChange(e.target.value),
            placeholder,
            className: "h-11 w-full rounded-xl glass-sm pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-400/50 transition-all"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      error && /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
        className: "mt-1.5 text-xs text-rose-400",
        children: error
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  Register as default
};

//# debugId=53348BB018BBAB3E64756E2164756E21
//# sourceMappingURL=chunk-jc1jg3pj.js.map

import {
  cn
} from "./chunk-30kgvwqp.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "./chunk-xyr75gjm.js";

// resources/js/components/ui/badge.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var variants = {
  default: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  secondary: "bg-white/8 text-white/70 border border-white/12",
  outline: "bg-transparent text-white/70 border border-white/20",
  success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  destructive: "bg-rose-500/20 text-rose-300 border border-rose-500/30"
};
function Badge({ className, variant = "default", ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("span", {
    className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm", variants[variant], className),
    ...props
  }, undefined, false, undefined, this);
}

export { Badge };

//# debugId=ACE4694C9F37DCB264756E2164756E21
//# sourceMappingURL=chunk-0kz3jgz1.js.map

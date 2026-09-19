import {
  cn
} from "./chunk-30kgvwqp.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "./chunk-xyr75gjm.js";

// resources/js/components/ui/button.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var variants = {
  default: "bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-500/50 backdrop-blur-sm shadow-lg shadow-indigo-500/20",
  primary: "bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-500/50 backdrop-blur-sm shadow-lg shadow-indigo-500/20",
  outline: "glass hover:bg-white/12 text-white/80 hover:text-white",
  ghost: "bg-transparent hover:bg-white/8 text-white/70 hover:text-white border border-transparent",
  destructive: "bg-rose-600/70 hover:bg-rose-600 text-white border border-rose-500/50 backdrop-blur-sm"
};
var sizes = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-11 px-6 text-base rounded-xl gap-2",
  icon: "h-9 w-9 rounded-xl"
};
function Button({
  className,
  variant = "default",
  size = "md",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("button", {
    className: cn("inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50", variants[variant], sizes[size], className),
    disabled,
    ...props,
    children
  }, undefined, false, undefined, this);
}

export { Button };

//# debugId=920CCB2B4CE85BA664756E2164756E21
//# sourceMappingURL=chunk-d90hctpn.js.map

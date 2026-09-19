import {
  cn
} from "./chunk-30kgvwqp.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  require_react
} from "./chunk-xyr75gjm.js";

// resources/js/components/ui/input.tsx
var import_react = __toESM(require_react(), 1);
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("input", {
    type,
    className: cn("flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", className),
    ref,
    ...props
  }, undefined, false, undefined, this);
});
Input.displayName = "Input";

// resources/js/components/ui/separator.tsx
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
function Separator({ className, orientation = "horizontal", ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("div", {
    role: "separator",
    className: cn("shrink-0 bg-white/10", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
    ...props
  }, undefined, false, undefined, this);
}

// resources/js/components/ui/avatar.tsx
var jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
var sizes = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base"
};
function Avatar({ size = "md", className, children, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("span", {
    className: cn("relative inline-flex shrink-0 items-center justify-center rounded-full glass", sizes[size], className),
    ...props,
    children
  }, undefined, false, undefined, this);
}
function AvatarFallback({ className, children, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("span", {
    className: cn("flex h-full w-full items-center justify-center rounded-full text-white/70 font-medium", className),
    ...props,
    children
  }, undefined, false, undefined, this);
}

export { Input, Separator, Avatar, AvatarFallback };

//# debugId=6E62EE55E5B9AB1564756E2164756E21
//# sourceMappingURL=chunk-x056m8g0.js.map

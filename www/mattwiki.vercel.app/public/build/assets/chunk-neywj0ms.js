import {
  Avatar,
  AvatarFallback,
  Input,
  Separator
} from "./chunk-x056m8g0.js";
import {
  Button
} from "./chunk-d90hctpn.js";
import {
  Badge
} from "./chunk-0kz3jgz1.js";
import {
  cn
} from "./chunk-30kgvwqp.js";
import {
  WikiHeader
} from "./chunk-gnxecgnj.js";
import {
  AppLayout,
  ArrowRight01Icon,
  BookOpen01Icon,
  Clock01Icon,
  Edit01Icon,
  HugeiconsIcon,
  Search01Icon,
  User02Icon
} from "./chunk-5fxvs7ay.js";
import {
  Link_default,
  __toESM,
  require_jsx_dev_runtime,
  require_react,
  router3,
  useForm,
  usePage
} from "./chunk-xyr75gjm.js";

// resources/js/components/ui/card.tsx
var import_react = __toESM(require_react(), 1);
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function CardContainer({ children, className, containerClassName }) {
  const ref = import_react.useRef(null);
  const [perspective, setPerspective] = import_react.useState(1000);
  const handleMouseMove = (e) => {
    if (!ref.current)
      return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleMouseEnter = () => {
    setPerspective(800);
  };
  const handleMouseLeave = () => {
    if (!ref.current)
      return;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    ref,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: cn("transition-all duration-200 ease-linear", containerClassName),
    style: { perspective: `${perspective}px` },
    children: /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
      className: cn("glass-smoked rounded-xl text-card-foreground shadow-sm transition-all duration-200 hover:shadow-lg glass-smoked-hover", className),
      children
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
function CardHeader({ children, className }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    className: cn("flex flex-col space-y-1.5 p-6", className),
    children
  }, undefined, false, undefined, this);
}
function CardTitle({ children, className }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("h3", {
    className: cn("text-2xl font-semibold leading-none tracking-tight", className),
    children
  }, undefined, false, undefined, this);
}
function CardDescription({ children, className }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("p", {
    className: cn("text-sm text-muted-foreground", className),
    children
  }, undefined, false, undefined, this);
}
function CardContent({ children, className }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    className: cn("p-6 pt-0", className),
    children
  }, undefined, false, undefined, this);
}
function CardFooter({ children, className }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    className: cn("flex items-center p-6 pt-0", className),
    children
  }, undefined, false, undefined, this);
}

// resources/js/components/ui/table.tsx
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("div", {
    "data-slot": "table-container",
    className: "relative w-full overflow-x-auto",
    children: /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("table", {
      "data-slot": "table",
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("thead", {
    "data-slot": "table-header",
    className: cn("[&_tr]:border-b", className),
    ...props
  }, undefined, false, undefined, this);
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("tbody", {
    "data-slot": "table-body",
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }, undefined, false, undefined, this);
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("tr", {
    "data-slot": "table-row",
    className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
    ...props
  }, undefined, false, undefined, this);
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("th", {
    "data-slot": "table-head",
    className: cn("h-12 px-3 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className),
    ...props
  }, undefined, false, undefined, this);
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("td", {
    "data-slot": "table-cell",
    className: cn("p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
    ...props
  }, undefined, false, undefined, this);
}

// resources/js/components/ui/sparkles.tsx
var import_react2 = __toESM(require_react(), 1);
var jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var Sparkles = ({
  id = "sparkles",
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 120,
  className = "",
  particleColor = "#FFF"
}) => {
  const [particles, setParticles] = import_react2.useState([]);
  import_react2.useEffect(() => {
    const id2 = setTimeout(() => {
      const generatedParticles = Array.from({ length: particleDensity }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        resolved: Math.random() > 0.5
      }));
      setParticles(generatedParticles);
    }, 400);
    return () => clearTimeout(id2);
  }, [particleDensity, maxSize, minSize]);
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("svg", {
    className: cn("absolute inset-0 h-full w-full", className),
    style: { background },
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("defs", {
        children: /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("radialGradient", {
          id: `${id}-gradient`,
          children: [
            /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("stop", {
              offset: "0%",
              stopColor: particleColor,
              stopOpacity: "1"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("stop", {
              offset: "100%",
              stopColor: particleColor,
              stopOpacity: "0"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("rect", {
        width: "100%",
        height: "100%",
        fill: `url(#${id}-gradient)`
      }, undefined, false, undefined, this),
      particles.map((particle, idx) => /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("circle", {
        cx: particle.x + "%",
        cy: particle.y + "%",
        r: particle.size,
        fill: particleColor,
        opacity: particle.resolved ? 0.8 : 0.3
      }, idx, false, undefined, this))
    ]
  }, undefined, true, undefined, this);
};

// resources/js/components/ui/background-beams.tsx
var import_react3 = __toESM(require_react(), 1);
var jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var BackgroundBeams = ({ className, beamCount = 20 }) => {
  const canvasRef = import_react3.useRef(null);
  const beamsRef = import_react3.useRef([]);
  const animationFrameRef = import_react3.useRef(0);
  const initBeams = import_react3.useCallback(() => {
    const beams = Array.from({ length: beamCount }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      width: Math.random() * 2 + 0.5,
      height: Math.random() * 200 + 100,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1
    }));
    beamsRef.current = beams;
  }, [beamCount]);
  import_react3.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    initBeams();
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      beamsRef.current.forEach((beam) => {
        const gradient = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.height);
        gradient.addColorStop(0, `rgba(120, 120, 120, 0)`);
        gradient.addColorStop(0.5, `rgba(200, 200, 200, ${beam.opacity})`);
        gradient.addColorStop(1, `rgba(120, 120, 120, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(beam.x, beam.y, beam.width, beam.height);
        beam.y += beam.speed;
        if (beam.y > canvas.offsetHeight + beam.height) {
          beam.y = -beam.height;
          beam.x = Math.random() * canvas.offsetWidth;
        }
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    const startId = setTimeout(animate, 300);
    return () => {
      clearTimeout(startId);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initBeams]);
  return /* @__PURE__ */ jsx_dev_runtime4.jsxDEV("canvas", {
    ref: canvasRef,
    className: cn("absolute inset-0 h-full w-full", className),
    style: { zIndex: 0 }
  }, undefined, false, undefined, this);
};

// resources/js/components/ui/flip-words.tsx
var import_react4 = __toESM(require_react(), 1);
var jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var FlipWords = ({
  words,
  duration = 3000,
  className
}) => {
  const [index, setIndex] = import_react4.useState(0);
  const [phase, setPhase] = import_react4.useState("enter");
  import_react4.useEffect(() => {
    let timeoutId;
    const tick = setInterval(() => {
      setPhase("exit");
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("enter");
      }, 350);
    }, duration);
    return () => {
      clearInterval(tick);
      clearTimeout(timeoutId);
    };
  }, [words.length, duration]);
  return /* @__PURE__ */ jsx_dev_runtime5.jsxDEV("span", {
    className: cn("inline-block", phase === "enter" ? "animate-flip-in" : "animate-flip-out", className),
    style: { perspective: "1000px" },
    children: words[index]
  }, undefined, false, undefined, this);
};

// resources/js/components/wiki/contribute-buttons.tsx
var jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
function ContributeButtons() {
  const { auth } = usePage().props;
  const loggedIn = auth.user !== null;
  const writeHref = loggedIn ? "/articles/new" : "/login";
  return /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
    className: "flex flex-col gap-2",
    children: [
      /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Link_default, {
        href: writeHref,
        children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Button, {
          variant: "gradient",
          size: "sm",
          className: "rounded-full w-full",
          children: [
            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(HugeiconsIcon, {
              icon: Edit01Icon,
              strokeWidth: 2
            }, undefined, false, undefined, this),
            "Write an article"
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this),
      !loggedIn && /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Link_default, {
        href: "/signup",
        children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Button, {
          variant: "outline",
          size: "sm",
          className: "rounded-full w-full",
          children: [
            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(HugeiconsIcon, {
              icon: User02Icon,
              strokeWidth: 2
            }, undefined, false, undefined, this),
            "Create account"
          ]
        }, undefined, true, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// resources/js/pages/Home.tsx
var jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime(), 1);
var CATEGORY_COLORS = ["default", "secondary", "outline"];
var FLIP_WORDS = ["knowledge", "collaboration", "discovery", "learning"];
function Home({ featured, recentChanges, categories }) {
  const { settings } = usePage().props;
  const { data, setData } = useForm({ q: "" });
  function handleSearch(e) {
    e.preventDefault();
    router3.visit(`/search?q=${encodeURIComponent(data.q)}`);
  }
  return /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(AppLayout, {
    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
      className: "relative min-h-screen bg-background animate-in fade-in-0 duration-500",
      children: [
        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(WikiHeader, {}, undefined, false, undefined, this),
        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("section", {
          className: "relative overflow-hidden border-b bg-muted/30 py-20",
          children: [
            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Sparkles, {
              id: "hero-sparkles",
              particleDensity: 60,
              minSize: 0.6,
              maxSize: 1.2,
              className: "opacity-50"
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(BackgroundBeams, {
              beamCount: 15
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
              className: "relative z-10 mx-auto max-w-screen-xl px-4 text-center",
              children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                className: "mx-auto max-w-2xl",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("h1", {
                    className: "mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl",
                    children: settings.site_name
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("p", {
                    className: "mb-2 text-lg text-muted-foreground",
                    children: [
                      "Your hub for",
                      " ",
                      /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(FlipWords, {
                        words: FLIP_WORDS,
                        className: "text-primary"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("p", {
                    className: "mb-8 text-base text-muted-foreground/80",
                    children: settings.site_description
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("form", {
                    onSubmit: handleSearch,
                    className: "relative mx-auto max-w-lg",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(HugeiconsIcon, {
                        icon: Search01Icon,
                        strokeWidth: 2,
                        className: "pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Input, {
                        placeholder: "Search for articles",
                        className: "h-12 rounded-full pl-12 pr-28 text-base bg-white/8 border-white/15 text-white placeholder:text-white/40 backdrop-blur-md focus-visible:ring-indigo-400/50 focus-visible:border-indigo-400/40",
                        value: data.q,
                        onChange: (e) => setData("q", e.target.value)
                      }, undefined, false, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Button, {
                        type: "submit",
                        className: "absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full",
                        size: "sm",
                        children: "Search"
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                ]
              }, undefined, true, undefined, this)
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
          className: "mx-auto max-w-screen-xl px-4 py-12",
          children: [
            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("section", {
              className: "mb-12",
              children: [
                /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                  className: "mb-6 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("h2", {
                      className: "text-xl font-semibold",
                      children: "Featured Articles"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Link_default, {
                      href: "/articles",
                      className: "flex items-center gap-1 text-sm text-primary hover:underline",
                      children: [
                        "Browse all",
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(HugeiconsIcon, {
                          icon: ArrowRight01Icon,
                          strokeWidth: 2,
                          className: "size-3.5"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                  className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                  children: featured === undefined ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContainer, {
                    className: "h-full animate-pulse",
                    children: [
                      /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                            className: "mb-1 h-5 w-20 rounded bg-muted"
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                            className: "h-4 w-3/4 rounded bg-muted"
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                            className: "space-y-1.5 pt-1",
                            children: [
                              /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                className: "h-3 w-full rounded bg-muted"
                              }, undefined, false, undefined, this),
                              /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                className: "h-3 w-5/6 rounded bg-muted"
                              }, undefined, false, undefined, this),
                              /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                className: "h-3 w-4/6 rounded bg-muted"
                              }, undefined, false, undefined, this)
                            ]
                          }, undefined, true, undefined, this)
                        ]
                      }, undefined, true, undefined, this),
                      /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardFooter, {
                        className: "gap-3",
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                            className: "h-3 w-14 rounded bg-muted"
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                            className: "h-3 w-14 rounded bg-muted"
                          }, undefined, false, undefined, this)
                        ]
                      }, undefined, true, undefined, this)
                    ]
                  }, i, true, undefined, this)) : featured.map((article, i) => /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Link_default, {
                    href: `/wiki/${article.slug}`,
                    className: "group block animate-in fade-in-0 slide-in-from-bottom-4 duration-500 fill-mode-both",
                    style: { animationDelay: `${i * 80}ms` },
                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContainer, {
                      className: "h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardHeader, {
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                              className: "mb-1",
                              children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Badge, {
                                variant: "secondary",
                                children: article.category
                              }, undefined, false, undefined, this)
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardTitle, {
                              className: "text-base group-hover:text-primary transition-colors",
                              children: article.title
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardDescription, {
                              className: "line-clamp-3",
                              children: article.description
                            }, undefined, false, undefined, this)
                          ]
                        }, undefined, true, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardFooter, {
                          className: "gap-3 text-xs text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("span", {
                              className: "flex items-center gap-1",
                              children: [
                                /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(HugeiconsIcon, {
                                  icon: Clock01Icon,
                                  strokeWidth: 2,
                                  className: "size-3.5"
                                }, undefined, false, undefined, this),
                                article.readTime
                              ]
                            }, undefined, true, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Separator, {
                              orientation: "vertical",
                              className: "h-3.5"
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("span", {
                              className: "flex items-center gap-1",
                              children: [
                                /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(HugeiconsIcon, {
                                  icon: Edit01Icon,
                                  strokeWidth: 2,
                                  className: "size-3.5"
                                }, undefined, false, undefined, this),
                                article.updated
                              ]
                            }, undefined, true, undefined, this)
                          ]
                        }, undefined, true, undefined, this)
                      ]
                    }, undefined, true, undefined, this)
                  }, article.slug, false, undefined, this))
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
              className: "grid gap-8 lg:grid-cols-[1fr_auto]",
              children: [
                /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("section", {
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                      className: "mb-4 flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(HugeiconsIcon, {
                          icon: Edit01Icon,
                          strokeWidth: 2,
                          className: "size-5 text-muted-foreground"
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("h2", {
                          className: "text-xl font-semibold",
                          children: "Recent Changes"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContainer, {
                      children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContent, {
                        className: "p-0",
                        children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Table, {
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableHeader, {
                              children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableRow, {
                                children: [
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableHead, {
                                    children: "Article"
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableHead, {
                                    className: "hidden sm:table-cell",
                                    children: "Summary"
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableHead, {
                                    className: "hidden md:table-cell",
                                    children: "Editor"
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableHead, {
                                    className: "text-right",
                                    children: "Time"
                                  }, undefined, false, undefined, this)
                                ]
                              }, undefined, true, undefined, this)
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableBody, {
                              children: recentChanges === undefined ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableRow, {
                                className: "animate-pulse",
                                children: [
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                      className: "flex flex-col gap-1.5",
                                      children: [
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                          className: "h-3.5 w-32 rounded bg-muted"
                                        }, undefined, false, undefined, this),
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                          className: "h-4 w-16 rounded bg-muted"
                                        }, undefined, false, undefined, this)
                                      ]
                                    }, undefined, true, undefined, this)
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    className: "hidden sm:table-cell",
                                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                      className: "h-3 w-48 rounded bg-muted"
                                    }, undefined, false, undefined, this)
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    className: "hidden md:table-cell",
                                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                          className: "size-6 rounded-full bg-muted"
                                        }, undefined, false, undefined, this),
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                          className: "h-3 w-20 rounded bg-muted"
                                        }, undefined, false, undefined, this)
                                      ]
                                    }, undefined, true, undefined, this)
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    className: "text-right",
                                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                      className: "ml-auto h-3 w-14 rounded bg-muted"
                                    }, undefined, false, undefined, this)
                                  }, undefined, false, undefined, this)
                                ]
                              }, i, true, undefined, this)) : recentChanges.map((change, i) => /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableRow, {
                                className: "animate-in fade-in-0 duration-300",
                                style: { animationDelay: `${i * 40}ms` },
                                children: [
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                      className: "flex flex-col gap-1",
                                      children: [
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Link_default, {
                                          href: `/wiki/${change.slug}`,
                                          className: "font-medium text-primary hover:underline",
                                          children: change.title
                                        }, undefined, false, undefined, this),
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Badge, {
                                          variant: "outline",
                                          className: "w-fit",
                                          children: change.category
                                        }, undefined, false, undefined, this)
                                      ]
                                    }, undefined, true, undefined, this)
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    className: "hidden max-w-xs text-sm text-muted-foreground sm:table-cell",
                                    children: change.summary
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    className: "hidden md:table-cell",
                                    children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Avatar, {
                                          size: "sm",
                                          children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(AvatarFallback, {
                                            className: "text-[10px]",
                                            children: change.initials
                                          }, undefined, false, undefined, this)
                                        }, undefined, false, undefined, this),
                                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("span", {
                                          className: "text-sm text-muted-foreground",
                                          children: change.editor
                                        }, undefined, false, undefined, this)
                                      ]
                                    }, undefined, true, undefined, this)
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(TableCell, {
                                    className: "text-right text-sm text-muted-foreground",
                                    children: change.time
                                  }, undefined, false, undefined, this)
                                ]
                              }, change.slug, true, undefined, this))
                            }, undefined, false, undefined, this)
                          ]
                        }, undefined, true, undefined, this)
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("section", {
                  className: "w-full lg:w-64",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                      className: "mb-4 flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(HugeiconsIcon, {
                          icon: BookOpen01Icon,
                          strokeWidth: 2,
                          className: "size-5 text-muted-foreground"
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("h2", {
                          className: "text-xl font-semibold",
                          children: "Browse"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContainer, {
                      children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContent, {
                        className: "flex flex-col gap-2",
                        children: categories === undefined ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                          className: "flex animate-pulse items-center justify-between rounded-xl px-3 py-2.5",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                              className: "h-3.5 w-24 rounded bg-muted"
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("div", {
                              className: "h-5 w-16 rounded-full bg-muted"
                            }, undefined, false, undefined, this)
                          ]
                        }, i, true, undefined, this)) : categories.map((cat, i) => /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Link_default, {
                          href: "/categories",
                          className: "flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-muted",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV("span", {
                              className: "text-sm font-medium",
                              children: cat.name
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(Badge, {
                              variant: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                              children: [
                                cat.count,
                                " articles"
                              ]
                            }, undefined, true, undefined, this)
                          ]
                        }, cat.name, true, undefined, this))
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContainer, {
                      className: "mt-4",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardHeader, {
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardTitle, {
                              className: "text-sm",
                              children: "Contribute"
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardDescription, {
                              className: "text-xs",
                              children: "Help improve the wiki by writing or editing articles."
                            }, undefined, false, undefined, this)
                          ]
                        }, undefined, true, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(CardContent, {
                          children: /* @__PURE__ */ jsx_dev_runtime7.jsxDEV(ContributeButtons, {}, undefined, false, undefined, this)
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
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
export {
  Home as default
};

//# debugId=67D2D564DADF13A464756E2164756E21
//# sourceMappingURL=chunk-neywj0ms.js.map

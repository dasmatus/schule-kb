import { createInertiaApp } from "@inertiajs/react"
import { createRoot } from "react-dom/client"

createInertiaApp({
  title: (title) => title ? `${title} — MatthiasWiki` : "MatthiasWiki",
  resolve: async (name: string) => {
    const pages: Record<string, () => Promise<{ default: unknown }>> = {
      "Home": () => import("./pages/Home"),
      "Home/Index": () => import("./pages/Home/Index"),
      "Articles/Index": () => import("./pages/Articles/Index"),
      "Article/Create": () => import("./pages/Article/Create"),
      "Categories/Index": () => import("./pages/Categories/Index"),
      "Search/Index": () => import("./pages/Search/Index"),
      "Wiki/Show": () => import("./pages/Wiki/Show"),
      "Auth/Login": () => import("./pages/Auth/Login"),
      "Auth/Register": () => import("./pages/Auth/Register"),
      "Profile/Show": () => import("./pages/Profile/Show"),
      "Settings/Index": () => import("./pages/Settings/Index"),
      "Admin/Index": () => import("./pages/Admin/Index"),
      "Admin/Settings": () => import("./pages/Admin/Settings"),
      "Admin/Feature": () => import("./pages/Admin/Feature"),
      "Admin/Articles/Create": () => import("./pages/Admin/Articles/Create"),
      "Admin/Articles/Edit": () => import("./pages/Admin/Articles/Edit"),
    }
    const loader = pages[name]
    if (!loader) throw new Error(`Page not found: ${name}`)
    const mod = await loader()
    return (mod as { default: unknown }).default
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

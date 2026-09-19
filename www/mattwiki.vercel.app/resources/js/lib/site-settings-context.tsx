import { createContext, useContext } from "react"
import type { SiteSettings } from "@/types"

export const DEFAULT_SETTINGS: SiteSettings = {
  site_name: "WikiProject",
  site_description: "A modern, collaborative knowledge base",
  primary_hue: "230",
  primary_chroma: "0.15",
  primary_l: "0.80",
}

const Ctx = createContext<SiteSettings>(DEFAULT_SETTINGS)

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings
  children: React.ReactNode
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useSiteSettings = () => useContext(Ctx)

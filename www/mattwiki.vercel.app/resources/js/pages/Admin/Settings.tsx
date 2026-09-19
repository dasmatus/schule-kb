import { useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Settings01Icon } from "@hugeicons/core-free-icons"
import type { SiteSettings } from "@/types"

interface AdminSettingsProps {
  settings: SiteSettings
}

export default function AdminSettings({ settings }: AdminSettingsProps) {
  const { data, setData, put, processing, errors } = useForm({
    site_name: settings.site_name ?? "",
    site_description: settings.site_description ?? "",
    primary_hue: settings.primary_hue ?? "230",
    primary_chroma: settings.primary_chroma ?? "0.15",
    primary_l: settings.primary_l ?? "0.80",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    put("/admin/settings")
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8 flex items-center gap-3">
          <HugeiconsIcon icon={Settings01Icon} className="size-6 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Site settings</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
          <section className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-semibold text-white border-b border-white/10 pb-3">General</h2>

            <Field label="Site name" error={errors.site_name}>
              <input
                type="text"
                value={data.site_name}
                onChange={(e) => setData("site_name", e.target.value)}
                className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50"
                placeholder="MatthiasWiki"
              />
            </Field>

            <Field label="Site description" error={errors.site_description}>
              <textarea
                value={data.site_description}
                onChange={(e) => setData("site_description", e.target.value)}
                rows={3}
                className="w-full rounded-xl glass-sm px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50 resize-none"
                placeholder="A wiki you know…"
              />
            </Field>
          </section>

          <section className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-semibold text-white border-b border-white/10 pb-3">
              Primary colour (OKLCH)
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Lightness" error={errors.primary_l}>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={data.primary_l}
                  onChange={(e) => setData("primary_l", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-3 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50"
                />
              </Field>
              <Field label="Chroma" error={errors.primary_chroma}>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="0.4"
                  value={data.primary_chroma}
                  onChange={(e) => setData("primary_chroma", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-3 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50"
                />
              </Field>
              <Field label="Hue" error={errors.primary_hue}>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="360"
                  value={data.primary_hue}
                  onChange={(e) => setData("primary_hue", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-3 text-sm text-white border border-white/10 focus:outline-none focus:border-indigo-400/50"
                />
              </Field>
            </div>

            <div
              className="h-8 rounded-xl border border-white/10"
              style={{ background: `oklch(${data.primary_l} ${data.primary_chroma} ${data.primary_hue})` }}
            />
          </section>

          <Button type="submit" disabled={processing} className="w-full">
            {processing ? "Saving…" : "Save settings"}
          </Button>
        </form>
      </main>
    </AppLayout>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-white/70">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  )
}

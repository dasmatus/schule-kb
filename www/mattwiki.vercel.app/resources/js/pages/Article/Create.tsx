import { useForm } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { BookOpen01Icon } from "@hugeicons/core-free-icons"
import type { Category } from "@/types"

interface ArticleCreateProps {
  categories: Category[]
}

export default function ArticleCreate({ categories }: ArticleCreateProps) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    slug: "",
    content: "",
    category_id: "",
    tags: "",
    status: "draft",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post("/articles")
  }

  function generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8 flex items-center gap-3">
          <HugeiconsIcon icon={BookOpen01Icon} className="size-6 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">New article</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl p-6 space-y-5">
              <Field label="Title" error={errors.title}>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => {
                    setData("title", e.target.value)
                    setData("slug", generateSlug(e.target.value))
                  }}
                  className="input-glass"
                  placeholder="Article title"
                />
              </Field>

              <Field label="Slug" error={errors.slug}>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                  className="input-glass"
                  placeholder="article-slug"
                />
              </Field>

              <Field label="Content (Markdown)" error={errors.content}>
                <textarea
                  value={data.content}
                  onChange={(e) => setData("content", e.target.value)}
                  rows={20}
                  className="input-glass font-mono text-sm resize-y min-h-80"
                  placeholder="# Heading&#10;&#10;Write your article in Markdown…"
                />
              </Field>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="glass rounded-2xl p-5 space-y-4">
              <h3 className="font-semibold text-white">Publish</h3>

              <Field label="Status" error={errors.status}>
                <select
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  className="input-glass"
                >
                  <option value="draft">Draft</option>
                  <option value="review">In review</option>
                  <option value="published">Published</option>
                </select>
              </Field>

              <Field label="Category" error={errors.category_id}>
                <select
                  value={data.category_id}
                  onChange={(e) => setData("category_id", e.target.value)}
                  className="input-glass"
                >
                  <option value="">Select category…</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Tags (comma separated)" error={errors.tags}>
                <input
                  type="text"
                  value={data.tags}
                  onChange={(e) => setData("tags", e.target.value)}
                  className="input-glass"
                  placeholder="math, algebra, vectors"
                />
              </Field>

              <Button type="submit" disabled={processing} className="w-full">
                {processing ? "Publishing…" : "Publish article"}
              </Button>
            </div>
          </div>
        </form>
      </main>

      <style>{`
        .input-glass {
          width: 100%;
          border-radius: 12px;
          padding: 0.5rem 0.875rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          font-size: 0.875rem;
          backdrop-filter: blur(8px);
          outline: none;
          transition: border-color 150ms;
        }
        .input-glass::placeholder { color: rgba(255,255,255,0.3); }
        .input-glass:focus { border-color: rgba(99,102,241,0.5); }
        .input-glass option { background: #1e1b4b; color: white; }
      `}</style>
    </AppLayout>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white/70">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  )
}

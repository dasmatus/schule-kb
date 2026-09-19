import { useForm, Link } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import type { Category, WikiArticle } from "@/types"

interface AdminArticleEditProps {
  article: WikiArticle & { status: string; category_id: string | number }
  categories: Category[]
}

export default function AdminArticleEdit({ article, categories }: AdminArticleEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    title: article.title,
    slug: article.slug,
    content: article.content,
    category_id: String(article.category_id ?? ""),
    tags: article.tags.join(", "),
    status: article.status ?? "draft",
  })

  const deleteForm = useForm({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    put(`/admin/articles/${article.slug}`)
  }

  function handleDelete() {
    if (confirm(`Delete "${article.title}"? This cannot be undone.`)) {
      deleteForm.delete(`/admin/articles/${article.slug}`)
    }
  }

  return (
    <AppLayout>
      <WikiHeader />

      <main className="mx-auto max-w-screen-xl px-4 py-10 animate-fade-in">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HugeiconsIcon icon={Edit01Icon} className="size-6 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">Edit article</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/wiki/${article.slug}`}
              className="flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm text-white/70 hover:text-white cursor-pointer transition-all"
            >
              View article
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl bg-rose-600/50 hover:bg-rose-600/70 px-4 py-2 text-sm text-rose-300 border border-rose-500/30 cursor-pointer transition-all"
            >
              <HugeiconsIcon icon={Delete01Icon} className="size-4" />
              Delete
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl p-6 space-y-5">
              <Field label="Title" error={errors.title}>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50"
                />
              </Field>
              <Field label="Slug" error={errors.slug}>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => setData("slug", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50"
                />
              </Field>
              <Field label="Content (Markdown)" error={errors.content}>
                <textarea
                  value={data.content}
                  onChange={(e) => setData("content", e.target.value)}
                  rows={22}
                  className="w-full rounded-xl glass-sm px-4 py-3 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50 resize-y min-h-80"
                />
              </Field>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-2xl p-5 space-y-4">
              <h3 className="font-semibold text-white">Publish</h3>
              <Field label="Status" error={errors.status}>
                <select
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white border border-white/10 focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)" }}
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
                  className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white border border-white/10 focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <option value="">Select category…</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tags" error={errors.tags}>
                <input
                  type="text"
                  value={data.tags}
                  onChange={(e) => setData("tags", e.target.value)}
                  className="h-10 w-full rounded-xl glass-sm px-4 text-sm text-white placeholder:text-white/30 focus:outline-none border border-white/10 focus:border-indigo-400/50"
                />
              </Field>
              <Button type="submit" disabled={processing} className="w-full">
                {processing ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
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

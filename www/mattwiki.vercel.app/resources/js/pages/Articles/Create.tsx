import { useForm, Link } from "@inertiajs/react"
import AppLayout from "@/layouts/AppLayout"
import { WikiHeader } from "@/components/wiki/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

interface Category {
  id: number
  name: string
  slug: string
}

interface CreateArticleProps {
  categories: Category[]
}

export default function CreateArticle({ categories }: CreateArticleProps) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    content: "",
    category_id: categories[0]?.id ?? "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post("/articles")
  }

  const firstError = errors.title ?? errors.content ?? errors.category_id

  return (
    <AppLayout>
      <div className="min-h-screen bg-background animate-in fade-in-0 duration-500">
        <WikiHeader />

        <div className="mx-auto max-w-screen-md px-4 py-8">
          <div className="mb-6 flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon-sm" className="rounded-xl">
                <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">New Article</h1>
              <p className="text-sm text-muted-foreground">Your article will be submitted as a draft for review.</p>
            </div>
          </div>

          {firstError && (
            <div className="mb-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
              {firstError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Article details</CardTitle>
                <CardDescription>Fill in the basic information for the article.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-semibold">Title</Label>
                  <Input
                    id="title"
                    placeholder="Article title"
                    className="h-11 rounded-xl"
                    value={data.title}
                    onChange={e => setData("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold">Category</Label>
                  <Select
                    id="category"
                    className="h-11 rounded-xl"
                    value={data.category_id}
                    onChange={e => setData("category_id", Number(e.target.value))}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content</CardTitle>
                <CardDescription>Write the article content in Markdown.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-[320px] rounded-xl font-mono"
                  placeholder="Write your article in Markdown…"
                  value={data.content}
                  onChange={e => setData("content", e.target.value)}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" className="rounded-full px-8" disabled={processing}>
                {processing ? "Submitting…" : "Submit for review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

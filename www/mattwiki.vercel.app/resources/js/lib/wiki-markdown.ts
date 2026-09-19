export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export function extractToc(content: string): TocEntry[] {
  const lines = content.split("\n")
  const entries: TocEntry[] = []

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)

    if (h2) {
      const text = h2[1].trim()
      entries.push({ id: slugify(text), text, level: 2 })
    } else if (h3) {
      const text = h3[1].trim()
      entries.push({ id: slugify(text), text, level: 3 })
    }
  }

  return entries
}

export function preprocessMarkdown(content: string): string {
  return content
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim()
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

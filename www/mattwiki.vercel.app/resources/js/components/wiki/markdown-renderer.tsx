import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { extractToc } from "@/lib/wiki-markdown"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const toc = extractToc(content)

  const headingIds = toc.reduce<Record<string, string>>((acc, entry) => {
    acc[entry.text] = entry.id
    return acc
  }, {})

  return (
    <div className="prose-glass">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 id={headingIds[String(children)] ?? undefined}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 id={headingIds[String(children)] ?? undefined}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 id={headingIds[String(children)] ?? undefined}>{children}</h3>
          ),
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              {children}
            </a>
          ),
          pre: ({ children }) => <pre>{children}</pre>,
          code: ({ className, children }) => {
            const isBlock = className?.startsWith("language-")
            if (isBlock) {
              return <code className={className}>{children}</code>
            }
            return <code>{children}</code>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

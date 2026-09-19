import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  NewTwitterIcon,
  Facebook01Icon,
  Linkedin01Icon,
  RedditIcon,
  MastodonIcon,
  CopyLinkIcon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showFediverse, setShowFediverse] = useState(false)
  const [instance, setInstance] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const url = typeof window !== "undefined" ? window.location.href : `/wiki/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const platforms = [
    {
      label: "X",
      icon: NewTwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
    },
    {
      label: "Facebook",
      icon: Facebook01Icon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin01Icon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      label: "Reddit",
      icon: RedditIcon,
      href: `https://reddit.com/submit?url=${encoded}&title=${encodedTitle}`,
    },
  ]

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function openFediverseInput() {
    setShowFediverse(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function shareFediverse() {
    const host = instance.trim().replace(/^https?:\/\//, "").replace(/\/$/, "")
    if (!host) { return }
    const text = encodeURIComponent(`${title} ${url}`)
    window.open(`https://${host}/share?text=${text}`, "_blank", "noopener,noreferrer")
    setShowFediverse(false)
    setInstance("")
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Share:</span>
      {platforms.map(({ label, icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm" className="rounded-full gap-1.5 px-3">
            <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        </a>
      ))}

      {showFediverse ? (
        <div className="flex items-center gap-1">
          <Input
            ref={inputRef}
            value={instance}
            onChange={(e) => setInstance(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { shareFediverse() }
              if (e.key === "Escape") { setShowFediverse(false); setInstance("") }
            }}
            placeholder="mastodon.social"
            className="h-8 w-40 rounded-full px-3 text-sm"
          />
          <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={shareFediverse}>
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
          </Button>
        </div>
      ) : (
        <Button variant="ghost" size="sm" className="rounded-full gap-1.5 px-3" onClick={openFediverseInput}>
          <HugeiconsIcon icon={MastodonIcon} strokeWidth={2} className="size-4" />
          <span className="hidden sm:inline">Fediverse</span>
        </Button>
      )}

      <Button variant="ghost" size="sm" className="rounded-full gap-1.5 px-3" onClick={copyLink}>
        <HugeiconsIcon
          icon={copied ? CheckmarkCircle01Icon : CopyLinkIcon}
          strokeWidth={2}
          className={`size-4 transition-colors ${copied ? "text-green-400" : ""}`}
        />
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy link"}</span>
      </Button>
    </div>
  )
}

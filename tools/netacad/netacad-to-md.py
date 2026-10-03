#!/usr/bin/env python3
"""Convert netacad-grab.js output (JSON) into one Markdown file per module.

    python3 tools/netacad-to-md.py netacad-<course>.json raw/

The result is Cisco's own course text: it stays in raw/ (gitignored) and is
the source for the hand-condensed notes in notes/.
"""
import html
import json
import re
import sys
from pathlib import Path


def to_text(s: str) -> str:
    if not s:
        return ""
    s = re.sub(r"(?is)<(script|style).*?</\1>", "", s)
    s = re.sub(r"(?i)<br\s*/?>", "\n", s)
    s = re.sub(r"(?i)<li[^>]*>", "\n- ", s)
    s = re.sub(r"(?i)</(p|div|h\d|tr|ul|ol|pre)>", "\n", s)
    s = re.sub(r"(?i)<(td|th)[^>]*>", " | ", s)
    s = re.sub(r"(?i)<(b|strong)>(.*?)</\1>", r"**\2**", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s).replace("\xa0", " ")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n\s*\n\s*\n+", "\n\n", s)
    return s.strip()


def main(src: str, outdir: str) -> None:
    data = json.loads(Path(src).read_text())
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)
    for m in data["modules"]:
        lines = [f"# Module {m['num']}: {m['title']}", ""]
        for p in m["pages"]:
            lines += [f"## {to_text(p['title'])}", ""]
            for c in p["components"]:
                if c.get("title"):
                    lines += [f"### {to_text(c['title'])}", ""]
                if c.get("body"):
                    lines += [to_text(c["body"]), ""]
                for it in c.get("items") or []:
                    t, b = to_text(it.get("title")), to_text(it.get("body"))
                    if t or b:
                        lines += [f"- **{t}** {b}".rstrip(), ""]
                if c.get("raw") and c["type"] in ("commandWindow", "syntax-checker"):
                    r = json.loads(c["raw"])
                    cli = [to_text(x.get("text") or x.get("command") or "")
                           for k in ("precode", "_commands", "postcode") for x in r.get(k) or []]
                    cli = [x.replace("**", "") for x in cli if x]
                    if cli:
                        lines += ["```", *cli, "```", ""]
        name = f"{m['num']:02d}-{re.sub(r'[^a-z0-9]+', '-', m['title'].lower()).strip('-')}.md"
        (out / name).write_text("\n".join(lines))
        print(out / name)


if __name__ == "__main__":
    main(*sys.argv[1:3])

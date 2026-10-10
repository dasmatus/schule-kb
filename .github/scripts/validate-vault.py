#!/usr/bin/env python3
"""Structural validation for the schule-kb Obsidian vault.

Checks properties that are objectively wrong regardless of content and that
are easy to introduce by hand or via Obsidian sync:

  * YAML frontmatter, when present, is a well-formed mapping
  * no completely empty notes
  * no stray/unbalanced wikilink delimiters ([[ / ]])
  * no obviously malformed wikilink targets (empty target, leading/trailing
    slash, separator-only target)
  * no non-UTF-8 note files

This deliberately does NOT gate on unresolved wikilink targets: the vault
carries pre-existing reference debt and a red gate there would hide real
regressions behind a permanently failing check.
"""
import os
import re
import sys

try:
    import yaml
except ImportError:  # pragma: no cover - PyYAML is installed by the workflow
    yaml = None

ROOT = os.environ.get("SCHULE_KB_ROOT", ".")

WIKILINK = re.compile(r"\[\[([^\]\|#]*)(?:#[^\]\|]*)?(?:\|[^\]]*)?\]\]")

errors = []
checked = 0


def err(path, msg):
    errors.append(f"{path}: {msg}")


def check_frontmatter(path, text):
    if not text.startswith("---"):
        return
    end = text.find("\n---", 3)
    if end == -1:
        err(path, "frontmatter opened with '---' but never closed")
        return
    block = text[3:end]
    if yaml is None:
        return
    try:
        data = yaml.safe_load(block)
    except yaml.YAMLError as exc:
        err(path, f"frontmatter is not valid YAML: {exc}")
        return
    if data is not None and not isinstance(data, dict):
        err(path, "frontmatter is not a YAML mapping")


def check_wikilinks(path, text):
    # Strip fenced code blocks: wikilink-looking text inside them is literal.
    stripped = re.sub(r"```.*?```", "", text, flags=re.S)
    if stripped.count("[[") != stripped.count("]]"):
        err(path, "unbalanced wikilink delimiters")
    for match in WIKILINK.finditer(stripped):
        target = match.group(1).strip()
        if not target:
            err(path, f"wikilink with empty target: {match.group(0)!r}")
        elif target.startswith("/") or target.endswith("/"):
            err(path, f"wikilink target has a leading/trailing slash: {target!r}")
        elif target.strip("/").replace("/", "") == "":
            err(path, f"wikilink target is only separators: {target!r}")


def main():
    global checked
    for dirpath, dirnames, filenames in os.walk(ROOT):
        # Obsidian's own config is not vault content.
        dirnames[:] = [d for d in dirnames if d != ".obsidian"]
        for name in filenames:
            if not name.endswith(".md"):
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, ROOT)
            checked += 1
            try:
                with open(full, "rb") as fh:
                    raw = fh.read()
                text = raw.decode("utf-8")
            except UnicodeDecodeError as exc:
                err(rel, f"not valid UTF-8: {exc}")
                continue
            except OSError as exc:
                err(rel, f"unreadable: {exc}")
                continue

            if not text.strip():
                err(rel, "note is empty")
                continue
            check_frontmatter(rel, text)
            check_wikilinks(rel, text)

    print(f"checked {checked} markdown notes under {os.path.abspath(ROOT)}")
    if errors:
        print(f"\n{len(errors)} problem(s):", file=sys.stderr)
        for e in errors:
            print(f"  {e}", file=sys.stderr)
        return 1
    print("OK: no structural problems found")
    return 0


if __name__ == "__main__":
    sys.exit(main())

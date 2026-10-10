// Converts the Obsidian vault (one directory up) into Docusaurus docs.
//
// Handles: wikilinks (+aliases, #headings, |labels), embeds (images, notes,
// other files), %%comments%%, frontmatter tags + inline #tags, properties,
// backlinks, simple Dataview TABLE/LIST queries and .canvas mind maps.
// Callouts and ==highlights== are rendered by plugins/remark-obsidian.mjs.
//
// Output (all gitignored): docs/, static/attachments/, src/data/canvas/

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { slug as headingSlug } from 'github-slugger';

const SITE = path.resolve(import.meta.dirname, '..');
const VAULT = path.resolve(process.env.VAULT_DIR ?? path.join(SITE, '..'));
const OUT_DOCS = path.join(SITE, 'docs');
const OUT_ATT = path.join(SITE, 'static', 'attachments');
const OUT_CANVAS = path.join(SITE, 'src', 'data', 'canvas');

const REPO_URL =
  process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
    : 'https://github.com/dasmatus/schule-kb';
const BRANCH = process.env.GITHUB_REF_NAME ?? 'master';
// raw <img> tags bypass Docusaurus' baseUrl handling, so prefix them here
const BASE_URL = (process.env.BASE_URL ?? '/schule-kb/').replace(/\/$/, '');

const EXCLUDED = new Set([
  '.git', '.github', '.obsidian', '.claude', '.trash', 'node_modules',
  'www', 'tools', 'site', 'raw',
]);
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.bmp']);
const HOME_NOTE = 'Rozcestník.md';

const collator = new Intl.Collator('sk', { numeric: true, sensitivity: 'base' });

// ---------------------------------------------------------------- helpers

const toPosix = (p) => p.split(path.sep).join('/');

function slugify(s) {
  const out = s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return out || 'note';
}

// "01 Predmety" -> { position: 1, label: "Predmety" }
function splitNumberPrefix(name) {
  const m = name.match(/^(\d+)\s+(.+)$/);
  return m ? { position: Number(m[1]), label: m[2] } : { position: undefined, label: name };
}

function repoUrl(rel, kind = 'blob') {
  return `${REPO_URL}/${kind}/${BRANCH}/${rel.split('/').map(encodeURIComponent).join('/')}`;
}

function walk(dir, rel = '') {
  const files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDED.has(e.name) || e.name.startsWith('.')) continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) files.push(...walk(path.join(dir, e.name), r));
    else files.push(r);
  }
  return files;
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  let data = {};
  try {
    data = yaml.load(m[1]) ?? {};
  } catch (err) {
    console.warn(`  ! invalid frontmatter: ${err.message.split('\n')[0]}`);
  }
  return { data: typeof data === 'object' ? data : {}, body: text.slice(m[0].length) };
}

const asArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

// ---------------------------------------------------------------- index

const allFiles = walk(VAULT);
const notes = new Map(); // vault rel path -> note
const attachments = new Map(); // vault rel path -> { rel, published? }
const canvases = [];

// Output paths: slugified segments, deduplicated per directory.
const takenSlugs = new Map(); // outDir -> Set
function reserve(outDir, base) {
  if (!takenSlugs.has(outDir)) takenSlugs.set(outDir, new Set());
  const taken = takenSlugs.get(outDir);
  let s = ['index', 'readme', 'tags', 'search'].includes(base) ? `${base}-note` : base;
  for (let i = 2; taken.has(s); i++) s = `${base}-${i}`;
  taken.add(s);
  return s;
}
const dirSlugCache = new Map();
function outDirFor(relDir) {
  if (!relDir) return '';
  if (dirSlugCache.has(relDir)) return dirSlugCache.get(relDir);
  const parent = relDir.includes('/') ? relDir.slice(0, relDir.lastIndexOf('/')) : '';
  const name = relDir.slice(parent ? parent.length + 1 : 0);
  const parentOut = outDirFor(parent);
  const out = (parentOut ? parentOut + '/' : '') + reserve(parentOut, slugify(splitNumberPrefix(name).label));
  dirSlugCache.set(relDir, out);
  return out;
}

for (const rel of allFiles.sort(collator.compare)) {
  const ext = path.extname(rel).toLowerCase();
  const relDir = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/')) : '';
  const base = path.basename(rel, path.extname(rel));
  if (ext === '.md') {
    const raw = fs.readFileSync(path.join(VAULT, rel), 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const outDir = outDirFor(relDir);
    const isHome = rel === HOME_NOTE;
    const outRel = (outDir ? outDir + '/' : '') + reserve(outDir, slugify(base)) + '.md';
    notes.set(rel, {
      rel, relDir, base, data, body, outRel,
      route: isHome ? '/' : '/' + outRel.replace(/\.md$/, ''),
      title: String(data.title ?? base),
      aliases: [...asArray(data.aliases), ...asArray(data.aliasy), ...asArray(data.alias)].map(String),
      tags: new Set(asArray(data.tags).flatMap((t) => String(t).split(/[,\s]+/)).map((t) => t.replace(/^#/, '')).filter(Boolean)),
      links: new Set(),
    });
  } else if (ext === '.canvas') {
    const outDir = outDirFor(relDir);
    canvases.push({ rel, relDir, base, outRel: (outDir ? outDir + '/' : '') + reserve(outDir, slugify(base)) + '.mdx' });
  } else {
    attachments.set(rel, { rel, ext });
  }
}
for (const c of canvases) c.route = '/' + c.outRel.replace(/\.mdx$/, '');

// Lookup tables (Obsidian resolves case-insensitively, shortest path wins).
const byName = new Map(); // lower basename (no .md) -> [note]
const byAlias = new Map();
const attByName = new Map(); // lower file name -> [att]
const canvasByRel = new Map(canvases.map((c) => [c.rel.toLowerCase(), c]));
const canvasByName = new Map(canvases.map((c) => [c.base.toLowerCase(), c]));
for (const n of notes.values()) {
  const k = n.base.toLowerCase();
  byName.set(k, [...(byName.get(k) ?? []), n]);
  for (const a of n.aliases) if (!byAlias.has(a.toLowerCase())) byAlias.set(a.toLowerCase(), n);
}
for (const a of attachments.values()) {
  const k = path.basename(a.rel).toLowerCase();
  attByName.set(k, [...(attByName.get(k) ?? []), a]);
}
const notesByRelLower = new Map([...notes.values()].map((n) => [n.rel.toLowerCase(), n]));
const attByRelLower = new Map([...attachments.values()].map((a) => [a.rel.toLowerCase(), a]));

function closest(candidates, fromDir) {
  if (candidates.length <= 1) return candidates[0];
  // prefer the candidate sharing the longest directory prefix with the source
  const score = (c) => {
    const a = c.rel.split('/');
    const b = fromDir.split('/');
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  };
  return [...candidates].sort((x, y) => score(y) - score(x))[0];
}

// Returns { kind: 'note'|'attachment'|'canvas', target } or null.
function resolve(linkPath, fromDir = '') {
  let p = linkPath.trim().replace(/\\/g, '/');
  try { p = decodeURIComponent(p); } catch { /* keep as is */ }
  p = p.replace(/^\.?\//, '');
  if (!p) return null;
  const lower = p.toLowerCase();
  const joined = fromDir ? toPosix(path.posix.normalize(`${fromDir}/${p}`)).toLowerCase() : lower;
  const ext = path.extname(lower);

  if (ext === '.canvas') {
    const c = canvasByRel.get(lower) ?? canvasByRel.get(joined) ?? canvasByName.get(path.basename(lower, '.canvas'));
    return c ? { kind: 'canvas', target: c } : null;
  }
  const noteKey = ext === '.md' ? lower : `${lower}.md`;
  const joinedKey = ext === '.md' ? joined : `${joined}.md`;
  let n = notesByRelLower.get(noteKey) ?? notesByRelLower.get(joinedKey);
  if (!n && !lower.includes('/')) {
    const cands = byName.get(ext === '.md' ? lower.slice(0, -3) : lower);
    if (cands) n = closest(cands, fromDir);
  } else if (!n) {
    // partial path like "Pojmy/dráma"
    const suffix = '/' + noteKey;
    n = [...notes.values()].find((x) => x.rel.toLowerCase().endsWith(suffix));
  }
  if (n) return { kind: 'note', target: n };

  let a = attByRelLower.get(lower) ?? attByRelLower.get(joined);
  if (!a) {
    const cands = attByName.get(path.basename(lower));
    if (cands) a = closest(cands, fromDir);
  }
  if (a) return { kind: 'attachment', target: a };

  const al = byAlias.get(lower);
  if (al) return { kind: 'note', target: al };
  const cv = canvasByName.get(path.basename(lower));
  if (cv) return { kind: 'canvas', target: cv };
  return null;
}

// Copies an image into static/ and returns its site URL.
function publishImage(att) {
  if (!att.published) {
    const dir = att.rel.includes('/') ? att.rel.slice(0, att.rel.lastIndexOf('/')) : '';
    const outName = slugify(path.basename(att.rel, att.ext)) + att.ext;
    const outRel = [...dir.split('/').filter(Boolean).map(slugify), outName].join('/');
    const dest = path.join(OUT_ATT, outRel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(VAULT, att.rel), dest);
    att.published = `/attachments/${outRel}`;
  }
  return att.published;
}

function relLink(fromOutRel, toOutRel) {
  let r = path.posix.relative(path.posix.dirname(fromOutRel), toOutRel);
  if (!r.startsWith('.')) r = './' + r;
  return r;
}

const escLabel = (s) => s.replace(/([[\]\\])/g, '\\$1');

// ---------------------------------------------------------------- transforms

// Splits markdown into alternating text / fenced-code chunks.
function splitFences(md) {
  const chunks = [];
  const lines = md.split('\n');
  let buf = [];
  let fence = null;
  const flush = (type) => {
    if (buf.length) chunks.push({ type, text: buf.join('\n'), lang: fence?.lang });
    buf = [];
  };
  for (const line of lines) {
    const m = line.match(/^(\s*(?:>\s*)*)(`{3,}|~{3,})\s*([\w-]*)/);
    if (!fence && m) {
      flush('text');
      fence = { marker: m[2], lang: m[3].toLowerCase(), prefix: m[1] };
      buf.push(line);
    } else if (fence && line.trim().replace(/^(>\s*)*/, '').startsWith(fence.marker)
      && line.trim().replace(/^(>\s*)*/, '').replace(/[`~]/g, '') === '') {
      buf.push(line);
      flush('code');
      fence = null;
    } else {
      buf.push(line);
    }
  }
  flush(fence ? 'code' : 'text');
  return chunks;
}

// Applies fn to the parts of a text chunk that are outside inline code.
function mapOutsideInlineCode(text, fn) {
  return text
    .split(/(`+[^`\n]*?`+)/g)
    .map((part, i) => (i % 2 ? part : fn(part)))
    .join('');
}

function headingAnchor(h) {
  return h ? '#' + headingSlug(h.replace(/^#+/, '').trim()) : '';
}

function parseLinkInner(inner) {
  // In tables Obsidian writes [[target\|label]]
  const [targetPart, ...labelParts] = inner.split(/\\?\|/);
  const label = labelParts.join('|').trim();
  const hashIdx = targetPart.indexOf('#');
  const file = hashIdx >= 0 ? targetPart.slice(0, hashIdx) : targetPart;
  const heading = hashIdx >= 0 ? targetPart.slice(hashIdx + 1) : '';
  return { file: file.trim(), heading: heading.trim(), label };
}

function sectionOf(body, heading) {
  if (!heading) return body;
  const lines = body.split('\n');
  const want = headingSlug(heading);
  const start = lines.findIndex((l) => /^#{1,6}\s/.test(l) && headingSlug(l.replace(/^#+\s*/, '')) === want);
  if (start < 0) return body;
  const level = lines[start].match(/^#+/)[0].length;
  let end = lines.findIndex((l, i) => i > start && new RegExp(`^#{1,${level}}\\s`).test(l));
  if (end < 0) end = lines.length;
  return lines.slice(start, end).join('\n');
}

function transformBody(note, body, depth = 0) {
  // Whole-line note embeds become transcluded callouts.
  body = body.replace(/^([ \t]*)!\[\[([^\]]+)\]\]\s*$/gm, (all, indent, inner) => {
    const { file, heading, label } = parseLinkInner(inner);
    const r = resolve(file || note.rel, note.relDir);
    if (r?.kind !== 'note' || depth > 1) return all;
    note.links.add(r.target);
    const inner2 = transformBody(note, sectionOf(r.target.body, heading), depth + 1);
    const title = label || r.target.title + (heading ? ` › ${heading}` : '');
    const link = `[${escLabel(title)}](${relLink(note.outRel, r.target.outRel)}${headingAnchor(heading)})`;
    return [`${indent}> [!embed] ${link}`, ...inner2.split('\n').map((l) => `${indent}> ${l}`)].join('\n');
  });

  return splitFences(body)
    .map((chunk) => {
      if (chunk.type === 'code') {
        if (chunk.lang === 'dataview' && depth === 0) {
          const rendered = renderDataview(note, chunk.text);
          if (rendered != null) return transformText(note, rendered);
        }
        return chunk.text;
      }
      return transformText(note, chunk.text.replace(/%%[\s\S]*?%%/g, ''));
    })
    .join('\n');
}

function transformText(note, text) {
  return mapOutsideInlineCode(text, (t) =>
    t
      // embeds: ![[file|size]]
      .replace(/!\[\[([^\]]+)\]\]/g, (all, inner) => {
        const { file, heading, label } = parseLinkInner(inner);
        const r = resolve(file, note.relDir);
        if (!r) return `<span class="wikilink-unresolved">${escHtml(file)}</span>`;
        if (r.kind === 'attachment') {
          if (IMAGE_EXT.has(r.target.ext)) {
            const width = /^\d+(x\d+)?$/.test(label) ? label.split('x')[0] : '';
            const alt = width ? path.basename(file) : label || path.basename(file);
            return width
              ? `<img src="${'@BASE@' + publishImage(r.target)}" alt="${escHtml(alt)}" width="${width}" />`
              : `![${escLabel(alt)}](${publishImage(r.target)})`;
          }
          return `[📎 ${escLabel(label || path.basename(file))}](${repoUrl(r.target.rel)})`;
        }
        if (r.kind === 'canvas') return `[🗺️ ${escLabel(label || r.target.base)}](${relLink(note.outRel, r.target.outRel)})`;
        note.links.add(r.target);
        return `[↪ ${escLabel(label || r.target.title)}](${relLink(note.outRel, r.target.outRel)}${headingAnchor(heading)})`;
      })
      // links: [[target#heading|label]]
      .replace(/\[\[([^\]]+)\]\]/g, (all, inner) => {
        const { file, heading, label } = parseLinkInner(inner);
        if (!file && heading) return `[${escLabel(label || heading)}](${headingAnchor(heading)})`;
        const r = resolve(file, note.relDir);
        const text = escLabel(label || (heading ? `${file} › ${heading}` : file));
        if (!r) return `<span class="wikilink-unresolved" title="Poznámka zatiaľ neexistuje">${escHtml(label || file)}</span>`;
        if (r.kind === 'attachment') {
          return IMAGE_EXT.has(r.target.ext)
            ? `[${text}](pathname://${publishImage(r.target)})`
            : `[📎 ${text}](${repoUrl(r.target.rel)})`;
        }
        if (r.kind === 'canvas') return `[🗺️ ${text}](${relLink(note.outRel, r.target.outRel)})`;
        note.links.add(r.target);
        return `[${label ? text : escLabel(heading ? `${r.target.title} › ${heading}` : file)}](${relLink(note.outRel, r.target.outRel)}${headingAnchor(heading)})`;
      })
      // plain markdown links/images to vault files
      .replace(/(!?)\[([^\]\n]*)\]\((?!https?:|mailto:|#|\/|pathname:|\.\.?\/[^)]*\.mdx?\))([^)\s]+|<[^>]+>)\)/g, (all, bang, label, target) => {
        const r = resolve(target.replace(/^<|>$/g, ''), note.relDir);
        if (!r) return all;
        if (r.kind === 'note') { note.links.add(r.target); return `${bang}[${label}](${relLink(note.outRel, r.target.outRel)})`; }
        if (r.kind === 'canvas') return `[${label}](${relLink(note.outRel, r.target.outRel)})`;
        if (IMAGE_EXT.has(r.target.ext)) return `${bang}[${label}](${publishImage(r.target)})`;
        return `[${label}](${repoUrl(r.target.rel)})`;
      })
      // inline #tags (not headings, not URL fragments)
      .replace(/(^|[\s,;])#([\p{L}_][\p{L}\p{N}_/-]*)/gmu, (all, pre, tag) => {
        if (/^[0-9a-f]{3,8}$/i.test(tag) && /\d/.test(tag)) return all; // colour codes
        note.tags.add(tag);
        return `${pre}[#${tag}](/tags/${tagSlug(tag)})`;
      }),
  );
}

const escHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const tagSlug = (t) => t.split('/').map(slugify).join('/');

// ---------------------------------------------------------------- dataview

// Supports: TABLE [WITHOUT ID] a AS "A", b | LIST, FROM #tag / "folder"
// (joined by and/or), WHERE <key> [= value], SORT key [ASC|DESC], LIMIT n.
function renderDataview(note, block) {
  const q = block.split('\n').slice(1, -1).join(' ').replace(/\s+/g, ' ').trim();
  const m = q.match(/^(TABLE|LIST)(\s+WITHOUT ID)?\s*(.*?)(?:\s+FROM\s+(.*?))?(?:\s+WHERE\s+(.*?))?(?:\s+SORT\s+(.*?))?(?:\s+LIMIT\s+(\d+))?$/i);
  if (!m) return null;
  const [, kind, withoutId, fieldsRaw, from, where, sort, limit] = m;
  const fields = kind.toUpperCase() === 'TABLE' && fieldsRaw
    ? fieldsRaw.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((f) => {
        const fm = f.trim().match(/^(.+?)(?:\s+AS\s+"([^"]+)")?$/i);
        return { expr: fm[1].trim(), label: fm[2] ?? fm[1].trim() };
      })
    : [];

  const matchSource = (n, src) => {
    src = src.trim();
    if (src.startsWith('#')) {
      const t = src.slice(1);
      return [...n.tags].some((x) => x === t || x.startsWith(t + '/'));
    }
    if (src.startsWith('"')) return n.rel.startsWith(src.replace(/"/g, '') + '/');
    if (src.startsWith('-')) return !matchSource(n, src.slice(1));
    return false;
  };
  let rows = [...notes.values()].filter((n) => {
    if (!from) return true;
    return from.split(/\s+or\s+/i).some((alt) => alt.split(/\s+and\s+/i).every((s) => matchSource(n, s)));
  });

  const get = (n, expr) => {
    if (expr === 'file.name') return n.base;
    if (expr === 'file.link') return `[[${n.rel.replace(/\.md$/, '')}|${n.title}]]`;
    if (expr === 'file.folder') return n.relDir;
    if (expr === 'file.tags' || expr === 'tags') return [...n.tags].map((t) => '#' + t).join(' ');
    return n.data[expr];
  };
  if (where) {
    const wm = where.match(/^([\w.À-ɏ]+)\s*(?:(!?=)\s*"?([^"]*)"?)?$/);
    if (!wm) return null;
    rows = rows.filter((n) => {
      const v = get(n, wm[1]);
      if (!wm[2]) return v != null && v !== '' && v !== false;
      return (String(v ?? '') === wm[3]) === (wm[2] === '=');
    });
  }
  if (sort) {
    const [key, dir] = sort.split(/\s+/);
    rows.sort((a, b) => collator.compare(String(get(a, key) ?? ''), String(get(b, key) ?? '')) * (/desc/i.test(dir ?? '') ? -1 : 1));
  }
  if (limit) rows = rows.slice(0, Number(limit));

  const cell = (v) => {
    if (v == null) return '';
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    if (Array.isArray(v)) return v.map(cell).join(', ');
    return String(v).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  };
  const link = (n) => `[[${n.rel.replace(/\.md$/, '')}\\|${n.title}]]`;
  const note_ = '\n\n<small class="dataview-note">Vygenerované z Dataview dopytu pri zostavení stránky.</small>';
  if (!rows.length) return '*Dataview: žiadne výsledky.*' + note_;
  if (kind.toUpperCase() === 'LIST') return rows.map((n) => `- ${link(n).replace('\\|', '|')}`).join('\n') + note_;
  const head = [...(withoutId ? [] : ['Súbor']), ...fields.map((f) => f.label)];
  const lines = [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map((n) => `| ${[...(withoutId ? [] : [link(n)]), ...fields.map((f) => cell(get(n, f.expr)))].join(' | ')} |`),
  ];
  return lines.join('\n') + note_;
}

// ---------------------------------------------------------------- properties

const HIDDEN_PROPS = new Set(['title', 'tags', 'aliases', 'aliasy', 'alias', 'cssclasses', 'cssclass', 'publish']);

function propertiesCallout(note) {
  const rows = Object.entries(note.data).filter(([k, v]) => !HIDDEN_PROPS.has(k) && v != null && v !== '');
  if (!rows.length && !note.aliases.length) return '';
  const fmt = (k, v) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    if (Array.isArray(v)) return v.map((x) => fmt(k, x)).join(', ');
    if (typeof v === 'object') return '`' + JSON.stringify(v) + '`';
    const s = String(v);
    // Paths to vault files (e.g. zdroj: "99 Zdroje/docx/x.docx") link to the repo.
    if (/\.[a-z0-9]{2,5}$/i.test(s) && attByRelLower.has(s.toLowerCase())) return `[📎 ${escLabel(path.basename(s))}](${repoUrl(s)})`;
    if (/^https?:\/\//.test(s)) return `<${s}>`;
    return s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
  };
  const lines = ['> [!properties]- Vlastnosti', '> | | |', '> | --- | --- |'];
  for (const [k, v] of rows) lines.push(`> | ${k.replace(/_/g, ' ')} | ${fmt(k, v)} |`);
  if (note.aliases.length) lines.push(`> | aliasy | ${note.aliases.join(', ')} |`);
  return lines.join('\n');
}

// ---------------------------------------------------------------- write notes

fs.rmSync(OUT_DOCS, { recursive: true, force: true });
fs.rmSync(OUT_ATT, { recursive: true, force: true });
fs.rmSync(OUT_CANVAS, { recursive: true, force: true });
fs.mkdirSync(OUT_DOCS, { recursive: true });
fs.mkdirSync(OUT_CANVAS, { recursive: true });

// Sidebar ordering: natural sort per directory, folders and files mixed.
const positions = new Map();
{
  const byDir = new Map();
  const add = (dir, key, name) => byDir.set(dir, [...(byDir.get(dir) ?? []), { key, name }]);
  for (const n of notes.values()) add(n.relDir, n.rel, n.base);
  for (const c of canvases) add(c.relDir, c.rel, c.base);
  for (const d of dirSlugCache.keys()) {
    const parent = d.includes('/') ? d.slice(0, d.lastIndexOf('/')) : '';
    add(parent, 'dir:' + d, path.basename(d));
  }
  for (const entries of byDir.values()) {
    entries.sort((a, b) => collator.compare(a.name, b.name)).forEach((e, i) => positions.set(e.key, i + 1));
  }
}

for (const note of notes.values()) {
  note.out = transformBody(note, note.body);
  const props = propertiesCallout(note);
  if (props) {
    const withProps = transformText(note, props);
    const h1 = note.out.match(/^\s*# .*\n/);
    note.out = h1 ? h1[0] + '\n' + withProps + '\n' + note.out.slice(h1[0].length) : withProps + '\n\n' + note.out;
  }
}

const backlinks = new Map();
for (const n of notes.values()) {
  for (const t of n.links) if (t !== n) backlinks.set(t, [...(backlinks.get(t) ?? []), n]);
}

for (const note of notes.values()) {
  let body = note.out;

  const refs = (backlinks.get(note) ?? []).sort((a, b) => collator.compare(a.title, b.title));
  const list = refs.map((r) => `- [${escLabel(r.title)}](${relLink(note.outRel, r.outRel)})`).join('\n');
  const placeholder = /\*Pozri panel \*\*Backlinks\*\*[\s\S]*?\*\s*$/m;
  if (placeholder.test(body)) {
    body = body.replace(placeholder, list || '*Zatiaľ žiadne odkazy.*');
  } else if (refs.length) {
    body += `\n\n---\n\n<div class="backlinks">\n\n**🔗 Spätné odkazy (${refs.length})**\n\n${list}\n\n</div>\n`;
  }

  const fm = {
    title: note.title,
    ...(note.rel === HOME_NOTE ? { slug: '/', sidebar_position: 0 } : { slug: note.route }),
    ...(note.rel !== HOME_NOTE && positions.has(note.rel) ? { sidebar_position: positions.get(note.rel) } : {}),
    tags: [...note.tags].map((t) => ({ label: t, permalink: '/' + tagSlug(t) })),
    custom_edit_url: repoUrl(note.rel),
  };
  const dest = path.join(OUT_DOCS, note.outRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, `---\n${yaml.dump(fm, { lineWidth: -1 })}---\n\n${body.replace(/@BASE@/g, BASE_URL)}\n`);
}

// ---------------------------------------------------------------- folders

for (const [relDir, outDir] of dirSlugCache) {
  const { label } = splitNumberPrefix(path.basename(relDir));
  fs.mkdirSync(path.join(OUT_DOCS, outDir), { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DOCS, outDir, '_category_.json'),
    JSON.stringify({ label, position: positions.get('dir:' + relDir), link: { type: 'generated-index', slug: '/' + outDir } }, null, 2),
  );
}

// ---------------------------------------------------------------- canvases

const COLORS = { 1: 'red', 2: 'orange', 3: 'yellow', 4: 'green', 5: 'cyan', 6: 'purple' };

for (const c of canvases) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(VAULT, c.rel), 'utf8'));
  } catch (err) {
    console.warn(`  ! ${c.rel}: ${err.message}`);
    continue;
  }
  const fake = { rel: c.rel, relDir: c.relDir, outRel: c.outRel, links: new Set(), tags: new Set() };
  const nodes = (data.nodes ?? []).map((n) => {
    const out = { id: n.id, type: n.type, x: n.x, y: n.y, width: n.width, height: n.height, label: n.label };
    if (n.color) out.color = COLORS[n.color] ?? n.color;
    if (n.type === 'text') {
      // canvas text is markdown: resolve wikilinks into site routes
      out.text = String(n.text ?? '').replace(/!?\[\[([^\]]+)\]\]/g, (all, inner) => {
        const { file, heading, label } = parseLinkInner(inner);
        const r = resolve(file, c.relDir);
        const text = label || file;
        if (r?.kind === 'note') return `[${text}](${r.target.route}${headingAnchor(heading)})`;
        if (r?.kind === 'canvas') return `[${text}](${r.target.route})`;
        if (r?.kind === 'attachment') return `[${text}](${repoUrl(r.target.rel)})`;
        return text;
      });
    } else if (n.type === 'file') {
      const r = resolve(n.file ?? '', c.relDir);
      out.title = path.basename(n.file ?? '', path.extname(n.file ?? ''));
      if (r?.kind === 'note') {
        out.title = r.target.title;
        out.href = r.target.route + headingAnchor(n.subpath?.replace(/^#/, ''));
        const ex = r.target.body.replace(/^\s*#.*\n/, '').replace(/^>.*$/gm, '').replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2').replace(/[*_`#]/g, '').trim();
        out.excerpt = ex.slice(0, 280);
      } else if (r?.kind === 'canvas') {
        out.href = r.target.route;
      } else if (r?.kind === 'attachment') {
        if (IMAGE_EXT.has(r.target.ext)) out.image = publishImage(r.target);
        else out.external = repoUrl(r.target.rel);
      }
    } else if (n.type === 'link') {
      out.url = n.url;
    }
    return out;
  });
  const edges = (data.edges ?? []).map((e) => ({
    id: e.id, from: e.fromNode, to: e.toNode, fromSide: e.fromSide, toSide: e.toSide,
    fromEnd: e.fromEnd ?? 'none', toEnd: e.toEnd ?? 'arrow', label: e.label,
    color: e.color ? COLORS[e.color] ?? e.color : undefined,
  }));
  const jsonName = c.outRel.replace(/\//g, '__').replace(/\.mdx$/, '.json');
  fs.writeFileSync(path.join(OUT_CANVAS, jsonName), JSON.stringify({ nodes, edges }));

  const fm = {
    title: c.base,
    slug: c.route,
    sidebar_position: positions.get(c.rel),
    sidebar_custom_props: { canvas: true },
    hide_table_of_contents: true,
    tags: [{ label: 'canvas', permalink: '/canvas' }],
    custom_edit_url: repoUrl(c.rel),
  };
  const dest = path.join(OUT_DOCS, c.outRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, `---
${yaml.dump(fm, { lineWidth: -1 })}---

import Canvas from '@site/src/components/Canvas';
import data from '@site/src/data/canvas/${jsonName}';

# 🗺️ ${c.base.replace(/[{}<>]/g, '')}

<Canvas data={data} />
`);
}

const imgs = [...attachments.values()].filter((a) => a.published).length;
console.log(`vault → docs: ${notes.size} notes, ${canvases.length} canvases, ${imgs} images (${VAULT})`);

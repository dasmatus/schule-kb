// Renders Obsidian callouts (> [!type]± title) as <div>/<details> blocks and
// ==highlights== as <mark>. Works on mdast, so nested callouts work too.
import { visit, SKIP } from 'unist-util-visit';

const CALLOUT_RE = /^\[!([\w-]+)\]([+-]?)[ \t]*/;

const ALIASES = {
  summary: 'abstract', tldr: 'abstract', hint: 'tip', important: 'tip',
  check: 'success', done: 'success', help: 'question', faq: 'question',
  caution: 'warning', attention: 'warning', fail: 'failure', missing: 'failure',
  error: 'danger', cite: 'quote',
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function transformCallout(node) {
  const first = node.children[0];
  if (first?.type !== 'paragraph') return;
  const head = first.children[0];
  if (head?.type !== 'text') return;
  const m = head.value.match(CALLOUT_RE);
  if (!m) return;

  const rawType = m[1].toLowerCase();
  const type = ALIASES[rawType] ?? rawType;
  const fold = m[2];
  head.value = head.value.slice(m[0].length);

  // The title is everything on the first line; the rest of the paragraph is body.
  const title = [];
  const rest = [];
  let inTitle = true;
  for (const child of first.children) {
    if (!inTitle) { rest.push(child); continue; }
    if (child.type === 'text' && child.value.includes('\n')) {
      const i = child.value.indexOf('\n');
      if (i > 0) title.push({ type: 'text', value: child.value.slice(0, i) });
      const after = child.value.slice(i + 1);
      if (after) rest.push({ type: 'text', value: after });
      inTitle = false;
    } else if (child.type === 'break') {
      inTitle = false;
    } else {
      title.push(child);
    }
  }
  const hasTitle = title.some((c) => c.type !== 'text' || c.value.trim());
  const titleChildren = hasTitle ? title : [{ type: 'text', value: capitalize(rawType) }];
  const body = rest.length ? [{ ...first, children: rest }, ...node.children.slice(1)] : node.children.slice(1);

  const classes = ['callout', `callout-${type}`];
  node.data = {
    hName: fold ? 'details' : 'div',
    hProperties: { className: classes, 'data-callout': type, ...(fold === '+' ? { open: true } : {}) },
  };
  node.children = [
    { type: 'calloutTitle', data: { hName: fold ? 'summary' : 'div', hProperties: { className: ['callout-title'] } }, children: titleChildren },
    ...(body.length ? [{ type: 'calloutContent', data: { hName: 'div', hProperties: { className: ['callout-content'] } }, children: body }] : []),
  ];
}

function splitHighlights(node, index, parent) {
  if (!parent || !node.value.includes('==')) return;
  const parts = node.value.split(/==(?=\S)([^=\n]*?\S)==/);
  if (parts.length === 1) return;
  const out = parts
    .map((value, i) => (i % 2 ? { type: 'highlight', data: { hName: 'mark' }, children: [{ type: 'text', value }] } : value && { type: 'text', value }))
    .filter(Boolean);
  parent.children.splice(index, 1, ...out);
  return [SKIP, index + out.length];
}

export default function remarkObsidian() {
  return (tree) => {
    visit(tree, 'blockquote', transformCallout);
    visit(tree, 'text', splitHighlights);
  };
}

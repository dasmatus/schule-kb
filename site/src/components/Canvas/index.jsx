// Renders an Obsidian .canvas (JSON Canvas) as a pannable, zoomable board.
// Data is pre-processed by scripts/build-vault.mjs (links resolved to routes).
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const PAD = 40;
const MIN_K = 0.15;
const MAX_K = 2.5;

function anchor(node, side) {
  const { x, y, width: w, height: h } = node;
  switch (side) {
    case 'top': return [x + w / 2, y];
    case 'bottom': return [x + w / 2, y + h];
    case 'left': return [x, y + h / 2];
    default: return [x + w, y + h / 2];
  }
}

function guessSide(from, to) {
  const dx = to.x + to.width / 2 - (from.x + from.width / 2);
  const dy = to.y + to.height / 2 - (from.y + from.height / 2);
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
  return dy > 0 ? 'bottom' : 'top';
}

const OFFSET = { top: [0, -1], bottom: [0, 1], left: [-1, 0], right: [1, 0] };
const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

function edgePath(from, to, e) {
  const fs = e.fromSide ?? guessSide(from, to);
  const ts = e.toSide ?? OPPOSITE[guessSide(from, to)];
  const [x1, y1] = anchor(from, fs);
  const [x2, y2] = anchor(to, ts);
  const d = Math.max(40, Math.hypot(x2 - x1, y2 - y1) / 2.5);
  const c1 = [x1 + OFFSET[fs][0] * d, y1 + OFFSET[fs][1] * d];
  const c2 = [x2 + OFFSET[ts][0] * d, y2 + OFFSET[ts][1] * d];
  return {
    d: `M${x1},${y1} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${x2},${y2}`,
    mid: [(x1 + 3 * c1[0] + 3 * c2[0] + x2) / 8, (y1 + 3 * c1[1] + 3 * c2[1] + y2) / 8],
  };
}

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Minimal markdown for canvas text cards: headings, lists, bold/italic, code, links.
function miniMarkdown(text, withBaseUrl) {
  const inline = (s) =>
    escapeHtml(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
      .replace(/==([^=]+)==/g, '<mark>$1</mark>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
        if (!/^(https?:|\/|#)/.test(href)) return label; // no javascript: etc.
        const url = href.startsWith('/') ? withBaseUrl(href) : href;
        const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${url}"${ext}>${label}</a>`;
      });
  const out = [];
  let list = false;
  for (const line of text.split('\n')) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    const li = line.match(/^\s*[-*+]\s+(.*)$/);
    if (li) {
      if (!list) out.push('<ul>');
      list = true;
      out.push(`<li>${inline(li[1])}</li>`);
      continue;
    }
    if (list) { out.push('</ul>'); list = false; }
    if (h) out.push(`<div class="${styles.heading} ${styles['h' + h[1].length]}">${inline(h[2])}</div>`);
    else if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push('</ul>');
  return out.join('');
}

function NodeCard({ node, withBaseUrl }) {
  const style = {
    left: node.x, top: node.y, width: node.width, height: node.height,
    ...(node.color ? { '--node-color': `var(--canvas-${node.color}, ${node.color})` } : {}),
  };
  const cls = [styles.node, styles[node.type], node.color && styles.colored].filter(Boolean).join(' ');

  if (node.type === 'group') {
    return (
      <div className={cls} style={style}>
        {node.label && <div className={styles.groupLabel}>{node.label}</div>}
      </div>
    );
  }
  if (node.type === 'file') {
    if (node.image) {
      return (
        <div className={cls} style={style}>
          <img src={withBaseUrl(node.image)} alt={node.title} className={styles.image} draggable={false} />
        </div>
      );
    }
    const inner = (
      <>
        <div className={styles.fileTitle}>{node.title}</div>
        {node.excerpt && node.height > 90 && <div className={styles.excerpt}>{node.excerpt}</div>}
      </>
    );
    return (
      <div className={cls} style={style}>
        {node.href ? (
          <Link to={node.href} className={styles.fileLink} draggable={false}>{inner}</Link>
        ) : node.external ? (
          <a href={node.external} className={styles.fileLink} target="_blank" rel="noopener noreferrer">📎 {inner}</a>
        ) : (
          <div className={`${styles.fileLink} ${styles.missing}`}>{inner}</div>
        )}
      </div>
    );
  }
  if (node.type === 'link') {
    return (
      <div className={cls} style={style}>
        <a href={node.url} target="_blank" rel="noopener noreferrer" className={styles.fileLink}>
          <div className={styles.fileTitle}>🔗 {node.url.replace(/^https?:\/\//, '')}</div>
        </a>
      </div>
    );
  }
  return (
    <div className={cls} style={style}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: miniMarkdown(node.text ?? '', withBaseUrl) }} />
    </div>
  );
}

export default function Canvas({ data }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const viewport = useRef(null);
  const drag = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [fullscreen, setFullscreen] = useState(false);

  const byId = useMemo(() => new Map(data.nodes.map((n) => [n.id, n])), [data]);
  const bounds = useMemo(() => {
    const xs = data.nodes.flatMap((n) => [n.x, n.x + n.width]);
    const ys = data.nodes.flatMap((n) => [n.y, n.y + n.height]);
    return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
  }, [data]);

  const fit = useCallback(() => {
    const el = viewport.current;
    if (!el || !data.nodes.length) return;
    const { clientWidth: w, clientHeight: h } = el;
    const bw = bounds.maxX - bounds.minX + PAD * 2;
    const bh = bounds.maxY - bounds.minY + PAD * 2;
    const k = Math.min(Math.max(Math.min(w / bw, h / bh), MIN_K), 1);
    setView({
      k,
      x: (w - (bounds.maxX - bounds.minX) * k) / 2 - bounds.minX * k,
      y: (h - (bounds.maxY - bounds.minY) * k) / 2 - bounds.minY * k,
    });
  }, [bounds, data]);

  useEffect(() => { fit(); }, [fit, fullscreen]);

  const zoomAt = useCallback((factor, cx, cy) => {
    setView((v) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
      const f = k / v.k;
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f };
    });
  }, []);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey || Math.abs(e.deltaY) > Math.abs(e.deltaX) * 2) {
        zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015)), e.clientX - r.left, e.clientY - r.top);
      } else {
        setView((v) => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  useEffect(() => {
    if (!fullscreen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setFullscreen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('a')) return;
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  };
  const onPointerUp = () => { drag.current = null; };

  const center = () => {
    const el = viewport.current;
    return [el.clientWidth / 2, el.clientHeight / 2];
  };

  const groups = data.nodes.filter((n) => n.type === 'group');
  const cards = data.nodes.filter((n) => n.type !== 'group');

  return (
    <div className={`${styles.wrapper} ${fullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.toolbar} role="toolbar" aria-label="Ovládanie mapy">
        <button type="button" onClick={() => zoomAt(1.25, ...center())} aria-label="Priblížiť">+</button>
        <button type="button" onClick={() => zoomAt(0.8, ...center())} aria-label="Oddialiť">−</button>
        <button type="button" onClick={fit} aria-label="Zobraziť celú mapu">⤢</button>
        <button type="button" onClick={() => setFullscreen((f) => !f)} aria-label={fullscreen ? 'Zavrieť celú obrazovku' : 'Celá obrazovka'}>
          {fullscreen ? '✕' : '⛶'}
        </button>
      </div>
      <div
        ref={viewport}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={styles.plane} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}>
          {groups.map((n) => <NodeCard key={n.id} node={n} withBaseUrl={withBaseUrl} />)}
          <svg className={styles.edges} style={{ left: bounds.minX - 500, top: bounds.minY - 500 }}
            width={bounds.maxX - bounds.minX + 1000} height={bounds.maxY - bounds.minY + 1000}
            viewBox={`${bounds.minX - 500} ${bounds.minY - 500} ${bounds.maxX - bounds.minX + 1000} ${bounds.maxY - bounds.minY + 1000}`}>
            <defs>
              <marker id="canvas-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="context-stroke" />
              </marker>
            </defs>
            {data.edges.map((e) => {
              const from = byId.get(e.from);
              const to = byId.get(e.to);
              if (!from || !to) return null;
              const { d, mid } = edgePath(from, to, e);
              const stroke = e.color ? `var(--canvas-${e.color}, ${e.color})` : undefined;
              return (
                <g key={e.id}>
                  <path d={d} className={styles.edge} style={stroke ? { stroke } : undefined}
                    markerEnd={e.toEnd === 'arrow' ? 'url(#canvas-arrow)' : undefined}
                    markerStart={e.fromEnd === 'arrow' ? 'url(#canvas-arrow)' : undefined} />
                  {e.label && <text x={mid[0]} y={mid[1]} className={styles.edgeLabel}>{e.label}</text>}
                </g>
              );
            })}
          </svg>
          {cards.map((n) => <NodeCard key={n.id} node={n} withBaseUrl={withBaseUrl} />)}
        </div>
      </div>
      <p className={styles.hint}>Ťahaním posúvaj, kolieskom alebo tlačidlami približuj. Kliknutím na kartu otvoríš poznámku.</p>
    </div>
  );
}

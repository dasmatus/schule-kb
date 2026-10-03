// netacad-grab.js — pull course text from a NetAcad (Adapt-based) course into JSON.
//
// Usage: open the course on netacad.com (the "Content" tab with the course
// outline), open DevTools > Console, paste this file, press Enter.
// It clicks through each module, reads the module's Adapt JSON with your
// existing session, and downloads `netacad-<course>.json`.
// Then: python3 tools/netacad/netacad-to-md.py netacad-<course>.json raw/
//
// Quiz questions (mcq etc.) and exams are skipped on purpose: notes only.
// The output is Cisco's copyrighted text — keep it local (raw/ is gitignored).

window.__netacadDone = (async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const MODULE_RE = /^Module (\d+):\s*(.+)$/;
  const SKIP_COMPONENTS = new Set([
    'mcq', 'gmcq', 'matching', 'slider', 'textinput', 'assessmentResults',
    'adaptiveStartScreen', 'quicknav', 'blank', 'packetTracer', 'media',
  ]);

  const frame = () => document.querySelector('iframe[src*="authoring-resources"], iframe');
  const findBtn = (re) =>
    [...document.querySelectorAll('button, a')].find((b) => re.test(b.innerText.trim().split('\n')[0]));

  async function moduleBase(num) {
    const mod = findBtn(new RegExp(`^Module ${num}:`));
    if (!mod) return null;
    if (mod.getAttribute('aria-expanded') !== 'true') { mod.click(); await sleep(1200); }
    const intro = findBtn(new RegExp(`^${num}\\.0\\.?\\s`));
    (intro || mod).click();
    for (let i = 0; i < 30; i++) {
      await sleep(500);
      try {
        const hit = frame().contentWindow.performance
          .getEntriesByType('resource')
          .map((e) => e.name.split('?')[0])
          .reverse()
          .find((n) => n.endsWith('/contentObjects.json'));
        const base = hit && hit.replace(/contentObjects\.json$/, '');
        if (base && !Object.values(seen).includes(base)) return base;
      } catch (_) { /* iframe reloading */ }
    }
    // the package that was already open before we started belongs to this module
    if (seen._preloaded) { const b = seen._preloaded; delete seen._preloaded; return b; }
    return null;
  }

  const getJSON = async (url) => (await fetch(url, { credentials: 'include' })).json();
  const seen = { _preloaded: (() => { try { return frame().contentWindow.performance.getEntriesByType('resource').map((e) => e.name.split('?')[0]).filter((n) => n.endsWith('/contentObjects.json')).pop()?.replace(/contentObjects\.json$/, ''); } catch (_) { return undefined; } })() };
  const out = { course: document.title, grabbedAt: new Date().toISOString(), modules: [] };

  const modules = [...document.querySelectorAll('button')]
    .map((b) => b.innerText.trim().split('\n')[0].match(MODULE_RE))
    .filter(Boolean)
    .map((m) => ({ num: +m[1], title: m[2].trim() }))
    .filter((m, i, a) => a.findIndex((x) => x.num === m.num) === i);

  for (const m of modules) {
    const base = await moduleBase(m.num);
    if (!base) { console.warn('no package for module', m.num); continue; }
    seen[m.num] = base;
    const [co, ar, bl, cp] = await Promise.all(
      ['contentObjects', 'articles', 'blocks', 'components'].map((f) => getJSON(`${base}${f}.json`)),
    );
    const kids = (arr, id) => arr.filter((x) => x._parentId === id && !x._isDeleted);
    const fix = (s) => (s || '').replaceAll('{{_moduleNumber}}', m.num);
    const pages = co.filter((c) => c._type === 'page').map((p) => ({
      title: fix(p.title || p.displayTitle),
      components: kids(ar, p._id).flatMap((a) => kids(bl, a._id)).flatMap((b) =>
        kids(cp, b._id)
          .filter((c) => !SKIP_COMPONENTS.has(c._component))
          .map((c) => ({
            type: c._component,
            title: fix(c.displayTitle || c.title),
            body: fix(c.body),
            items: (c._items || []).map((it) => ({
              title: fix(it.title || it.displayTitle),
              body: fix(it.body || it.text),
            })),
            raw: ['commandWindow', 'syntax-checker', 'table'].includes(c._component)
              ? JSON.stringify(c).replaceAll('{{_moduleNumber}}', m.num) : undefined,
          })),
      ),
    }));
    out.modules.push({ ...m, pages });
    console.log(`module ${m.num}: ${pages.length} pages`);
  }

  window.__netacad = out;
  const blob = new Blob([JSON.stringify(out, null, 1)], { type: 'application/json' });
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: `netacad-${out.course.replace(/\W+/g, '_').slice(0, 60)}.json`,
  });
  if (!window.__netacadNoDownload) a.click();
  console.log('done:', out.modules.length, 'modules');
})();

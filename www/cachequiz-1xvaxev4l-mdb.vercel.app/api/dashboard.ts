import type {VercelRequest, VercelResponse} from "@vercel/node";
import {DASHBOARD_TOKEN, getLogins, getResults} from "./_lib";
import type {LoginStat, QuizResult} from "./_lib";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.t !== DASHBOARD_TOKEN)
    return res.status(403).send("Prístup zamietnutý.");

  const [logins, results] = await Promise.all([getLogins(), getResults()]);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(buildDashboard(logins, results));
}

function buildDashboard(logins: LoginStat[], results: QuizResult[]): string {
  const totalLogins   = logins.length;
  const successLogins = logins.filter(l => l.success && !l.banned).length;
  const bannedHits    = logins.filter(l => l.banned).length;
  const avgScore      = results.length ? Math.round(results.reduce((a, r) => a + r.pct, 0) / results.length) : 0;
  const best          = results.length ? results.reduce((a, r) => r.pct > a.pct ? r : a) : null;

  const loginRows = logins.map(l => `<tr>
    <td>${fmtTs(l.ts)}</td><td>${esc(l.name||l.username)}</td>
    <td><span class="badge ${l.banned?"ban":l.success?"ok":"fail"}">${l.banned?"Zakázaný":l.success?"OK":"Zlé heslo"}</span></td>
  </tr>`).join("") || `<tr><td colspan="3" class="empty">Žiadne záznamy</td></tr>`;

  const resultRows = results.map(r => `<tr>
    <td>${fmtTs(r.ts)}</td><td>${esc(r.name)}</td>
    <td><strong>${r.score}/${r.total}</strong></td>
    <td><span style="font-weight:700;color:${r.pct>=70?"#34c87a":r.pct>=50?"#f5a623":"#f05252"}">${r.pct}%</span></td>
    <td>${fmtDur(r.duration)}</td>
    <td>${r.tabSwitches>0?`<span class="badge fail">${r.tabSwitches}×</span>`:"—"}</td>
  </tr>`).join("") || `<tr><td colspan="6" class="empty">Žiadne výsledky</td></tr>`;

  return `<!DOCTYPE html><html lang="sk"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dashboard – Kvíz</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#111318;color:#e8ecf0;padding:24px 16px 48px}
.wrap{max-width:960px;margin:0 auto}
h1{font-size:24px;font-weight:700;margin-bottom:4px}
.sub{color:#8a93a8;font-size:13px;margin-bottom:28px}.sub a{color:#4f8ef7}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:32px}
.card{background:#1c1f27;border:1px solid #2e3340;border-radius:12px;padding:18px}
.card .v{font-size:30px;font-weight:800;margin-bottom:4px}.card .l{font-size:12px;color:#8a93a8}
.g{color:#34c87a}.b{color:#4f8ef7}.r{color:#f05252}.y{color:#f5a623}
.section{margin-bottom:32px}
.section h2{font-size:12px;font-weight:700;color:#8a93a8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
table{width:100%;border-collapse:collapse;background:#1c1f27;border:1px solid #2e3340;border-radius:12px;overflow:hidden;font-size:14px}
th{background:#242831;padding:9px 14px;text-align:left;font-size:11px;font-weight:700;color:#8a93a8;text-transform:uppercase;letter-spacing:.05em}
td{padding:9px 14px;border-top:1px solid #2e3340}tr:hover td{background:#242831}
.badge{display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700}
.badge.ok{background:rgba(52,200,122,.15);color:#34c87a}.badge.fail{background:rgba(240,82,82,.15);color:#f05252}.badge.ban{background:rgba(245,166,35,.15);color:#f5a623}
.empty{color:#8a93a8;font-style:italic;padding:18px 14px}
a.btn{display:inline-block;padding:7px 14px;background:#4f8ef7;color:#fff;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;margin-bottom:20px}
</style></head><body><div class="wrap">
<h1>📊 Dashboard</h1>
<p class="sub">Cacheovanie a Monitoring DB · <a href="/">← Kvíz</a></p>
<a class="btn" href="">⟳ Obnoviť</a>
<div class="grid">
  <div class="card"><div class="v b">${totalLogins}</div><div class="l">Celkom prihlásení</div></div>
  <div class="card"><div class="v g">${successLogins}</div><div class="l">Úspešných</div></div>
  <div class="card"><div class="v r">${bannedHits}</div><div class="l">Zablokovaných</div></div>
  <div class="card"><div class="v g">${results.length}</div><div class="l">Dokončených kvízov</div></div>
  <div class="card"><div class="v ${avgScore>=70?"g":avgScore>=50?"y":"r"}">${results.length?avgScore+"%":"—"}</div><div class="l">Priemerné skóre</div></div>
  <div class="card"><div class="v y" style="font-size:18px">${best?`${best.pct}%<br><small style="font-size:12px;color:#8a93a8">${esc(best.name)}</small>`:"—"}</div><div class="l">Najlepší výsledok</div></div>
</div>
<div class="section"><h2>Výsledky kvízu</h2>
<table><thead><tr><th>Čas</th><th>Meno</th><th>Body</th><th>%</th><th>Trvanie</th><th>Tab switche</th></tr></thead>
<tbody>${resultRows}</tbody></table></div>
<div class="section"><h2>Prihlásenia</h2>
<table><thead><tr><th>Čas</th><th>Meno / login</th><th>Stav</th></tr></thead>
<tbody>${loginRows}</tbody></table></div>
</div></body></html>`;
}

function fmtTs(iso: string) {
  return new Date(iso).toLocaleString("sk-SK", {dateStyle:"short", timeStyle:"short"});
}
function fmtDur(s: number) {
  if (!s) return "—";
  const m = Math.floor(s / 60);
  return m ? `${m}m ${s%60}s` : `${s}s`;
}
function esc(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

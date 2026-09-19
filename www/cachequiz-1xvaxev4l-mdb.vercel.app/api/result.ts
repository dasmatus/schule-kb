import type {VercelRequest, VercelResponse} from "@vercel/node";
import {pushResult} from "./_lib";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const b = req.body ?? {};
  await pushResult({
    ts: new Date().toISOString(),
    name: String(b.name ?? "?"),
    score: Number(b.score ?? 0),
    total: Number(b.total ?? 15),
    pct: Number(b.pct ?? 0),
    duration: Number(b.duration ?? 0),
    tabSwitches: Number(b.tabSwitches ?? 0),
  });
  res.json({ok: true});
}

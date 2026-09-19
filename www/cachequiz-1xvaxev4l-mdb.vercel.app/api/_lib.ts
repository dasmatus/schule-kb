import {Redis} from "@upstash/redis";

let _kv: Redis | null = null;
function kv(): Redis {
  if (!_kv) {
    const url   = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) throw new Error("UPSTASH_REDIS_REST_URL / TOKEN env vars not set");
    _kv = new Redis({url, token});
  }
  return _kv;
}

export const SCHOOL = process.env.SCHOOL ?? "spsehalova";
export const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN ?? "local-dev-token";

const BANNED = ["MariaPolakova", "MatusMastena"];
const DASH_USERS = ["MatusMastena"];

function norm(s: string) { return s.replace(/[.\-_ ]/g, "").toLowerCase(); }

export function isBanned(first: string, last: string) {
  return BANNED.some(b => norm(b) === norm(first + last));
}
export function hasDashboard(first: string, last: string) {
  return DASH_USERS.some(d => norm(d) === norm(first + last));
}

export interface LoginStat {
  ts: string; username: string; name: string;
  success: boolean; banned: boolean; error?: string;
}
export interface QuizResult {
  ts: string; name: string; score: number;
  total: number; pct: number; duration: number; tabSwitches: number;
}

export async function pushLogin(entry: LoginStat) {
  try { await kv().lpush("logins", JSON.stringify(entry)); } catch { /* no Redis */ }
}
export async function pushResult(entry: QuizResult) {
  try { await kv().lpush("results", JSON.stringify(entry)); } catch { /* no Redis */ }
}
export async function getLogins(n = 200): Promise<LoginStat[]> {
  try {
    const raw = await kv().lrange("logins", 0, n - 1);
    return (raw as string[]).map(r => JSON.parse(r));
  } catch { return []; }
}
export async function getResults(n = 200): Promise<QuizResult[]> {
  try {
    const raw = await kv().lrange("results", 0, n - 1);
    return (raw as string[]).map(r => JSON.parse(r));
  } catch { return []; }
}

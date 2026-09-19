import type {VercelRequest, VercelResponse} from "@vercel/node";
import {User, LoginError} from "edupage-api";
import {SCHOOL, isBanned, hasDashboard, DASHBOARD_TOKEN, pushLogin} from "./_lib";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const {username = "", password = ""} = req.body ?? {};
  if (!username || !password)
    return res.status(400).json({ok: false, error: "Vyplň meno aj heslo."});

  const user = new User();
  try {
    await user.login(String(username), String(password), {edupage: SCHOOL});
    const first = user.firstname ?? "";
    const last  = user.lastname  ?? "";
    const name  = `${first} ${last}`.trim() || String(username);
    const banned = isBanned(first, last);
    const dash   = !banned && hasDashboard(first, last);

    await pushLogin({ts: new Date().toISOString(), username: String(username), name, success: true, banned});

    if (banned)
      return res.status(403).json({ok: false, banned: true, error: `Účet „${name}" nemá povolenie spustiť tento kvíz.`});

    return res.json({
      ok: true,
      name,
      ...(dash ? {dashboardUrl: `/api/dashboard?t=${DASHBOARD_TOKEN}`} : {}),
    });

  } catch (e: any) {
    const msg: string = e?.message ?? String(e);
    const wrongPass = e instanceof LoginError || msg.toLowerCase().includes("incorrect") || msg.toLowerCase().includes("login");
    await pushLogin({ts: new Date().toISOString(), username: String(username), name: "", success: false, banned: false, error: wrongPass ? "wrong_password" : msg});
    return wrongPass
      ? res.status(401).json({ok: false, error: "Nesprávne meno alebo heslo."})
      : res.status(500).json({ok: false, error: "Chyba overenia: " + msg});
  }
}

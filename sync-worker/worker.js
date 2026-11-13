// Builder's Quest progress sync.
// Each sync code gets its own Durable Object, which holds { rev, saved, state }.
// The code itself is the password: the Worker only ever sees a hash of it as the object name.
//   GET  /progress/<code>  -> 200 { rev, saved, state } | 404
//   PUT  /progress/<code>  body { state, baseRev }  -> 200 { rev, saved } | 409 { rev, saved, state }
// A PUT whose baseRev is behind the stored rev is refused with 409 so an old tab can't wipe newer progress.

const CODE_RE = /^[a-z0-9]{16,64}$/;
const MAX_BODY = 1024 * 1024; // 1 MB, real progress is a few KB

function cors(req, env) {
  const origin = req.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "*").split(",").map(s => s.trim()).filter(Boolean);
  const ok = allowed.includes("*") ? "*" : allowed.includes(origin) ? origin : allowed[0] || "";
  return {
    "Access-Control-Allow-Origin": ok,
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}
const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });

async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}

export default {
  async fetch(req, env) {
    const h = cors(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    const m = new URL(req.url).pathname.match(/^\/(?:api\/)?progress\/([^/]+)$/);
    if (!m) return json({ error: "not found" }, 404, h);
    const code = decodeURIComponent(m[1]).toLowerCase();
    if (!CODE_RE.test(code)) return json({ error: "bad code" }, 400, h);
    if (req.method !== "GET" && req.method !== "PUT") return json({ error: "method" }, 405, h);
    let body = null;
    if (req.method === "PUT") {
      const text = await req.text();
      if (text.length > MAX_BODY) return json({ error: "too big" }, 413, h);
      try { body = JSON.parse(text); } catch { return json({ error: "bad json" }, 400, h); }
      if (!body || typeof body.state !== "object" || body.state === null || Array.isArray(body.state)) return json({ error: "bad state" }, 400, h);
    }
    const stub = env.PROGRESS.get(env.PROGRESS.idFromName(await sha256("bq:" + code)));
    const res = await stub.fetch("https://do/", { method: req.method, body: body ? JSON.stringify(body) : undefined });
    return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...h } });
  },
};

export class Progress {
  constructor(ctx) { this.storage = ctx.storage; }
  async fetch(req) {
    const cur = (await this.storage.get("doc")) || null;
    if (req.method === "GET") return cur ? json(cur, 200) : json({ error: "none" }, 404);
    const { state, baseRev } = await req.json();
    const rev = cur ? cur.rev : 0;
    if (cur && typeof baseRev === "number" && baseRev < rev) return json(cur, 409);
    const doc = { rev: rev + 1, saved: new Date().toISOString(), state };
    await this.storage.put("doc", doc);
    return json({ rev: doc.rev, saved: doc.saved }, 200);
  }
}

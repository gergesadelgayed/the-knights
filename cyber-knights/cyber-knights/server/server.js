import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4000;
// Set EXAM_SECRET in production (any long random string). Falls back to a per-boot secret.
const SECRET = process.env.EXAM_SECRET || crypto.randomBytes(32).toString("hex");
const DURATION_MS = (Number(process.env.EXAM_MINUTES) || 20) * 60 * 1000;
const PASS_PERCENT = 70;
const PLAN = { easy: 5, medium: 2, advanced: 3 };

// ---- question bank (validated once at boot) ----
const bank = JSON.parse(fs.readFileSync(path.join(__dirname, "questions.json"), "utf8"));
const byId = new Map();
for (const q of bank) {
  const ok =
    typeof q.id === "string" && PLAN[q.level] && typeof q.q === "string" &&
    Array.isArray(q.options) && q.options.length >= 2 && q.options.every((o) => typeof o === "string") &&
    Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length;
  if (!ok || byId.has(q.id)) throw new Error(`Bad or duplicate question: ${q.id}`);
  byId.set(q.id, q);
}
for (const [lvl, n] of Object.entries(PLAN)) {
  if (bank.filter((q) => q.level === lvl).length < n) throw new Error(`Need at least ${n} "${lvl}" questions`);
}

// ---- helpers ----
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const b64 = (s) => Buffer.from(s).toString("base64url");
const mac = (body) => crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
const sign = (payload) => { const body = b64(JSON.stringify(payload)); return `${body}.${mac(body)}`; };
function verify(token) {
  if (typeof token !== "string" || token.length > 4000) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sig), b = Buffer.from(mac(body));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try { return { payload: JSON.parse(Buffer.from(body, "base64url").toString()), sig }; } catch { return null; }
}
const cleanName = (n) =>
  typeof n === "string" ? n.replace(/[\u0000-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim() : "";

// One-time use: a submitted token can't be replayed (kept until it would expire anyway).
const used = new Map();
setInterval(() => { const now = Date.now(); for (const [k, exp] of used) if (exp < now) used.delete(k); }, 60_000).unref();

// ---- app ----
const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
}));
app.use(express.json({ limit: "10kb" }));

const api = express.Router();
api.use(rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false }));
const startLimiter = rateLimit({
  windowMs: 15 * 60_000, limit: 10, standardHeaders: true, legacyHeaders: false,
  message: { error: "Too many attempts. Try again in a few minutes." },
});

api.post("/exam/start", startLimiter, (req, res) => {
  const name = cleanName(req.body?.name);
  if (name.length < 2 || name.length > 40) return res.status(400).json({ error: "Enter your name (2–40 characters)." });

  const picked = shuffle(
    Object.entries(PLAN).flatMap(([lvl, n]) => shuffle(bank.filter((q) => q.level === lvl)).slice(0, n))
  );
  const items = picked.map((q) => ({ q, perm: shuffle(q.options.map((_, i) => i)) }));
  const now = Date.now();
  const token = sign({ n: name, s: now, e: now + DURATION_MS, q: items.map(({ q, perm }) => [q.id, perm]) });

  res.json({
    token,
    name,
    durationMs: DURATION_MS,
    questions: items.map(({ q, perm }) => ({
      id: q.id, level: q.level, q: q.q, options: perm.map((i) => q.options[i]),
    })),
  });
});

api.post("/exam/submit", (req, res) => {
  const v = verify(req.body?.token);
  if (!v) return res.status(400).json({ error: "Invalid exam session." });
  const { n, s, e, q: items } = v.payload;
  const now = Date.now();
  if (now > e + 30_000) return res.status(410).json({ error: "Time is up — this exam session expired." });
  if (used.has(v.sig)) return res.status(409).json({ error: "This exam was already submitted." });
  used.set(v.sig, e + 60_000);

  const given = req.body?.answers && typeof req.body.answers === "object" ? req.body.answers : {};
  const byLevel = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, advanced: { correct: 0, total: 0 } };
  let correct = 0;
  for (const [id, perm] of items) {
    const q = byId.get(id);
    if (!q) continue;
    byLevel[q.level].total++;
    const pick = given[id];
    if (Number.isInteger(pick) && pick >= 0 && pick < perm.length && perm[pick] === q.answer) {
      correct++; byLevel[q.level].correct++;
    }
  }
  const total = items.length;
  const percent = Math.round((correct / total) * 100);
  res.json({
    name: n, correct, total, percent, passed: percent >= PASS_PERCENT, passPercent: PASS_PERCENT,
    unanswered: items.filter(([id]) => !Number.isInteger(given[id])).length,
    byLevel, durationSec: Math.min(Math.round((now - s) / 1000), Math.round(DURATION_MS / 1000)),
  });
});

api.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use("/api", api);

// Serve the built React site (single free service on Render/Railway/etc.)
const dist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: "1h" }));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.use((err, _req, res, _next) => {
  res.status(err.status === 400 || err.type === "entity.parse.failed" ? 400 : 500).json({ error: "Bad request" });
});

app.listen(PORT, () => console.log(`Cyber Knights server on :${PORT}`));

# Cyber Knights — Website

A cinematic, cyber/gaming-styled site for Cyber Knights, a non-profit student
cybersecurity community. React + Vite + Tailwind + Framer Motion frontend.
Static site content lives in one file; the `/exam` page is backed by a small Express server (`server/`, no database).

```
cyber-knights/
└── frontend/     React + Vite + Tailwind + Framer Motion site
```

## Running locally

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173.

## What to edit

Everything you're likely to change day-to-day lives in **one file**:
`frontend/src/config.js`

- `joinUrl` — the link the "Become a Knight" buttons open (Google Form).
- `partnershipEmail` — the real inbox (`cyberknights.eg@gmail.com`), used on
  the Partnership page, the Join page contact form, and the Footer.
- `socials` — Facebook, Instagram, LinkedIn, TikTok links, each with a label
  and short description. Powers both the Footer icons and the `/socials` page.
- `missions` / `whyUs` — the About-page mission cards and "Why Cyber
  Knights?" cards.
- `whatWeDo` — the "What We Do" cards on Home, right after the Hero.
- `stats` — the numbers shown in the stats row on the Home page. Never leave
  a stat at a bare `"0"` — use a short label like `"TBD"` instead.
- `focusAreas` — the tags shown on the Teams page describing the areas Cyber
  Knights covers (Web Security, Forensics, etc.), separate from the specific
  competitive team(s) listed below them.
- `teams` — teams and their members/achievements, rendered on the Teams page.
- `partners` — partner orgs (currently Cyber Defender), rendered on the
  Partnership page. `logo` points at a file under `frontend/public/partners/`.
- `partnerships.collaborationNote` — the generic "Industry & Academic
  Collaboration" blurb on the Partnership page. Keep it free of any org name
  other than Cyber Defender until a new partnership is confirmed.
- `join.whoCanJoin` — the "Who Can Join?" blurb on the Join page.

## Pre-launch checklist

These are the only things in the project still marked `// TODO` or otherwise
flagged as needing real data — search `config.js` for `TODO` to find them
again later:

- [ ] **Events stat** (`config.stats`) — currently `"TBD"`. Set a real count
      once you know how many events have been run.
- [ ] **Cyber Defender logo** (`config.partners[0].logo`) — a file is already
      in place at `frontend/public/partners/cyber-defender.png`; double-check
      it's the final, correct asset before launch.
- [ ] **Open Graph URL** — `index.html`'s OG/Twitter tags don't set
      `og:url` yet since there's no production domain configured. Add
      `<meta property="og:url" content="https://your-domain.tld/" />` once
      the site has a permanent home.
- [ ] **EL FLA73N achievements** (`config.teams[0].achievements`) — carried
      over as-is from the existing project data; confirm these results are
      still accurate before launch.

## Building for production

```bash
cd frontend
npm run build       # outputs frontend/dist
```

Serve `frontend/dist` as static files from any host (Vercel, Netlify,
Nginx, etc.) — no server process required.

## Design notes

Visual identity: deep navy/near-black background, electric blue as the
primary glow, crimson red as a sparing accent, glitch/chromatic-aberration on
headings, HUD corner brackets on cards, and a faint (near-invisible) static
circuit-line texture behind all pages. All motion respects
`prefers-reduced-motion`.

Reusable components live in `frontend/src/components/`: `Navbar`,
`Footer`, `GlitchTitle`, `HudCard`, `NeonButton`, `MemberCard`.

`frontend/public/og-image.png` (1200×630) is the social-preview image used by
the Open Graph / Twitter Card meta tags in `index.html`. Regenerate it if the
brand art or tagline changes.

## Network Security exam (`/exam`)

Backend: `server/` (Express, stateless — no database). The question bank is `server/questions.json`
(`{id, level: easy|medium|advanced, q, options[], answer(index)}`). Each attempt draws 5 easy + 2 medium +
3 advanced at random, pass mark 70%. Correct answers never leave the server; sessions are HMAC-signed,
time-limited and single-use.

```bash
cd server && npm install && EXAM_SECRET=change-me npm start      # :4000
cd frontend && npm install && npm run dev                          # :5173, proxies /api
```

Free deploy (one service, e.g. Render): build `cd frontend && npm install && npm run build && cd ../server && npm install`,
start `cd server && npm start`, env `EXAM_SECRET=<long random string>`. The server also serves `frontend/dist`.

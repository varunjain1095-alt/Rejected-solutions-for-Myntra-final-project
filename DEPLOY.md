# Deploy to Railway

## One-time setup

1. Push this repo to GitHub (or connect via Railway CLI).
2. In [Railway](https://railway.com): **New Project** → **Deploy from GitHub repo** → select this repo.
3. **Variables** (Project → Service → Variables):
   - `OPENAI_API_KEY` — required for Solution 2 free-form chat (cached prompts work without it)
   - Optional: `OPENAI_MODEL=gpt-4o-mini`, `OPENAI_MAX_TOKENS=512`
4. Railway sets `PORT` automatically. Do not override unless needed.
5. **Settings** → generate a **Public Domain** (e.g. `rejected-solutions-production.up.railway.app`).

Build uses `railway.toml`: installs app deps, runs `vite build`, starts Express with static files + `/api/chat`.

Health check: `GET /api/health`

## Local production test

```bash
npm install
npm run preview:prod
```

Open http://localhost:3001

## Presentation deep links

Replace `YOUR_DOMAIN` with your Railway public URL.

| Solution | Link |
|----------|------|
| 1. Filtering | `https://YOUR_DOMAIN/?s=filter` |
| 2. Chatbot | `https://YOUR_DOMAIN/?s=chat` |
| 3. Priority | `https://YOUR_DOMAIN/?s=priority` |
| 4. Info Tiles | `https://YOUR_DOMAIN/?s=tiles` |
| 5. Compare | `https://YOUR_DOMAIN/?s=compare` |

Default (no param): `https://YOUR_DOMAIN/` → Solution 1

Tours auto-start on each tab. **Take tour** replays manually.

## CLI deploy (optional)

```bash
npm i -g @railway/cli
railway login
railway init
railway up
railway domain
```

Set variables: `railway variables set OPENAI_API_KEY=sk-...`

# Rejected Solutions Demo

Interactive demos of 5 rejected Myntra wishlist approaches. Built so reviewers can experience why each solution fails the retroactive interference problem.

**Status:** Complete (Aug 26, 2026). Deployment for external reviewers planned for Aug 30.

## Run locally

```bash
npm install
npm run dev
```

- App: http://localhost:5173
- API: http://localhost:3001

Requires `.env` with `OPENAI_API_KEY` for Solution 2 free-form chat. Cached prompts **best deals** and **something for a trip** work without API.

## Solutions

1. **Filtering** — Advanced filter panel
2. **Chatbot** — Ask AI to filter (OpenAI)
3. **Priority** — Soon / Maybe / Later sections
4. **Info Tiles** — Always-on size and return rows
5. **Compare** — Side-by-side spec comparison

## Guided tours

Tours **auto-start** when you land and when you switch solution tabs. Each tour has 3 steps: where the feature lives, how to use it, one friction test.

Click **Take tour** to replay manually.

## Friction testing

See `frictionpoint.md` for step-by-step reviewer test cases (4 per solution).

## Deploy (Railway)

See **[DEPLOY.md](DEPLOY.md)** for full steps.

```bash
npm run preview:prod   # local production test on :3001
```

**Deep links** (replace `YOUR_DOMAIN`):

| Solution | URL |
|----------|-----|
| 1. Filtering | `https://YOUR_DOMAIN/?s=filter` |
| 2. Chatbot | `https://YOUR_DOMAIN/?s=chat` |
| 3. Priority | `https://YOUR_DOMAIN/?s=priority` |
| 4. Info Tiles | `https://YOUR_DOMAIN/?s=tiles` |
| 5. Compare | `https://YOUR_DOMAIN/?s=compare` |

Set `OPENAI_API_KEY` on Railway for free-form chat.

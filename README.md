# Molthub.bot - Moltbot reliability signals

Molthub.bot is a non-official reliability signal layer for Moltbot skills. It publishes MSI and Reliability Radar(TM) summaries from local JSON data.

## Pages

- `/` Home
- `/skills` Moltbot Skills Dashboard
- `/radar` Moltbot Reliability Radar
- `/about` About & Methodology

## Data sources

- `data/skills.json` - MSI, tier, notes, last update
- `data/radar.json` - radar briefs, severity, type, affected skills

## Local development

```bash
pnpm install
pnpm dev
```

## Deploy

Import the repository in Vercel and deploy with the default Next.js settings.

## Update content

Edit `data/skills.json` or `data/radar.json`, commit, and redeploy.


# aayushbankar.github.io

Official personal research node, technical publication platform, and systems architecture portfolio for **Aayush Bankar** (Cybersecurity Analyst @ CypherMatrix).

Live URL: [https://aayushbankar.github.io](https://aayushbankar.github.io)

## Highlights & Architecture
- **Astro v7 + Tailwind v4 + MDX**: Zero client-side JS overhead by default; sub-second TTFB.
- **Research Engine**: Strict Zod schema validation for CVE teardowns, verification ledgers, and papers.
- **Dark Cyber HUD Aesthetic**: Unified monospace typography, electric cyan accents, and terminal components.
- **CI/CD**: GitHub Actions workflow automatically builds and deploys to GitHub Pages on every push to `main`.
- **Syndication**: Auto-generated RSS 2.0 feed (`/rss.xml`) and sitemap (`/sitemap-index.xml`).

## Local Development
```bash
pnpm install
pnpm dev
```

## Production Build
```bash
pnpm build
pnpm preview
```

# Kousta UI Docs

This site is built with [Next.js](https://nextjs.org/) and [Nextra](https://nextra.site/) (`nextra-theme-docs`).

Documentation pages live in `src/content/` as `.mdx` files. Interactive previews and tabbed code samples use components in `src/components/`.

## Environment variables

Copy `.env.example` to `.env.local` (or `.env`) in this `docs/` folder:

```bash
cp .env.example .env.local
```

### `NEXT_PUBLIC_API_BASE_URL`

Used by interactive previews (for example `AsyncSelect` and `DataTable`) when they call your backend.

- Default in code when unset: `http://localhost:8001` in development, `https://api.ui.kousta.org/` in production builds.
- Set `NEXT_PUBLIC_API_BASE_URL` so the browser can reach your API (must be public — do not use server-only secrets here).

If you run the demo backend locally, start it on port `8001` so the docs previews can fetch from `/products`.

#### Production deployments

Set `NEXT_PUBLIC_API_BASE_URL` in your hosting provider’s environment for **production** (and preview if needed).

- **Vercel** — Project → Settings → Environment Variables.
- **Netlify** — Site settings → Environment variables.
- **Docker / self-hosted** — pass at build time: `NEXT_PUBLIC_API_BASE_URL=https://api.example.com yarn build`.

## Local development

From the monorepo root:

```bash
yarn docs:start
```

Or inside `docs/`:

```bash
yarn dev
```

## Build

```bash
yarn docs:build
```

Static output is produced by `next build` (default `.next/`; use a platform integration or `next export` if you need fully static hosting without a Node server — follow Next.js deployment docs for your host).

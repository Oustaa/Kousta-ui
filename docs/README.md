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

### DocSearch (optional)

The navbar search box uses [Algolia DocSearch](https://docsearch.algolia.com/) when configured, and falls back to Nextra's built-in local search otherwise. To enable it, set all three:

- `NEXT_PUBLIC_DOCSEARCH_APP_ID`
- `NEXT_PUBLIC_DOCSEARCH_SEARCH_API_KEY` — the **search-only** API key from your Algolia app. Never put your admin/write key here; it's safe to ship a search-only key to the browser, but an admin key is not.
- `NEXT_PUBLIC_DOCSEARCH_INDEX_NAME`

The index itself is populated by the "Populate the docs (DocSearch)" step in [`deploy-docs.yml`](../.github/workflows/deploy-docs.yml), using `docsearch.config.json` and a separate, server-only `DOCSEARCH_API_KEY` secret (the admin key, used only in CI, never sent to the browser).

## Local development

From the monorepo root:

```bash
yarn docs:dev
```

Or inside `docs/`:

```bash
yarn dev
```

## Build

```bash
yarn docs:build
```

The site uses `output: "export"` in `next.config.mjs`, so `next build` produces a fully static site in `docs/out/` — that's what gets published to GitHub Pages. To preview that static build locally (no hot reload):

```bash
yarn docs:serve
```

(serves `docs/out/` with the `serve` package — `next start` doesn't work here since static export has no server output.)

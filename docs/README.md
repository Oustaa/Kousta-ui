
# Kousta UI Docs

## Environment variables

Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

### `DOCUSAURUS_API_BASE_URL`

Used by interactive previews (for example `AsyncSelect` and `DataTable`) to call your backend.

- Default: `http://localhost:8001`
- Env var: `DOCUSAURUS_API_BASE_URL`

If you run the demo backend locally, start it on port `8001` so the docs previews can fetch from:

- `/api/v1/products`

#### Production deployments

Set `DOCUSAURUS_API_BASE_URL` in your hosting provider **build environment**.

- **Netlify**
  - Site settings -> Build & deploy -> Environment -> Environment variables
  - Add: `DOCUSAURUS_API_BASE_URL=https://api.ui.kousta.org/` (or your API)

- **Vercel**
  - Project settings -> Environment Variables
  - Add `DOCUSAURUS_API_BASE_URL` for Production (and Preview if needed)

- **Docker / self-hosted**
  - Provide it at build time (Docusaurus reads it during build):
    - `DOCUSAURUS_API_BASE_URL=https://api.ui.kousta.org/ yarn build`

### DocSearch (optional)

If you enable Algolia DocSearch:

- `DOCSEARCH_APP_ID`
- `DOCSEARCH_API_KEY`
- `DOCSEARCH_INDEX_NAME`

These are already conditionally read in `docusaurus.config.ts`.

## Local development

```bash
yarn start
```

## Build

```bash
yarn build
```


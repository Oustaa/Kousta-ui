
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


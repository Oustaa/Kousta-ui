---
sidebar_position: 3
title: Search
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  StaticSearchPreview,
  DynamicSearchPreview,
} from '@site/src/components/@Table/DataTable';

# Search

`DataTable` search is configured through `actions.search`.

Search supports:

- **Static search**: filter the provided `data` on the client.
- **Dynamic search**: call an API (via `actions.search.onSearch` or `actions.get`).

## `actions.search` props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `static` | `boolean` | `false` | When `true`, filtering happens on the client via `onSearch(row, {query, reg})`. When `false`, the table calls your API callback with `{ page, limit, search }`. |
| `onSearch` | `(row, { query, reg }) => boolean` \| `(params) => void` | — | Search callback. Signature depends on `static`. |
| `searchOnType` | `boolean` | `false` | If `true`, triggers search while typing (debounced). If `false`, user must press Enter or click Search button. |
| `searchTimer` | `number` | `500` | Debounce duration in ms when `searchOnType: true`. |

---

## Static search

Static search means filtering rows client-side. Enable it with:

- `actions.search.static: true`
- `actions.search.onSearch(row, { query, reg }) => boolean`

```tsx
import React, { useMemo } from "react";
import { DataTable } from "@kousta-ui/table";

type User = { id: number; name: string; email: string };

export default function Example() {
  const data = useMemo<User[]>(
    () => [
      { id: 1, name: "John", email: "john@example.com" },
      { id: 2, name: "Jane", email: "jane@example.com" },
      { id: 3, name: "Bob", email: "bob@example.com" },
    ],
    [],
  );

  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      pagination={{ total: data.length, page: 1, limit: 10, type: "static" }}
      actions={{
        search: {
          static: true,
          searchOnType: true,
          searchTimer: 300,
          onSearch: (row, { reg }) => {
            return reg.test(row.name) || reg.test(row.email);
          },
        },
      }}
      keyExtractor={(row) => row.id}
    />
  );
}
```

### Preview

<BrowserOnly>{() => <StaticSearchPreview />}</BrowserOnly>

---

## Dynamic search

Dynamic search triggers a callback with params like `{ page, limit, search }`.

You can implement it in either of these ways:

- **`actions.search` with `static: false`**
- Or **only `actions.get`** (the search UI will call `get`)

```tsx
import React, { useEffect, useState } from "react";
import { DataTable } from "@kousta-ui/table";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type User = { id: number; name: string; email: string };

type ProductsResponse =
  | {
      meta?: { total?: number };
      products?: User[];
    }
  | any;

const CACHE_PREFIX = "kousta_ui_docs_data_table_search:";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 365 * 10;

function readCache<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { value: T; expiresAt: number };
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      localStorage.removeItem(key);
      return undefined;
    }
    return parsed.value;
  } catch {
    return undefined;
  }
}

function writeCache<T>(key: string, value: T) {
  try {
    const payload = JSON.stringify({ value, expiresAt: Date.now() + CACHE_TTL_MS });
    localStorage.setItem(key, payload);
  } catch {
    // ignore
  }
}

export default function Example() {
  const { siteConfig } = useDocusaurusContext();
  const API_BASE_URL = String(siteConfig.customFields?.API_BASE_URL || "http://localhost:8001");

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const searchUsers = async ({ page = 1, limit = 10, search }: any) => {
    setLoading(true);
    try {
      const url = new URL("/api/v1/products", API_BASE_URL);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));
      if (search) url.searchParams.set("search", String(search));

      const cacheKey = `${CACHE_PREFIX}${url.toString()}`;
      const cached = readCache<ProductsResponse>(cacheKey);
      if (cached) {
        const cachedRows = (cached?.products || []) as User[];
        setRows(cachedRows);
        setTotal(Number(cached?.meta?.total ?? cachedRows.length) || cachedRows.length);
        return;
      }

      const resp = await fetch(url.toString());
      const json = (await resp.json()) as ProductsResponse;
      writeCache(cacheKey, json);

      const rows = (json?.products || []) as User[];
      setRows(rows);
      setTotal(Number(json?.meta?.total ?? rows.length) || rows.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUsers({ page: 1, limit: 10, search: "" });
  }, []);

  return (
    <DataTable<User>
      title="Users"
      loading={loading}
      data={rows}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      pagination={{ total, page: 1, limit: 10, type: "dynamic" }}
      actions={{
        search: {
          static: false,
          searchOnType: true,
          searchTimer: 300,
          onSearch: searchUsers,
        },
      }}
      keyExtractor={(row) => row.id}
    />
  );
}
```

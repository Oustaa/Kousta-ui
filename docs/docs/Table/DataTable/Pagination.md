---
sidebar_position: 2
title: Pagination
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  StaticPaginationPreview,
  DynamicPaginationPreview,
} from '@site/src/components/@Table/DataTable';

# Pagination

`DataTable` supports two pagination modes:

- **Static pagination**: the table slices the provided `data` array on the client.
- **Dynamic pagination**: you fetch paged data yourself; the table only drives the UI state and calls `actions.get`.

Pagination is enabled by passing the `pagination` prop.

## `pagination` props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | — | Total number of rows (used for page count + "Showing X to Y" message). |
| `page` | `number` | — | Initial page (1-indexed). |
| `limit` | `number` | — | Initial rows per page. |
| `type` | `"static" \| "dynamic"` | `"static"` | `static` slices `data` client-side. `dynamic` expects you to fetch and update `data` yourself. |

---

## Static pagination

Use this when you already have all rows in memory.

```tsx
import React, { useMemo } from "react";
import { DataTable } from "@kousta-ui/table";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Example() {
  const data = useMemo<User[]>(
    () => Array.from({ length: 120 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    })),
    [],
  );

  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={data}
      headers={{
        name: { value: "name" },
        email: { value: "email" },
      }}
      pagination={{
        total: data.length,
        page: 1,
        limit: 10,
        type: "static",
      }}
      keyExtractor={(row) => row.id}
    />
  );
}
```

### Preview

<BrowserOnly>{() => <StaticPaginationPreview />}</BrowserOnly>

---

## Dynamic pagination

Use this when your data comes from an API.

`DataTable` will call `actions.get` when the page/limit changes. The callback receives a params object like:

- `page`
- `limit`
- `search` (if the user has searched)

```tsx
import React, { useEffect, useState } from "react";
import { DataTable } from "@kousta-ui/table";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type User = {
  id: number;
  name: string;
  email: string;
};

type ProductsResponse =
  | {
      meta?: { total?: number };
      products?: User[];
    }
  | any;

const CACHE_PREFIX = "kousta_ui_docs_data_table_pagination:";
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

  const getUsers = async ({ page = 1, limit = 10, search }: any) => {
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
    getUsers({ page: 1, limit: 10 });
  }, []);

  return (
    <DataTable<User>
      title="Users"
      loading={loading}
      data={rows}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      pagination={{ total, page: 1, limit: 10, type: "dynamic" }}
      actions={{ get: getUsers }}
      keyExtractor={(row) => row.id}
    />
  );
}
```

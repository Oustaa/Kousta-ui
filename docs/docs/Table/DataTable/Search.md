---
sidebar_position: 4
title: Search
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
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

Type definitions: see [Props](./Props).

---

## Static search

Static search means filtering rows client-side. Enable it with:

- `actions.search.static: true`
- `actions.search.onSearch(row, { query, reg }) => boolean`

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "StaticSearch.tsx",
      code: `import React, { useMemo } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "StaticSearch.jsx",
      code: `import React, { useMemo } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  const data = useMemo(
    () => [
      { id: 1, name: "John", email: "john@example.com" },
      { id: 2, name: "Jane", email: "jane@example.com" },
      { id: 3, name: "Bob", email: "bob@example.com" },
    ],
    [],
  );

  return (
    <DataTable
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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <StaticSearchPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## Dynamic search

Dynamic search triggers a callback with params like `{ page, limit, search }`.

You can implement it in either of these ways:

- **`actions.search` with `static: false`**
- Or **only `actions.get`** (the search UI will call `get`)

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "DynamicSearch.tsx",
      code: `import React, { useEffect, useState } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";
import axios from "axios";

type User = { id: number; name: string; email: string };

type ProductsResponse =
  | {
      meta?: { total?: number };
      products?: User[];
    }
  | any;

export default function Example() {
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://api.ui.kousta.org/"
      : "http://localhost:8001";

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const searchUsers = async ({ page = 1, limit = 10, search }: any) => {
    setLoading(true);
    try {
      const url = new URL("/products", API_BASE_URL);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));
      if (search) url.searchParams.set("search", String(search));

      const { data } = await axios.get<ProductsResponse>(url.toString());

      const rows = (data?.products || []) as User[];
      setRows(rows);
      setTotal(Number(data?.meta?.total ?? rows.length) || rows.length);
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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "DynamicSearch.jsx",
      code: `import React, { useEffect, useState } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";
import axios from "axios";

export default function Example() {
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://api.ui.kousta.org/"
      : "http://localhost:8001";

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const searchUsers = async ({ page = 1, limit = 10, search }) => {
    setLoading(true);
    try {
      const url = new URL("/products", API_BASE_URL);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));
      if (search) url.searchParams.set("search", String(search));

      const { data } = await axios.get(url.toString());

      const rows = data?.products || [];
      setRows(rows);
      setTotal(Number(data?.meta?.total ?? rows.length) || rows.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUsers({ page: 1, limit: 10, search: "" });
  }, []);

  return (
    <DataTable
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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <DynamicSearchPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

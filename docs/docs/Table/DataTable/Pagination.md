---
sidebar_position: 3
title: Pagination
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  StaticPaginationPreview,
  DynamicPaginationPreview,
} from '@site/src/components/@Table/DataTable';

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

# Pagination

`DataTable` supports two pagination modes:

- **Static pagination**: the table slices the provided `data` array on the client.
- **Dynamic pagination**: you fetch paged data yourself; the table only drives the UI state and calls `actions.get`.

Pagination is enabled by passing the `pagination` prop.

Type definitions: see [Props](./Props).

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

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "DataTableStaticPagination.tsx",
      code: `import React, { useMemo } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Example() {
  const data = useMemo<User[]>(
    () => Array.from({ length: 120 }, (_, i) => ({
      id: i + 1,
      name: \`User \${i + 1}\`,
      email: \`user\${i + 1}@example.com\`,
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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "DataTableStaticPagination.jsx",
      code: `import React, { useMemo } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  const data = useMemo(
    () => Array.from({ length: 120 }, (_, i) => ({
      id: i + 1,
      name: \`User \${i + 1}\`,
      email: \`user\${i + 1}@example.com\`,
    })),
    [],
  );

  return (
    <DataTable
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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <StaticPaginationPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## Dynamic pagination

Use this when your data comes from an API.

`DataTable` will call `actions.get` when the page/limit changes. The callback receives a params object like:

- `page`
- `limit`
- `search` (if the user has searched)

:::warning
Don't use `pagination.type = "static"` with `actions.get` (API-driven data). It can lead to empty pages because the table will slice the already paginated data again.
:::

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "DataTableDynamicPagination.tsx",
      code: `import React, { useEffect, useState } from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";
import axios from "axios";

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

export default function Example() {
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://api.ui.kousta.org/"
      : "http://localhost:8001";

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const getUsers = async ({ page = 1, limit = 10, search }: any) => {
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
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "DataTableDynamicPagination.jsx",
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

  const getUsers = async ({ page = 1, limit = 10, search }) => {
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
    getUsers({ page: 1, limit: 10 });
  }, []);

  return (
    <DataTable
      title="Users"
      loading={loading}
      data={rows}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      pagination={{ total, page: 1, limit: 10, type: "dynamic" }}
      actions={{ get: getUsers }}
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <DynamicPaginationPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

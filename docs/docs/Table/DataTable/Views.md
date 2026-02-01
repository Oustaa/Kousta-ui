---
sidebar_position: 5
title: Views
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import { ViewsPreview } from '@site/src/components/@Table/DataTable';

# Views

`DataTable` can render your data as:

Type definitions: see [Props](./Props).

- **Table view** (default)
- **Card view** (built-in)
- **Custom extra views** (user-defined)

Internally, the component keeps a `displayAs` state:

- `"table"` renders the classic table
- `"card"` renders `options.cards`
- any other value renders `options.extraviews[displayAs]`

## View-related options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `options.cards` | `{ card: (props) => JSX.Element; cardsContainerProps?; menuProps?; loadingIndicator? }` | — | Enables built-in card view. The `card` renderer receives `{ row, visibleHeaders }`. |
| `options.extraviews` | `Record<string, { View: FC<{data; visibleHeaders}>; canView?; menuProps?; loadingIndicator? }>` | — | Adds custom views. Each key becomes a selectable view name. |

### Notes

- `menuProps` lets you customize the menu item used to switch to that view (for example `disabled`, `leftSection`, etc.).
- `loadingIndicator` can be used to override loading UI for that view (otherwise `config.loadingIndicator` / defaults are used).
- `canView` can be a boolean or a function to hide/disable a view based on current data.

---

## Card view

Enable the built-in card view by providing `options.cards.card`.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "DataTableCardView.tsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = { id: number; name: string; email: string };

export default function Example() {
  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={[
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" },
      ]}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      options={{
        cards: {
          card: ({ row, visibleHeaders }) => (
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{row.name}</div>
              <div style={{ opacity: 0.8 }}>{row.email}</div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                Visible headers: {visibleHeaders.join(", ")}
              </div>
            </div>
          ),
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
      filename: "DataTableCardView.jsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  return (
    <DataTable
      title="Users"
      loading={false}
      data={[
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" },
      ]}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      options={{
        cards: {
          card: ({ row, visibleHeaders }) => (
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{row.name}</div>
              <div style={{ opacity: 0.8 }}>{row.email}</div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                Visible headers: {visibleHeaders.join(", ")}
              </div>
            </div>
          ),
        },
      }}
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <ViewsPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## Custom extra views

You can add your own views via `options.extraviews`.

Each view entry is keyed by a string; that key becomes the `displayAs` value.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "DataTableCustomViews.tsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = { id: number; name: string; email: string };

const GridView = ({ data }: { data: User[] }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
      {data.map((row) => (
        <div key={row.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
          <div style={{ fontWeight: 600 }}>{row.name}</div>
          <div style={{ opacity: 0.8 }}>{row.email}</div>
        </div>
      ))}
    </div>
  );
};

export default function Example() {
  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={[
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" },
      ]}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      options={{
        extraviews: {
          grid: {
            View: ({ data }) => <GridView data={data as any} />,
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
      filename: "DataTableCustomViews.jsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

const GridView = ({ data }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
      {data.map((row) => (
        <div key={row.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
          <div style={{ fontWeight: 600 }}>{row.name}</div>
          <div style={{ opacity: 0.8 }}>{row.email}</div>
        </div>
      ))}
    </div>
  );
};

export default function Example() {
  return (
    <DataTable
      title="Users"
      loading={false}
      data={[
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" },
      ]}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      options={{
        extraviews: {
          grid: {
            View: ({ data }) => <GridView data={data} />,
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
  preview={<BrowserOnly>{() => <ViewsPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

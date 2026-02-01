---
sidebar_position: 6
title: Actions
---

import Badge from '@site/src/components/Badge';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  RowActionsPreview,
  ExtraActionsPreview,
  BulkActionsPreview,
  ViewCompPreview,
} from '@site/src/components/@Table/DataTable';

# Actions

`DataTable` supports multiple kinds of actions:

- Row actions (`actions.edit`, `actions.delete`)
- Remote fetching (`actions.get`) for pagination/search refresh
- Extra row actions (`options.extraActions`)
- Bulk actions (`options.bulkActions`) when rows are selected
- View actions (`options.viewComp`) to view/extend a row

## Actions/options reference

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actions.get` | `(params: TParams) => void` | — | Fetch table data remotely. The table will call it with `{ page, limit, search }` when pagination/search changes (when configured). |
| `actions.edit` | `{ onEdit(row); title?; buttonProps?; canEdit? }` | — | Adds an edit action for each row (button + context menu). |
| `actions.delete` | `{ onDelete(row); title?; buttonProps?; canDelete? }` | — | Adds a delete action for each row (button + context menu). |
| `options.extraActions` | `Array<{ title; onClick(row); Icon?; allowed? }>` | — | Adds additional per-row actions. |
| `options.bulkActions` | `Array<{ title; onClick(rows, clearSelected); buttonProps?; valueExtractor?; canPerformAction? }>` | — | Enables row selection + bulk actions UI. |
| `options.selectFilter` | `Record<string, (row, clearAll?) => boolean>` | — | Adds a “select menu” next to the header checkbox to select rows by named filters. |
| `options.viewComp` | `{ Component(row); type?: `"modal"`|`"extends"`; openButtonProps?; canView?; ... }` | — | Adds a view action (extend row or open modal). |

Type definitions: see [Props](./Props).

---

## Row actions (Edit / Delete)

Use `actions.edit` and/or `actions.delete`.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "RowActions.tsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = { id: number; name: string; email: string; role: string };

export default function Example() {
  const data: User[] = [
    { id: 1, name: "John", email: "john@example.com", role: "admin" },
  ];

  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      actions={{
        edit: {
          title: "Edit",
          onEdit: (row) => console.log("Edit", row),
          canEdit: (row) => row.role === "admin",
        },
        delete: {
          title: "Delete",
          onDelete: (row) => console.log("Delete", row),
          canDelete: true,
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
      filename: "RowActions.jsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  const data = [
    { id: 1, name: "John", email: "john@example.com", role: "admin" },
  ];

  return (
    <DataTable
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      actions={{
        edit: {
          title: "Edit",
          onEdit: (row) => console.log("Edit", row),
          canEdit: (row) => row.role === "admin",
        },
        delete: {
          title: "Delete",
          onDelete: (row) => console.log("Delete", row),
          canDelete: true,
        },
      }}
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <RowActionsPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## Extra actions

Use `options.extraActions` for additional per-row actions.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ExtraActions.tsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = { id: number; name: string; active: boolean };

export default function Example() {
  const data: User[] = [
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
  ];

  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, active: { value: "active" } }}
      options={{
        extraActions: [
          {
            title: "Deactivate",
            allowed: (row) => row.active,
            onClick: (row) => console.log("Deactivate", row),
          },
        ],
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
      filename: "ExtraActions.jsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  const data = [
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
  ];

  return (
    <DataTable
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, active: { value: "active" } }}
      options={{
        extraActions: [
          {
            title: "Deactivate",
            allowed: (row) => row.active,
            onClick: (row) => console.log("Deactivate", row),
          },
        ],
      }}
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <ExtraActionsPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## Bulk actions

Bulk actions become available when you enable row selection by providing `options.bulkActions`.

<Badge color="blue">Tip</Badge> You can optionally provide:
`valueExtractor` (to compute an aggregate value from selected rows) and `canPerformAction` (to disable/enable a bulk action depending on selection/state).

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "BulkActions.tsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = { id: number; name: string };

export default function Example() {
  const data: User[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" } }}
      options={{
        bulkActions: [
          {
            title: "Export",
            onClick: (rows, clearSelected) => {
              console.log("Export", rows);
              clearSelected();
            },
          },
        ],
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
      filename: "BulkActions.jsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return (
    <DataTable
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" } }}
      options={{
        bulkActions: [
          {
            title: "Export",
            onClick: (rows, clearSelected) => {
              console.log("Export", rows);
              clearSelected();
            },
          },
        ],
      }}
      config={{ props: { table: { style: { width: "100%" } } } }}
      keyExtractor={(row) => row.id}
    />
  );
}`
    }
  ]}
  preview={<BrowserOnly>{() => <BulkActionsPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## View component actions

Use `options.viewComp` to add a dedicated "view" action.

- `type: "extends"` (default): expands an extra row under the current row
- `type: "modal"`: opens a modal showing the row details

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ViewComponent.tsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type User = { id: number; name: string; email: string };

export default function Example() {
  const data: User[] = [
    { id: 1, name: "John", email: "john@example.com" },
  ];

  return (
    <DataTable<User>
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      options={{
        viewComp: {
          type: "extends",
          Component: (row) => (
            <div style={{ padding: 12 }}>
              <strong>{row.name}</strong> — {row.email}
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
      filename: "ViewComponent.jsx",
      code: `import React from "react";
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export default function Example() {
  const data = [
    { id: 1, name: "John", email: "john@example.com" },
  ];

  return (
    <DataTable
      title="Users"
      loading={false}
      data={data}
      headers={{ name: { value: "name" }, email: { value: "email" } }}
      options={{
        viewComp: {
          type: "extends",
          Component: (row) => (
            <div style={{ padding: 12 }}>
              <strong>{row.name}</strong> — {row.email}
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
  preview={<BrowserOnly>{() => <ViewCompPreview />}</BrowserOnly>}
  defaultTab="ts"
/>

---

## `actions.get` (remote fetching)

If you use server-side pagination and/or server-side search, provide `actions.get`. The table will call it with a params object that can include:

- `page` (number)
- `limit` (number)
- `search` (string)

This is used by pagination controls and by search when `actions.search.onSearch` is not provided.

---

## `selectFilter` (filter-based select all)

If you provide bulk actions, the table shows a “select all” checkbox column. When you also provide `options.selectFilter`, the header checkbox becomes a small menu that lets users select rows matching a named filter.

Example shape:

```ts
options={{
  bulkActions: [...],
  selectFilter: {
    "Active only": (row) => row.active === true,
    "Admins only": (row) => row.role === "admin",
  },
}}
```

---

## Notes about `afterEdit` / `afterDelete`

`actions.edit.afterEdit` and `actions.delete.afterDelete` are present in types but are **not implemented yet** in the current DataTable behavior.

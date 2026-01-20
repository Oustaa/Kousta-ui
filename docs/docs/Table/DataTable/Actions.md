---
sidebar_position: 5
title: Actions
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import { ActionsPreview } from '@site/src/components/@Table/DataTable';

# Actions

`DataTable` supports multiple kinds of actions:

- Row actions (`actions.edit`, `actions.delete`)
- Extra row actions (`options.extraActions`)
- Bulk actions (`options.bulkActions`) when rows are selected
- View actions (`options.viewComp`) to view/extend a row

## Actions/options reference

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actions.edit` | `{ onEdit(row); title?; buttonProps?; canEdit? }` | — | Adds an edit action for each row (button + context menu). |
| `actions.delete` | `{ onDelete(row); title?; buttonProps?; canDelete? }` | — | Adds a delete action for each row (button + context menu). |
| `options.extraActions` | `Array<{ title; onClick(row); Icon?; allowed? }>` | — | Adds additional per-row actions. |
| `options.bulkActions` | `Array<{ title; onClick(rows, clearSelected); buttonProps? }>` | — | Enables row selection + bulk actions UI. |
| `options.viewComp` | `{ Component(row); type?: `"modal"`|`"extends"`; openButtonProps?; canView?; ... }` | — | Adds a view action (extend row or open modal). |

---

## Row actions (Edit / Delete)

Use `actions.edit` and/or `actions.delete`.

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

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
      keyExtractor={(row) => row.id}
    />
  );
}

```

---

## Preview

<BrowserOnly>{() => <ActionsPreview />}</BrowserOnly>

---

## Extra actions

Use `options.extraActions` for additional per-row actions.

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

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
      keyExtractor={(row) => row.id}
    />
  );
}
```

---

## Bulk actions

Bulk actions become available when you enable row selection by providing `options.bulkActions`.

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

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
      keyExtractor={(row) => row.id}
    />
  );
}
```

---

## View component actions

Use `options.viewComp` to add a dedicated "view" action.

- `type: "extends"` (default): expands an extra row under the current row
- `type: "modal"`: opens a modal showing the row details

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

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
      keyExtractor={(row) => row.id}
    />
  );
}

```

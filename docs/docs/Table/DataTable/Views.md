---
sidebar_position: 4
title: Views
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import { ViewsPreview } from '@site/src/components/@Table/DataTable';

# Views

`DataTable` can render your data as:

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

---

## Card view

Enable the built-in card view by providing `options.cards.card`.

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

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
      keyExtractor={(row) => row.id}
    />
  );
}
```

### Preview

<BrowserOnly>{() => <ViewsPreview />}</BrowserOnly>

---

## Custom extra views

You can add your own views via `options.extraviews`.

Each view entry is keyed by a string; that key becomes the `displayAs` value.

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

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
      keyExtractor={(row) => row.id}
    />
  );
}
```

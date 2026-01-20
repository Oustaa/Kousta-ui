---
sidebar_position: 1
title: Basic usage
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  BasicPreview,
  HeadersPreview,
  LoadingPreview,
} from '@site/src/components/@Table/DataTable';

# Basic usage

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Table title shown in the header. |
| `loading` | `boolean` | `false` | Shows the table loading UI. |
| `data` | `T[]` | — | Rows to display. |
| `headers` | `THeader<T>` | — | Column definitions (label -> how to read/render cell). |
| `keyExtractor` | `(row: T) => string \| number` | — | Stable key for each row. |

## Minimal example

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

type Row = {
  id: number;
  title: string;
  start_date: string;
};

export default function Example() {
  const data: Row[] = [
    { id: 1, title: "First", start_date: "2026-01-01" },
    { id: 2, title: "Second", start_date: "2026-01-10" },
  ];

  return (
    <DataTable<Row>
      title="Projects"
      loading={false}
      data={data}
      headers={{
        id: { value: "id" },
        title: { value: "title" },
        "start date": { value: "start_date" },
      }}
      keyExtractor={(row) => row.id}
    />
  );
}
```

### Preview

<BrowserOnly>{() => <BasicPreview />}</BrowserOnly>

## Headers

`headers` is an object where:

- the **key** is the column label
- the **value** defines how to render the cell

Each header supports:

- `value`: a key in your row object
- `exec`: a function `(row) => ReactNode`
- `visible`: whether the column is currently shown (controlled by the "S/H" menu)
- `canSee`: whether the column can be toggled at all

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
      headers={{
        name: { value: "name" },
        email: {
          value: "email",
          visible: true,
        },
        role: {
          exec: (row) => row.role.toUpperCase(),
          canSee: false,
        },
      }}
      keyExtractor={(row) => row.id}
    />
  );
}
```

### Preview

<BrowserOnly>{() => <HeadersPreview />}</BrowserOnly>

## Loading state

Control loading with the `loading` boolean prop:

```tsx
import React from "react";
import { DataTable } from "@kousta-ui/table";

export default function Example() {
  return (
    <DataTable
      title="Users"
      loading={true}
      data={[]}
      headers={{ name: { value: "name" } }}
    />
  );
}

```

### Preview

<BrowserOnly>{() => <LoadingPreview />}</BrowserOnly>

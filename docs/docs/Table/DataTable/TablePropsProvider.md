
---
sidebar_position: 8
title: Table Props Provider
---

import Badge from '@site/src/components/Badge';

# Table Props Provider

Use **`TablePropsProvider`** to set global defaults for all `DataTable` components in your application.

The provider values map to DataTable props/config. Type definitions live in [`Props`](./Props).

---

## Quick start

```tsx
import { TablePropsProvider, DataTable } from "@kousta-ui/table";
import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

function App() {
  return (
    <TablePropsProvider
      props={{
        table: { className: "app-table" },
        th: { className: "app-header" },
        td: { className: "app-cell" },
      }}
      actions={{
        edit: {
          title: "Edit",
          buttonProps: { variant: "primary", size: "sm" },
        },
        delete: {
          title: "Delete",
          buttonProps: { variant: "danger", size: "sm" },
        },
      }}
      toggleRows={true}
      disableContextMenu={false}
      icons={{
        toggleRows: "S/H",
        extraViewsTogle: "...",
        refresh: "Refresh",
        paginationPrev: "Prev",
        paginationNext: "Next",
        paginationDots: "…",
      }}
    >
      <DataTable
        data={[]}
        headers={{ name: { value: "name" } }}
        loading={false}
        title="Users"
        keyExtractor={(row: any) => row.id}
      />
    </TablePropsProvider>
  );
}
```

---

## How merging works

- **Provider fills missing props**: if a `DataTable` doesn’t pass a value locally, it can inherit it from the provider.
- **Local config wins**: if a `DataTable` passes a local value, it takes precedence.
- **`icons` are merged**: provider `icons` are merged with local `config.icons`.

<Badge color="blue">Note</Badge> For `toggleRows`, the provider value is applied only when the table does not set `config.toggleRows` locally.

---

## Provider props (reference)

See:

- [`PropsContextType`](./Props#propscontexttype)
- [`TConfig`](./Props#tconfig)

Common fields:

- `props`: forwarded to table elements (table/thead/tbody/tr/th/td)
- `actions`: default action config (edit/delete)
- `toggleRows`: `boolean`
- `disableContextMenu`: `boolean`
- `noHead`: `boolean`
- `icons`: same shape as `config.icons`
- `viewComp`: view component defaults
- `emptyTable` / `emptyRowIcon`

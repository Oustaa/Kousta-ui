---
sidebar_position: 0
title: DataTable
---

import Badge from '@site/src/components/Badge';

# DataTable

`DataTable` is the high-level table component from `@kousta-ui/table`.

It provides built-in:

- Pagination (static + dynamic)
- Search (static + dynamic)
- Row selection + bulk actions
- Row actions + extra actions
- Multiple views (table, card, and custom views)
- A global provider: `TablePropsProvider`

<Badge color="blue">Note</Badge> This section documents the `DataTable` API as implemented in `packages/table/src/DataTable`.

Type definitions: see [Props](./Props).

---

## Core props

- **`data`**: `T[]`
- **`headers`**: [`THeader<T>`](./Props#theader-t)
- **`loading`**: `boolean`
- **`title`**: `string`
- **`pagination`**: [`TablePagination`](./Props#tablepagination)
- **`actions`**: [`TActions<T>`](./Props#tactions-t)
- **`options`**: [`TOptions<T>`](./Props#toptions-t)
- **`config`**: [`TConfig`](./Props#tconfig)

---

## Next pages

- Basic usage
- Pagination (static + dynamic)
- Search (static + dynamic)
- Views (table, card, custom)
- Actions (row actions, extra actions, bulk actions)
- Config options
- Sorting / Grouping / Filtering (coming soon)

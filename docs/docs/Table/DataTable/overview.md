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

---

## Core props

- **`data`**: `T[]`
- **`headers`**: `THeader<T>`
- **`loading`**: `boolean`
- **`title`**: `string`
- **`pagination`**: `{ total; page; limit; type?: "static" | "dynamic" }`
- **`actions`**: `{ get?; search?; edit?; delete? }`
- **`options`**: `{ bulkActions; extraActions; cards; extraviews; viewComp; emptyTable; selectFilter }`
- **`config`**: visual/behavior configuration (`toggleRows`, element props, etc.)

---

## Next pages

- Basic usage
- Pagination (static + dynamic)
- Search (static + dynamic)
- Views (table, card, custom)
- Actions (row actions, extra actions, bulk actions)
- Config options
- Sorting / Grouping / Filtering (coming soon)

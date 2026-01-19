---
sidebar_position: 8
---

import Badge from '@site/src/components/Badge';
import {
  QuickStartPreview,
  SeiblingsPreview,
  DisabledPreview,
  IconsOverrideWithPropPreview,
  IconsOverrideWithProviderPreview,
  UsePaginationHookPreview,
} from '@site/src/components/@Components/Pagination';

# Pagination

The **Pagination** component provides a compact page navigation UI (Prev/Next + page numbers + optional placeholders) and works well with controlled state.

---

## Props

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `page` | `number` | `1` | No | Current page (1-based). |
| `totalPages` | `number` | — | No | Total number of pages. If `< 1`, the component renders nothing. |
| `onChange` | `(page: number) => void` | — | No | Called when the user changes page (Prev/Next or clicking a page number). |
| `seblings` | `number` | `1` | Yes | How many pages to show around the current page. |
| `disabled` | `boolean` | — | No | Disables all buttons and prevents navigation. |
| `placeholderIcon` | `ReactNode` | `"..."` | Yes | Custom icon/content for placeholder buttons. |
| `prevIcon` | `ReactNode` | `"Prev"` | Yes | Custom icon/content for the previous button. |
| `nextIcon` | `ReactNode` | `"Next"` | Yes | Custom icon/content for the next button. |

<Badge color="blue">Note</Badge> Props marked with **Yes** in the **Provider?** column can be configured globally using the `ComponentPropsProvider`.

---

## Usage

### Quick start

<details open>
<summary>Code</summary>

```tsx
import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";

export function Example() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </div>
  );
}
```

</details>

<QuickStartPreview />

### seblings

Use `seblings` to show more pages around the current page.

<details open>
<summary>Code</summary>

```tsx
import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";

export function Example() {
  const [page, setPage] = useState(10);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={20} onChange={setPage} seblings={2} />
    </div>
  );
}
```

</details>

<SeiblingsPreview />

### Disabled

<details open>
<summary>Code</summary>

```tsx
import { Pagination } from "@kousta-ui/components";

export function Example() {
  return (
    <div style={{ width: "100%" }}>
      <Pagination page={1} totalPages={10} disabled />
    </div>
  );
}
```

</details>

<DisabledPreview />

---

## Icons

You can override the built-in content of the control buttons and placeholders.

### Override icons on a single Pagination

<details open>
<summary>Code</summary>

```tsx
import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function Example() {
  const [page, setPage] = useState(6);

  return (
    <div style={{ width: "100%" }}>
      <Pagination
        page={page}
        totalPages={20}
        onChange={setPage}
        prevIcon={<ChevronLeft size={16} />}
        nextIcon={<ChevronRight size={16} />}
        placeholderIcon={<MoreHorizontal size={16} />}
        seblings={1}
      />
    </div>
  );
}
```

</details>

<IconsOverrideWithPropPreview />

### Override icons with ComponentPropsProvider

<details open>
<summary>Code</summary>

```tsx
import React, { useState } from "react";
import { ComponentPropsProvider, Pagination } from "@kousta-ui/components";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function Example() {
  const [page, setPage] = useState(6);

  return (
    <ComponentPropsProvider
      pagination={{
        prevIcon: <ChevronLeft size={16} />,
        nextIcon: <ChevronRight size={16} />,
        placeholderIcon: <MoreHorizontal size={16} />,
        seblings: 1,
      }}
    >
      <div style={{ width: "100%" }}>
        <Pagination page={page} totalPages={20} onChange={setPage} />
      </div>
    </ComponentPropsProvider>
  );
}
```

</details>

<IconsOverrideWithProviderPreview />

---

## With usePagination

If you want the logic (total pages, boundaries, setters) handled for you, use the [`usePagination`](/docs/hooks/usePagination) hook.

<details open>
<summary>Code</summary>

```tsx
import { Pagination } from "@kousta-ui/components";
import { usePagination } from "@kousta-ui/hooks";

export function Example() {
  const { page, totalPages, setPage } = usePagination({ total: 240, limit: 20 });

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
```

</details>

<UsePaginationHookPreview />

---

## Code review

- **Controlled vs internal state**: `Pagination` keeps an internal `currentPage` state for UI, and syncs it when the `page` prop changes.
- **Boundaries**: Prev/Next are disabled at `1` and `totalPages` (and everything is disabled when `disabled` is `true`).
- **Page calculation**: The component uses `seblings` and the `getSeblings` helper to compute which page numbers to show. It inserts placeholders (`""`) which render as disabled buttons showing `placeholderIcon` (or `"..."`).
- **Provider overrides**: `ComponentPropsProvider` can override `placeholderIcon`, `nextIcon`, `prevIcon`, and `seblings`. Local props win when provided.

---

## Styles & customization

### Runtime classes

- **`kui-pagination-link`**: Applied to all clickable controls (Prev/Next + page buttons).
- **`kui-pagination-active-link`**: Applied to the active page.
- **`kui-pagination-placeholder`**: Applied to placeholder buttons.

---

## Types (reference)

```ts
import { ReactNode } from "react";

export type PaginationProps = {
  page: number;
  onChange?: (page: number) => void;
  totalPages: number;
  seblings?: number;
  disabled?: boolean;

  placeholderIcon?: ReactNode;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
};
```

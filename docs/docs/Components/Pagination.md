---
sidebar_position: 8
---

import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
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

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "PaginationQuickStart.tsx",
      code: `import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";

export function Example() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "PaginationQuickStart.jsx",
      code: `import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";

export function Example() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </div>
  );
}`
    }
  ]}
  preview={<QuickStartPreview />}
  defaultTab="ts"
/>

### seblings

Use `seblings` to show more pages around the current page.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "PaginationSiblings.tsx",
      code: `import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";

export function Example() {
  const [page, setPage] = useState(10);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={20} onChange={setPage} seblings={2} />
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "PaginationSiblings.jsx",
      code: `import React, { useState } from "react";
import { Pagination } from "@kousta-ui/components";

export function Example() {
  const [page, setPage] = useState(10);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={20} onChange={setPage} seblings={2} />
    </div>
  );
}`
    }
  ]}
  preview={<SeiblingsPreview />}
  defaultTab="ts"
/>

### Disabled

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "PaginationDisabled.tsx",
      code: `import { Pagination } from "@kousta-ui/components";

export function Example() {
  return (
    <div style={{ width: "100%" }}>
      <Pagination page={1} totalPages={10} disabled />
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "PaginationDisabled.jsx",
      code: `import { Pagination } from "@kousta-ui/components";

export function Example() {
  return (
    <div style={{ width: "100%" }}>
      <Pagination page={1} totalPages={10} disabled />
    </div>
  );
}`
    }
  ]}
  preview={<DisabledPreview />}
  defaultTab="ts"
/>

---

## Icons

You can override the built-in content of the control buttons and placeholders.

### Override icons on a single Pagination

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "PaginationIconsOverride.tsx",
      code: `import React, { useState } from "react";
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
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "PaginationIconsOverride.jsx",
      code: `import React, { useState } from "react";
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
}`
    }
  ]}
  preview={<IconsOverrideWithPropPreview />}
  defaultTab="ts"
/>

### Override icons with ComponentPropsProvider

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "PaginationIconsProvider.tsx",
      code: `import React, { useState } from "react";
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
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "PaginationIconsProvider.jsx",
      code: `import React, { useState } from "react";
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
}`
    }
  ]}
  preview={<IconsOverrideWithProviderPreview />}
  defaultTab="ts"
/>

---

## With usePagination

If you want the logic (total pages, boundaries, setters) handled for you, use the [`usePagination`](/docs/hooks/usePagination) hook.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "PaginationWithHook.tsx",
      code: `import { Pagination } from "@kousta-ui/components";
import { usePagination } from "@kousta-ui/hooks";

export function Example() {
  const { page, totalPages, setPage } = usePagination({ total: 240, limit: 20 });

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "PaginationWithHook.jsx",
      code: `import { Pagination } from "@kousta-ui/components";
import { usePagination } from "@kousta-ui/hooks";

export function Example() {
  const { page, totalPages, setPage } = usePagination({ total: 240, limit: 20 });

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}`
    }
  ]}
  preview={<UsePaginationHookPreview />}
  defaultTab="ts"
/>

---

## Code review

- **Controlled vs internal state**: `Pagination` keeps an internal `currentPage` state for UI, and syncs it when the `page` prop changes.
- **Boundaries**: Prev/Next are disabled at `1` and `totalPages` (and everything is disabled when `disabled` is `true`).
- **Page calculation**: The component uses `seblings` and the `getSeblings` helper to compute which page numbers to show. It inserts placeholders (`""`) which render as disabled buttons showing `placeholderIcon` (or `"..."`).
- **Provider overrides**: `ComponentPropsProvider` can override `placeholderIcon`, `nextIcon`, `prevIcon`, and `seblings`. Local props win when provided.

---

## Accessibility

- **Labels**: Provide accessible labels for icon-only pagination controls (for example via `prevIcon` / `nextIcon` content or by wrapping with `aria-label` at the button level if you override rendering).
- **Current page**: Ensure the active page is clearly indicated visually (the component applies `kui-pagination-active-link`).
- **Keyboard**: Pagination controls are buttons/links and are keyboard reachable by default; test Tab order when embedding in complex toolbars.

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

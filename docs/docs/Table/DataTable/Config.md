
---
sidebar_position: 7
title: Config
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import { ConfigPreview } from '@site/src/components/@Table/DataTable';

# Config

Use the `config` prop to customize behavior and element props.

The available config fields are defined in [`TConfig`](./Props#tconfig) (see `packages/table/src/DataTable/_props.ts`).

## `config` props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `toggleRows` | `boolean` | `true` | Enables the column show/hide menu button ("S/H"). Set `false` to hide it. |
| `disableContextMenu` | `boolean` | `false` | Disables the row right-click context menu. |
| `noHead` | `boolean` | `false` | Hides the entire table head section (search, refresh, view switcher, etc.). |
| `useGetAsRefresh` | `boolean` | `false` | When enabled, refresh triggers `actions.get`. |
| `emptyRowIcon` | `ReactNode` | `"--"` | Placeholder when a row has no actions. |
| `loadingIndicator` | `(props: { visibleHeaders: string[] }) => ReactNode` | — | Override loading UI for card/extra views. |
| `icons` | `{ toggleRows?; selectRow?; extraViewsTogle?; tableExtraView?; cardExtraView?; refresh?; selectOpened?; selectClosed?; paginationNext?; paginationPrev?; paginationDots? }` | — | Override icons used by DataTable UI elements. |
| `props` | `{ table?; thead?; tbody?; tr?; th?; td? }` | — | Props forwarded to underlying table elements. |

---

## Common config options

### Hide header

```tsx
<DataTable
  // ...
  config={{
    noHead: true,
  }}
/>
```

---

## Preview

<BrowserOnly>{() => <ConfigPreview />}</BrowserOnly>

---

## `config.icons`

Each icon key maps to a specific UI location:

- **`toggleRows`**: the **"S/H"** button (column show/hide menu trigger)
- **`selectRow`**: select-filter menu trigger icon (shown when `options.selectFilter` is provided)
- **`extraViewsTogle`**: the **"..."** button (views/extraviews menu trigger)
- **`tableExtraView`**: the "Table" menu item label/icon
- **`cardExtraView`**: the "Card" menu item label/icon
- **`refresh`**: the Refresh button content
- **`selectOpened`**: page-size Select icon when opened
- **`selectClosed`**: page-size Select icon when closed
- **`paginationPrev`**: pagination previous icon
- **`paginationNext`**: pagination next icon
- **`paginationDots`**: pagination placeholder/dots icon

Example:

```tsx
<DataTable
  // ...
  config={{
    icons: {
      toggleRows: "S/H",
      extraViewsTogle: "...",
      refresh: "Refresh",
      paginationPrev: "Prev",
      paginationNext: "Next",
      paginationDots: "…",
    },
  }}
/>
```

### Disable context menu

```tsx
<DataTable
  // ...
  config={{
    disableContextMenu: true,
  }}
/>
```

### Toggle row expansion UI

```tsx
<DataTable
  // ...
  config={{
    toggleRows: false,
  }}
/>
```

---

## Element props

You can pass props to underlying table elements:

```tsx
<DataTable
  // ...
  config={{
    props: {
      table: { className: "my-table" },
      thead: { className: "my-thead" },
      th: { style: { fontWeight: 700 } },
      td: { style: { padding: 12 } },
      tr: { className: "my-tr" },
    },
  }}
/>
```

---

## Loading indicator

You can override the loading UI for card / extra views:

```tsx
<DataTable
  // ...
  config={{
    loadingIndicator: ({ visibleHeaders }) => (
      <div style={{ padding: 16 }}>Loading… ({visibleHeaders.length} columns)</div>
    ),
  }}
/>
```

---

## Refresh behavior (`useGetAsRefresh`)

The refresh button is only useful when you provide `actions.get`.

- If `actions.get` is present and `config.useGetAsRefresh !== false`, the refresh UI can call `actions.get` using the current `{ page, limit, search }`.
- If you don’t provide `actions.get`, refresh does nothing.

---

## Accessibility notes

- The search input includes an `aria-label` in the default UI.
- Row selection uses native checkboxes; test focus order when using bulk actions + select filters.
- If you render custom cells with buttons/menus, ensure each control has an accessible name and sufficient contrast.

---

## Styling notes

Most DataTable areas include stable runtime class names (for example `kui-table-footer`, `kui-table-row-actions-container`, etc.). Use your browser devtools to inspect the exact classes on the elements you want to target, and prefer those stable `kui-*` classes for overrides.

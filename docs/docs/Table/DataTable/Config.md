---
sidebar_position: 7
title: Config
---

import BrowserOnly from '@docusaurus/BrowserOnly';
import { ConfigPreview } from '@site/src/components/@Table/DataTable';

# Config

Use the `config` prop to customize behavior and element props.

The available config fields are defined in `TConfig` (see `packages/table/src/DataTable/_props.ts`).

## `config` props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `toggleRows` | `false \| Omit<ButtonProps, "onClick">` | enabled | Enables the column show/hide menu button ("S/H"). Set `false` to disable. |
| `disableContextMenu` | `boolean` | `false` | Disables the row right-click context menu. |
| `noHead` | `boolean` | `false` | Hides the entire table head section (search, refresh, view switcher, etc.). |
| `useGetAsRefresh` | `boolean` | `false` | When enabled, refresh triggers `actions.get`.
| `emptyRowIcon` | `ReactNode` | `"--"` | Placeholder when a row has no actions. |
| `loadingIndicator` | `(props: { visibleHeaders: string[] }) => ReactNode` | — | Override loading UI for card/extra views. |
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
    toggleRows: { variant: "neutral-outline", size: "sm" },
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

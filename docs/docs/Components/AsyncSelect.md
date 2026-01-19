---
sidebar_position: 7
---

import Badge from '@site/src/components/Badge';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  QuickStartPreview,
  CustomRenderPreview,
  GenericTypesPreview,
} from '@site/src/components/@Components/AsyncSelect';

# AsyncSelect

An advanced **AsyncSelect** component that provides server-side search and infinite scrolling capabilities. Perfect for large datasets where you need to fetch data dynamically from an API.

AsyncSelect uses [`Select`](/docs/Components/Select) internally.

---

## When to use

- **Large datasets**: When you have thousands of options and need server-side filtering.
- **Infinite scrolling**: For paginated data that loads as users scroll.
- **Search APIs**: When you need to query a backend search endpoint.
- **Dynamic data**: When options change based on user input or other conditions.

---

## Props

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `getData` | `(params: { page: number; limit: number; searchTerm?: string }) => Promise<unknown>` | **Required** | No | Function that fetches data from your API. |
| `extractDynamicData` | `(response: any) => T[]` | — | No | Extracts the items array from your API response. If omitted, the component assumes the response itself is `T[]`. |
| `hasMore` | `(response: any, page: number) => boolean` | — | No | Determines if there are more pages to load. |
| `searchTimeout` | `number` | `500` | Yes | Debounce timeout (ms) before requesting the server when searching. |
| `infiniteScroll` | `boolean` | — | No | Enables/disables infinite scrolling (if supported by your usage). |
| `options` | `SelectOptionType<T>` | `{ value: "value", label: "label" }` | Yes | Configuration for extracting value, label, and custom rendering from data items. |
| `...` | [`SelectProps<T>`](/docs/Components/Select#props) | | | Inherits all other props from `Select` except `data`, `loading`, and `onSearch`. |

---

## hasMore

`hasMore` controls when AsyncSelect stops requesting additional pages.

It receives:

- The full `response` returned by `getData`
- The current `page` that was requested

It must return:

- `true` if another page can be requested
- `false` to stop loading more

For example, if your API returns a pagination meta like `meta.last_page`:

```ts
hasMore={(resp, page) => page < resp.meta.last_page}
```

<Badge color="blue">Note</Badge> AsyncSelect automatically calls `getData` initially and then again when you scroll to the end (and when searching).

---

## Usage

### Basic Async Search

Provide `getData`, `extractDynamicData`, and `hasMore` to handle fetching and pagination. The component manages the loading state and search term.

<details open>
<summary>Code</summary>

```tsx
import { AsyncSelect } from "@kousta-ui/components";

type Product = {
  id: number;
  designation: string;
};

type ApiResponse = {
  meta: { last_page: number };
  products: Product[];
};

const API_BASE_URL = process.env.API_BASE_URL;

const getProducts = async ({ page, limit, searchTerm }) => {
  const url = new URL("/api/v1/products", API_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("search", searchTerm || "");

  const resp = await fetch(url.toString());
  return resp.json() as Promise<ApiResponse>;
};

<AsyncSelect<Product>
  label="Dynamic Select"
  placeholder="Search products"
  getData={getProducts}
  extractDynamicData={(response) => response.products}
  hasMore={(response, page) => page < response.meta.last_page}
  options={{ value: "id", label: "id - designation" }}
/>
```

</details>

<BrowserOnly>{() => <QuickStartPreview />}</BrowserOnly>

### With Custom Option Rendering

Just like the `Select` component, you can provide a custom `renderOption` function to display rich content in the dropdown.

<details open>
<summary>Code</summary>

```tsx
import { AsyncSelect } from "@kousta-ui/components";

type Product = {
  id: number;
  designation: string;
};

type ApiResponse = {
  meta: { last_page: number };
  products: Product[];
};

const API_BASE_URL = process.env.API_BASE_URL;

const getProducts = async ({ page, limit, searchTerm }) => {
  const url = new URL("/api/v1/products", API_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("search", searchTerm || "");
  const resp = await fetch(url.toString());
  return resp.json() as Promise<ApiResponse>;
};

<AsyncSelect<Product>
  label="Custom option rendering"
  placeholder="Search products"
  getData={getProducts}
  extractDynamicData={(response) => response.products}
  hasMore={(response, page) => page < response.meta.last_page}
  options={{
    value: "id",
    label: "designation",
    renderOption: (row) => `id: ${row.id} - ${row.designation}`,
  }}
/>
```

</details>

<BrowserOnly>{() => <CustomRenderPreview />}</BrowserOnly>

---

## Generic types

AsyncSelect is a generic component. Passing an explicit type parameter gives you proper type-checking for `options`, `extractDynamicData`, `disabledOption`, and custom renderers.

<details open>
<summary>Code</summary>

```tsx
import { AsyncSelect } from "@kousta-ui/components";

type Product = {
  id: number;
  designation: string;
};

<AsyncSelect<Product>
  label="Products"
  placeholder="Search products"
  getData={async ({ page, limit, searchTerm }) => {
    const API_BASE_URL = process.env.API_BASE_URL;
    const url = new URL("/api/v1/products", API_BASE_URL);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("search", searchTerm || "");
    const resp = await fetch(url.toString());
    return resp.json();
  }}
  extractDynamicData={(resp) => resp.products}
  hasMore={(resp, page) => page < resp.meta.last_page}
  options={{ value: "id", label: "designation" }}
/>
```

</details>

<BrowserOnly>{() => <GenericTypesPreview />}</BrowserOnly>

---

## Styles & customization

The `AsyncSelect` component uses the same styling as the `Select` component.

### Runtime classes

- **`kui-select-container`**: The main wrapper for the label, select, and error message.
- **`kui-select-inner`**: The clickable input area.
- **`kui-select-dropdown`**: The dropdown container that holds the options.
- **`kui-select-option`**: An individual option item in the dropdown.
- ...and all other classes from the `Select` component.

### Tokens used by the default styles

- **Colors**: `--kui-neutral-*`, `--kui-primary-*`, `--kui-danger-*`
- **Spacing**: `--kui-spacing-2xs`, `--kui-spacing-xs`, `--kui-spacing-sm`
- **Typography**: `--kui-text-base`, `--kui-text-sm`
- **Rounding**: `--kui-rounded`

---

## Types (reference)

```ts
import { SelectProps, SelectDataConstraints } from "./Select";

type GetDataParams = {
  page: number;
  limit: number;
  searchTerm: string;
};

export type AsyncSelectProps<T extends SelectDataConstraints> = {
  getData: (params: {
    page: number;
    limit: number;
    searchTerm?: string;
  }) => Promise<unknown>;
  extractDynamicData?: (response: any) => T[];
  infiniteScroll?: boolean;
  hasMore?: (responce: any, page: number) => boolean;
  searchTimeout?: number;
} & Omit<SelectProps<T>, "data" | "loading" | "onSearch">;
```

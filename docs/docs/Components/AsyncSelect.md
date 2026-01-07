---
sidebar_position: 7
---

import Badge from '@site/src/components/Badge';
import {
  QuickStartPreview,
  CustomRenderPreview
} from '@site/src/components/@Components/AsyncSelect';

# AsyncSelect

An advanced **AsyncSelect** component that provides server-side search and infinite scrolling capabilities. Perfect for large datasets where you need to fetch data dynamically from an API.

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
| `getData` | `(params: GetDataParams) => Promise<any>` | **Required** | No | Function to fetch data from your API. |
| `extractDynamicData` | `(response: any) => T[]` | **Required** | No | Function to extract the data array from the API response. |
| `hasMore` | `(response: any, page: number) => boolean` | **Required** | No | Function to determine if more pages are available for infinite scrolling. |
| `options` | `SelectOptionType<T>` | `{ value: "value", label: "label" }` | Yes | Configuration for extracting value, label, and custom rendering from data items. |
| `debounceMs` | `number` | `300` | No | Debounce delay in milliseconds for search requests. |
| `...` | `SelectProps<T>` | | | Inherits all other props from the `Select` component, such as `label`, `placeholder`, `clearable`, `disabled`, etc. |

### GetDataParams

```ts
type GetDataParams = {
  page: number;        // Current page number (starts at 1)
  limit: number;       // Number of items per page
  searchTerm: string;  // Current search term
};
```

<Badge color="blue">Note</Badge> The component automatically handles loading states, debouncing, and error handling for async operations.

---

## Usage

### Basic Async Search

Provide `getData`, `extractDynamicData`, and `hasMore` to handle fetching and pagination. The component manages the loading state and search term.

```tsx
import { AsyncSelect } from "@kousta-ui/components";

// Mock API call
const searchUsers = ({ page, limit, searchTerm }) => {
  return fetch(`/api/users?page=${page}&limit=${limit}&q=${searchTerm || ""}`)
    .then((r) => r.json());
};

<AsyncSelect
  label="Search Users"
  getData={searchUsers}
  extractDynamicData={(response) => response.items}
  hasMore={(response, page) => page < response.totalPages}
  options={{ value: "id", label: "name" }}
  placeholder="Type to search users..."
/>
```

### Preview
<QuickStartPreview />

### With Custom Option Rendering

Just like the `Select` component, you can provide a custom `renderOption` function to display rich content in the dropdown.

```tsx
<AsyncSelect
  label="Assign to User"
  getData={searchUsers}
  extractDynamicData={(response) => response.users}
  hasMore={(response, page) => response.hasNextPage}
  options={{
    value: "id",
    label: "name",
    renderOption: (user) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={user.avatar} alt={user.name} style={{ width: 24, height: 24, borderRadius: "50%" }} />
        <div>
          <div style={{ fontWeight: "bold" }}>{user.name}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{user.email}</div>
        </div>
      </div>
    )
  }}
  placeholder="Search users by name or email..."
/>
```

### Preview
<CustomRenderPreview />

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
  getData: (params: GetDataParams) => Promise<any>;
  extractDynamicData: (response: any) => T[];
  hasMore: (response: any, page: number) => boolean;
  debounceMs?: number;
} & Omit<SelectProps<T>, "data" | "onSearch">;
```

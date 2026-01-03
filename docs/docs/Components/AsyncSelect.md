---
sidebar_position: 7
---

import Badge from '@site/src/components/Badge';

# AsyncSelect

An advanced **AsyncSelect** component that provides server-side search and infinite scrolling capabilities. Perfect for large datasets where you need to fetch data dynamically from an API.

---

## When to use

- **Large datasets**: When you have thousands of options and need server-side filtering
- **Infinite scrolling**: For paginated data that loads as users scroll
- **Search APIs**: When you need to query a backend search endpoint
- **Dynamic data**: When options change based on user input or other conditions

---

## Quick start

```tsx
import { AsyncSelect } from "@ousta-ui/components";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Example() {
  return (
    <div style={{ width: 420 }}>
      <AsyncSelect<User>
        label="Search Users"
        getData={({ page, limit, searchTerm }) =>
          fetch(`/api/users?page=${page}&limit=${limit}&q=${searchTerm || ""}`)
            .then((r) => r.json())
        }
        extractDynamicData={(response) => response.items}
        hasMore={(response, page) => page < response.totalPages}
        options={{ value: "id", label: "name" }}
        placeholder="Type to search users..."
      />
    </div>
  );
}
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getData` | `(params: GetDataParams) => Promise<T>` | **Required** | Function to fetch data from your API. |
| `extractDynamicData` | `(response: any) => T[]` | **Required** | Function to extract the data array from API response. |
| `hasMore` | `(response: any, page: number) => boolean` | **Required** | Function to determine if more pages are available. |
| `options` | `{ value: string; label?: string; renderOption?: (row:T)=>ReactNode }` | — | Configuration for extracting value/label from data items. |
| `onChange` | `(value: unknown) => void` | — | Callback when selection changes. |
| `searchable` | `boolean` | `true` | Enables search input for filtering options. |
| `clearable` | `boolean` | `false` | Shows a clear button to reset selection. |
| `disabledOption` | `(row: T) => boolean` | — | Function to disable specific options. |
| `label` | `string` | — | Label text displayed above the select. |
| `placeholder` | `string` | — | Placeholder text when no value is selected. |
| `errors` | `string[] \| string \| ReactNode` | — | Error message(s) displayed below the select. |
| `required` | `boolean` | `false` | Shows required indicator next to label. |
| `debounceMs` | `number` | `300` | Debounce delay for search requests in milliseconds. |

### GetDataParams

```ts
type GetDataParams = {
  page: number;        // Current page number (starts at 1)
  limit: number;       // Number of items per page
  searchTerm: string;  // Current search term
};
```

<Badge color="blue">Note</Badge> The component automatically handles loading states and error handling for async operations.

## Examples

### Basic async search

```tsx
<AsyncSelect<User>
  label="Search Users"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/users?page=${page}&limit=${limit}&q=${searchTerm || ""}`)
      .then((r) => r.json())
  }
  extractDynamicData={(response) => response.data}
  hasMore={(response, page) => page < response.totalPages}
  options={{ value: "id", label: "name" }}
  placeholder="Search for users..."
  onChange={(userId) => console.log(`Selected user: ${userId}`)}
/>
```

### With custom debounce

```tsx
<AsyncSelect<Product>
  label="Search Products"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/products?q=${searchTerm}&page=${page}&size=${limit}`)
      .then((r) => r.json())
  }
  extractDynamicData={(response) => response.products}
  hasMore={(response, page) => response.products.length === limit}
  options={{ value: "sku", label: "name" }}
  debounceMs={500} // Wait 500ms before searching
  placeholder="Search products..."
/>
```

### With custom option rendering

```tsx
<AsyncSelect<User>
  label="Assign to User"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/users/search?q=${searchTerm}&page=${page}`)
      .then((r) => r.json())
  }
  extractDynamicData={(response) => response.users}
  hasMore={(response, page) => response.hasNextPage}
  options={{
    value: "id",
    label: "name",
    renderOption: (user) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 24, height: 24, borderRadius: "50%" }}
        />
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

### With disabled options

```tsx
<AsyncSelect<User>
  label="Select Active User"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/users?page=${page}&limit=${limit}`)
      .then((r) => r.json())
  }
  extractDynamicData={(response) => response.users}
  hasMore={(response, page) => page < response.totalPages}
  options={{ value: "id", label: "name" }}
  disabledOption={(user) => !user.isActive}
  placeholder="Select an active user..."
  onChange={(userId) => console.log(`Selected active user: ${userId}`)}
/>
```

### Clearable async select

```tsx
<AsyncSelect<Category>
  label="Category (Optional)"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/categories?q=${searchTerm}&page=${page}`)
      .then((r) => r.json())
  }
  extractDynamicData={(response) => response.categories}
  hasMore={(response, page) => response.hasMore}
  options={{ value: "id", label: "name" }}
  clearable
  placeholder="Select a category or leave blank"
  onChange={(categoryId) => console.log(`Category: ${categoryId || 'None'}`)}
/>
```

### With error handling

```tsx
function AsyncSelectWithErrorHandling() {
  const [error, setError] = useState("");

  const handleGetData = async ({ page, limit, searchTerm }: GetDataParams) => {
    try {
      setError("");
      const response = await fetch(`/api/users?q=${searchTerm}&page=${page}`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    } catch (err) {
      setError("Failed to load users. Please try again.");
      throw err;
    }
  };

  return (
    <AsyncSelect<User>
      label="Search Users"
      getData={handleGetData}
      extractDynamicData={(response) => response.users}
      hasMore={(response, page) => page < response.totalPages}
      options={{ value: "id", label: "name" }}
      errors={error ? [error] : []}
      placeholder="Type to search..."
    />
  );
}
```

---

## API Integration Patterns

### REST API example

```tsx
// Typical REST API response structure
interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

<AsyncSelect<User>
  label="Users"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/users?page=${page}&limit=${limit}&search=${searchTerm}`)
      .then(res => res.json())
  }
  extractDynamicData={(response: ApiResponse<User>) => response.data}
  hasMore={(response, page) => page < response.totalPages}
  options={{ value: "id", label: "name" }}
/>
```

### GraphQL API example

```tsx
const searchUsers = async ({ page, limit, searchTerm }: GetDataParams) => {
  const query = `
    query SearchUsers($search: String!, $limit: Int!, $offset: Int!) {
      users(search: $search, limit: $limit, offset: $offset) {
        id
        name
        email
        avatar
      }
    }
  `;

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: {
        search: searchTerm,
        limit,
        offset: (page - 1) * limit
      }
    })
  });

  const result = await response.json();
  return result.data;
};

<AsyncSelect<User>
  label="Search Users"
  getData={searchUsers}
  extractDynamicData={(response) => response.users}
  hasMore={(response, page) => response.users.length === limit}
  options={{ value: "id", label: "name" }}
/>
```

---

## Accessibility

- **Loading states**: Screen readers announce when data is loading
- **Error announcements**: Error messages are properly announced
- **Keyboard navigation**: Full keyboard support like regular Select
- **Search feedback**: Search results count and status are communicated

<Badge color="green">Tip</Badge> Provide meaningful loading messages and error descriptions for better accessibility.

---

## Performance Considerations

- **Debouncing**: Use `debounceMs` to reduce API calls during typing
- **Caching**: Consider implementing client-side caching for repeated searches
- **Pagination**: Use appropriate page sizes (typically 20-50 items per page)
- **Error handling**: Implement retry logic for failed requests

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";

type GetDataParams = {
  page: number;
  limit: number;
  searchTerm: string;
};

type AsyncSelectOptions<T = any> = {
  value: string;
  label?: string;
  renderOption?: (row: T) => ReactNode;
};

type AsyncSelectProps<T = any> = {
  getData: (params: GetDataParams) => Promise<any>;
  extractDynamicData: (response: any) => T[];
  hasMore: (response: any, page: number) => boolean;
  options?: AsyncSelectOptions<T>;
  onChange?: (value: unknown) => void;
  searchable?: boolean;
  clearable?: boolean;
  disabledOption?: (row: T) => boolean;
  label?: string;
  placeholder?: string;
  errors?: string[] | string | ReactNode;
  required?: boolean;
  debounceMs?: number;
} & ComponentPropsWithoutRef<"select">;
```

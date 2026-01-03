---
sidebar_position: 6
---

import Badge from '@site/src/components/Badge';

# Select

A flexible **Select** component that provides searchable dropdown functionality with local filtering, disabled options, and customizable rendering. Perfect for choosing from a list of options with search capabilities.

---

## When to use

- **Choice selection**: When users need to select one option from a list
- **Searchable lists**: Large datasets where users need to search/filter options
- **Form inputs**: As a replacement for native select with enhanced UX
- **Filtered selection**: When you need to disable specific options conditionally

---

## Quick start

```tsx
import { Select } from "@ousta-ui/components";

const data = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

export default function Example() {
  return (
    <div style={{ width: 420 }}>
      <Select
        label="Fruit"
        data={data}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
```

## Disable specific options

```tsx
<Select
  label="Fruit"
  data={data}
  disabledOption={(row) => row.value === "banana"}
/>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **Required** | Array of data items to display. |
| `options` | `{ value: string; label?: string; renderOption?: (row:T)=>ReactNode }` | — | Configuration for extracting value/label from data items. |
| `onChange` | `(value: unknown) => void` | — | Callback when selection changes. |
| `searchable` | `boolean` | `true` | Enables search input for filtering options. |
| `clearable` | `boolean` | `false` | Shows a clear button to reset selection. |
| `disabledOption` | `(row: T) => boolean` | — | Function to disable specific options. |
| `label` | `string` | — | Label text displayed above the select. |
| `placeholder` | `string` | — | Placeholder text when no value is selected. |
| `errors` | `string[] \| string \| ReactNode` | — | Error message(s) displayed below the select. |
| `required` | `boolean` | `false` | Shows required indicator next to label. |
| `...rest` | `ComponentPropsWithoutRef<"select">` | — | Any native select props are forwarded. |

<Badge color="blue">Note</Badge> The component automatically handles search filtering when `searchable={true}`.

## Examples

### Basic select

```tsx
const colors = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
];

<Select
  label="Favorite Color"
  data={colors}
  placeholder="Choose a color"
  onChange={(value) => console.log(`Selected: ${value}`)}
/>
```

### With disabled options

```tsx
const users = [
  { value: "user1", label: "John Doe", active: true },
  { value: "user2", label: "Jane Smith", active: false },
  { value: "user3", label: "Bob Wilson", active: true },
];

<Select
  label="Assign to User"
  data={users}
  options={{ value: "value", label: "label" }}
  disabledOption={(user) => !user.active}
  placeholder="Select active user"
  onChange={(value) => console.log(`Assigned to: ${value}`)}
/>
```

### Clearable select

```tsx
<Select
  label="Country"
  data={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
  clearable
  placeholder="Select country (optional)"
  onChange={(value) => console.log(`Country: ${value || 'None'}`)}
/>
```

### Non-searchable select

```tsx
<Select
  label="Priority"
  data={[
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
  ]}
  searchable={false}
  onChange={(value) => console.log(`Priority: ${value}`)}
/>
```

### With custom option rendering

```tsx
const products = [
  { value: "prod1", name: "Laptop", price: 999, inStock: true },
  { value: "prod2", name: "Mouse", price: 29, inStock: false },
  { value: "prod3", name: "Keyboard", price: 79, inStock: true },
];

<Select
  label="Product"
  data={products}
  options={{
    value: "value",
    label: "name",
    renderOption: (product) => (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{product.name}</span>
        <span style={{ color: product.inStock ? "green" : "red" }}>
          ${product.price}
        </span>
      </div>
    )
  }}
  disabledOption={(product) => !product.inStock}
  placeholder="Select product"
/>
```

### With errors

```tsx
<Select
  label="Category"
  data={[
    { value: "tech", label: "Technology" },
    { value: "health", label: "Healthcare" },
  ]}
  errors={["Please select a category"]}
  required
  onChange={(value) => console.log(`Category: ${value}`)}
/>
```

---

## Accessibility

- **Keyboard navigation**: Arrow keys to navigate, Enter to select, Escape to close
- **Screen reader support**: Proper ARIA attributes and role="listbox"
- **Focus management**: Focus stays within the dropdown during navigation
- **Search functionality**: Type to search works with screen readers

<Badge color="green">Tip</Badge> Provide descriptive labels and ensure sufficient color contrast for disabled states.

---

## Styling

The component uses CSS modules with these class names:

- `.select-container` – Main wrapper
- `.select-input` – The input element that triggers the dropdown
- `.select-dropdown` – The dropdown panel
- `.select-option` – Individual option items
- `.select-option-disabled` – Disabled option styling

### CSS variables

```css
.ousta-select {
  --select-border-color: #d1d5db;
  --select-focus-border-color: #3b82f6;
  --select-option-hover-bg: #f3f4f6;
  --select-option-disabled-color: #9ca3af;
}
```

---

## Patterns

### Form integration with validation

```tsx
function FormExample() {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const validateSelection = (value: string) => {
    if (!value) return "Please select an option";
    return "";
  };

  const handleChange = (value: string) => {
    setSelected(value);
    setError(validateSelection(value));
  };

  return (
    <Select
      label="Department"
      data={[
        { value: "eng", label: "Engineering" },
        { value: "sales", label: "Sales" },
        { value: "hr", label: "Human Resources" },
      ]}
      value={selected}
      onChange={handleChange}
      errors={error ? [error] : []}
      required
    />
  );
}
```

### Async data loading (use AsyncSelect)

For server-side data, use the `AsyncSelect` component:

```tsx
import { AsyncSelect } from "@ousta-ui/components";

<AsyncSelect
  label="Search Users"
  getData={({ page, limit, searchTerm }) =>
    fetch(`/api/users?page=${page}&limit=${limit}&q=${searchTerm}`)
      .then(res => res.json())
  }
  extractDynamicData={(response) => response.items}
  hasMore={(response, page) => page < response.totalPages}
  options={{ value: "id", label: "name" }}
/>
```

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";

type SelectOptions<T = any> = {
  value: string;
  label?: string;
  renderOption?: (row: T) => ReactNode;
};

type SelectProps<T = any> = {
  data: T[];
  options?: SelectOptions<T>;
  onChange?: (value: unknown) => void;
  searchable?: boolean;
  clearable?: boolean;
  disabledOption?: (row: T) => boolean;
  label?: string;
  placeholder?: string;
  errors?: string[] | string | ReactNode;
  required?: boolean;
} & ComponentPropsWithoutRef<"select">;
```

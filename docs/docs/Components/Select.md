---
sidebar_position: 6
---

import Badge from '@site/src/components/Badge';
import {
  QuickStartPreview,
  DisabledOptionsPreview,
  ClearablePreview,
  NonSearchablePreview,
  WithErrorsPreview,
  CustomRenderPreview,
} from '@site/src/components/@Components/Select';

# Select

A flexible **Select** component that provides searchable dropdown functionality with local filtering, disabled options, and customizable rendering. Perfect for choosing from a list of options with search capabilities.

---

## Props

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `data` | `T[]` | `[]` | No | Array of data items to display. |
| `options` | `SelectOptionType<T>` | `{ value: "value", label: "label" }` | Yes | Configuration for extracting value, label, and custom rendering from data items. |
| `onChange` | `(value: unknown) => void` | — | No | Callback when selection changes. |
| `seachable` | `boolean` | `true` | Yes | Enables search input for filtering options. |
| `clearable` | `boolean` | `true` | Yes | Shows a clear button to reset selection. |
| `disabled` | `boolean` | `false` | No | Disables the entire component. |
| `disabledOption` | `(row: T) => boolean` | — | No | Function to disable specific options from being selected. |
| `label` | `string` | — | No | Label text displayed above the select. |
| `placeholder` | `string` | — | No | Placeholder text when no value is selected. |
| `errors` | `string[] | string | ReactNode` | — | No | Error message(s) displayed below the select. |
| `required` | `boolean` | `false` | Yes | Shows required indicator next to label. |
| `isMultiple` | `boolean` | `false` | No | Allows multiple values to be selected. |
| `loading` | `boolean` | `false` | No | Shows a loading indicator instead of the dropdown arrow. |
| `icons` | `{ open, close, clear, loading }` | — | Yes | Override the default icons for dropdown toggle, clear button, and loading state. |

<Badge color="blue">Note</Badge> Props marked with **Yes** in the **Provider?** column can be configured globally using the `ComponentPropsProvider`.

---

## Usage

### Basic Select

The most basic usage requires a `label` and a `data` array. By default, it's searchable.

```tsx
const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<Select
  label="Framework"
  placeholder="Choose a framework"
  data={frameworkData}
  onChange={(value) => console.log(value)}
/>
```

### Preview
<QuickStartPreview />

### Disabled Options

Use the `disabledOption` prop to conditionally disable items in the list. Disabled items are visible but not selectable.

```tsx
<Select
  label="Framework"
  placeholder="Svelte is disabled"
  data={frameworkData}
  disabledOption={(item) => item.value === 'svelte'}
/>
```

### Preview
<DisabledOptionsPreview />

### Clearable

Set `clearable` to `true` to allow users to deselect the current value.

```tsx
<Select
  label="Framework"
  placeholder="Choose a framework"
  data={frameworkData}
  clearable
/>
```

### Preview
<ClearablePreview />

### Non-Searchable

Set `seachable={false}` to disable the search input. The dropdown will still open, but the user cannot filter the list.

```tsx
<Select
  label="Framework"
  placeholder="Search is disabled"
  data={frameworkData}
  seachable={false}
/>
```

### Preview
<NonSearchablePreview />

### With Errors

Pass an array of strings to the `errors` prop to display validation messages and apply error styling.

```tsx
<Select
  label="Framework"
  placeholder="Choose a framework"
  data={frameworkData}
  errors={["This field is required"]}
  required
/>
```

### Preview
<WithErrorsPreview />

### Custom Option Rendering

Use `options.renderOption` to provide a custom component for rendering each item in the dropdown list.

```tsx
const userData = [
  { id: 1, name: "John Doe", email: "john@work.com", online: true },
  { id: 2, name: "Jane Smith", email: "jane@work.com", online: false },
];

<Select
  label="Assign to"
  placeholder="Select a user"
  data={userData}
  options={{
    value: "id",
    label: "name",
    renderOption: (user) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: user.online ? 'green' : 'gray'
        }} />
        <div>
          <div>{user.name}</div>
          <div style={{ fontSize: '0.8em', opacity: 0.7 }}>{user.email}</div>
        </div>
      </div>
    ),
  }}
/>
```

### Preview
<CustomRenderPreview />

---

## Styles & customization

### Runtime classes

- **`kui-select-container`**: The main wrapper for the label, select, and error message.
- **`kui-select-outer`**: The direct wrapper around the select input that handles positioning.
- **`kui-select-inner`**: The clickable input area.
- **`kui-select-label`**: The `<label>` element.
- **`kui-select-value`**: The `<span>` displaying the selected value.
- **`kui-select-placeholder`**: The `<span>` for the placeholder text.
- **`kui-select-toggle`**: The dropdown arrow button.
- **`kui-select-clear`**: The clear button.
- **`kui-select-dropdown`**: The dropdown container that holds the options.
- **`kui-select-option`**: An individual option item in the dropdown.
- **`kui-error`**: Added to `kui-select-inner` and `kui-select-clear` when `errors` are present.

### Tokens used by the default styles

- **Colors**: `--kui-neutral-*`, `--kui-primary-*`, `--kui-danger-*`
- **Spacing**: `--kui-spacing-2xs`, `--kui-spacing-xs`, `--kui-spacing-sm`
- **Typography**: `--kui-text-base`, `--kui-text-sm`
- **Rounding**: `--kui-rounded`

---

## Types (reference)

```ts
import { ReactNode } from "react";

export type SelectDataConstraints = Record<string | number, unknown>;

type RenderOptionFunction<T> = (row: T) => ReactNode | string;

export type SelectOptionType<T> = {
  value: string;
  label?: string;
  renderOption?: RenderOptionFunction<T>;
};

export type SelectProps<T extends SelectDataConstraints> = {
  data: T[];
  onChange?: (value: unknown) => void;
  value?: string | number;
  options?: SelectOptionType<T>;
  label?: string;
  placeholder?: string;
  errors?: string[] | string | ReactNode;
  required?: boolean;
  seachable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  disabledOption?: (row: T) => boolean;
  isMultiple?: boolean;
  // ... and other base props
};
```

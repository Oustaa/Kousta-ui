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
  GenericTypesPreview,
  IconsOverrideWithPropPreview,
  IconsOverrideWithProviderPreview,
  ComponentPropsProviderPreview,
  OnSearchPreview,
  ErrorHandlingPreview,
  EmptyMessagePreview,
  OnBlurPreview,
  RawValuePreview,
} from '@site/src/components/@Components/Select';

# Select

A flexible **Select** component that provides searchable dropdown functionality with local filtering, disabled options, and customizable rendering. Perfect for choosing from a list of options with search capabilities.

---

## Props

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `data` | `T[]` | — | No | Array of options data. |
| `value` | `string \| number` | — | No | Controlled selected value (matched against `options.value`). |
| `onChange` | `(value: unknown) => void` | — | No | Called when the selection changes. If `rawValue` is `true`, the callback receives the full selected row instead of just the extracted value. |
| `rawValue` | `boolean` | — | Yes | If `true`, `onChange` receives the entire selected row object instead of the value. |
| `options` | `SelectOptionType<T>` | `{ value: "value", label: "label" }` | Yes | How to extract value/label and/or render each option. |
| `placeholder` | `string` | — | No | Placeholder when nothing is selected. |
| `loading` | `boolean` | — | No | Shows loading indicator instead of toggle icon and prevents opening. |
| `onBlur` | `(target: HTMLDivElement & { clear: VoidFunction }) => void` | — | No | Called when the dropdown closes. Receives a target with a `clear()` helper to reset selection. |
| `errors` | `string[] \| string \| ReactNode` | — | No | Error(s) shown under the select (also applies error styles). |
| `label` | `string` | — | No | Label text. |
| `labelProps` | `ComponentPropsWithoutRef<'label'>` | — | Yes | Props forwarded to the `Label` component. Provider values are merged with local values. |
| `labelPosition` | `LabelPositionBase` | — | Yes | Label position for form layout. |
| `required` | `boolean` | — | Yes | Marks the field as required (visual indicator). |
| `seachable` | `boolean` | `true` | Yes | Enables the built-in search input and keyboard search behavior. |
| `onSearch` | `(row: T, term: string) => boolean` | — | No | Custom filtering logic for local search. Return `true` to keep a row. |
| `clearable` | `boolean` | `true` | Yes | Shows a clear button when a value is selected. |
| `emptyMessage` | `string` | `"No option found"` | Yes | Message shown when the dropdown list is empty. |
| `disabled` | `boolean` | — | No | Disables the whole select. |
| `disabledOption` | `(row: T) => boolean` | — | No | Disables specific rows. |
| `isMultiple` | `boolean` | — | No | <Badge color="orange">Coming soon</Badge> Multi-select support is not finalized yet. |
| `icons` | `{ close?: ReactNode; open?: ReactNode; clear?: ReactNode; loading?: ReactNode }` | — | Yes | Override icons used for open/close, clear, and loading. |
| `disableErrorBoundaries` | `boolean` | — | Yes | When `true`, errors thrown in option rendering will be re-thrown instead of being caught. |
| `optionErrorFallback` | `FC<{ row: T }>` | — | Yes | Custom fallback UI when an option throws while rendering. |
| `selectErrorFallback` | `ReactNode` | — | Yes | Fallback for select-level rendering errors. |

<Badge color="blue">Note</Badge> Props marked with **Yes** in the **Provider?** column can be configured globally using the `ComponentPropsProvider`.

---

## Usage

### Basic Select

The most basic usage requires a `label` and a `data` array. By default, it's searchable.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

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

</details>

<QuickStartPreview />

### Disabled Options

Use the `disabledOption` prop to conditionally disable items in the list. Disabled items are visible but not selectable.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<Select
  label="Framework"
  placeholder="Svelte is disabled"
  data={frameworkData}
  disabledOption={(item) => item.value === "svelte"}
/>
```

</details>

<DisabledOptionsPreview />

### Clearable

Set `clearable` to `true` to allow users to deselect the current value.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

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
  clearable
/>
```

</details>

<ClearablePreview />

### Non-Searchable

Set `seachable={false}` to disable the search input. The dropdown will still open, but the user cannot filter the list.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<Select
  label="Framework"
  placeholder="Search is disabled"
  data={frameworkData}
  seachable={false}
/>
```

</details>

<NonSearchablePreview />

### With Errors

Pass an array of strings to the `errors` prop to display validation messages and apply error styling.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

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
  errors={["This field is required"]}
  required
/>
```

</details>

<WithErrorsPreview />

### Custom Option Rendering

Use `options.renderOption` to provide a custom component for rendering each item in the dropdown list.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

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
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: user.online ? "green" : "gray",
          }}
        />
        <div>
          <div>{user.name}</div>
          <div style={{ fontSize: "0.8em", opacity: 0.7 }}>{user.email}</div>
        </div>
      </div>
    ),
  }}
/>
```

</details>

<CustomRenderPreview />

---

## Icon overriding

You can override the built-in icons either:

- Directly on the `Select` via the `icons` prop
- Globally via `ComponentPropsProvider` (recommended if you want a consistent look)

### Override icons on a single Select

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<Select
  data={frameworkData}
  label="Framework"
  placeholder="With custom icons"
  clearable
  icons={{
    clear: <X size={16} />,
    open: <ChevronUp size={16} />,
    close: <ChevronDown size={16} />,
  }}
/>
```

</details>

<IconsOverrideWithPropPreview />

### Override icons with ComponentPropsProvider

<details open>
<summary>Code</summary>

```tsx
import { ComponentPropsProvider, Select } from "@kousta-ui/components";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<ComponentPropsProvider
  select={{
    icons: {
      clear: <X size={16} />,
      open: <ChevronUp size={16} />,
      close: <ChevronDown size={16} />,
    },
  }}
>
  <Select data={frameworkData} label="Framework" placeholder="Icons from provider" clearable />
</ComponentPropsProvider>
```

</details>

<IconsOverrideWithProviderPreview />

---

## Component Props Provider

Use `ComponentPropsProvider` to set default props globally for all `Select` instances in a subtree.

### Provider supported overrides

The `select` key supports overriding the following props:

- `rawValue`
- `options`
- `labelPosition`
- `emptyMessage`
- `seachable`
- `required`
- `labelProps`
- `clearable`
- `disableErrorBoundaries`
- `optionErrorFallback`
- `selectErrorFallback`
- `icons`

<details open>
<summary>Code</summary>

```tsx
import { ComponentPropsProvider, Select } from "@kousta-ui/components";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<ComponentPropsProvider
  select={{
    seachable: false,
    clearable: false,
    emptyMessage: "Nothing here",
    labelProps: { style: { color: "#555" } },
    icons: {
      clear: <X size={16} />,
      open: <ChevronUp size={16} />,
      close: <ChevronDown size={16} />,
    },
  }}
>
  <Select label="Framework" placeholder="Provider overrides" data={frameworkData} />
</ComponentPropsProvider>
```

</details>

<ComponentPropsProviderPreview />

---

## onSearch

By default, the select filters by the extracted label (`options.label`). If you need custom filtering logic (e.g. multiple fields, strict matching, or locale-specific search), provide `onSearch`.


<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

const users = [
  { id: 1, first_name: "Nova", last_name: "Reed" },
  { id: 2, first_name: "Kai", last_name: "Morgan" },
  { id: 3, first_name: "Zara", last_name: "Quinn" },
  { id: 4, first_name: "Milo", last_name: "Hayes" },
];

<Select
  label="Users"
  placeholder="Search by exact first name"
  data={users}
  options={{ value: "id", label: "first_name last_name" }}
  onSearch={(row, term) => row.first_name.toLowerCase() === term.toLowerCase()}
/>
```

</details>

<OnSearchPreview />

---

## Error handling

If your `options.renderOption` (or label extraction) throws, options are rendered inside an internal error boundary.

Use:

- `optionErrorFallback` to render a custom UI for a broken option
- `disableErrorBoundaries` to re-throw errors (useful during development/tests)


<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";
import { XCircle } from "lucide-react";

const users = [
  { id: 5, first_name: "Safe", last_name: "User" },
  { id: 6, first_name: "Broken", last_name: "Option" },
  { id: 7, first_name: "Another", last_name: "User" },
];

<Select
  label="Option error boundary"
  placeholder="Option with id 6 throws"
  data={users}
  options={{
    value: "id",
    label: "first_name last_name",
    renderOption: (row) => {
      if (row.id === 6) throw new Error("Option render failed");
      return `${row.first_name} ${row.last_name}`;
    },
  }}
  optionErrorFallback={({ row }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        borderRadius: 8,
        background: "rgba(220, 38, 38, 0.12)",
        color: "#dc2626",
        fontSize: 12,
      }}
    >
      <XCircle size={14} />
      Failed to render option (id: {row.id})
    </span>
  )}
/>
```

</details>

<ErrorHandlingPreview />

---

## emptyMessage

Use `emptyMessage` to customize what users see when the dropdown has no options.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

<Select
  label="Framework"
  placeholder="No options"
  data={[]}
  emptyMessage="Nothing to show"
/>
```

</details>

<EmptyMessagePreview />

---

## onBlur

`onBlur` is called when the dropdown closes. It receives a `target` object that includes a `clear()` helper to reset the selection.


<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<Select
  label="Framework"
  data={frameworkData}
  onBlur={(target) => {
    target.clear();
  }}
/>
```

</details>

<OnBlurPreview />

---

## rawValue

When `rawValue` is enabled, `onChange` receives the full selected data row instead of just the extracted value.


<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

<Select
  label="Framework"
  data={frameworkData}
  rawValue
  onChange={(row) => {
    console.log(row); // => { value: "react", label: "React", ... }
  }}
/>
```

</details>

<RawValuePreview />

---

## Generic types

Select is a generic component. Passing an explicit type parameter gives you type-checking for `options`, `disabledOption`, `onSearch`, and custom renderers.

<details open>
<summary>Code</summary>

```tsx
import { Select } from "@kousta-ui/components";

type UserRow = {
  id: number;
  first_name: string;
  last_name: string;
};

const usersData: UserRow[] = [
  { id: 1, first_name: "Nova", last_name: "Reed" },
  { id: 2, first_name: "Kai", last_name: "Morgan" },
  { id: 3, first_name: "Zara", last_name: "Quinn" },
  { id: 4, first_name: "Milo", last_name: "Hayes" },
];

<Select<UserRow>
  label="Users"
  placeholder="Select a user"
  data={usersData}
  options={{ value: "id", label: "first_name last_name" }}
  onChange={(value) => console.log(value)}
/>
```

</details>

<GenericTypesPreview />

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

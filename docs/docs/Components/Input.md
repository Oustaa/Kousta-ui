---
sidebar_position: 5
---

import Badge from '@site/src/components/Badge';
import {
  QuickStartPreview,
  WithErrorsPreview,
  WithSectionsPreview,
  PasswordInputPreview,
  HorizontalLabelPreview,
  DisabledInputPreview,
} from '@site/src/components/@Components/Input';

# Input

A versatile **Input** component that provides form-friendly input fields with integrated labels, error handling, and optional left/right sections. Built with accessibility and customization in mind.

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text displayed above the input. |
| `errors` | `string[] | string | ReactNode` | — | Error message(s) displayed below the input. First error is shown. |
| `required` | `boolean` | `false` | Shows a required indicator (asterisk) next to the label. |
| `leftSection` | `ReactNode` | — | Content displayed on the left side inside the input. |
| `rightSection` | `ReactNode` | — | Content displayed on the right side inside the input. |
| `labelProps` | `ComponentPropsWithoutRef<"label">` | — | Props passed to the label element. |
| `labelPosition` | `"x" | "y"` | `"y"` | Label layout: `"y"` (vertical, default) or `"x"` (horizontal). |
| `...rest` | `ComponentPropsWithoutRef<"input">` | — | Any native `<input>` props are forwarded. |

<Badge color="blue">Note</Badge> The component automatically applies number pattern validation for `type="number"` inputs.

---

## Usage

### Basic Input

The most basic usage includes a `label` and `placeholder`.

<details open>
<summary>Code</summary>

```tsx
import { Input } from "@kousta-ui/components";

export default function Example() {
  return <Input label="Email" placeholder="you@example.com" type="email" />;
}
```

</details>

### Preview
<QuickStartPreview />

### Input with Errors

Pass an array of strings to the `errors` prop to display validation messages. The component will automatically apply error styling.

<details open>
<summary>Code</summary>

```tsx
import { Input } from "@kousta-ui/components";

export default function Example() {
  return (
    <Input
      label="Email"
      placeholder="you@example.com"
      defaultValue="not-an-email"
      errors={["Please enter a valid email"]}
    />
  );
}
```

</details>

### Preview
<WithErrorsPreview />

### Input with Sections (Prefix/Suffix)

Use `leftSection` and `rightSection` to add prefixes, suffixes, icons, or buttons inside the input.

<details open>
<summary>Code</summary>

```tsx
import { Input } from "@kousta-ui/components";

export default function Example() {
  return (
    <Input
      label="Amount"
      placeholder="0.00"
      type="number"
      leftSection={<span style={{ padding: "0 8px", opacity: 0.7 }}>$</span>}
      rightSection={<span style={{ padding: "0 8px", opacity: 0.7 }}>USD</span>}
    />
  );
}
```

</details>

### Preview
<WithSectionsPreview />

### Password Input with Show/Hide

You can use the `rightSection` to create a toggle for password visibility.

<details open>
<summary>Code</summary>

```tsx
import React, { useState } from "react";
import { Input } from "@kousta-ui/components";

export default function Example() {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      label="Password"
      placeholder="Enter password"
      type={visible ? "text" : "password"}
      rightSection={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0 8px",
          }}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "🙈" : "👁️"}
        </button>
      }
      required
    />
  );
}
```

</details>

### Preview
<PasswordInputPreview />

### Horizontal Label Layout

Set `labelPosition="x"` to align the label and input horizontally. You may need to provide a `minWidth` to the label via `labelProps` for alignment.

<details open>
<summary>Code</summary>

```tsx
import { Input } from "@kousta-ui/components";

export default function Example() {
  return (
    <Input
      label="Username"
      placeholder="john_doe"
      labelPosition="x"
      labelProps={{ style: { minWidth: 100 } }}
    />
  );
}
```

</details>

### Preview
<HorizontalLabelPreview />

### Disabled Input

Pass the native `disabled` prop to disable interaction and apply disabled styles.

<details open>
<summary>Code</summary>

```tsx
import { Input } from "@kousta-ui/components";

export default function Example() {
  return (
    <Input
      label="Read-only Field"
      placeholder="Cannot edit"
      disabled
      defaultValue="Some read-only value"
    />
  );
}
```

</details>

### Preview
<DisabledInputPreview />

---

## Accessibility

- **Semantics**: Renders a proper `<label>` element linked to the input via `htmlFor`.
- **Error states**: Errors are announced to screen readers via the `data-error` attribute.
- **Required fields**: Visual indicator (asterisk) and semantic `required` attribute.
- **Keyboard navigation**: Full keyboard support inherited from native input.

<Badge color="green">Tip</Badge> Always provide descriptive labels and error messages for screen reader users.

---

## Styles & customization

### Runtime classes

* **`kui-input-container`**: The main wrapper for the label, input, and error message.
* **`kui-input-inner`**: The direct wrapper around the input field and its sections.
* **`kui-input`**: The `<input>` element itself.
* **`kui-input-label`**: The `<label>` element.
* **`kui-input-error-message`**: The `<span>` that displays the error message.

### Tokens used by the default styles

* **Colors**: `--kui-neutral-*`, `--kui-primary-*`, `--kui-danger-*`
* **Spacing**: `--kui-spacing-2xs`, `--kui-spacing-xs`, `--kui-spacing-sm`
* **Typography**: `--kui-text-base`, `--kui-text-sm`
* **Rounding**: `--kui-rounded`

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";

type LabelPositionBase = "x" | "y";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<"label">;
  errors?: string[] | string | ReactNode;
  required?: boolean;
  onMaxExited?: VoidFunction;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  labelPosition?: LabelPositionBase;
};
```

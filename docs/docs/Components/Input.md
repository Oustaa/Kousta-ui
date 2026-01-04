---
sidebar_position: 5
---

import Badge from '@site/src/components/Badge';

# Input

A versatile **Input** component that provides form-friendly input fields with integrated labels, error handling, and optional left/right sections. Built with accessibility and customization in mind.

---

## When to use

- **Form inputs**: Use for any form data collection (text, email, password, etc.)
- **Search fields**: Perfect for search interfaces with icon sections
- **Numeric inputs**: Built-in pattern validation for number inputs
- **Input groups**: When you need prefixes/suffixes like currency symbols

---

## Quick start

```tsx
import { Input } from "@ousta-ui/components";

export default function Example() {
  return (
    <div style={{ width: 420 }}>
      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
      />
    </div>
  );
}
```

### With errors

```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  errors={["Email is required"]}
/>
```

### With left/right sections

```tsx
<Input
  label="Amount"
  placeholder="0"
  leftSection={<span style={{ padding: "0 8px" }}>$</span>}
  rightSection={<span style={{ padding: "0 8px" }}>USD</span>}
/>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text displayed above the input. |
| `errors` | `string[] \| string \| ReactNode` | — | Error message(s) displayed below the input. First error is shown. |
| `required` | `boolean` | `false` | Shows a required indicator (asterisk) next to the label. |
| `leftSection` | `ReactNode` | — | Content displayed on the left side inside the input. |
| `rightSection` | `ReactNode` | — | Content displayed on the right side inside the input. |
| `labelProps` | `ComponentPropsWithoutRef<"label">` | — | Props passed to the label element. |
| `labelPosition` | `"x" \| "y"` | `"y"` | Label layout: `"y"` (vertical, default) or `"x"` (horizontal). |
| `...rest` | `ComponentPropsWithoutRef<"input">` | — | Any native `<input>` props are forwarded. |

<Badge color="blue">Note</Badge> The component automatically applies number pattern validation for `type="number"` inputs.

## Examples

### Basic input with label

```tsx
<Input
  label="Full Name"
  placeholder="Enter your name"
  required
/>
```

### Input with errors

```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  type="email"
  errors={["Email is required", "Please enter a valid email"]}
  required
/>
```

### Input with sections (prefix/suffix)

```tsx
<Input
  label="Amount"
  placeholder="0"
  type="number"
  leftSection={<span style={{ padding: "0 8px" }}>$</span>}
  rightSection={<span style={{ padding: "0 8px", color: "#666" }}>USD</span>}
/>
```

### Search input with icon

```tsx
<Input
  label="Search"
  placeholder="Search users..."
  leftSection={<span style={{ padding: "0 8px" }}>🔍</span>}
  type="search"
/>
```

### Password input with show/hide

```tsx
<Input
  label="Password"
  placeholder="Enter password"
  type="password"
  rightSection={
    <button
      type="button"
      style={{ padding: "0 8px", border: "none", background: "none" }}
    >
      👁️
    </button>
  }
  required
/>
```

### Horizontal label layout

```tsx
<Input
  label="Username"
  placeholder="john_doe"
  labelPosition="x"
  labelProps={{ style: { minWidth: "100px" } }}
/>
```

### Disabled input

```tsx
<Input
  label="Disabled Field"
  placeholder="This is disabled"
  disabled
  value="Read only value"
/>
```

---

## Accessibility

- **Semantics**: Renders a proper `<label>` element linked to the input via `htmlFor`
- **Error states**: Errors are announced to screen readers via `data-error` attribute
- **Required fields**: Visual indicator (asterisk) and semantic `required` attribute
- **Keyboard navigation**: Full keyboard support inherited from native input

<Badge color="green">Tip</Badge> Always provide descriptive labels and error messages for screen reader users.

---

## Styles

Kousta-UI Input components include customizable CSS classes for easy styling overrides. Each input element receives the following classes:

### Base Classes
- `kui-input-container` - Main wrapper containing label, input, and error
- `kui-input-inner` - Container for the input field and sections
- `kui-input` - The actual input element
- `kui-input-error-message` - Error message display

### Contextual Classes
- `kui-input-label` - Applied to the label when used within an Input component

### Customization Examples

You can easily override input styles using these CSS classes:

```css
/* Custom input styling */
.kui-input {
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.kui-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom error state */
.kui-input-error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 4px;
}

/* Custom container */
.kui-input-container {
  margin-bottom: 1rem;
}
```

### CSS Variables

You can also customize using CSS variables:

```css
.kui-input {
  --kui-input-border-color: #d1d5db;
  --kui-input-focus-border-color: #3b82f6;
  --kui-input-error-border-color: #ef4444;
  --kui-input-padding: 0.5rem 0.75rem;
}
```

---

## Patterns

### Form validation integration

```tsx
function FormExample() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    return "";
  };

  return (
    <Input
      label="Email"
      type="email"
      errors={errors.email ? [errors.email] : []}
      onChange={(e) => {
        const error = validateEmail(e.target.value);
        setErrors(prev => ({ ...prev, email: error }));
      }}
      required
    />
  );
}
```

### Input group with multiple sections

```tsx
<Input
  label="Phone Number"
  placeholder="(555) 000-0000"
  type="tel"
  leftSection={
    <select style={{ border: "none", background: "transparent" }}>
      <option>+1</option>
      <option>+44</option>
    </select>
  }
  rightSection={
    <button type="button" style={{ padding: "0 8px" }}>
      ✅
    </button>
  }
/>
```

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


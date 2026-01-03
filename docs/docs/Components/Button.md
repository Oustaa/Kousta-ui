---
sidebar_position: 1
---

import Badge from '@site/src/components/Badge';

# Button

A theme‑aware **Button** with variants, sizes, disabled and loading states.
Now supports **global default props & per‑variant overrides via a context provider**.

---

## Quick start

```tsx
import { Button } from "@ousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button>Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
}
```

---

## Props

| Name | Type | Description | Required | Default |
|------|------|-------------|----------|---------|
| `loading` | `boolean` | Shows a loading indicator and disables interaction. | No | `false` |
| `loadingIndicator` | `string \| ReactNode` | Custom content to render while loading. | No | `"Loading..."` |
| `disabled` | `boolean` | Disables the button. | No | `false` |
| `variant` | [`ButtonVariant`](#types-reference) \| `string` | Visual style (supports built‑in and custom provider variants). | No | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | Size scale. | No | `"md"` |
| `type` | `"submit" \| "reset" \| "button"` | Native button type. | No | `"button"` |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Click handler. | No | — |
| `...rest` | `ComponentPropsWithoutRef<"button">` | Any native `<button>` props (e.g., `aria-*`, `style`). | — | — |

---

## Variants

All color variants are available in **solid**, **outline**, **light**, and **link** styles for each color:

- `primary`, `primary-outline`, `primary-light`, `primary-link`
- `success`, `success-outline`, `success-light`, `success-link`
- `danger`, `danger-outline`, `danger-light`, `danger-link`
- `neutral`, `neutral-outline`, `neutral-light`, `neutral-link`
- `warning`, `warning-outline`, `warning-light`, `warning-link`

```tsx
<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  <Button variant="primary">Primary</Button>
  <Button variant="primary-outline">Primary</Button>
  <Button variant="primary-light">Primary</Button>
  <Button variant="primary-link">Primary</Button>

  <Button variant="neutral">Neutral</Button>
  <Button variant="neutral-outline">Neutral</Button>
  <Button variant="neutral-light">Neutral</Button>
  <Button variant="neutral-link">Neutral</Button>
</div>
```

### Define your own variants

With the [`ComponentPropsProvider`](/docs/Components/ComponentPropsProvider) you can provide your own pre‑defined button **variant**, as well as override the existing ones.

#### Example
```tsx
import { Button, ComponentPropsProvider } from "@ousta-ui/components";

<ComponentPropsProvider
  button={{
    /* override default variant for all Buttons (unless locally set) */
    variant: "neutral",
    /* new custom variants */
    variants: {
      ghost: {
        className: "btn-ghost",
      },
      info: {
        className: "bg-blue-500 text-white rounded-md",
      },
    },
  }}
>
  <Button variant="ghost">Ghost</Button>
  <Button variant="info">Info</Button>
</ComponentPropsProvider>
```

---

## Size

`Button` accepts three sizes: `sm`, `md`, `lg`. Default is **md**.

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button> {/* default */}
<Button size="lg">Large Button</Button>
```

### Override size app‑wide

Use the provider to set a default size for a subtree. Component props always **override** provider defaults.

```tsx
import { Button, ComponentPropsProvider } from "@ousta-ui/components";

<>
  <Button>Medium (default)</Button>
  <ComponentPropsProvider button={{ size: "lg" }}>
    {/* uses provider default: lg */}
    <Button>Large (provider default)</Button>
    {/* local prop wins over provider */}
    <Button size="sm">Small (local override)</Button>
  </ComponentPropsProvider>
</>
```

---

## Loading & disabled

- When `loading` is `true`, the component sets `data-loading="true"` **and** is disabled to prevent duplicate actions.
- When `disabled` is `true`, the button is non‑interactive.
- Use `loadingIndicator` to customize the loading content (text or React node).

```tsx
<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Button loading>Saving…</Button>
  <Button
    loading
    loadingIndicator={<span style={{ display: "inline-flex", gap: 6 }}><i className="spinner" />Please wait</span>}
    variant="neutral-outline"
  />
  <Button disabled variant="neutral-outline">Disabled</Button>
</div>
```

### Override `loadingIndicator`

```tsx
// Local override
<Button loading loadingIndicator="Submitting…">Submit</Button>

// Provider default for a subtree
<ComponentPropsProvider button={{ loadingIndicator: "Please wait…" }}>
  <Button loading>Submit</Button> {/* renders "Please wait…" */}
</ComponentPropsProvider>
```

---

## Global defaults & per‑variant overrides (via Provider) <Badge color="purple">New</Badge>

Use `ComponentPropsProvider` to define **app‑wide defaults** for Button and to create **custom variants** that map to native button props (style/className/aria/etc.).

```tsx
import { ComponentPropsProvider, Button } from "@ousta-ui/components";

export default function App() {
  return (
    <ComponentPropsProvider
      button={{
        /** default props if not provided by <Button /> */
        size: "sm",
        type: "submit",
        variant: "primary",
        className: "my-shared-btn-class",
        style: { borderRadius: 12 },

        /** define custom variants (keys you can pass to `variant`) */
        variants: {
          mine: {
            // Anything valid for <button>
            style: { backgroundColor: "red", color: "green" },
          },
          ghost: {
            className: "btn-ghost",
            "aria-live": "polite",
          },
        },
        /** default loading text if <Button loading loadingIndicator /> not provided */
        loadingIndicator: "Loading…",
      }}
    >
      {/* uses provider defaults: size=sm, type=submit */}
      <Button>Submit</Button>

      {/* uses custom provider variant mapping */}
      <Button variant="mine">Custom</Button>
    </ComponentPropsProvider>
  );
}
```

### How precedence works

- **Component props win** over provider defaults. If you pass `size="lg"` on a button, it overrides the provider’s `size`.
- **Provider `variants[variant]` are merged** with the component props. For `style`, provider style is merged first, then the component `style` is applied so your local styles win.
- **Class names** are concatenated in this order: `provider.className` → CSS classes for `variant` and `size` → component `className`.

---

## Accessibility

- Semantic `<button type="button|submit|reset">`.
- Disabled and loading states set `disabled` to block interaction.
- Add `aria-busy={loading}` if you customize the loading UI.
- Ensure contrast between text and background meets WCAG AA.

<Badge color="green">Tip</Badge> If the label is just an icon, add an accessible name with `aria-label`.

---

## Styling hooks

Default class names from `Button.module.css`:

- Base: `.btn`
- Sizes: `.btn-sm`, `.btn-md`, `.btn-lg`
- Solid: `.btn-primary`, `.btn-success`, `.btn-danger`, `.btn-neutral`, `.btn-warning`
- Outline: `.btn-primary-outline`, `.btn-success-outline`, `.btn-danger-outline`, `.btn-neutral-outline`, `.btn-warning-outline`
- Light: `.btn-primary-light`, `.btn-success-light`, `.btn-danger-light`, `.btn-neutral-light`, `.btn-warning-light`
- Link: `.btn-primary-link`, `.btn-success-link`, `.btn-danger-link`, `.btn-neutral-link`, `.btn-warning-link`

Each variant leverages design tokens (e.g., `--Oui-primary-500`) and defines hover states per style.

---

## Patterns

### Submit buttons in forms

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" loading={isSaving} loadingIndicator="Saving…">
    Save changes
  </Button>
</form>
```

### Destructive action

```tsx
<Button variant="danger" onClick={onDelete}>Delete</Button>
```

### Secondary emphasis

```tsx
<Button variant="neutral-outline">Cancel</Button>
```

### App‑wide sizing & type defaults

```tsx
<ComponentPropsProvider button={{ size: "sm", type: "submit" }}>
  {/* becomes a small submit button unless overridden */}
  <Button>Save</Button>
</ComponentPropsProvider>
```

### Custom “ghost” variant via provider

```tsx
<ComponentPropsProvider button={{ variants: { ghost: { className: "btn-ghost" } } }}>
  <Button variant="ghost">Ghost</Button>
</ComponentPropsProvider>
```

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonColor = "primary" | "warning" | "neutral" | "danger" | "success";
type ButtonColoringStyle = "outline" | "light" | "link" | "";

export type ButtonVariant =
  | ButtonColor
  | `${ButtonColor}-${Exclude<ButtonColoringStyle, "">}`;

export type ButtonProps = {
  loading?: boolean;
  loadingIndicator?: string | ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant | string;
  size?: "sm" | "md" | "lg";
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & ComponentPropsWithoutRef<"button">;
```

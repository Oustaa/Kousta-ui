---
sidebar_position: 1
---

import Badge from '@site/src/components/Badge';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  QuickStartPreview,
  VariantsPreview,
  SizesPreview,
  LoadingDisabledPreview,
  ProviderDefaultsPreview,
  ProviderVariantsPreview,
} from '@site/src/components/@Components/Button';

# Button

A theme‑aware **Button** with variants, sizes, disabled and loading states.
Now supports **global default props & per‑variant overrides via a context provider**.

---

## Quick start

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ButtonExample.tsx",
      code: `import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button>Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ButtonExample.jsx",
      code: `import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button>Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
}`
    }
  ]}
  preview={<QuickStartPreview />}
  defaultTab="ts"
/>

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

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ButtonVariants.tsx",
      code: `import React, { useMemo, useState } from "react";
import { Button } from "@kousta-ui/components";

const ALL_VARIANTS = [
  "primary",
  "primary-outline",
  "primary-light",
  "primary-link",
  "success",
  "success-outline",
  "success-light",
  "success-link",
  "danger",
  "danger-outline",
  "danger-light",
  "danger-link",
  "neutral",
  "neutral-outline",
  "neutral-light",
  "neutral-link",
  "warning",
  "warning-outline",
  "warning-light",
  "warning-link",
] as const;

type Variant = (typeof ALL_VARIANTS)[number];

export default function Example() {
  const [variant, setVariant] = useState<Variant>("primary");
  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label htmlFor={"btn-variant-" + id} style={{ fontSize: 14 }}>
          Variant
        </label>
        <select
          id={"btn-variant-" + id}
          value={variant}
          onChange={(e) => setVariant(e.target.value as Variant)}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          {ALL_VARIANTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant={variant}>Button</Button>
        <Button variant={variant} disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ButtonVariants.jsx",
      code: `import React, { useMemo, useState } from "react";
import { Button } from "@kousta-ui/components";

const ALL_VARIANTS = [
  "primary",
  "primary-outline",
  "primary-light",
  "primary-link",
  "success",
  "success-outline",
  "success-light",
  "success-link",
  "danger",
  "danger-outline",
  "danger-light",
  "danger-link",
  "neutral",
  "neutral-outline",
  "neutral-light",
  "neutral-link",
  "warning",
  "warning-outline",
  "warning-light",
  "warning-link",
];

export default function Example() {
  const [variant, setVariant] = useState("primary");
  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label htmlFor={"btn-variant-" + id} style={{ fontSize: 14 }}>
          Variant
        </label>
        <select
          id={"btn-variant-" + id}
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          {ALL_VARIANTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant={variant}>Button</Button>
        <Button variant={variant} disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}`
    }
  ]}
  preview={<VariantsPreview />}
  defaultTab="ts"
/>

### Define your own variants

With the [`ComponentPropsProvider`](/docs/Components/ComponentPropsProvider) you can provide your own pre‑defined button **variant**, as well as override the existing ones.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "CustomVariants.tsx",
      code: `import { Button, ComponentPropsProvider } from "@kousta-ui/components";

export default function Example() {
  return (
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
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "CustomVariants.jsx",
      code: `import { Button, ComponentPropsProvider } from "@kousta-ui/components";

export default function Example() {
  return (
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
  );
}`
    }
  ]}
  preview={<ProviderVariantsPreview />}
  defaultTab="ts"
/>

---

## Size

`Button` accepts three sizes: `sm`, `md`, `lg`. Default is **md**.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ButtonSizes.tsx",
      code: `import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ButtonSizes.jsx",
      code: `import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`
    }
  ]}
  preview={<SizesPreview />}
  defaultTab="ts"
/>

### Override size app‑wide

Use the provider to set a default size for a subtree. Component props always **override** provider defaults.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ButtonSizeProvider.tsx",
      code: `import { Button, ComponentPropsProvider } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button>Default</Button>
      <ComponentPropsProvider button={{ size: "lg" }}>
        <Button>Large (provider default)</Button>
        <Button size="sm">Small (local override)</Button>
      </ComponentPropsProvider>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ButtonSizeProvider.jsx",
      code: `import { Button, ComponentPropsProvider } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button>Default</Button>
      <ComponentPropsProvider button={{ size: "lg" }}>
        <Button>Large (provider default)</Button>
        <Button size="sm">Small (local override)</Button>
      </ComponentPropsProvider>
    </div>
  );
}`
    }
  ]}
  preview={<ProviderDefaultsPreview />}
  defaultTab="ts"
/>

---

## Loading & disabled

- When `loading` is `true`, the component sets `data-loading="true"` **and** is disabled to prevent duplicate actions.
- When `disabled` is `true`, the button is non‑interactive.
- Use `loadingIndicator` to customize the loading content (text or React node).

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ButtonLoading.tsx",
      code: `import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button loading>Saving…</Button>
      <Button loading variant="neutral-outline" loadingIndicator="Please wait…" />
      <Button disabled variant="neutral-outline">
        Disabled
      </Button>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ButtonLoading.jsx",
      code: `import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button loading>Saving…</Button>
      <Button loading variant="neutral-outline" loadingIndicator="Please wait…" />
      <Button disabled variant="neutral-outline">
        Disabled
      </Button>
    </div>
  );
}`
    }
  ]}
  preview={<LoadingDisabledPreview />}
  defaultTab="ts"
/>

### Override `loadingIndicator`

<Badge color="yellow">Important</Badge> When you override `loadingIndicator` via the `ComponentPropsProvider`, the override will be **app-wide** (or subtree-wide) for all buttons within that provider scope. This means all buttons using the provider will use the same loading indicator text unless explicitly overridden at the component level.

```tsx
// Local override (component-level)
<Button loading loadingIndicator="Submitting…">Submit</Button>

// Provider default for a subtree (app-wide)
<ComponentPropsProvider button={{ loadingIndicator: "Please wait…" }}>
  <Button loading>Submit</Button> {/* renders "Please wait…" */}
  <Button loading>Save</Button> {/* also renders "Please wait…" */}
  <Button loading loadingIndicator="Custom…">Custom</Button> {/* local override wins */}
</ComponentPropsProvider>
```

---

## Global defaults & per‑variant overrides (via Provider) <Badge color="purple">New</Badge>

Use `ComponentPropsProvider` to define **app‑wide defaults** for Button and to create **custom variants** that map to native button props (style/className/aria/etc.).

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ButtonProviderVariants.tsx",
      code: `import { ComponentPropsProvider, Button } from "@kousta-ui/components";

export default function App() {
  return (
    <ComponentPropsProvider
      button={{
        variant: "neutral",
        variants: {
          ghost: {
            className: "btn-ghost",
          },
        },
      }}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button>Provider default (neutral)</Button>
        <Button variant="ghost">Ghost (provider variant)</Button>
      </div>
    </ComponentPropsProvider>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ButtonProviderVariants.jsx",
      code: `import { ComponentPropsProvider, Button } from "@kousta-ui/components";

export default function App() {
  return (
    <ComponentPropsProvider
      button={{
        variant: "neutral",
        variants: {
          ghost: {
            className: "btn-ghost",
          },
        },
      }}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button>Provider default (neutral)</Button>
        <Button variant="ghost">Ghost (provider variant)</Button>
      </div>
    </ComponentPropsProvider>
  );
}`
    }
  ]}
  preview={<ProviderVariantsPreview />}
  defaultTab="ts"
/>

### How precedence works

- **Component props win** over provider defaults. If you pass `size="lg"` on a button, it overrides the provider’s `size`.
- **Provider `variants[variant]` are merged** with the component props. For `style`, provider style is merged first, then the component `style` is applied so your local styles win.
- **Class names** are concatenated in this order: `provider.className` → CSS classes for `variant` and `size` → component `className`.

---

## Accessibility

- **Semantic HTML**: Uses native `<button type="button|submit|reset">` elements.
- **Disabled and loading states**: Both states set `disabled` to block interaction and prevent duplicate actions.
- **ARIA attributes**: Add `aria-busy={loading}` if you customize the loading UI to indicate the button is in a loading state.
- **Color contrast**: Ensure contrast between text and background meets **WCAG AA** standards (minimum 4.5:1 for normal text, 3:1 for large text).
- **Accessible labels**: If the label is just an icon, add an accessible name with `aria-label` or `aria-labelledby`.

<Badge color="green">Tip</Badge> When customizing button styles, always test color contrast ratios to ensure accessibility compliance.

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

---

## Styles & customization

### Runtime classes

- **Base**
  - `kui-button`
- **Variant**
  - `kui-button-{variant}` (example: `kui-button-primary-light`)
- **Size**
  - `kui-button-{size}` (example: `kui-button-lg`)
- **Loading UI**
  - `kui-button-loading` (rendered inside the button when `loading` is true)

### Tokens used by the default styles

- **Spacing**
  - `--kui-spacing-xs`, `--kui-spacing-sm`, `--kui-spacing-md`, `--kui-spacing-lg`
- **Rounding**
  - `--kui-rounded`
- **Colors**
  - `--kui-primary-*`, `--kui-success-*`, `--kui-danger-*`, `--kui-neutral-*`, `--kui-warning-*`

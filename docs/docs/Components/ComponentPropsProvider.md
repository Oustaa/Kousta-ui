---
sidebar_position: 999
title: Component Props Provider
sidebar_label: Component Props Provider
---

import Badge from '@site/src/components/Badge';

# Component Props Provider

A powerful **ComponentPropsProvider** that allows you to set global default props and create custom variants for Kousta UI components. Perfect for maintaining consistent design systems and reducing prop duplication across your application.

---

## When to use

- **Design systems**: Establish consistent defaults across your entire application
- **Theming**: Apply theme-specific variants (dark mode, brand colors, etc.)
- **Prop reduction**: Reduce repetitive prop declarations in components
- **Custom variants**: Create reusable component variations with custom styling
- **A/B testing**: Easily switch between different component configurations

---

## Quick start

```tsx
import { ComponentPropsProvider, Button, Modal } from "@kousta-ui/components";

export default function App() {
  return (
    <ComponentPropsProvider
      button={{
        size: "sm",
        variant: "primary",
        className: "app-button",
      }}
      modal={{
        size: "lg",
        position: "center",
        withBackdrop: true,
      }}
    >
      <div>
        {/* All buttons will be small and primary by default */}
        <Button>Default Button</Button>
        <Button variant="secondary">Override</Button>

        {/* All modals will be large and centered */}
        <Modal title="Settings">
          Settings content
        </Modal>
      </div>
    </ComponentPropsProvider>
  );
}
```

---

## Provider structure

The provider accepts configuration for each component type:

```tsx
<ComponentPropsProvider
  button={ButtonConfiguration}
  modal={ModalConfiguration}
  menu={MenuConfiguration}
  select={SelectConfiguration}
  asyncSelect={AsyncSelectConfiguration}
  pagination={PaginationConfiguration}
>
  <YourApp />
</ComponentPropsProvider>
```

---

## Button configuration

### Basic defaults

```tsx
<ComponentPropsProvider
  button={{
    size: "md",           // Default size for all buttons
    variant: "primary",   // Default variant
    type: "button",       // Default button type
    className: "btn",     // Default CSS class
    style: {              // Default inline styles
      borderRadius: "8px",
    },
    loadingIndicator: "Loading...", // Default loading text
  }}
>
  <Button>Uses provider defaults</Button>
</ComponentPropsProvider>
```

### Custom variants

Create reusable button variants with custom styling:

```tsx
<ComponentPropsProvider
  button={{
    // Default props
    variant: "primary",
    size: "md",

    // Custom variants
    variants: {
      // Ghost variant
      ghost: {
        className: "btn-ghost",
        style: { background: "transparent", border: "1px solid #ddd" },
      },

      // Brand variant
      brand: {
        className: "btn-brand",
        style: {
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
        },
      },

      // Danger variant with icon
      danger: {
        className: "btn-danger",
        "aria-label": "Danger action",
        style: { background: "#dc2626", color: "white" },
      },

      // Social login buttons
      google: {
        className: "btn-google",
        style: {
          background: "#4285f4",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        },
      },
    },
  }}
>
  {/* Use custom variants */}
  <Button variant="ghost">Ghost Button</Button>
  <Button variant="brand">Brand Button</Button>
  <Button variant="danger">Delete</Button>
  <Button variant="google">
    <span>G</span> Sign in with Google
  </Button>

  {/* Still can override locally */}
  <Button size="lg" variant="primary">Large Override</Button>
</ComponentPropsProvider>
```

---

## Modal configuration

```tsx
<ComponentPropsProvider
  modal={{
    size: "md",
    position: "center",
    withBackdrop: true,
    withCloseBtn: true,
    closeOnClickEsc: true,
    closeOnClickOutside: true,
    offset: 0,
  }}
>
  <Modal title="Default Modal">
    This modal uses provider defaults
  </Modal>

  {/* Override specific props */}
  <Modal
    title="Large Modal"
    size="xl"
    position="top"
  >
    This modal overrides size and position
  </Modal>
</ComponentPropsProvider>
```

---

## Menu configuration

```tsx
<ComponentPropsProvider
  menu={{
    // Menu container defaults
    menu: {
      type: "click",
      closeOnClick: true,
      position: "Bottom-Start",
      offset: 4,
    },

    // Menu item defaults
    menuItem: {
      closeMenuOnClick: true,
      disabled: false,
    },
  }}
>
  <Menu.Menu>
    <Menu.Target>Menu</Menu.Target>
    <Menu.DropDown>
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item closeMenuOnClick={false}>Item 2 (stays open)</Menu.Item>
    </Menu.DropDown>
  </Menu.Menu>
</ComponentPropsProvider>
```

---

## Select configuration

`Select` reads provider defaults from the `select` key.

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

export function Example() {
  return (
    <ComponentPropsProvider
      select={{
        clearable: false,
        seachable: false,
        emptyMessage: "Nothing here",
        labelProps: { style: { color: "#555" } },
        icons: {
          clear: <X size={16} />,
          open: <ChevronUp size={16} />,
          close: <ChevronDown size={16} />,
        },
      }}
    >
      <Select label="Framework" data={frameworkData} placeholder="Provider overrides" />
    </ComponentPropsProvider>
  );
}
```

</details>

---

## AsyncSelect configuration

`AsyncSelect` reads provider defaults from the `asyncSelect` key.

<details open>
<summary>Code</summary>

```tsx
import { AsyncSelect, ComponentPropsProvider } from "@kousta-ui/components";

type Product = { id: number; designation: string };

const API_BASE_URL = process.env.API_BASE_URL;

const getProducts = async ({ page, limit, searchTerm }) => {
  const url = new URL("/api/v1/products", API_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("search", searchTerm || "");
  const resp = await fetch(url.toString());
  return resp.json();
};

export function Example() {
  return (
    <ComponentPropsProvider
      asyncSelect={{
        limit: 20,
        searchTimeout: 400,
        extractDynamicData: (resp) => resp.products,
        hasMore: (resp, page) => page < resp.meta.last_page,
      }}
    >
      <AsyncSelect<Product>
        label="Dynamic Select"
        placeholder="Search products"
        getData={getProducts}
        options={{ value: "id", label: "designation" }}
      />
    </ComponentPropsProvider>
  );
}
```

</details>

---

## Pagination configuration

`Pagination` reads provider defaults from the `pagination` key.

<details open>
<summary>Code</summary>

```tsx
import React, { useState } from "react";
import { ComponentPropsProvider, Pagination } from "@kousta-ui/components";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function Example() {
  const [page, setPage] = useState(6);

  return (
    <ComponentPropsProvider
      pagination={{
        prevIcon: <ChevronLeft size={16} />,
        nextIcon: <ChevronRight size={16} />,
        placeholderIcon: <MoreHorizontal size={16} />,
        seblings: 1,
      }}
    >
      <Pagination page={page} totalPages={20} onChange={setPage} />
    </ComponentPropsProvider>
  );
}
```

</details>

---

## Precedence rules

Understanding how props are merged is crucial:

### 1. Component props win over provider defaults

```tsx
<ComponentPropsProvider button={{ size: "lg" }}>
  {/* This will be medium, not large */}
  <Button size="md">Medium Button</Button>
</ComponentPropsProvider>
```

### 2. Provider variants are merged with component props

```tsx
<ComponentPropsProvider
  button={{
    variants: {
      custom: {
        className: "custom-btn",
        style: { background: "blue" },
      },
    },
  }}
>
  {/* Both provider variant and local style are applied */}
  <Button
    variant="custom"
    style={{ color: "white" }}
  >
    {/* Final style: background: "blue", color: "white" */}
  </Button>
</ComponentPropsProvider>
```

### 3. Class names are concatenated

Order of concatenation:
1. Provider `className`
2. Variant/size CSS classes
3. Component `className`

```tsx
<ComponentPropsProvider button={{ className: "provider-btn" }}>
  <Button className="local-btn" variant="primary">
    {/* Final className: "provider-btn btn-primary btn-md local-btn" */}
  </Button>
</ComponentPropsProvider>
```

---

## Advanced patterns

### Theme-based providers

```tsx
function ThemeProvider({ children, theme }) {
  const themeConfig = {
    light: {
      button: {
        variant: "primary",
        className: "light-theme-btn",
      },
      modal: {
        withBackdrop: true,
      },
    },
    dark: {
      button: {
        variant: "primary-light",
        className: "dark-theme-btn",
      },
      modal: {
        withBackdrop: false,
      },
    },
  };

  return (
    <ComponentPropsProvider {...themeConfig[theme]}>
      {children}
    </ComponentPropsProvider>
  );
}

// Usage
<ThemeProvider theme="dark">
  <App />
</ThemeProvider>
```

### Section-specific providers

```tsx
function AdminPanel() {
  return (
    <ComponentPropsProvider
      button={{
        size: "sm",
        variant: "neutral-outline",
        variants: {
          admin: {
            className: "admin-btn",
            style: { background: "#1f2937", color: "white" },
          },
        },
      }}
    >
      <div className="admin-panel">
        <Button variant="admin">Admin Action</Button>
        <Button>Default Admin Button</Button>
      </div>
    </ComponentPropsProvider>
  );
}
```

### Nested providers

```tsx
function App() {
  return (
    // Global defaults
    <ComponentPropsProvider
      button={{ size: "md", variant: "primary" }}
    >
      <Header />

      {/* Override for specific section */}
      <ComponentPropsProvider
        button={{ size: "sm", variant: "secondary" }}
      >
        <Sidebar />
      </ComponentPropsProvider>

      <Footer />
    </ComponentPropsProvider>
  );
}
```

---

## Dynamic configuration

```tsx
function DynamicProvider({ children }) {
  const [config, setConfig] = useState({
    button: {
      size: "md",
      variant: "primary",
    },
  });

  // Update configuration based on user preferences
  useEffect(() => {
    const userPrefs = getUserPreferences();
    setConfig({
      button: {
        size: userPrefs.buttonSize || "md",
        variant: userPrefs.theme === "dark" ? "primary-light" : "primary",
      },
    });
  }, []);

  return (
    <ComponentPropsProvider {...config}>
      {children}
    </ComponentPropsProvider>
  );
}
```

---

## TypeScript support

Full TypeScript support with proper type inference:

```tsx
import { ComponentPropsProvider, ButtonPropsProvided } from "@kousta-ui/components";

const buttonConfig: ButtonPropsProvided = {
  size: "md",
  variant: "primary",
  className: "custom-btn",
  variants: {
    custom: {
      className: "custom-variant",
      style: { background: "custom-color" },
    },
  },
};

<ComponentPropsProvider button={buttonConfig}>
  <Button>Typed Button</Button>
</ComponentPropsProvider>
```

---

## Performance considerations

- **Provider context**: Uses React Context for efficient prop distribution
- **Selective updates**: Only components that use the affected props will re-render
- **Shallow comparison**: Props are compared shallowly to avoid unnecessary re-renders
- **Static configuration**: Best performance when configuration doesn't change frequently

<Badge color="green">Tip</Badge> Keep provider configuration stable to avoid unnecessary re-renders.

---

## Code review

- **Supported keys**: `ComponentPropsProvider` supports `button`, `menu`, `modal`, `select`, `asyncSelect`, and `pagination`.
- **No deep merge**: A nested provider replaces the entire context value. If you nest providers and only pass `button`, other keys from an outer provider (like `modal`) won’t be available in the inner tree.
- **Precedence**: Components generally treat provider values as defaults and local props win when provided.
- **Select merging**: `Select` merges complex props like `labelProps` and `icons` (provider values are merged with local values).
- **Button variants**: When the provider defines `button.variants[variant]`, those props are applied first, then local props override. Styles are merged (`variant.style` then `local style`).
- **Menu defaults**: `Menu.Menu` reads defaults from `menu.menu` and `Menu.Item` reads defaults from `menu.menuItem`.

---

## Migration guide

### From individual props

**Before:**
```tsx
<Button size="md" variant="primary" className="btn">
  Save
</Button>
<Button size="md" variant="primary" className="btn">
  Cancel
</Button>
<Button size="md" variant="primary" className="btn">
  Delete
</Button>
```

**After:**
```tsx
<ComponentPropsProvider
  button={{
    size: "md",
    variant: "primary",
    className: "btn",
  }}
>
  <Button>Save</Button>
  <Button>Cancel</Button>
  <Button>Delete</Button>
</ComponentPropsProvider>
```

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";

// Button provider types
export type ButtonPropsProvided = Pick<
  ButtonProps,
  "size" | "type" | "variant" | "style" | "loadingIndicator" | "className"
> & {
  variants?: Record<string, ComponentPropsWithoutRef<"button">>;
};

// Menu provider types
export type MenuPropsProvided = {
  menu: GetOptionalProperties<MenuProps>;
  menuItem: GetOptionalProperties<MenuItemProps>;
};

// Modal provider types
export type ModalPropsProvided = GetOptionalProperties<ModalProps>;

// Main provider type
type PropsContextType = {
  button?: ButtonPropsProvided;
  menu?: MenuPropsProvided;
  modal?: ModalPropsProvided;
  select?: SelectPropsProvided;
  asyncSelect?: AsyncSelectPropsProvided;
  pagination?: PaginationPropsProvided;
};

// Provider component
export const ComponentPropsProvider: ({
  children,
  ...value
}: PropsWithChildren<PropsContextType>) => JSX.Element;
```

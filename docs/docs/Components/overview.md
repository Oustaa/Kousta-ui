---
sidebar_position: 0
title: Overview
---

import React, { useState } from 'react';
import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import { Button, Modal, Input, Select, WindowBoundary, Menu, ComponentPropsProvider } from '@kousta-ui/components';
import { DataTable } from '@kousta-ui/table';

# Components Package

The **@kousta-ui/components** package provides a collection of reusable React components.

---

## 🚀 Features

- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Accessibility**: WCAG compliant components with proper ARIA attributes
- **Customizable**: Extensive theming system with CSS variables and ComponentPropsProvider
- **Performance Optimized**: Lightweight components with minimal bundle impact
- **Modern Design**: Clean, consistent design system out of the box
- **Flexible**: Headless-friendly architecture for custom implementations

---

## 📦 Installation

```bash
npm install @kousta-ui/components
# or
yarn add @kousta-ui/components
# or
pnpm add @kousta-ui/components
```

### Import styles

```tsx
import "@kousta-ui/styles/tokens.css";
```

---

## 🎯 Quick Start

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "App.tsx",
      code: `import { Button, Modal, Input } from "@kousta-ui/components";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Form">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button>Submit</Button>
      </Modal>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "App.jsx",
      code: `import { Button, Modal, Input } from "@kousta-ui/components";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Form">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button>Submit</Button>
      </Modal>
    </div>
  );
}`
    }
  ]}
  preview={
    (() => {
      const QuickStartPreview = () => {
        const [opened, setOpened] = useState(false);
        return (
          <div>
            <Button onClick={() => setOpened(true)}>
              Open Modal
            </Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Form">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Input label="Email" placeholder="you@example.com" />
                <Input label="Password" type="password" />
                <Button>Submit</Button>
              </div>
            </Modal>
          </div>
        );
      };
      return <QuickStartPreview />;
    })()
  }
  defaultTab="ts"
/>

---

## 🧩 Component Categories

### Form Components

Interactive form elements with validation and accessibility built-in.

- **[Input](/docs/Components/Input)** - Versatile input with labels, errors, and sections
- **[Button](/docs/Components/Button)** - Theme-aware button with variants and loading states
- **[Select](/docs/Components/Select)** - Dropdown selection
- **[AsyncSelect](/docs/Components/AsyncSelect)** - Async data loading select

### Navigation & Layout

Components for navigation, overlays, and layout management.

- **[Modal](/docs/Components/Modal)** - Flexible dialog with positioning and lifecycle callbacks
- **[Menu](/docs/Components/Menu)** - Lightweight dropdown with click/hover triggers
- **[ContextMenu](/docs/Components/ContextMenu)** - Right-click menu with nested support

### Utility Components

Helper components for performance and advanced interactions.

- **[WindowBoundary](/docs/Components/WindowBoundary)** - Viewport detection for lazy loading and animations

---

## 🎨 Customization

### ComponentPropsProvider

Set global defaults and create custom variants:

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ComponentPropsProvider.tsx",
      code: `import { ComponentPropsProvider } from "@kousta-ui/components";

<ComponentPropsProvider
  button={{
    size: "sm",
    variant: "primary",
    variants: {
      brand: {
        className: "brand-btn",
        style: { background: "#your-brand-color" },
      },
    },
  }}
>
  <YourApp />
</ComponentPropsProvider>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ComponentPropsProvider.jsx",
      code: `import { ComponentPropsProvider } from "@kousta-ui/components";

<ComponentPropsProvider
  button={{
    size: "sm",
    variant: "primary",
    variants: {
      brand: {
        className: "brand-btn",
        style: { background: "#your-brand-color" },
      },
    },
  }}
>
  <YourApp />
</ComponentPropsProvider>`
    }
  ]}
  preview={
    (() => {
      const ComponentPropsProviderPreview = () => {
        return (
          <ComponentPropsProvider
            button={{
              size: "sm",
              variant: "primary",
              variants: {
                brand: {
                  className: "brand-btn",
                  style: { background: "#your-brand-color" },
                },
              },
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Provider defaults (small, primary)</div>
                <Button>Default Button</Button>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Custom variant (brand)</div>
                <Button variant="brand">Brand Button</Button>
              </div>
            </div>
          </ComponentPropsProvider>
        );
      };
      return <ComponentPropsProviderPreview />;
    })()
  }
  defaultTab="ts"
/>

---

## Related packages

- **[Hooks](/docs/hooks/overview)**
- **[Helpers](/docs/helpers/overview)**

### CSS Variables

Customize appearance with CSS variables:

```css
:root {
  --kui-primary-500: #3b82f6;
  --kui-primary-600: #2563eb;
  --kui-rounded: 0.5;
}
```

<Badge color="blue">Learn more</Badge> See [ComponentPropsProvider documentation](/docs/Components/ComponentPropsProvider) for advanced customization.

---

## ♿ Accessibility

All components are built with accessibility as a first-class concern:

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Screen Readers**: Comprehensive ARIA attributes and semantic HTML
- **High Contrast**: Sufficient color contrast ratios for all variants
- **Touch Friendly**: Appropriate touch targets and gesture support
- **Reduced Motion**: Respects prefers-reduced-motion settings

---

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "CustomButton.tsx",
      code: `import { Button, ButtonProps } from "@kousta-ui/components";
import { FC } from "react";

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />;
};`
    },
    {
      value: "js",
      language: "jsx",
      filename: "CustomButton.jsx",
      code: `import { Button } from "@kousta-ui/components";

const CustomButton = ({ customProp, ...props }) => {
  return <Button {...props} />;
};`
    }
  ]}
  preview={null}
  defaultTab="ts"
/>

---

## 📚 Examples

### Form with Validation

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContactForm.tsx",
      code: `import { Input, Button } from "@kousta-ui/components";
import { useState } from "react";

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div>
      <Input
        label="Name"
        required
        errors={errors.name ? [errors.name] : []}
        onChange={(e) => {
          if (!e.target.value) {
            setErrors(prev => ({ ...prev, name: "Name is required" }));
          } else {
            setErrors(prev => ({ ...prev, name: "" }));
          }
        }}
      />

      <Input
        label="Email"
        type="email"
        required
        errors={errors.email ? [errors.email] : []}
      />

      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContactForm.jsx",
      code: `import { Input, Button } from "@kousta-ui/components";
import { useState } from "react";

function ContactForm() {
  const [errors, setErrors] = useState({});

  return (
    <div>
      <Input
        label="Name"
        required
        errors={errors.name ? [errors.name] : []}
        onChange={(e) => {
          if (!e.target.value) {
            setErrors(prev => ({ ...prev, name: "Name is required" }));
          } else {
            setErrors(prev => ({ ...prev, name: "" }));
          }
        }}
      />

      <Input
        label="Email"
        type="email"
        required
        errors={errors.email ? [errors.email] : []}
      />

      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </div>
  );
}`
    }
  ]}
  preview={
    (() => {
      const FormValidationPreview = () => {
        const [errors, setErrors] = useState({});
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
            <Input
              label="Name"
              required
              errors={errors.name ? [errors.name] : []}
              onChange={(e) => {
                if (!e.target.value) {
                  setErrors(prev => ({ ...prev, name: "Name is required" }));
                } else {
                  setErrors(prev => ({ ...prev, name: "" }));
                }
              }}
            />
            <Input
              label="Email"
              type="email"
              required
              errors={errors.email ? [errors.email] : []}
            />
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </div>
        );
      };
      return <FormValidationPreview />;
    })()
  }
  defaultTab="ts"
/>

### Lazy Loading Content

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "LazyImage.tsx",
      code: `import { WindowBoundary } from "@kousta-ui/components";
import { useState } from "react";

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <WindowBoundary
      onceItemEnter={() => setIsLoaded(true)}
      threshold={0.1}
    >
      <div style={{ minHeight: "200px" }}>
        {isLoaded ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            background: "#f5f5f5"
          }}>
            Loading...
          </div>
        )}
      </div>
    </WindowBoundary>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "LazyImage.jsx",
      code: `import { WindowBoundary } from "@kousta-ui/components";
import { useState } from "react";

function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <WindowBoundary
      onceItemEnter={() => setIsLoaded(true)}
      threshold={0.1}
    >
      <div style={{ minHeight: "200px" }}>
        {isLoaded ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            background: "#f5f5f5"
          }}>
            Loading...
          </div>
        )}
      </div>
    </WindowBoundary>
  );
}`
    }
  ]}
  preview={
    (() => {
      const LazyImagePreview = () => {
        const [isLoaded, setIsLoaded] = useState(false);
        return (
          <WindowBoundary
            onceItemEnter={() => setIsLoaded(true)}
            threshold={0.1}
          >
            <div style={{ minHeight: "200px" }}>
              {isLoaded ? (
                <img
                  src="https://via.placeholder.com/400x200"
                  alt="Lazy loaded"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  background: "#f5f5f5"
                }}>
                  Loading...
                </div>
              )}
            </div>
          </WindowBoundary>
        );
      };
      return <LazyImagePreview />;
    })()
  }
  defaultTab="ts"
/>

---

## 🔄 Migration from Other Libraries

### From Material-UI

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MigrationMaterialUI.tsx",
      code: `// Material-UI
<Button variant="contained" color="primary">
  Click me
</Button>

// Kousta UI
<Button variant="primary">
  Click me
</Button>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MigrationMaterialUI.jsx",
      code: `// Material-UI
<Button variant="contained" color="primary">
  Click me
</Button>

// Kousta UI
<Button variant="primary">
  Click me
</Button>`
    }
  ]}
  preview={
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Material-UI</div>
        <Button variant="primary">Click me</Button>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Kousta UI</div>
        <Button variant="primary">Click me</Button>
      </div>
    </div>
  }
  defaultTab="ts"
/>

### From Ant Design

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MigrationAntDesign.tsx",
      code: `// Ant Design
<Input placeholder="Enter text" />
<Select>
  <Option value="1">Option 1</Option>
</Select>

// Kousta UI
<Input placeholder="Enter text" />
<Select data={[{ value: "1", label: "Option 1" }]} />`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MigrationAntDesign.jsx",
      code: `// Ant Design
<Input placeholder="Enter text" />
<Select>
  <Option value="1">Option 1</Option>
</Select>

// Kousta UI
<Input placeholder="Enter text" />
<Select data={[{ value: "1", label: "Option 1" }]} />`
    }
  ]}
  preview={
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Ant Design</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input placeholder="Enter text" />
          <Select data={[{ value: "1", label: "Option 1" }]} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Kousta UI</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input placeholder="Enter text" />
          <Select data={[{ value: "1", label: "Option 1" }]} />
        </div>
      </div>
    </div>
  }
  defaultTab="ts"
/>

---

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/Oustaa/kousta-ui/blob/main/CONTRIBUTING.md) for details.

---

## 📄 License

MIT © [Oustaa](https://github.com/Oustaa)

---

## 🔗 Related Packages

- **[@kousta-ui/table](/docs/category/table)** - Advanced data table components
- **[@kousta-ui/hooks](/docs/hooks/overview)** - Essential React hooks
- **[@kousta-ui/helpers](/docs/helpers/overview)** - Utility functions and helpers

---

## 📖 Next Steps

- Explore individual [component documentation](/docs/category/components)
- Learn about [customization](/docs/Components/ComponentPropsProvider)
- Check out [Table components](/docs/category/table)
- Discover [Hooks](/docs/hooks/overview) for common patterns
- Browse [Helpers](/docs/helpers/overview) utilities

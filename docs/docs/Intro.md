---
sidebar_position: 1
title: Introduction
---

# Kousta UI

**Kousta UI** is a modern React UI library built with performance and convenience in mind.

## Features

- **Performance Focused**: Built with lightweight components and optimized rendering
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Modular Architecture**: Use only what you need with our package-based structure
- **Modern Design**: Clean, customizable components that work out of the box
- **Easy Customization**: Flexible theming system with CSS variables and providers

## Packages

Kousta UI is organized into focused packages to help you use only what you need:

### [@kousta-ui/components](/docs/category/components)
A comprehensive collection of reusable React components including:
- **Modal**: Flexible modal dialogs with positioning and size options
- **Button**: Versatile button components with multiple variants
- **Input**: Form inputs with validation and styling
- **Select**: Dropdown selection components
- **AsyncSelect**: Async data loading select components
- **Menu**: Navigation and context menus
- **ContextMenu**: Right-click context menus
- **WindowBoundary**: Boundary-aware components

### [@kousta-ui/table](/docs/category/table)
Powerful data table solutions featuring:
- **DataTable**: Advanced data table with sorting, filtering, and custom rendering
- **Responsive Design**: Mobile-friendly table layouts
- **Custom Headers**: Flexible header configuration with nested data support
- **Performance Optimized**: Efficient rendering for large datasets

### [@kousta-ui/hooks](/docs/hooks/overview)
Essential React hooks for common UI patterns:
- **useDisclosure**: Manage open/close states for modals, dropdowns, etc.
- **useScrollLock**: Prevent body scroll when overlays are active
- **usePagination**: Pagination state helpers
- **useDebounceCallback**: Debounce a callback with cleanup on unmount

### [@kousta-ui/helpers](/docs/helpers/overview)
Utility functions and helpers to streamline your development:
- **getNestedProperty**: Safely read nested values
- **updateNestedProperties**: Update nested properties immutably

## Quick Start

### Installation

Choose the packages you need:

```bash
# Components package
npm install @kousta-ui/components

# Table package
npm install @kousta-ui/table

# Hooks package
npm install @kousta-ui/hooks

# Helpers package
npm install @kousta-ui/helpers

# Or install everything
npm install @kousta-ui/components @kousta-ui/table @kousta-ui/hooks @kousta-ui/helpers
```

### Basic Usage

```tsx
import { Modal, Button } from "@kousta-ui/components";
import { useDisclosure } from "@kousta-ui/hooks";

import "@kousta-ui/components/esm/index.css";

function App() {
  const { opened, close, open } = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal opened={opened} onClose={close} title="Hello World">
        <p>This is a modal from Kousta UI!</p>
      </Modal>
    </>
  );
}
```

### DataTable Example

```tsx
import { DataTable } from "@kousta-ui/table";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserTable() {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const headers = {
    name: { value: "name" },
    email: { value: "email" },
  };

  return (
    <DataTable
      title="Users"
      data={users}
      headers={headers}
      keyExtractor={(row) => row.id}
    />
  );
}
```

## Customization

### Using Providers

Kousta UI components can be customized using the `ComponentPropsProvider`:

```tsx
import { ComponentPropsProvider } from "@kousta-ui/components";

function App() {
  return (
    <ComponentPropsProvider
      button={{ variant: "primary", size: "md" }}
      modal={{ position: "center", size: "md" }}
    >
      <YourApp />
    </ComponentPropsProvider>
  );
}
```

### CSS Variables

Customize the appearance using CSS variables:

```css
:root {
  --kui-primary-500: #2563eb;
  --kui-primary-600: #1d4ed8;
  --kui-spacing-base: 1.125rem;

  /* Border radius multiplier used by multiple components */
  --kui-rounded: 0.5;
}
```

## Next Steps

- Explore [Components](/docs/category/components) documentation
- Learn about [Table](/docs/category/table) features
- Discover [Hooks](/docs/hooks/overview) for common patterns
- Check out [Helpers](/docs/helpers/overview) utilities

## 🔗 Links

- [GitHub Repository](https://github.com/Oustaa/kousta-ui)
- [Report Issues](https://github.com/Oustaa/kousta-ui/issues)

---

Built with ❤️ for the React community


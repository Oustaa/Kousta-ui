---
sidebar_position: 1
title: Introduction
---

# Ousta UI

**Ousta UI** is a modern React UI library built with performance and convenience in mind. After 3 years of experimentation with various UI libraries and creating custom components, Ousta UI delivers a comprehensive set of tools designed for ease of use and optimal performance.

## 🚀 Features

- **Performance Focused**: Built with lightweight components and optimized rendering
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Modular Architecture**: Use only what you need with our package-based structure
- **Modern Design**: Clean, customizable components that work out of the box
- **Easy Customization**: Flexible theming system with CSS variables and providers

## 📦 Packages

Ousta UI is organized into focused packages to help you use only what you need:

### [@ousta-ui/components](/docs/category/components)
A comprehensive collection of reusable React components including:
- **Modal**: Flexible modal dialogs with positioning and size options
- **Button**: Versatile button components with multiple variants
- **Input**: Form inputs with validation and styling
- **Select**: Dropdown selection components
- **AsyncSelect**: Async data loading select components
- **Menu**: Navigation and context menus
- **ContextMenu**: Right-click context menus
- **WindowBoundary**: Boundary-aware components

### [@ousta-ui/table](/docs/category/table)
Powerful data table solutions featuring:
- **DataTable**: Advanced data table with sorting, filtering, and custom rendering
- **Responsive Design**: Mobile-friendly table layouts
- **Custom Headers**: Flexible header configuration with nested data support
- **Performance Optimized**: Efficient rendering for large datasets

### [@ousta-ui/hooks](/docs/category/hooks)
Essential React hooks for common UI patterns:
- **useDisclosure**: Manage open/close states for modals, dropdowns, etc.
- **useScrollLock**: Prevent body scroll when overlays are active
- **useLocalStorage**: Persistent state management
- **useMediaQuery**: Responsive design utilities

### [@ousta-ui/helpers](/docs/category/helpers)
Utility functions and helpers to streamline your development:
- **Type guards**: Runtime type checking utilities
- **Formatting helpers**: Date, number, and string formatting functions
- **DOM utilities**: Common DOM manipulation helpers
- **Validation utilities**: Form validation helpers

## 🏁 Quick Start

### Installation

Choose the packages you need:

```bash
# Components package
npm install @ousta-ui/components

# Table package
npm install @ousta-ui/table

# Hooks package
npm install @ousta-ui/hooks

# Helpers package
npm install @ousta-ui/helpers

# Or install everything
npm install @ousta-ui/components @ousta-ui/table @ousta-ui/hooks @ousta-ui/helpers
```

### Basic Usage

```tsx
import { Modal, Button } from "@ousta-ui/components";
import { useDisclosure } from "@ousta-ui/hooks";

// Import the CSS
import "@ousta-ui/components/esm/index.css";

function App() {
  const { opened, close, open } = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal opened={opened} onClose={close} title="Hello World">
        <p>This is a modal from Ousta UI!</p>
      </Modal>
    </>
  );
}
```

### DataTable Example

```tsx
import { DataTable } from "@ousta-ui/table";
import "@ousta-ui/table/esm/index.css";

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

## 🎨 Customization

### Using Providers

Ousta UI components can be customized using the `ComponentPropsProvider`:

```tsx
import { ComponentPropsProvider } from "@ousta-ui/components";

function App() {
  const defaultProps = {
    Button: {
      variant: "primary",
      size: "md",
    },
    Modal: {
      position: "center",
      size: "md",
    },
  };

  return (
    <ComponentPropsProvider defaultProps={defaultProps}>
      <YourApp />
    </ComponentPropsProvider>
  );
}
```

### CSS Variables

Customize the appearance using CSS variables:

```css
:root {
  /* Colors */
  --ousta-primary: #3b82f6;
  --ousta-primary-hover: #2563eb;
  --ousta-secondary: #6b7280;
  --ousta-success: #10b981;
  --ousta-warning: #f59e0b;
  --ousta-error: #ef4444;

  /* Spacing */
  --ousta-spacing-xs: 0.25rem;
  --ousta-spacing-sm: 0.5rem;
  --ousta-spacing-md: 1rem;
  --ousta-spacing-lg: 1.5rem;
  --ousta-spacing-xl: 2rem;

  /* Border radius */
  --ousta-radius-sm: 0.25rem;
  --ousta-radius-md: 0.375rem;
  --ousta-radius-lg: 0.5rem;
}
```

## 📚 Next Steps

- Explore [Components](/docs/category/components) documentation
- Learn about [Table](/docs/category/table) features
- Discover [Hooks](/docs/category/hooks) for common patterns
- Check out [Helpers](/docs/category/helpers) utilities

## 🔗 Links

- [GitHub Repository](https://github.com/Oustaa/ousta-ui)
- [Report Issues](https://github.com/Oustaa/ousta-ui/issues)
- [Examples and Demos](https://ui.ousta.dev)

---

Built with ❤️ for the React community


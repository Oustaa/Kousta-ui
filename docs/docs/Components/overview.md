---
sidebar_position: 0
title: Overview
---

import Badge from '@site/src/components/Badge';

# Components Package

The **@ousta-ui/components** package provides a comprehensive collection of reusable, accessible, and customizable React components built with performance and developer experience in mind.

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
npm install @ousta-ui/components
# or
yarn add @ousta-ui/components
# or
pnpm add @ousta-ui/components
```

### Import styles

```tsx
// Import the component styles
import "@ousta-ui/components/esm/index.css";
```

---

## 🎯 Quick Start

```tsx
import { Button, Modal, Input } from "@ousta-ui/components";

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
}
```

---

## 🧩 Component Categories

### Form Components

Interactive form elements with validation and accessibility built-in.

- **[Input](/docs/Components/Input)** - Versatile input with labels, errors, and sections
- **[Button](/docs/Components/Button)** - Theme-aware button with variants and loading states
- **[Select](/docs/Components/Select)** - Searchable dropdown with local filtering
- **[AsyncSelect](/docs/Components/AsyncSelect)** - Server-side search and infinite scrolling

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

```tsx
import { ComponentPropsProvider } from "@ousta-ui/components";

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
</ComponentPropsProvider>
```

### CSS Variables

Customize appearance with CSS variables:

```css
:root {
  --ousta-primary: #3b82f6;
  --ousta-primary-hover: #2563eb;
  --ousta-success: #10b981;
  --ousta-warning: #f59e0b;
  --ousta-error: #ef4444;
  --ousta-neutral: #6b7280;
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

```tsx
import { Button, ButtonProps } from "@ousta-ui/components";

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />;
};
```

---

## 📚 Examples

### Form with Validation

```tsx
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
}
```

### Data Table with Actions

```tsx
function UserTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div>
      <DataTable
        data={users}
        headers={{
          name: { value: "name" },
          email: { value: "email" },
          actions: {
            exec: (user) => (
              <Menu.Menu>
                <Menu.Target>Actions</Menu.Target>
                <Menu.DropDown>
                  <Menu.Item onClick={() => setSelectedUser(user)}>
                    Edit
                  </Menu.Item>
                  <Menu.Item onClick={() => deleteUser(user.id)}>
                    Delete
                  </Menu.Item>
                </Menu.DropDown>
              </Menu.Menu>
            ),
          },
        }}
      />

      <Modal opened={!!selectedUser} onClose={() => setSelectedUser(null)}>
        Edit user: {selectedUser?.name}
      </Modal>
    </div>
  );
}
```

### Lazy Loading Content

```tsx
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
}
```

---

## 🔄 Migration from Other Libraries

### From Material-UI

```tsx
// Material-UI
<Button variant="contained" color="primary">
  Click me
</Button>

// Ousta UI
<Button variant="primary">
  Click me
</Button>
```

### From Ant Design

```tsx
// Ant Design
<Input placeholder="Enter text" />
<Select>
  <Option value="1">Option 1</Option>
</Select>

// Ousta UI
<Input placeholder="Enter text" />
<Select data={[{ value: "1", label: "Option 1" }]} />
```

---

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/Oustaa/ousta-ui/blob/main/CONTRIBUTING.md) for details.

---

## 📄 License

MIT © [Ousta](https://github.com/Oustaa)

---

## 🔗 Related Packages

- **[@ousta-ui/table](/docs/category/table)** - Advanced data table components
- **[@ousta-ui/hooks](/docs/category/hooks)** - Essential React hooks
- **[@ousta-ui/helpers](/docs/category/helpers)** - Utility functions and helpers

---

## 📖 Next Steps

- Explore individual [component documentation](/docs/category/components)
- Learn about [customization](/docs/Components/ComponentPropsProvider)
- Check out [Table components](/docs/category/table)
- Discover [Hooks](/docs/category/hooks) for common patterns
- Browse [Helpers](/docs/category/helpers) utilities

---
sidebar_position: 0
title: Overview
---

import Badge from '@site/src/components/Badge';

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

```tsx
import { Button, Modal, Input } from "@kousta-ui/components";

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

```tsx
import { ComponentPropsProvider } from "@kousta-ui/components";

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

```tsx
import { Button, ButtonProps } from "@kousta-ui/components";

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

// Kousta UI
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

// Kousta UI
<Input placeholder="Enter text" />
<Select data={[{ value: "1", label: "Option 1" }]} />
```

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

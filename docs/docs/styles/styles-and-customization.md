---
sidebar_position: 0
title: Styles & Customization
---

import Badge from '@site/src/components/Badge';

# Styles & Customization

Kousta UI provides a theming system built on CSS custom properties (CSS variables). This allows for deep customization of component appearance while maintaining consistency across your application.

---

## 🎨 CSS Custom Properties

All styling in Kousta UI is controlled through CSS custom properties that can be overridden at any level. This makes it easy to create custom themes, adapt to brand guidelines, or implement dark/light modes.

### Importing Styles

```css
/* Import the complete token system */
@import "@kousta-ui/styles/tokens.css";
```

---

## 🔄 Global Border Radius (`--kui-rounded`)

The `--kui-rounded` variable is a **border-radius multiplier** that applies globally to components that use it (buttons, inputs, selects, menus, modals, etc.).

### How It Works

- **Multiplier Value**: A number that gets multiplied by `1rem` to calculate border radius
- **Global Application**: Affects all components (buttons, inputs, modals, etc.)
- **Definition**: You define this variable in your global styles (it is used by components, but not defined in `@kousta-ui/styles/tokens.css`)
- **Calculation**: `border-radius: calc(var(--kui-rounded) * 1rem)`

### Visual Examples

#### `--kui-rounded: 0` (Sharp Edges)

```css
:root {
  --kui-rounded: 0;
}
```

<div style={{
  display: "flex",
  gap: "12px",
  alignItems: "center",
  padding: "20px",
  background: "#f8fafc",
  borderRadius: "8px",
  marginBottom: "16px"
}}>
  <button style={{
    padding: "8px 16px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "0",
    fontSize: "14px"
  }}>
    Sharp Button
  </button>
  <input
    type="text"
    placeholder="Sharp Input"
    style={{
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "0",
      fontSize: "14px"
    }}
  />
  <div style={{
    padding: "12px 16px",
    background: "#e5e7eb",
    borderRadius: "0",
    fontSize: "14px"
  }}>
    Sharp Card
  </div>
</div>

**Use Case**: Modern, minimalist interfaces; data-heavy applications; professional tools.

#### `--kui-rounded: 0.5` (Moderately Rounded)

```css
:root {
  --kui-rounded: 0.5;
}
```

<div style={{
  display: "flex",
  gap: "12px",
  alignItems: "center",
  padding: "20px",
  background: "#f8fafc",
  borderRadius: "8px",
  marginBottom: "16px"
}}>
  <button style={{
    padding: "8px 16px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px"
  }}>
    Default Button
  </button>
  <input
    type="text"
    placeholder="Default Input"
    style={{
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "14px"
    }}
  />
  <div style={{
    padding: "12px 16px",
    background: "#e5e7eb",
    borderRadius: "8px",
    fontSize: "14px"
  }}>
    Default Card
  </div>
</div>

**Use Case**: General-purpose applications; balanced design; most common use cases.

#### `--kui-rounded: 1` (Fully Rounded)

```css
:root {
  --kui-rounded: 1;
}
```

<div style={{
  display: "flex",
  gap: "12px",
  alignItems: "center",
  padding: "20px",
  background: "#f8fafc",
  borderRadius: "8px",
  marginBottom: "16px"
}}>
  <button style={{
    padding: "8px 16px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "14px"
  }}>
    Rounded Button
  </button>
  <input
    type="text"
    placeholder="Rounded Input"
    style={{
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "16px",
      fontSize: "14px"
    }}
  />
  <div style={{
    padding: "12px 16px",
    background: "#e5e7eb",
    borderRadius: "16px",
    fontSize: "14px"
  }}>
    Rounded Card
  </div>
</div>

**Use Case**: Friendly, approachable interfaces; consumer applications; modern web apps.

---

## 🎯 Component Effects

Different `--kui-rounded` values dramatically affect the visual appearance of components:

### Buttons

| Value | Appearance | Best For |
|-------|------------|-----------|
| `0` | Sharp, professional | Data dashboards, enterprise tools |
| `0.5` | Balanced, versatile | Most applications |
| `1` | Soft, friendly | Consumer apps, modern interfaces |

### Modals & Cards

Higher rounded values create softer, more approachable interfaces:

```css
:root {
  --kui-rounded: 0.75; /* Softer than default */
}

.modal {
  border-radius: calc(var(--kui-rounded) * 1rem); /* 12px */
}

.card {
  border-radius: calc(var(--kui-rounded) * 1rem); /* 12px */
}
```

### Forms & Inputs

Form elements benefit from consistent rounding:

```css
:root {
  --kui-rounded: 0.25; /* Subtle rounding */
}

.input {
  border-radius: calc(var(--kui-rounded) * 1rem); /* 4px */
}

.button {
  border-radius: calc(var(--kui-rounded) * 1rem); /* 4px */
}
```

---

## 🎨 Complete CSS Variables Reference

### Colors

<Badge color="blue">Primary Colors</Badge>

```css
:root {
  --kui-primary-50: #fbf6fd;
  --kui-primary-100: #f6ecfb;
  --kui-primary-200: #ecd8f6;
  --kui-primary-300: #deb9ee;
  --kui-primary-400: #cc8fe3;
  --kui-primary-500: #b364d1;
  --kui-primary-600: #9141ac;
  --kui-primary-700: #7f3695;
  --kui-primary-800: #692e7a;
  --kui-primary-900: #5a2a65;
}
```

<Badge color="green">Success Colors</Badge>

```css
:root {
  --kui-success-50: #eafee7;
  --kui-success-100: #d1fbcc;
  --kui-success-200: #a6f89e;
  --kui-success-300: #6ff066;
  --kui-success-400: #2ae120;
  --kui-success-500: #1fca18;
  --kui-success-600: #12a10f;
  --kui-success-700: #107b10;
  --kui-success-800: #136113;
  --kui-success-900: #155217;
}
```

<Badge color="red">Danger Colors</Badge>

```css
:root {
  --kui-danger-50: #fff0f0;
  --kui-danger-100: #ffdddd;
  --kui-danger-200: #ffc0c0;
  --kui-danger-300: #ff9494;
  --kui-danger-400: #ff5757;
  --kui-danger-500: #ff2323;
  --kui-danger-600: #ff0000;
  --kui-danger-700: #d70000;
  --kui-danger-800: #b10303;
  --kui-danger-900: #920a0a;
}
```

<Badge color="yellow">Warning Colors</Badge>

```css
:root {
  --kui-warning-50: #fff9ec;
  --kui-warning-100: #fff0d3;
  --kui-warning-200: #ffdea5;
  --kui-warning-300: #ffc66d;
  --kui-warning-400: #ffa132;
  --kui-warning-500: #ff840a;
  --kui-warning-600: #e66100;
  --kui-warning-700: #cc4d02;
  --kui-warning-800: #a13c0b;
  --kui-warning-900: #82330c;
}
```

<Badge color="gray">Neutral Colors</Badge>

```css
:root {
  --kui-neutral-50: #ffffff;
  --kui-neutral-100: #efefef;
  --kui-neutral-200: #dcdcdc;
  --kui-neutral-300: #bdbdbd;
  --kui-neutral-400: #989898;
  --kui-neutral-500: #7c7c7c;
  --kui-neutral-600: #656565;
  --kui-neutral-700: #525252;
  --kui-neutral-800: #464646;
  --kui-neutral-900: #3d3d3d;
  --kui-neutral-950: #000000;
}
```

### Spacing

```css
:root {
  --kui-spacing-2xs: 0.25rem;
  --kui-spacing-xs: 0.5rem;
  --kui-spacing-sm: 0.75rem;
  --kui-spacing-base: 1rem;
  --kui-spacing-md: 1.25rem;
  --kui-spacing-lg: 1.5rem;
  --kui-spacing-xl: 1.75rem;
  --kui-spacing-2xl: 2rem;
  --kui-spacing-3xl: 3rem;
}
```

### Typography

```css
:root {
  --kui-text-xs: 0.5rem;
  --kui-text-sm: 0.75rem;
  --kui-text-base: 1rem;
  --kui-text-medium: 1.125rem;
  --kui-text-lg: 1.5rem;
  --kui-text-xl: 2.75rem;
  --kui-text-2xl: 4rem;
}
```

### Border Radius

```css
:root {
  --kui-rounded: 0.5;
}
```

---

## 🔧 Customization Examples

### Brand Theme

```css
:root {
  /* Brand colors */
  --kui-primary-500: #2563eb;
  --kui-primary-600: #1d4ed8;
  --kui-primary-700: #1e40af;

  /* Custom spacing */
  --kui-spacing-base: 1.25rem; /* Larger base spacing */

  /* Custom typography */
  --kui-text-base: 1.125rem; /* Larger base font size */

  /* Rounded corners */
  --kui-rounded: 0.375; /* Subtle rounding */
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --kui-neutral-50: #1a1a1a;
    --kui-neutral-100: #2d2d2d;
    --kui-neutral-200: #404040;
    --kui-neutral-900: #f5f5f5;
    --kui-neutral-950: #ffffff;
  }
}
```

### Minimal Theme

```css
:root {
  /* Sharp, minimal design */
  --kui-rounded: 0;

  /* Monochrome palette */
  --kui-primary-500: #374151;
  --kui-primary-600: #1f2937;
  --kui-success-500: #6b7280;
  --kui-danger-500: #374151;
  --kui-warning-500: #6b7280;

  /* Minimal spacing */
  --kui-spacing-sm: 0.5rem;
  --kui-spacing-base: 0.75rem;
  --kui-spacing-md: 1rem;
}
```

### Playful Theme

```css
:root {
  /* Very rounded, playful design */
  --kui-rounded: 1.25;

  /* Vibrant colors */
  --kui-primary-500: #ec4899;
  --kui-success-500: #10b981;
  --kui-danger-500: #f43f5e;
  --kui-warning-500: #f59e0b;

  /* Generous spacing */
  --kui-spacing-base: 1.25rem;
  --kui-spacing-md: 1.5rem;
  --kui-spacing-lg: 2rem;
}
```

---

## 🎯 Implementation Examples

### Component-Level Override

```css
/* Override for specific component */
.custom-card {
  --kui-rounded: 0.25; /* Sharper corners for cards */
}

.custom-button {
  --kui-rounded: 2; /* Very rounded buttons */
}
```

### Responsive Design

```css
/* Different rounding for different screen sizes */
@media (max-width: 768px) {
  :root {
    --kui-rounded: 0.25; /* Sharper on mobile */
  }
}

@media (min-width: 1200px) {
  :root {
    --kui-rounded: 0.75; /* Softer on large screens */
  }
}
```

### Animation Support

```css
/* Smooth transitions for theme changes */
:root {
  transition:
    --kui-rounded 0.3s ease,
    --kui-primary-500 0.3s ease,
    --kui-neutral-100 0.3s ease;
}
```

---

## 🚀 Best Practices

### Do's

- ✅ Use `--kui-rounded` for consistent border radius across components
- ✅ Choose values based on your brand personality (0=professional, 1=friendly)
- ✅ Test with real components to see the full effect
- ✅ Consider responsive design when choosing values
- ✅ Use semantic color tokens instead of hardcoded values

### Don'ts

- ❌ Don't mix different rounded values in the same interface
- ❌ Don't use extremely high values (>2) as they can look unnatural
- ❌ Don't forget to test with all component types
- ❌ Don't override individual component border-radius manually

---

## 🎨 Theme Switching Example

```jsx
import React, { useState } from 'react';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('default');

  const themes = {
    sharp: { '--kui-rounded': 0 },
    default: { '--kui-rounded': 0.5 },
    rounded: { '--kui-rounded': 1 },
    playful: { '--kui-rounded': 1.5 }
  };

  const applyTheme = (themeName) => {
    const root = document.documentElement;
    const themeValues = themes[themeName];

    Object.entries(themeValues).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    setTheme(themeName);
  };

  return (
    <div>
      <button onClick={() => applyTheme('sharp')}>Sharp</button>
      <button onClick={() => applyTheme('default')}>Default</button>
      <button onClick={() => applyTheme('rounded')}>Rounded</button>
      <button onClick={() => applyTheme('playful')}>Playful</button>
    </div>
  );
}
```

---

## 📊 Browser Support

CSS custom properties are supported in all modern browsers:

- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 16+

<Badge color="green">Note</Badge> For older browsers, consider using a CSS variables polyfill or fallback styles.

---

## 🎯 Performance Considerations

- **CSS Variables**: Efficiently handled by browsers
- **Dynamic Updates**: Changing variables triggers re-render of affected elements
- **Inheritance**: Variables inherit naturally through the DOM
- **Memory Usage**: Minimal overhead compared to inline styles

<Badge color="blue">Performance Tip</Badge> Avoid frequent rapid changes to CSS variables (like on scroll) as it can cause layout thrashing.

---

## 📖 Next Steps

- Explore [Components](/docs/category/components) to see variables in action
- Learn about [Table](/docs/category/table)
- Check out [Hooks](/docs/hooks/overview) for state management
- Browse [Helpers](/docs/helpers/overview) for utility functions

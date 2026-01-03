---
sidebar_position: 0
title: Styles & Customization
---

import Badge from '@site/src/components/Badge';

# Styles & Customization

Ousta UI provides a comprehensive theming system built on CSS custom properties (CSS variables). This allows for deep customization of component appearance while maintaining consistency across your application.

---

## 🎨 CSS Custom Properties

All styling in Ousta UI is controlled through CSS custom properties that can be overridden at any level. This makes it easy to create custom themes, adapt to brand guidelines, or implement dark/light modes.

### Importing Styles

```css
/* Import the complete token system */
@import "@ousta-ui/styles/dist/tokens.css";

/* Or import individual variable files */
@import "@ousta-ui/styles/variables/colors.css";
@import "@ousta-ui/styles/variables/spacing.css";
@import "@ousta-ui/styles/variables/typography.css";
@import "@ousta-ui/styles/variables/radius.css";
```

---

## 🔄 Global Border Radius (`--Oui-rounded`)

The `--Oui-rounded` variable is a **border-radius multiplier** that applies globally to all components. It's the most powerful way to control the visual style of your entire application.

### How It Works

- **Multiplier Value**: A number that gets multiplied by `1rem` to calculate border radius
- **Global Application**: Affects all components (buttons, inputs, modals, etc.)
- **Default Value**: `0.5` (moderately rounded corners)
- **Calculation**: `border-radius: calc(var(--Oui-rounded) * 1rem)`

### Visual Examples

#### `--Oui-rounded: 0` (Sharp Edges)

```css
:root {
  --Oui-rounded: 0;
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

#### `--Oui-rounded: 0.5` (Default)

```css
:root {
  --Oui-rounded: 0.5;
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

#### `--Oui-rounded: 1` (Fully Rounded)

```css
:root {
  --Oui-rounded: 1;
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

Different `--Oui-rounded` values dramatically affect the visual appearance of components:

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
  --Oui-rounded: 0.75; /* Softer than default */
}

.modal {
  border-radius: calc(var(--Oui-rounded) * 1rem); /* 12px */
}

.card {
  border-radius: calc(var(--Oui-rounded) * 1rem); /* 12px */
}
```

### Forms & Inputs

Form elements benefit from consistent rounding:

```css
:root {
  --Oui-rounded: 0.25; /* Subtle rounding */
}

.input {
  border-radius: calc(var(--Oui-rounded) * 1rem); /* 4px */
}

.button {
  border-radius: calc(var(--Oui-rounded) * 1rem); /* 4px */
}
```

---

## 🎨 Complete CSS Variables Reference

### Colors

<Badge color="blue">Primary Colors</Badge>

```css
:root {
  --Oui-primary-50: #fbf6fd;
  --Oui-primary-100: #f6ecfb;
  --Oui-primary-200: #ecd8f6;
  --Oui-primary-300: #deb9ee;
  --Oui-primary-400: #cc8fe3;
  --Oui-primary-500: #b364d1;  /* Main primary */
  --Oui-primary-600: #9141ac;
  --Oui-primary-700: #7f3695;
  --Oui-primary-800: #692e7a;
  --Oui-primary-900: #5a2a65;
}
```

<Badge color="green">Success Colors</Badge>

```css
:root {
  --Oui-success-50: #eafee7;
  --Oui-success-100: #d1fbcc;
  --Oui-success-200: #a6f89e;
  --Oui-success-300: #6ff066;
  --Oui-success-400: #2ae120;
  --Oui-success-500: #1fca18;  /* Main success */
  --Oui-success-600: #12a10f;
  --Oui-success-700: #107b10;
  --Oui-success-800: #136113;
  --Oui-success-900: #155217;
}
```

<Badge color="red">Danger Colors</Badge>

```css
:root {
  --Oui-danger-50: #fff0f0;
  --Oui-danger-100: #ffdddd;
  --Oui-danger-200: #ffc0c0;
  --Oui-danger-300: #ff9494;
  --Oui-danger-400: #ff5757;
  --Oui-danger-500: #ff2323;  /* Main danger */
  --Oui-danger-600: #ff0000;
  --Oui-danger-700: #d70000;
  --Oui-danger-800: #b10303;
  --Oui-danger-900: #920a0a;
}
```

<Badge color="yellow">Warning Colors</Badge>

```css
:root {
  --Oui-warning-50: #fff9ec;
  --Oui-warning-100: #fff0d3;
  --Oui-warning-200: #ffdea5;
  --Oui-warning-300: #ffc66d;
  --Oui-warning-400: #ffa132;
  --Oui-warning-500: #ff840a;  /* Main warning */
  --Oui-warning-600: #e66100;
  --Oui-warning-700: #cc4d02;
  --Oui-warning-800: #a13c0b;
  --Oui-warning-900: #82330c;
}
```

<Badge color="gray">Neutral Colors</Badge>

```css
:root {
  --Oui-neutral-50: #ffffff;
  --Oui-neutral-100: #efefef;
  --Oui-neutral-200: #dcdcdc;
  --Oui-neutral-300: #bdbdbd;
  --Oui-neutral-400: #989898;
  --Oui-neutral-500: #7c7c7c;
  --Oui-neutral-600: #656565;
  --Oui-neutral-700: #525252;
  --Oui-neutral-800: #464646;
  --Oui-neutral-900: #3d3d3d;
  --Oui-neutral-950: #000000;
}
```

### Spacing

```css
:root {
  --Oui-spacing-2xs: 0.25rem;  /* 4px */
  --Oui-spacing-xs: 0.5rem;    /* 8px */
  --Oui-spacing-sm: 0.75rem;   /* 12px */
  --Oui-spacing-base: 1rem;    /* 16px */
  --Oui-spacing-md: 1.25rem;   /* 20px */
  --Oui-spacing-lg: 1.5rem;    /* 24px */
  --Oui-spacing-xl: 1.75rem;   /* 28px */
  --Oui-spacing-2xl: 2rem;     /* 32px */
  --Oui-spacing-3xl: 3rem;     /* 48px */
}
```

### Typography

```css
:root {
  --Oui-text-xs: 0.5rem;      /* 8px */
  --Oui-text-sm: 0.75rem;     /* 12px */
  --Oui-text-base: 1rem;      /* 16px */
  --Oui-text-medium: 1.125rem; /* 18px */
  --Oui-text-lg: 1.5rem;      /* 24px */
  --Oui-text-xl: 2.75rem;     /* 44px */
  --Oui-text-2xl: 4rem;       /* 64px */
}
```

### Border Radius

```css
:root {
  --Oui-rounded: 0.5;  /* Default multiplier */
}
```

---

## 🔧 Customization Examples

### Brand Theme

```css
:root {
  /* Brand colors */
  --Oui-primary-500: #2563eb;
  --Oui-primary-600: #1d4ed8;
  --Oui-primary-700: #1e40af;

  /* Custom spacing */
  --Oui-spacing-base: 1.25rem; /* Larger base spacing */

  /* Custom typography */
  --Oui-text-base: 1.125rem; /* Larger base font size */

  /* Rounded corners */
  --Oui-rounded: 0.375; /* Subtle rounding */
}
```

### Dark Mode

```css
[data-theme="dark"] {
  --Oui-neutral-50: #1a1a1a;
  --Oui-neutral-100: #2d2d2d;
  --Oui-neutral-200: #404040;
  --Oui-neutral-900: #f5f5f5;
  --Oui-neutral-950: #ffffff;

  /* Adjust other colors for dark mode */
  --Oui-primary-400: #a78bfa;
  --Oui-primary-500: #8b5cf6;
  --Oui-primary-600: #7c3aed;
}
```

### Minimal Theme

```css
:root {
  /* Sharp, minimal design */
  --Oui-rounded: 0;

  /* Monochrome palette */
  --Oui-primary-500: #374151;
  --Oui-primary-600: #1f2937;
  --Oui-success-500: #6b7280;
  --Oui-danger-500: #374151;
  --Oui-warning-500: #6b7280;

  /* Minimal spacing */
  --Oui-spacing-sm: 0.5rem;
  --Oui-spacing-base: 0.75rem;
  --Oui-spacing-md: 1rem;
}
```

### Playful Theme

```css
:root {
  /* Very rounded, playful design */
  --Oui-rounded: 1.25;

  /* Vibrant colors */
  --Oui-primary-500: #ec4899;
  --Oui-success-500: #10b981;
  --Oui-danger-500: #f43f5e;
  --Oui-warning-500: #f59e0b;

  /* Generous spacing */
  --Oui-spacing-base: 1.25rem;
  --Oui-spacing-md: 1.5rem;
  --Oui-spacing-lg: 2rem;
}
```

---

## 🎯 Implementation Examples

### Component-Level Override

```css
/* Override for specific component */
.custom-card {
  --Oui-rounded: 0.25; /* Sharper corners for cards */
}

.custom-button {
  --Oui-rounded: 2; /* Very rounded buttons */
}
```

### Responsive Design

```css
/* Different rounding for different screen sizes */
@media (max-width: 768px) {
  :root {
    --Oui-rounded: 0.25; /* Sharper on mobile */
  }
}

@media (min-width: 1200px) {
  :root {
    --Oui-rounded: 0.75; /* Softer on large screens */
  }
}
```

### Animation Support

```css
/* Smooth transitions for theme changes */
:root {
  transition:
    --Oui-rounded 0.3s ease,
    --Oui-primary-500 0.3s ease,
    --Oui-neutral-100 0.3s ease;
}
```

---

## 🚀 Best Practices

### Do's

- ✅ Use `--Oui-rounded` for consistent border radius across components
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
    sharp: { '--Oui-rounded': 0 },
    default: { '--Oui-rounded': 0.5 },
    rounded: { '--Oui-rounded': 1 },
    playful: { '--Oui-rounded': 1.5 }
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
- Learn about [Table theming](/docs/category/table)
- Check out [Helpers](/docs/category/helpers) for utility functions
- Browse [Hooks](/docs/category/hooks) for state management

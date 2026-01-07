---
sidebar_position: 12
---

import Badge from '@site/src/components/Badge';
import {
  DefaultFallbackPreview,
  CustomFallbackPreview
} from '@site/src/components/@Components/ErrorBoundary';

# ErrorBoundary

The **ErrorBoundary** is a component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of the component tree that crashed.

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `ReactNode` | `<h3>An Error Has Ocured</h3>` | A React node to render when an error is caught. |
| `onError` | `(error: Error) => void` | — | A function that will be called with the error when one is caught. |

---

## Usage

### Default Fallback

If you do not provide a `fallback` prop, a default error message will be displayed.

```tsx
import { ErrorBoundary } from "@kousta-ui/components";

// ProblematicComponent throws an error when the button is clicked.
<ErrorBoundary>
  <ProblematicComponent />
</ErrorBoundary>
```

### Preview
<DefaultFallbackPreview />

### Custom Fallback

You can provide a custom React component or node to the `fallback` prop to render a more user-friendly error message.

```tsx
const CustomFallback = (
  <div style={{ color: 'orange', padding: '1rem', border: '1px dashed orange' }}>
    <p><strong>Oops! Something went wrong.</strong></p>
    <p>We've been notified and are looking into it.</p>
  </div>
);

<ErrorBoundary fallback={CustomFallback}>
  <ProblematicComponent />
</ErrorBoundary>
```

### Preview
<CustomFallbackPreview />

---

## Styles & customization

The `ErrorBoundary` component itself is unstyled. However, the default fallback UI has a class that can be targeted.

### Runtime classes

- **`kui-error-boundary-text`**: The class applied to the default `<h3>` fallback element.

---

## Types (reference)

```ts
import { ReactNode, PropsWithChildren } from "react";

export type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}>;
```

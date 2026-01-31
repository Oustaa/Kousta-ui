---
sidebar_position: 12
---

import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  DefaultFallbackPreview,
  CustomFallbackPreview
} from '@site/src/components/@Components/ErrorBoundary';

# ErrorBoundary

The **ErrorBoundary** is a component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of the component tree that crashed.

---

## Installation

```bash
npm install @kousta-ui/components
```

### Import styles

```ts
import "@kousta-ui/components/esm/index.css";
```

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `ReactNode` | `<h3>An Error Has Ocured</h3>` | A React node to render when an error is caught. |
| `onError` | `(error: Error) => void` | — | A function that will be called with the error when one is caught. |
| `throwOnError` | `boolean` | `false` | If `true`, re-throws the error after calling `onError` (useful for failing tests or surfacing errors in dev). |

---

## Usage

### Default Fallback

If you do not provide a `fallback` prop, a default error message will be displayed.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ErrorBoundaryDefault.tsx",
      code: `import React, { useState } from "react";
import { ErrorBoundary, Button } from "@kousta-ui/components";

const ProblematicComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Kaboom! An error was thrown.");
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="danger-outline">
      Click to Trigger Error
    </Button>
  );
};

export default function Example() {
  return (
    <div
      style={{
        border: "1px solid var(--kui-neutral-300)",
        padding: "1rem",
        borderRadius: "var(--kui-rounded)",
      }}
    >
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ErrorBoundaryDefault.jsx",
      code: `import React, { useState } from "react";
import { ErrorBoundary, Button } from "@kousta-ui/components";

const ProblematicComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Kaboom! An error was thrown.");
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="danger-outline">
      Click to Trigger Error
    </Button>
  );
};

export default function Example() {
  return (
    <div
      style={{
        border: "1px solid var(--kui-neutral-300)",
        padding: "1rem",
        borderRadius: "var(--kui-rounded)",
      }}
    >
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    </div>
  );
}`
    }
  ]}
  preview={<DefaultFallbackPreview />}
  defaultTab="ts"
/>

### Custom Fallback

You can provide a custom React component or node to the `fallback` prop to render a more user-friendly error message.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ErrorBoundaryCustom.tsx",
      code: `import React, { useState } from "react";
import { ErrorBoundary, Button } from "@kousta-ui/components";

const ProblematicComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Kaboom! An error was thrown.");
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="danger-outline">
      Click to Trigger Error
    </Button>
  );
};

export default function Example() {
  const CustomFallback = (
    <div style={{ color: "orange", padding: "1rem", border: "1px dashed orange" }}>
      <p>
        <strong>Oops! Something went wrong.</strong>
      </p>
      <p>We've been notified and are looking into it.</p>
    </div>
  );

  return (
    <div
      style={{
        border: "1px solid var(--kui-neutral-300)",
        padding: "1rem",
        borderRadius: "var(--kui-rounded)",
      }}
    >
      <ErrorBoundary fallback={CustomFallback}>
        <ProblematicComponent />
      </ErrorBoundary>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ErrorBoundaryCustom.jsx",
      code: `import React, { useState } from "react";
import { ErrorBoundary, Button } from "@kousta-ui/components";

const ProblematicComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Kaboom! An error was thrown.");
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="danger-outline">
      Click to Trigger Error
    </Button>
  );
};

export default function Example() {
  const CustomFallback = (
    <div style={{ color: "orange", padding: "1rem", border: "1px dashed orange" }}>
      <p>
        <strong>Oops! Something went wrong.</strong>
      </p>
      <p>We've been notified and are looking into it.</p>
    </div>
  );

  return (
    <div
      style={{
        border: "1px solid var(--kui-neutral-300)",
        padding: "1rem",
        borderRadius: "var(--kui-rounded)",
      }}
    >
      <ErrorBoundary fallback={CustomFallback}>
        <ProblematicComponent />
      </ErrorBoundary>
    </div>
  );
}`
    }
  ]}
  preview={<CustomFallbackPreview />}
  defaultTab="ts"
/>

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
  throwOnError?: boolean;
}>;
```

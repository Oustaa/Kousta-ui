---
sidebar_position: 8
---

import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  BasicVisibilityPreview,
  LazyImagePreview,
  InfiniteScrollPreview
} from '@site/src/components/@Components/WindowBoundary';

# WindowBoundary

A performance-optimized **WindowBoundary** component that detects when elements enter or exit the viewport using the Intersection Observer API. It is perfect for lazy loading, infinite scrolling, triggering animations, and other performance optimizations.

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
| `onItemEnter` | `(element: Element \| null) => void` | — | Callback fired every time the element enters the viewport. |
| `onItemExit` | `(element: Element \| null) => void` | — | Callback fired every time the element exits the viewport. |
| `onceItemEnter` | `(element: Element \| null) => void` | — | Callback that fires only once when the element first enters the viewport. |
| `onceItemExit` | `(element: Element \| null) => void` | — | Callback that fires only once when the element first exits the viewport. |
| `root` | `Element \| Document \| null` | `document.body` | The element used as the viewport for checking visibility. Defaults to the browser viewport. |
| `As` | `string` | `"div"` | The HTML tag to render as the wrapper element. |
| `threshold` | `number` | `0` | A number between 0 and 1 indicating the percentage of the element's visibility needed to trigger callbacks. |

<Badge color="blue">Note</Badge> The component is headless and does not have any visual styles of its own.

---

## Usage

### Basic Visibility Detection

Use the `onItemEnter` and `onItemExit` callbacks to track when an element becomes visible.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "WindowBoundaryBasic.tsx",
      code: `import React, { useState } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export default function Example() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ height: "150vh", paddingTop: "75vh" }}>
      <WindowBoundary
        onItemEnter={() => setVisible(true)}
        onItemExit={() => setVisible(false)}
        threshold={0.9}
        root={null}
      >
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: visible
              ? "var(--kui-success-100)"
              : "var(--kui-neutral-200)",
            color: visible
              ? "var(--kui-success-800)"
              : "var(--kui-neutral-800)",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            border: \`2px solid \${visible ? "var(--kui-success-500)" : "var(--kui-neutral-400)"}\`,
          }}
        >
          {visible ? "I am in the viewport!" : "Scroll me into view!"}
        </div>
      </WindowBoundary>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "WindowBoundaryBasic.jsx",
      code: `import React, { useState } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export default function Example() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ height: "150vh", paddingTop: "75vh" }}>
      <WindowBoundary
        onItemEnter={() => setVisible(true)}
        onItemExit={() => setVisible(false)}
        threshold={0.9}
        root={null}
      >
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: visible
              ? "var(--kui-success-100)"
              : "var(--kui-neutral-200)",
            color: visible
              ? "var(--kui-success-800)"
              : "var(--kui-neutral-800)",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            border: \`2px solid \${visible ? "var(--kui-success-500)" : "var(--kui-neutral-400)"}\`,
          }}
        >
          {visible ? "I am in the viewport!" : "Scroll me into view!"}
        </div>
      </WindowBoundary>
    </div>
  );
}`
    }
  ]}
  preview={<BasicVisibilityPreview />}
  defaultTab="ts"
/>

### Lazy Loading Images

Use `onceItemEnter` to defer loading an image until it is about to enter the viewport. This saves bandwidth and improves initial page load time.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "WindowBoundaryLazyImage.tsx",
      code: `import React, { useState } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export default function Example() {
  const [isInView, setIsInView] = useState(false);

  return (
    <div style={{ height: "150vh", paddingTop: "75vh" }}>
      <WindowBoundary
        root={null}
        onceItemEnter={() => setIsInView(true)}
        threshold={0.1}
      >
        <div
          style={{
            minHeight: "200px",
            display: "grid",
            placeItems: "center",
            background: "#f0f0f0",
            borderRadius: "8px",
            color: "#888",
          }}
        >
          {isInView ? (
            <img
              src="https://via.placeholder.com/400x200.png?text=Image+Loaded"
              alt="Lazy Loaded"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          ) : (
            "Scroll down to load image..."
          )}
        </div>
      </WindowBoundary>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "WindowBoundaryLazyImage.jsx",
      code: `import React, { useState } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export default function Example() {
  const [isInView, setIsInView] = useState(false);

  return (
    <div style={{ height: "150vh", paddingTop: "75vh" }}>
      <WindowBoundary
        root={null}
        onceItemEnter={() => setIsInView(true)}
        threshold={0.1}
      >
        <div
          style={{
            minHeight: "200px",
            display: "grid",
            placeItems: "center",
            background: "#f0f0f0",
            borderRadius: "8px",
            color: "#888",
          }}
        >
          {isInView ? (
            <img
              src="https://via.placeholder.com/400x200.png?text=Image+Loaded"
              alt="Lazy Loaded"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          ) : (
            "Scroll down to load image..."
          )}
        </div>
      </WindowBoundary>
    </div>
  );
}`
    }
  ]}
  preview={<LazyImagePreview />}
  defaultTab="ts"
/>

### Infinite Scrolling

Place the `WindowBoundary` at the end of a list to trigger a function that loads more items when the user scrolls to the bottom.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "WindowBoundaryInfiniteScroll.tsx",
      code: `import React, { useState } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export default function Example() {
  const [items, setItems] = useState(
    Array.from({ length: 5 }, (_, i) => \`Item \${i + 1}\`),
  );
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from(
        { length: 5 },
        (_, i) => \`Item \${items.length + i + 1}\`,
      );
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        height: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{ padding: "16px", borderBottom: "1px solid #eee" }}
        >
          {item}
        </div>
      ))}
      <WindowBoundary onItemEnter={loadMore} root={null} threshold={1.0}>
        <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
          {loading ? "Loading more..." : "Scroll to load more"}
        </div>
      </WindowBoundary>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "WindowBoundaryInfiniteScroll.jsx",
      code: `import React, { useState } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export default function Example() {
  const [items, setItems] = useState(
    Array.from({ length: 5 }, (_, i) => \`Item \${i + 1}\`),
  );
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from(
        { length: 5 },
        (_, i) => \`Item \${items.length + i + 1}\`,
      );
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        height: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{ padding: "16px", borderBottom: "1px solid #eee" }}
        >
          {item}
        </div>
      ))}
      <WindowBoundary onItemEnter={loadMore} root={null} threshold={1.0}>
        <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
          {loading ? "Loading more..." : "Scroll to load more"}
        </div>
      </WindowBoundary>
    </div>
  );
}`
    }
  ]}
  preview={<InfiniteScrollPreview />}
  defaultTab="ts"
/>

---

## Styling

`WindowBoundary` is a headless component, meaning it has no visual output or styles. It renders a wrapper element (a `div` by default) around its children, to which it attaches the Intersection Observer. You can change the wrapper element using the `As` prop.

Any styles should be applied to the child elements you pass to the component.

---

## Types (reference)

```ts
import { ElementType } from "react";

export type WindowBoundaryProps = {
  onItemEnter?: (element: Element | null) => void;
  onItemExit?: (element: Element | null) => void;
  onceItemEnter?: (element: Element | null) => void;
  onceItemExit?: (element: Element | null) => void;
  root?: Element | Document | null;
  As?: string;
  threshold?: number;
};
```

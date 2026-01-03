---
sidebar_position: 8
---

import Badge from '@site/src/components/Badge';

# WindowBoundary

A performance-optimized **WindowBoundary** component that detects when elements enter or exit the viewport. Perfect for lazy loading, infinite scrolling, animations, and performance optimizations.

---

## When to use

- **Lazy loading**: Load images or components only when they become visible
- **Infinite scrolling**: Trigger data loading when user scrolls to bottom
- **Animations**: Start animations when elements enter viewport
- **Performance**: Defer expensive operations until needed
- **Analytics**: Track when content is viewed by users

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onItemEnter` | `(element: Element \| null) => void` | — | Callback when element enters viewport. |
| `onItemExit` | `(element: Element \| null) => void` | — | Callback when element exits viewport. |
| `onceItemEnter` | `(element: Element \| null) => void` | — | Callback that fires only once when element first enters viewport. |
| `onceItemExit` | `(element: Element \| null) => void` | — | Callback that fires only once when element first exits viewport. |
| `root` | `Element \| Document \| null` | `null` | The element that is used as the viewport for checking visibility. |
| `As` | `string` | `"div"` | The HTML tag to render as the wrapper element. |
| `threshold` | `number` | `0` | Percentage of the element's visibility needed to trigger callbacks (0-1). |
| `...rest` | `ComponentPropsWithoutRef<"div">` | — | Any native div props are forwarded to the wrapper. |

<Badge color="blue">Note</Badge> The component uses the Intersection Observer API for optimal performance.

## Examples

### Basic visibility detection

```tsx
<WindowBoundary
  onItemEnter={(element) => {
    console.log("Card is now visible");
    element?.setAttribute("data-visible", "true");
  }}
  onItemExit={(element) => {
    console.log("Card is no longer visible");
    element?.setAttribute("data-visible", "false");
  }}
>
  <div className="card">
    <h3>Observable Card</h3>
    <p>This card's visibility is being tracked.</p>
  </div>
</WindowBoundary>
```

### Lazy image loading

```tsx
function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <WindowBoundary
      onceItemEnter={() => setIsInView(true)}
      threshold={0.1}
    >
      <div style={{ minHeight: "200px", background: "#f5f5f5" }}>
        {isInView && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s",
              width: "100%",
              height: "auto"
            }}
            {...props}
          />
        )}
        {!isLoaded && isInView && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px"
          }}>
            Loading...
          </div>
        )}
      </div>
    </WindowBoundary>
  );
}
```

### Infinite scrolling

```tsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchMoreItems(items.length);
      setItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="list-item">
          {item.content}
        </div>
      ))}

      {hasMore && (
        <WindowBoundary
          onItemEnter={loadMore}
          threshold={0.5}
        >
          <div style={{
            padding: "20px",
            textAlign: "center",
            background: "#f9f9f9",
            borderRadius: "8px",
            margin: "20px 0"
          }}>
            {loading ? "Loading more..." : "Scroll to load more"}
          </div>
        </WindowBoundary>
      )}
    </div>
  );
}
```

### Custom threshold

```tsx
<WindowBoundary
  onItemEnter={(element) => {
    console.log("Element is 50% visible");
  }}
  threshold={0.5} // Trigger when 50% of element is visible
>
  <div className="content">
    This content will be detected when it's halfway visible.
  </div>
</WindowBoundary>
```

### Custom root element

```tsx
function ScrollableContainer() {
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      style={{
        height: "400px",
        overflow: "auto",
        border: "1px solid #ccc",
        padding: "20px"
      }}
    >
      <div style={{ height: "200px", background: "#f0f0f0" }}>
        Scroll down to see the tracked element:
      </div>

      <WindowBoundary
        root={containerRef.current}
        onItemEnter={() => console.log("Element entered scrollable container")}
      >
        <div style={{
          height: "100px",
          background: "#e0f0ff",
          padding: "20px",
          borderRadius: "8px"
        }}>
          I'm tracked within the scrollable container!
        </div>
      </WindowBoundary>

      <div style={{ height: "200px", background: "#f0f0f0" }}>
        More content...
      </div>
    </div>
  );
}
```

---

## Performance Considerations

- **Intersection Observer**: Uses the efficient Intersection Observer API instead of scroll events
- **Debounced callbacks**: Callbacks are optimized to prevent excessive function calls
- **Memory management**: Automatically cleans up observers when component unmounts
- **Threshold optimization**: Use appropriate thresholds to balance sensitivity and performance

<Badge color="green">Tip</Badge> For best performance, avoid expensive operations in enter/exit callbacks. Consider debouncing or throttling if needed.

---

## Browser Support

The Intersection Observer API is supported in all modern browsers:

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

For older browsers, consider using a polyfill.

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef } from "react";

export type WindowBoundaryProps = {
  onItemEnter?: (element: Element | null) => void;
  onItemExit?: (element: Element | null) => void;
  onceItemEnter?: (element: Element | null) => void;
  onceItemExit?: (element: Element | null) => void;
  root?: Element | Document | null;
  As?: string;
  threshold?: number;
} & ComponentPropsWithoutRef<"div">;
```

## Quick start

```tsx
import { WindowBoundary } from "@ousta-ui/components";

export default function Example() {
  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <h2>Scroll down to see the effect</h2>

      <WindowBoundary
        onItemEnter={(element) => {
          console.log("Element entered viewport:", element);
          element?.classList.add("visible");
        }}
        onItemExit={(element) => {
          console.log("Element exited viewport:", element);
          element?.classList.remove("visible");
        }}
      >
        <div style={{
          marginTop: "100vh",
          padding: "40px",
          background: "#f0f0f0",
          borderRadius: "8px",
          transition: "opacity 0.5s",
          opacity: 0
        }}>
          <h3>I appeared when you scrolled!</h3>
          <p>This content was detected when it entered the viewport.</p>
        </div>
      </WindowBoundary>
    </div>
  );
}
```

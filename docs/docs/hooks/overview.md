---
sidebar_position: 0
title: Overview
---

import Badge from '@site/src/components/Badge';

# Hooks Package

The **@kousta-ui/hooks** package provides a collection of essential, reusable React hooks that solve common UI patterns and state management challenges.

---

## 🚀 Features

- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Performance Optimized**: Efficient implementations with minimal re-renders
- **Composable**: Designed to work together and with other hooks
- **Lightweight**: Minimal bundle impact with tree-shaking support
- **Tested**: Thoroughly tested for reliability
- **Zero Dependencies**: No external dependencies required

---

## 📦 Installation

```bash
npm install @kousta-ui/hooks
# or
yarn add @kousta-ui/hooks
# or
pnpm add @kousta-ui/hooks
```

---

## 🎯 Available Hooks

| Hook | Purpose | Common Use Cases |
|------|---------|------------------|
| [`useDisclosure`](/docs/hooks/useDisclosure) | Manage boolean state (open/close) | Modals, dropdowns, sidebars |
| [`usePagination`](/docs/hooks/usePagination) | Handle pagination logic | Data tables, lists, galleries |
| [`useDebounceCallback`](/docs/hooks/useDebounceCallback) | Debounce function calls | Search inputs, API calls |
| [`useScrollLock`](/docs/hooks/useScrollLock) | Prevent body scrolling | Modals, overlays, drawers |

---

## 🎨 Quick Start

```tsx
import { 
  useDisclosure, 
  usePagination, 
  useDebounceCallback, 
  useScrollLock 
} from "@kousta-ui/hooks";

function App() {
  // Modal state management
  const { opened, open, close, toggle } = useDisclosure(false);
  
  // Pagination for data
  const { page, nextPage, prevPage, setPage } = usePagination({
    total: 100,
    limit: 10,
  });
  
  // Debounced search
  const debouncedSearch = useDebounceCallback((query: string) => {
    console.log("Searching for:", query);
  }, 300);
  
  // Scroll lock for modal
  const { lockScroll, unlockScroll } = useScrollLock();

  const handleModalOpen = () => {
    lockScroll();
    open();
  };

  const handleModalClose = () => {
    unlockScroll();
    close();
  };

  return (
    <div>
      <button onClick={handleModalOpen}>Open Modal</button>
      
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## 📊 Hook Categories

### State Management Hooks

Hooks that help manage component state:

- **[`useDisclosure`](/docs/hooks/useDisclosure)** - Simplified boolean state management with open/close/toggle actions

### Data Handling Hooks

Hooks for managing data operations:

- **[`usePagination`](/docs/hooks/usePagination)** - Complete pagination logic with boundary checking
- **[`useDebounceCallback`](/docs/hooks/useDebounceCallback)** - Debounced function execution for performance

### UI/UX Hooks

Hooks that enhance user experience:

- **[`useScrollLock`](/docs/hooks/useScrollLock)** - Prevent background scrolling when overlays are active

---

## 🎯 When to Use These Hooks

### Use `useDisclosure` when:

- Managing modal, dropdown, or sidebar visibility
- Need simple boolean state with action methods
- Want consistent open/close/toggle patterns

### Use `usePagination` when:

- Displaying paginated data (tables, lists, galleries)
- Need boundary checking and page navigation
- Want to track current page and total pages

### Use `useDebounceCallback` when:

- Handling search input with API calls
- Preventing excessive function execution
- Need performance optimization for rapid events

### Use `useScrollLock` when:

- Showing modals or overlays
- Preventing background scrolling
- Need scrollbar compensation to prevent layout shift

---

## 🔧 TypeScript Support

All hooks provide full TypeScript support:

```tsx
import { useDisclosure, usePagination } from "@kousta-ui/hooks";

// Typed disclosure state
const { opened, open, close } = useDisclosure(false);

// Typed pagination
const { page, setPage } = usePagination({
  total: 100,
  limit: 10,
  page: 1,
});

// Typed debounced callback
const debouncedFn = useDebounceCallback(
  (query: string) => searchAPI(query),
  300
);
```

---

## 🚀 Performance Considerations

- **Optimized Re-renders**: Hooks use `useCallback` and `useMemo` where appropriate
- **Minimal Dependencies**: Zero external dependencies for smaller bundle size
- **Efficient Algorithms**: Optimized implementations for common operations
- **Tree Shaking**: Unused hooks are eliminated during build

<Badge color="blue">Performance Tip</Badge> These hooks are designed to be performant out of the box, but always profile your specific use case.

---

## 🔄 Composition Examples

### Search with Pagination

```tsx
function SearchableList() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { page, nextPage, prevPage, setPage } = usePagination({
    total: 0, // Will be updated after search
  });

  const debouncedSearch = useDebounceCallback(async (searchQuery: string) => {
    const response = await searchAPI(searchQuery, page);
    setResults(response.data);
    // Update pagination total
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, page, debouncedSearch]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      {/* Render results */}
      {results.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      {/* Pagination controls */}
      <div>
        <button onClick={prevPage}>Previous</button>
        <span>Page {page}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
```

### Modal with Scroll Lock

```tsx
function ModalExample() {
  const { opened, open, close } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();

  const handleOpen = () => {
    lockScroll();
    open();
  };

  const handleClose = () => {
    unlockScroll();
    close();
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      
      {opened && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Modal Content</h2>
            <p>This modal locks the background scroll.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 📚 Best Practices

### Do's

- ✅ Use hooks for their intended purpose
- ✅ Combine hooks for complex scenarios
- ✅ Leverage TypeScript for type safety
- ✅ Test hook behavior in your components

### Don'ts

- ❌ Don't use hooks outside React components
- ❌ Don't mutate hook return values
- ❌ Don't ignore TypeScript warnings
- ❌ Don't over-engineer simple state management

---

## 📖 Next Steps

- Learn about individual [hooks](/docs/category/hooks)
- Check out [Components package](/docs/category/components)
- Explore [Table package](/docs/category/table)
- Browse [Helpers utilities](/docs/category/helpers)

---

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/Oustaa/ousta-ui/blob/main/CONTRIBUTING.md) for details.

---

## 📄 License

MIT © [Ousta](https://github.com/Oustaa)

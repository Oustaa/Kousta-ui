---
sidebar_position: 3
---

import Badge from '@site/src/components/Badge';

# useDebounceCallback

A performance-optimized hook that debounces function calls, preventing excessive execution during rapid events. Perfect for search inputs, API calls, resize handlers, and any scenario where you need to delay function execution until a pause in activity.

---

## When to use

- **Search inputs**: Prevent API calls on every keystroke
- **Form validation**: Delay validation until user stops typing
- **Window resize**: Handle resize events efficiently
- **Auto-save**: Save drafts after user pauses typing
- **API rate limiting**: Prevent excessive API requests
- **Scroll handlers**: Optimize scroll event performance
- **Button spam prevention**: Prevent multiple rapid clicks

---

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | `T extends (...args: any[]) => any` | **Required** | Function to debounce |
| `delay` | `number` | **Required** | Delay in milliseconds |

---

## Return Values

| Property | Type | Description |
|----------|------|-------------|
| `debouncedFn` | `(...args: Parameters<T>) => void` | Debounced version of the callback function |

<Badge color="blue">Note</Badge> The hook cleans up its pending timeout automatically on unmount, so you usually don’t need manual cleanup unless you add your own timers.

---

## Basic Usage

```tsx
import { useDebounceCallback } from "@kousta-ui/hooks";

function BasicExample() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const debouncedSearch = useDebounceCallback((term: string) => {
    console.log("Searching for:", term);
    // Perform search API call here
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <p>Current term: {searchTerm}</p>
    </div>
  );
}
```

---

## Examples

### Search Input with API

```tsx
function SearchExample() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchAPI = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounceCallback(searchAPI, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search products..."
          className="search-input"
        />
        {loading && <span className="loading-indicator">Searching...</span>}
      </div>

      <div className="search-results">
        {results.map((item) => (
          <div key={item.id} className="search-result">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Form Validation

```tsx
function FormValidationExample() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
  };

  const debouncedValidation = useDebounceCallback(validateEmail, 300);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    debouncedValidation(value);
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>
    </form>
  );
}
```

### Window Resize Handler

```tsx
function ResizeExample() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useDebounceCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div>
      <h2>Window Size</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
    </div>
  );
}
```

### Auto-Save Functionality

```tsx
function AutoSaveExample() {
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  const saveContent = async (text: string) => {
    if (!text.trim()) return;

    setSaveStatus("saving");
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Content saved:", text);
      setSaveStatus("saved");
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("unsaved");
    }
  };

  const debouncedSave = useDebounceCallback(saveContent, 2000);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setSaveStatus("unsaved");
    debouncedSave(value);
  };

  return (
    <div>
      <div className="editor-header">
        <h3>Auto-Saving Editor</h3>
        <span className={`save-status ${saveStatus}`}>
          {saveStatus === "saved" && "✓ Saved"}
          {saveStatus === "saving" && "Saving..."}
          {saveStatus === "unsaved" && "Unsaved"}
        </span>
      </div>
      
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing to see auto-save in action..."
        rows={10}
        style={{ width: "100%", padding: "10px" }}
      />
      
      <p className="save-hint">
        Content will automatically save 2 seconds after you stop typing.
      </p>
    </div>
  );
}
```

### Scroll Position Tracking

```tsx
function ScrollTrackingExample() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useDebounceCallback(() => {
    const position = window.scrollY;
    setScrollPosition(position);
    setIsScrolling(false);
  }, 100);

  const handleScrollStart = () => {
    setIsScrolling(true);
    handleScroll();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollStart);
    return () => window.removeEventListener("scroll", handleScrollStart);
  }, [handleScrollStart]);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <div style={{ position: "fixed", top: 20, right: 20, background: "white", padding: "10px", border: "1px solid #ccc" }}>
        <p>Scroll Position: {Math.round(scrollPosition)}px</p>
        <p>Status: {isScrolling ? "Scrolling..." : "Idle"}</p>
      </div>
      
      <h1>Scroll Down</h1>
      <p>Scroll position is tracked with debouncing.</p>
      
      {/* Lots of content to enable scrolling */}
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>Section {i + 1} - Scroll to see position tracking in action.</p>
      ))}
    </div>
  );
}
```

### Button Click Prevention

```tsx
function ButtonPreventionExample() {
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleClick = useDebounceCallback(() => {
    setClickCount(prev => prev + 1);
    setMessage(`Button clicked! Total clicks: ${clickCount + 1}`);
  }, 1000);

  return (
    <div>
      <button onClick={handleClick}>
        Click Me Rapidly!
      </button>
      
      <p>Click count: {clickCount}</p>
      <p>{message}</p>
      
      <p className="hint">
        Try clicking the button multiple times quickly - the click handler is debounced by 1 second.
      </p>
    </div>
  );
}
```

### Complex API Data Fetching

```tsx
function ComplexDataFetchingExample() {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    rating: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (filterValues: typeof filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filterValues.category) {
        params.append("category", filterValues.category);
      }
      params.append("minPrice", filterValues.priceRange[0].toString());
      params.append("maxPrice", filterValues.priceRange[1].toString());
      params.append("minRating", filterValues.rating.toString());

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useDebounceCallback(fetchProducts, 800);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    debouncedFetch(updatedFilters);
  };

  return (
    <div>
      <div className="filters">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>

        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange({ 
            priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
          })}
        />

        <input
          type="range"
          min="0"
          max="5"
          value={filters.rating}
          onChange={(e) => handleFilterChange({ rating: parseInt(e.target.value) })}
        />
      </div>

      {loading && <div>Loading products...</div>}

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div>Rating: {product.rating}★</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Advanced Patterns

### Debounced Callback with Cleanup

```tsx
function DebounceWithCleanup() {
  const [results, setResults] = useState([]);

  const searchWithCleanup = useDebounceCallback(async (query: string) => {
    // Abort controller for cancelling previous requests
    const controller = new AbortController();
    
    try {
      const response = await fetch(`/api/search?q=${query}`, {
        signal: controller.signal,
      });
      const data = await response.json();
      
      // Only update if this request wasn't aborted
      if (!controller.signal.aborted) {
        setResults(data.results);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Search failed:", error);
      }
    }
  }, 300);

  return (
    <div>
      <input
        onChange={(e) => searchWithCleanup(e.target.value)}
        placeholder="Search with cleanup..."
      />
    </div>
  );
}
```

### Multiple Debounced Values

```tsx
function MultipleDebouncedValues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const handleSearch = useDebounceCallback((term: string) => {
    console.log("Search:", term);
  }, 300);

  const handleFilter = useDebounceCallback((term: string) => {
    console.log("Filter:", term);
  }, 500);

  return (
    <div>
      <input
        placeholder="Search (300ms debounce)"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      
      <input
        placeholder="Filter (500ms debounce)"
        onChange={(e) => {
          setFilterTerm(e.target.value);
          handleFilter(e.target.value);
        }}
      />
    </div>
  );
}
```

---

## Performance Considerations

- **Memory Management**: Automatic cleanup of pending timeouts
- **Latest Callback**: Always uses the latest callback version
- **Efficient Re-renders**: Memoized debounced function prevents unnecessary re-renders
- **Cleanup on Unmount**: Automatically cleans up pending timeouts when component unmounts

<Badge color="blue">Performance Tip</Badge> The hook handles cleanup automatically, so you don't need to worry about memory leaks.

---

## TypeScript Support

Full TypeScript support with generic inference:

```tsx
// Basic usage with inferred types
const debouncedFn = useDebounceCallback(
  (query: string) => console.log(query),
  300
);

// Explicit typing
const debouncedSearch: (query: string) => void = useDebounceCallback(
  (query: string) => searchAPI(query),
  300
);

// Multiple parameters
const debouncedLogger = useDebounceCallback(
  (message: string, level: "info" | "error" | "warn") => {
    console[level](message);
  },
  200
);

// Async functions
const debouncedFetch = useDebounceCallback(
  async (url: string) => {
    const response = await fetch(url);
    return response.json();
  },
  500
);
```

---

## Common Pitfalls

### Don't Use for Critical Actions

```tsx
// ❌ Wrong - don't debounce critical actions like form submission
const debouncedSubmit = useDebounceCallback(handleSubmit, 300);

// ✅ Correct - use immediate execution for critical actions
const handleSubmit = () => {
  // Immediate submission
};
```

### Don't Forget Dependencies

```tsx
// ❌ Wrong - callback might be stale
const [value, setValue] = useState("");
const debouncedFn = useDebounceCallback(() => {
  console.log(value); // Might use stale value
}, 300);

// ✅ Correct - pass latest value as parameter
const debouncedFn = useDebounceCallback((currentValue: string) => {
  console.log(currentValue); // Always uses latest value
}, 300);
```

### Don't Use Very Short Delays

```tsx
// ❌ Wrong - very short delay defeats the purpose
const debouncedFn = useDebounceCallback(callback, 10);

// ✅ Correct - reasonable delay for debouncing
const debouncedFn = useDebounceCallback(callback, 300);
```

---

## Migration from Manual Debounce

### Before Manual Debounce

```tsx
function OldSearch() {
  const [query, setQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      console.log("Searching:", value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <input onChange={handleSearch} placeholder="Search..." />
  );
}
```

### After useDebounceCallback

```tsx
function NewSearch() {
  const [query, setQuery] = useState("");
  
  const debouncedSearch = useDebounceCallback((searchQuery: string) => {
    console.log("Searching:", searchQuery);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input onChange={handleSearch} placeholder="Search..." />
  );
}
```

---

## Types (reference)

```ts
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void;
```

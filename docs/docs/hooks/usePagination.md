---
sidebar_position: 2
---

import Badge from '@site/src/components/Badge';

# usePagination

A comprehensive pagination hook that handles all pagination logic including boundary checking, page navigation, and state management. Perfect for data tables, lists, galleries, and any component that needs to display paginated data.

---

## When to use

- **Data tables**: Paginate large datasets for better performance
- **Product catalogs**: Display products across multiple pages
- **Search results**: Show search results in manageable chunks
- **Image galleries**: Navigate through image collections
- **Article lists**: Paginate blog posts or news articles
- **API responses**: Handle paginated API endpoints
- **File browsers**: Navigate through file directories

---

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `total` | `number` | **Required** | Total number of items |
| `limit` | `number` | `10` | Number of items per page |
| `page` | `number` | `1` | Initial page number (1-based) |

---

## Return Values

| Property | Type | Description |
|----------|------|-------------|
| `page` | `number` | Current page number (1-based) |
| `limit` | `number` | Items per page |
| `total` | `number` | Total number of items |
| `totalPages` | `number` | Total number of pages (\( \lceil total / limit \rceil \)) |
| `nextPage` | `() => void` | Function to go to next page |
| `prevPage` | `() => void` | Function to go to previous page |
| `setPage` | `(page: number) => void` | Function to jump to specific page |
| `setLimit` | `(limit: number) => void` | Function to change items per page |
| `setTotal` | `(total: number) => void` | Function to update total items |

---

## Basic Usage

```tsx
import { usePagination } from "@kousta-ui/hooks";

function BasicExample() {
  const totalItems = 100;
  
  const { page, nextPage, prevPage, setPage } = usePagination({
    total: totalItems,
    limit: 10,
    page: 1,
  });

  return (
    <div>
      <p>Current page: {page}</p>
      <button onClick={prevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={page === Math.ceil(totalItems / 10)}>
        Next
      </button>
      <button onClick={() => setPage(3)}>
        Go to page 3
      </button>
    </div>
  );
}
```

---

## Examples

### Data Table Pagination

```tsx
function DataTableExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { page, nextPage, prevPage, setPage, limit, setTotal, totalPages } = usePagination({
    total: 0,
    limit: 20,
  });

  // Fetch data when page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users?page=${page}&limit=${limit}`);
        const result = await response.json();
        // If your API returns total, update it so totalPages stays correct
        if (typeof result.total === "number") setTotal(result.total);
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : (
            data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        
        <span>
          Page {page} of {totalPages}
        </span>
        
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
```

### Product Gallery

```tsx
function ProductGallery() {
  const [products, setProducts] = useState([]);
  
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: 48, // Total products
    limit: 12, // 12 products per page
  });

  useEffect(() => {
    // Simulate API call
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageProducts = allProducts.slice(startIndex, endIndex);
    setProducts(pageProducts);
  }, [page, limit]);

  const totalPages = Math.ceil(48 / limit);

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          ← Previous
        </button>
        
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={page === pageNum ? "active" : ""}
            >
              {pageNum}
            </button>
          ))}
        </div>
        
        <button onClick={nextPage} disabled={page === totalPages}>
          Next →
        </button>
      </div>
    </div>
  );
}
```

### Search Results with Pagination

```tsx
function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: totalResults,
    limit: 10,
  });

  // Search function
  const search = async (searchQuery: string, pageNumber: number) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${searchQuery}&page=${pageNumber}&limit=${limit}`);
      const data = await response.json();
      setResults(data.results);
      setTotalResults(data.total);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Reset to page 1 when query changes
  useEffect(() => {
    setPage(1);
  }, [query, setPage]);

  // Perform search when page or query changes
  useEffect(() => {
    search(query, page);
  }, [query, page]);

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className="search-info">
        {totalResults > 0 && (
          <p>Found {totalResults} results (page {page} of {totalPages})</p>
        )}
      </div>

      <div className="results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={page === 1}>
            Previous
          </button>
          
          <span>Page {page} of {totalPages}</span>
          
          <button onClick={nextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
```

### Advanced Pagination Controls

```tsx
function AdvancedPagination() {
  const totalItems = 500;
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: totalItems,
    limit: 25,
  });

  const totalPages = Math.ceil(totalItems / limit);

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <div className="advanced-pagination">
      <div className="pagination-info">
        Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalItems)} of {totalItems} items
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={page === 1}>
          ← Previous
        </button>

        <div className="page-numbers">
          {getVisiblePages().map((pageNum, index) => (
            pageNum === "..." ? (
              <span key={`dots-${index}`} className="dots">...</span>
            ) : (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={page === pageNum ? "active" : ""}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>

        <button onClick={nextPage} disabled={page === totalPages}>
          Next →
        </button>
      </div>

      <div className="jump-to-page">
        <span>Jump to page:</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={page}
          onChange={(e) => {
            const newPage = parseInt(e.target.value);
            if (newPage >= 1 && newPage <= totalPages) {
              setPage(newPage);
            }
          }}
        />
      </div>
    </div>
  );
}
```

### Items Per Page Control

```tsx
function ItemsPerPageExample() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 150;
  
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: totalItems,
    limit: itemsPerPage,
  });

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setPage(1);
  }, [itemsPerPage, setPage]);

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div>
      <div className="controls">
        <label>
          Items per page:
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>

      <div className="content">
        {/* Render your items here */}
        <p>Showing {limit} items per page</p>
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        
        <span>Page {page} of {totalPages}</span>
        
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## Advanced Patterns

### Pagination with URL Sync

```tsx
function URLPagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentLimit = parseInt(searchParams.get("limit") || "10");
  
  const totalItems = 200;
  
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: totalItems,
    limit: currentLimit,
    page: currentPage,
  });

  // Update URL when page changes
  useEffect(() => {
    setSearchParams({ page: page.toString(), limit: limit.toString() });
  }, [page, limit, setSearchParams]);

  return (
    <div>
      <p>Current page from URL: {page}</p>
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}
```

### Pagination with Loading State

```tsx
function LoadingPagination() {
  const [loading, setLoading] = useState(false);
  const totalItems = 1000;
  
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: totalItems,
    limit: 50,
  });

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPage(newPage);
    setLoading(false);
  };

  return (
    <div>
      <button 
        onClick={() => handlePageChange(page - 1)} 
        disabled={page === 1 || loading}
      >
        {loading ? "Loading..." : "Previous"}
      </button>
      
      <span>Page {page}</span>
      
      <button 
        onClick={() => handlePageChange(page + 1)} 
        disabled={page === Math.ceil(totalItems / limit) || loading}
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
}
```

---

## Performance Considerations

- **Boundary Checking**: Automatic boundary checking prevents invalid page numbers
- **Stable Functions**: Navigation functions are memoized for optimal performance
- **Minimal Re-renders**: Only re-renders when page or limit changes
- **Efficient Calculations**: Total pages calculated once and cached

<Badge color="blue">Performance Tip</Badge> The hook automatically handles edge cases and prevents unnecessary re-renders.

---

## TypeScript Support

Full TypeScript support with strict typing:

```tsx
// Basic usage
const { page, nextPage, prevPage, setPage, limit } = usePagination({
  total: 100,
  limit: 10,
  page: 1,
});

// With explicit typing
const pagination: {
  page: number;
  limit: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
} = usePagination({
  total: 100,
  limit: 10,
});

// In custom hook
function useDataPagination<T>(data: T[], itemsPerPage: number) {
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: data.length,
    limit: itemsPerPage,
  });

  const currentData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return data.slice(startIndex, startIndex + limit);
  }, [data, page, limit]);

  return {
    data: currentData,
    page,
    nextPage,
    prevPage,
    setPage,
    totalPages: Math.ceil(data.length / limit),
  };
}
```

---

## Common Pitfalls

### Don't Forget to Update Total

```tsx
// ❌ Wrong - total never updates
const { page } = usePagination({ total: 100 });

// ✅ Correct - update total when data changes
const { page } = usePagination({ total: filteredData.length });
```

### Don't Use Negative Limits

```tsx
// ❌ Wrong - negative limit will cause issues
const { page } = usePagination({ total: 100, limit: -10 });

// ✅ Correct - use positive limits
const { page } = usePagination({ total: 100, limit: 10 });
```

### Don't Exceed Total Items

```tsx
// ❌ Wrong - page will be automatically clamped
const { page } = usePagination({ total: 50, limit: 10, page: 10 }); // Will be clamped to 5

// ✅ Correct - the hook handles this automatically
const { page } = usePagination({ total: 50, limit: 10, page: 10 }); // page will be 5
```

---

## Migration from Manual Pagination

### Before Manual Pagination

```tsx
function OldPagination() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const total = 100;
  const totalPages = Math.ceil(total / limit);
  
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <button onClick={prevPage} disabled={page === 1}>Previous</button>
      <span>Page {page}</span>
      <button onClick={nextPage} disabled={page === totalPages}>Next</button>
    </div>
  );
}
```

### After usePagination

```tsx
function NewPagination() {
  const { page, nextPage, prevPage, setPage, limit } = usePagination({
    total: 100,
    limit: 10,
  });

  return (
    <div>
      <button onClick={prevPage} disabled={page === 1}>Previous</button>
      <span>Page {page}</span>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}
```

---

## Types (reference)

```ts
type UsePaginationProps = {
  total: number;
  limit?: number;
  page?: number;
};

export function usePagination({
  total,
  limit = 10,
  page = 1,
}: UsePaginationProps): {
  limit: number;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
};
```

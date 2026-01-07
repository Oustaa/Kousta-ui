---
sidebar_position: 2
---

import Badge from '@site/src/components/Badge';

# DataTable

An advanced **DataTable** component that provides a full-featured data management solution with built-in search, sorting, actions, bulk operations, and extensive customization options. Perfect for admin dashboards, data management interfaces, and complex data grids.

---

## When to use

- **Admin dashboards**: User management, content management systems
- **Data management**: Product catalogs, inventory management
- **Reports and analytics**: Financial data, performance metrics
- **CRUD operations**: When you need built-in create, read, update, delete functionality
- **Large datasets**: When you need search, filtering, and pagination
- **Interactive interfaces**: When users need to select, edit, or act on data

---

## Quick start

```tsx
import { DataTable } from "@kousta-ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
}

function UserTable() {
  const [users] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", age: 30, active: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25, active: false },
  ]);

  const headers = {
    name: { value: "name" },
    email: { value: "email" },
    age: { value: "age" },
    active: { value: "active" },
  };

  return (
    <DataTable
      data={users}
      headers={headers}
      loading={false}
      title="Users"
      keyExtractor={(row) => row.id}
      options={{
        search: (query, { visibleHeaders, props }) => {
          console.log("Searching for:", query);
        },
        actions: {
          edit: {
            onEdit: (user) => console.log("Edit user:", user),
            title: "Edit",
          },
          delete: {
            onDelete: (user) => console.log("Delete user:", user),
            title: "Delete",
          },
        },
      }}
    />
  );
}
```

---

## Core Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **Required** | Array of data items to display |
| `headers` | `THeader<T>` | **Required** | Column configuration object |
| `loading` | `boolean` | **Required** | Loading state for the table |
| `title` | `string` | **Required** | Table title displayed in the header |
| `keyExtractor` | `(row: T) => string \| number` | — | Function to extract unique keys for rows |
| `options` | `TOptions<T>` | — | Advanced options (search, actions, etc.) |
| `config` | `TConfig` | — | Table configuration and styling |

---

## Headers Configuration

The `headers` prop defines how columns are rendered and behave:

```tsx
type THeaderValue<T> = {
  value?: string;           // Property key to display
  exec?: (row: T) => ReactNode;  // Custom render function
  visible?: boolean;        // Column visibility
  canSee?: boolean;         // Conditional visibility
};
```

### Simple property mapping

```tsx
const headers = {
  name: { value: "name" },
  email: { value: "email" },
  age: { value: "age" },
};
```

### Custom rendering with exec function

```tsx
const headers = {
  user: {
    exec: (user) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={user.avatar} alt={user.name} style={{ width: 32, height: 32, borderRadius: "50%" }} />
        <div>
          <div style={{ fontWeight: "bold" }}>{user.name}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{user.email}</div>
        </div>
      </div>
    ),
  },
  status: {
    exec: (user) => (
      <Badge color={user.active ? "green" : "red"}>
        {user.active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
};
```

### Conditional visibility

```tsx
const headers = {
  salary: {
    value: "salary",
    visible: userRole === "admin", // Only show to admins
    canSee: (row) => row.canViewSalary, // Per-row visibility
  },
};
```

---

## Options Configuration

### Search Functionality

```tsx
const options = {
  search: (query: string, { visibleHeaders, props }) => {
    if (!query) return setFilteredData(originalData);

    const filtered = originalData.filter((item) =>
      Object.values(props).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredData(filtered);
  },
};
```

### Actions Configuration

```tsx
const options = {
  actions: {
    edit: {
      onEdit: (row) => console.log("Edit:", row),
      title: "Edit Item",
      buttonProps: { variant: "primary", size: "sm" },
      canEdit: (row) => row.editable, // Conditional edit permission
    },
    delete: {
      onDelete: (row) => console.log("Delete:", row),
      title: "Delete Item",
      buttonProps: { variant: "danger", size: "sm" },
      canDelete: (row) => !row.protected, // Conditional delete permission
    },
  },
};
```

### Extra Actions

```tsx
const options = {
  extraActions: [
    {
      title: "View Details",
      onClick: (row) => navigate(`/details/${row.id}`),
      Icon: <EyeIcon />,
      allowed: (row) => row.hasDetails,
    },
    {
      title: "Download",
      onClick: (row) => downloadFile(row.id),
      Icon: <DownloadIcon />,
    },
  ],
};
```

### Bulk Actions

```tsx
const options = {
  bulkActions: [
    {
      title: "Delete Selected",
      onClick: (selectedRows, clearSelection) => {
        deleteItems(selectedRows);
        clearSelection();
      },
      buttonProps: { variant: "danger" },
      canPerformAction: selectedRows.length > 0,
    },
    {
      title: "Export Selected",
      onClick: (selectedRows) => exportData(selectedRows),
      buttonProps: { variant: "secondary" },
    },
  ],
};
```

### View Component

```tsx
const options = {
  viewComp: {
    Component: (row) => <UserDetailView user={row} />,
    type: "modal", // or "extends"
    modalOptions: {
      size: "lg",
      position: "center",
    },
    openModalIcon: <EyeIcon />,
    extendRowIcon: <ExpandIcon />,
    minimizeRowIcon: <CollapseIcon />,
    openButtonProps: { variant: "outline", size: "xs" },
    canView: (row) => row.hasDetails,
  },
};
```

### Select Filters

```tsx
const options = {
  selectFilter: {
    status: (row, clearAll) => (
      <Select
        value={row.status}
        onChange={(value) => updateRowStatus(row.id, value)}
        data={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
      />
    ),
  },
};
```

### Empty State

```tsx
const options = {
  emptyTable: (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <EmptyStateIcon style={{ fontSize: "48px", color: "#9ca3af" }} />
      <h3>No data found</h3>
      <p>Try adjusting your search or filters</p>
      <Button onClick={() => setShowCreateModal(true)}>
        Add First Item
      </Button>
    </div>
  ),
};
```

---

## Configuration Options

### Table Configuration

```tsx
const config = {
  // Row expansion toggle
  toggleRows: {
    variant: "outline",
    size: "xs",
  },

  // Disable context menu
  disableContextMenu: true,

  // Hide table header
  noHead: false,

  // Select filter icon
  selectFilter: {
    icon: <FilterIcon />,
    menuProps: { position: "bottom-start" },
  },

  // Empty row icon
  emptyRowIcon: "--",

  // Custom element props
  props: {
    table: { className: "custom-table" },
    thead: { className: "custom-header" },
    tbody: { className: "custom-body" },
    th: { className: "custom-th" },
    td: { className: "custom-td" },
    tr: { className: "custom-tr" },
  },
};
```

---

## Examples

### Complete User Management Table

```tsx
function UserManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const headers = {
    avatar: {
      exec: (user) => (
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    name: { value: "name" },
    email: { value: "email" },
    role: {
      exec: (user) => (
        <Badge color={user.role === "admin" ? "purple" : "blue"}>
          {user.role}
        </Badge>
      ),
    },
    status: {
      exec: (user) => (
        <Badge color={user.active ? "green" : "red"}>
          {user.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    actions: {
      exec: (user) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button size="xs" onClick={() => editUser(user)}>
            Edit
          </Button>
          <Button
            size="xs"
            variant="danger"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  };

  const handleSearch = (query: string, { visibleHeaders, props }) => {
    setLoading(true);
    // Implement search logic
    setTimeout(() => {
      setUsers(filteredUsers);
      setLoading(false);
    }, 500);
  };

  return (
    <DataTable
      data={users}
      headers={headers}
      loading={loading}
      title="User Management"
      keyExtractor={(row) => row.id}
      options={{
        search: handleSearch,
        actions: {
          edit: {
            onEdit: (user) => editUser(user),
            title: "Edit User",
          },
          delete: {
            onDelete: (user) => deleteUser(user.id),
            title: "Delete User",
            canDelete: (user) => !user.protected,
          },
        },
        bulkActions: [
          {
            title: "Export Selected",
            onClick: (selectedUsers) => exportUsers(selectedUsers),
            buttonProps: { variant: "secondary" },
          },
          {
            title: "Deactivate Selected",
            onClick: async (selectedUsers, clearSelection) => {
              await deactivateUsers(selectedUsers);
              clearSelection();
              refreshData();
            },
            buttonProps: { variant: "warning" },
          },
        ],
        viewComp: {
          Component: (user) => <UserDetailView user={user} />,
          type: "modal",
          modalOptions: { size: "lg" },
          openModalIcon: <EyeIcon />,
        },
        emptyTable: (
          <EmptyState
            title="No users found"
            description="Create your first user to get started"
            action={<Button onClick={() => setShowCreateModal(true)}>Add User</Button>}
          />
        ),
      }}
      config={{
        toggleRows: { variant: "outline", size: "xs" },
        props: {
          table: { className: "user-table" },
          th: { style: { fontWeight: "600" } },
        },
      }}
    />
  );
}
```

### Product Catalog Table

```tsx
function ProductTable() {
  const headers = {
    image: {
      exec: (product) => (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    name: { value: "name" },
    price: {
      exec: (product) => (
        <div>
          <div style={{ fontWeight: "bold", color: "#10b981" }}>
            ${product.price}
          </div>
          {product.oldPrice && (
            <div style={{
              textDecoration: "line-through",
              color: "#9ca3af",
              fontSize: "12px"
            }}>
              ${product.oldPrice}
            </div>
          )}
        </div>
      ),
    },
    category: { value: "category" },
    stock: {
      exec: (product) => (
        <Badge color={product.stock > 10 ? "green" : "red"}>
          {product.stock} in stock
        </Badge>
      ),
    },
  };

  return (
    <DataTable
      data={products}
      headers={headers}
      loading={loading}
      title="Product Catalog"
      keyExtractor={(row) => row.id}
      options={{
        search: handleProductSearch,
        selectFilter: {
          category: (product, clearAll) => (
            <Select
              value={product.category}
              onChange={(value) => updateProductCategory(product.id, value)}
              data={categories}
            />
          ),
        },
        bulkActions: [
          {
            title: "Update Prices",
            onClick: (selectedProducts) => showBulkPriceUpdate(selectedProducts),
          },
          {
            title: "Delete Products",
            onClick: (selectedProducts, clearSelection) => {
              if (confirm(`Delete ${selectedProducts.length} products?`)) {
                deleteProducts(selectedProducts);
                clearSelection();
              }
            },
            buttonProps: { variant: "danger" },
          },
        ],
        viewComp: {
          Component: (product) => <ProductDetailView product={product} />,
          type: "extends",
          extendRowIcon: <ExpandIcon />,
          minimizeRowIcon: <CollapseIcon />,
        },
      }}
      config={{
        toggleRows: false, // No row expansion needed
        disableContextMenu: true,
      }}
    />
  );
}
```

### Financial Data Table

```tsx
function FinancialTable() {
  const headers = {
    date: { value: "date" },
    description: { value: "description" },
    type: {
      exec: (transaction) => (
        <Badge color={transaction.type === "income" ? "green" : "red"}>
          {transaction.type}
        </Badge>
      ),
    },
    amount: {
      exec: (transaction) => (
        <div style={{
          fontWeight: "bold",
          color: transaction.type === "income" ? "#10b981" : "#ef4444"
        }}>
          {transaction.type === "income" ? "+" : "-"}${transaction.amount}
        </div>
      ),
    },
    balance: {
      exec: (transaction) => (
        <div style={{ fontWeight: "600" }}>
          ${transaction.balance}
        </div>
      ),
    },
  };

  return (
    <DataTable
      data={transactions}
      headers={headers}
      loading={loading}
      title="Financial Transactions"
      keyExtractor={(row) => row.id}
      options={{
        search: (query, { visibleHeaders, props }) => {
          const filtered = transactions.filter(t =>
            t.description.toLowerCase().includes(query.toLowerCase()) ||
            t.type.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredTransactions(filtered);
        },
        actions: {
          edit: {
            onEdit: (transaction) => editTransaction(transaction),
            title: "Edit",
            canEdit: (t) => !t.locked,
          },
          delete: {
            onDelete: (transaction) => deleteTransaction(transaction.id),
            title: "Delete",
            canDelete: (t) => !t.locked,
          },
        },
        extraActions: [
          {
            title: "View Receipt",
            onClick: (transaction) => viewReceipt(transaction.id),
            Icon: <ReceiptIcon />,
            allowed: (t) => t.hasReceipt,
          },
        ],
        emptyTable: (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3>No transactions found</h3>
            <p>Add your first transaction to get started</p>
          </div>
        ),
      }}
      config={{
        props: {
          table: { style: { fontSize: "14px" } },
          th: { style: { textAlign: "left" } },
        },
      }}
    />
  );
}
```

---

## Advanced Features

### Custom Cell Components

```tsx
const CustomCell = ({ value, row, column }) => {
  // Custom logic for cell rendering
  return <div>{value}</div>;
};

const headers = {
  custom: {
    exec: (row) => <CustomCell value={row.custom} row={row} column="custom" />,
  },
};
```

### Dynamic Headers

```tsx
const [dynamicHeaders, setDynamicHeaders] = useState(initialHeaders);

useEffect(() => {
  // Update headers based on user permissions or settings
  const updatedHeaders = { ...initialHeaders };
  if (!userCanSeeSalary) {
    delete updatedHeaders.salary;
  }
  setDynamicHeaders(updatedHeaders);
}, [userPermissions]);

return (
  <DataTable
    data={data}
    headers={dynamicHeaders}
    // ... other props
  />
);
```

### Async Data Loading

```tsx
function AsyncDataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 50 });

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data?page=${pagination.page}&limit=${pagination.limit}`);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination]);

  return (
    <DataTable
      data={data}
      headers={headers}
      loading={loading}
      title="Data Table"
      keyExtractor={(row) => row.id}
      options={{
        search: handleSearch,
      }}
    />
  );
}
```

---

## Styling and Customization

### CSS Classes

```css
.ousta-data-table {
  /* Main table container */
}

.ousta-table-head {
  /* Table header section */
}

.ousta-table-body {
  /* Table body section */
}

.ousta-table-row {
  /* Table row */
}

.ousta-table-row:hover {
  background: #f8fafc;
}

.ousta-table-row.selected {
  background: #dbeafe;
}

.ousta-table-header {
  /* Header cell */
}

.ousta-table-cell {
  /* Data cell */
}
```

### Custom Styling Example

```tsx
const config = {
  props: {
    table: {
      className: "custom-data-table",
      style: { borderCollapse: "separate", borderSpacing: "0" }
    },
    th: {
      className: "custom-header",
      style: { background: "#1f2937", color: "white" }
    },
    td: {
      className: "custom-cell",
      style: { borderBottom: "1px solid #e5e7eb" }
    },
    tr: {
      className: "custom-row",
      style: { transition: "background-color 0.2s" }
    },
  },
};
```

---

## Performance Considerations

- **Virtual Scrolling**: For very large datasets, consider implementing virtual scrolling
- **Memoization**: Use React.memo for custom cell components
- **Debounced Search**: Implement debouncing for search functions
- **Pagination**: Use pagination for datasets with thousands of rows
- **Lazy Loading**: Load data on demand for better initial load performance

<Badge color="blue">Tip</Badge> The DataTable automatically handles row selection and bulk operations efficiently, even with large datasets.

---

## Accessibility

The DataTable component includes comprehensive accessibility features:

- **Semantic HTML**: Proper table structure with headers and data cells
- **ARIA Attributes**: Appropriate ARIA labels and roles
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Announcements for actions, selections, and state changes
- **Focus Management**: Proper focus handling for modals and dropdowns

<Badge color="green">Best Practice</Badge> Always provide meaningful alt text for images and clear descriptions for actions.

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ButtonProps, MenuProps, ModalProps } from "@kousta-ui/components";

// Main table props
export type TableProps<T> = {
  data: T[];
  loading: boolean;
  title: string;
  headers: THeader<T>;
  keyExtractor?: (row: T) => string | number;
  options?: TOptions<T>;
  config?: TConfig;
};

// Header configuration
export type THeaderValue<T> = {
  value?: string;
  exec?: (row: T) => ReactNode;
  visible?: boolean;
  canSee?: boolean;
};

export type THeader<T> = Record<string, THeaderValue<T>>;

// Options
export type TOptions<T> = Partial<{
  search: TSearch;
  actions: Partial<TActions<T>>;
  extraActions: Array<ExtraActions<T>>;
  emptyTable: ReactNode;
  viewComp: TViewComp<T>;
  bulkActions: TBulkActions<T>[];
  extraviews: TExtraView[];
  selectFilter: Record<string, (row: T, clearAll?: VoidFunction) => boolean>;
}>;

// Configuration
export type TConfig = {
  toggleRows?: false | Omit<ButtonProps, "onClick">;
  disableContextMenu?: boolean;
  noHead?: boolean;
  selectFilter?: { icon: ReactNode; menuProps?: MenuProps };
  emptyRowIcon?: ReactNode;
  props?: {
    table?: ComponentPropsWithoutRef<"table">;
    tbody?: ComponentPropsWithoutRef<"tbody">;
    thead?: ComponentPropsWithoutRef<"thead">;
    td?: ComponentPropsWithoutRef<"td">;
    th?: ComponentPropsWithoutRef<"th">;
    tr?: ComponentPropsWithoutRef<"tr">;
  };
};

// Action types
export type TActions<T> = {
  get: () => void;
  edit: {
    canEdit?: CanPerformAction<T>;
    onEdit: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
  };
  delete: {
    canDelete?: CanPerformAction<T>;
    onDelete: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
  };
};

export type CanPerformAction<T> = ((row: T) => boolean) | boolean;
```

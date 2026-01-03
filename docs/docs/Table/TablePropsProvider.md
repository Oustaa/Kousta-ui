---
sidebar_position: 3
---

import Badge from '@site/src/components/Badge';

# TablePropsProvider

A powerful **TablePropsProvider** that allows you to set global defaults and customize behavior for all DataTable components in your application. Perfect for maintaining consistent table styling, action configurations, and behavior across your entire application.

---

## When to use

- **Design systems**: Establish consistent table defaults across your application
- **Global actions**: Define standard edit/delete actions for all tables
- **Styling consistency**: Apply consistent CSS classes and styles to all tables
- **Behavior standardization**: Set default behaviors like context menus, row toggles
- **Theme integration**: Apply theme-specific table configurations

---

## Quick start

```tsx
import { TablePropsProvider, DataTable } from "@ousta-ui/table";

function App() {
  return (
    <TablePropsProvider
      props={{
        table: { className: "app-table" },
        th: { className: "app-header" },
        td: { className: "app-cell" },
      }}
      actions={{
        edit: {
          title: "Edit Item",
          buttonProps: { variant: "primary", size: "sm" },
        },
        delete: {
          title: "Delete Item",
          buttonProps: { variant: "danger", size: "sm" },
        },
      }}
      toggleRows={{ variant: "outline", size: "xs" }}
      disableContextMenu={false}
    >
      <div>
        {/* All DataTables will inherit these defaults */}
        <DataTable
          data={users}
          headers={userHeaders}
          loading={false}
          title="Users"
          keyExtractor={(row) => row.id}
        />

        <DataTable
          data={products}
          headers={productHeaders}
          loading={false}
          title="Products"
          keyExtractor={(row) => row.id}
        />
      </div>
    </TablePropsProvider>
  );
}
```

---

## Provider Structure

The TablePropsProvider accepts configuration for different aspects of table behavior:

```tsx
<TablePropsProvider
  props={ElementProps}
  actions={ActionConfiguration}
  toggleRows={ToggleRowConfig}
  disableContextMenu={boolean}
  noHead={boolean}
  selectFilter={SelectFilterConfig}
  viewComp={ViewComponentConfig}
  emptyTable={ReactNode}
  emptyRowIcon={ReactNode}
  keyExtractor={KeyExtractorFunction}
>
  <YourApp />
</TablePropsProvider>
```

---

## Element Props Configuration

Configure default props for table elements:

```tsx
<TablePropsProvider
  props={{
    table: {
      className: "global-table",
      style: { borderCollapse: "separate", borderSpacing: "0" },
    },
    thead: {
      className: "global-header",
      style: { background: "#f8fafc" },
    },
    tbody: {
      className: "global-body",
    },
    th: {
      className: "global-th",
      style: { fontWeight: "600", padding: "12px" },
    },
    td: {
      className: "global-td",
      style: { padding: "12px", borderBottom: "1px solid #e5e7eb" },
    },
    tr: {
      className: "global-tr",
      style: { transition: "background-color 0.2s" },
    },
  }}
>
  <YourApp />
</TablePropsProvider>
```

### Element Props Reference

| Element | Props Type | Description |
|---------|------------|-------------|
| `table` | `ComponentPropsWithoutRef<"table">` | Main table element props |
| `thead` | `ComponentPropsWithoutRef<"thead">` | Table header section props |
| `tbody` | `ComponentPropsWithoutRef<"tbody">` | Table body section props |
| `th` | `ComponentPropsWithoutRef<"th">` | Header cell props |
| `td` | `ComponentPropsWithoutRef<"td">` | Data cell props |
| `tr` | `ComponentPropsWithoutRef<"tr">` | Table row props |

---

## Actions Configuration

Define global action configurations for edit and delete operations:

```tsx
<TablePropsProvider
  actions={{
    edit: {
      title: "Edit Item",
      buttonProps: {
        variant: "primary",
        size: "sm",
        style: { marginRight: "8px" },
      },
    },
    delete: {
      title: "Delete Item",
      buttonProps: {
        variant: "danger",
        size: "sm",
      },
    },
  }}
>
  <YourApp />
</TablePropsProvider>
```

### Actions Reference

| Property | Type | Description |
|----------|------|-------------|
| `edit.title` | `string \| ReactNode` | Default edit button title |
| `edit.buttonProps` | `ButtonProps` | Default edit button props |
| `delete.title` | `string \| ReactNode` | Default delete button title |
| `delete.buttonProps` | `ButtonProps` | Default delete button props |

---

## Behavior Configuration

### Row Toggle Configuration

```tsx
<TablePropsProvider
  toggleRows={{
    variant: "outline",
    size: "xs",
    style: { marginRight: "8px" },
  }}
>
  <YourApp />
</TablePropsProvider>
```

### Context Menu Control

```tsx
<TablePropsProvider
  disableContextMenu={true} // Disable context menus globally
>
  <YourApp />
</TablePropsProvider>
```

### Header Visibility

```tsx
<TablePropsProvider
  noHead={false} // Show table headers by default
>
  <YourApp />
</TablePropsProvider>
```

---

## Advanced Configuration

### Select Filter Configuration

```tsx
<TablePropsProvider
  selectFilter={{
    icon: <FilterIcon />,
    menuProps: {
      position: "bottom-start",
      offset: 4,
    },
  }}
>
  <YourApp />
</TablePropsProvider>
```

### View Component Configuration

```tsx
<TablePropsProvider
  viewComp={{
    type: "modal",
    modalOptions: {
      size: "lg",
      position: "center",
      withBackdrop: true,
    },
    openModalIcon: <EyeIcon />,
    extendRowIcon: <ExpandIcon />,
    minimizeRowIcon: <CollapseIcon />,
    openButtonProps: {
      variant: "outline",
      size: "xs",
    },
  }}
>
  <YourApp />
</TablePropsProvider>
```

### Empty State Configuration

```tsx
<TablePropsProvider
  emptyTable={
    <div style={{ textAlign: "center", padding: "40px" }}>
      <EmptyIcon style={{ fontSize: "48px", color: "#9ca3af" }} />
      <h3>No data available</h3>
      <p>There are no items to display</p>
    </div>
  }
  emptyRowIcon="--"
>
  <YourApp />
</TablePropsProvider>
```

### Key Extractor Configuration

```tsx
<TablePropsProvider
  keyExtractor={(row) => row.id || row.uuid}
>
  <YourApp />
</TablePropsProvider>
```

---

## Provider vs Local Props Behavior

Understanding how provider and local props interact is crucial:

### 1. Local Props Override Provider Defaults

```tsx
<TablePropsProvider
  actions={{
    edit: {
      title: "Global Edit",
      buttonProps: { variant: "primary" },
    },
  }}
>
  {/* This button will be "Custom Edit" with secondary variant */}
  <DataTable
    options={{
      actions: {
        edit: {
          title: "Custom Edit",
          buttonProps: { variant: "secondary" },
        },
      },
    }}
    // ... other props
  />
</TablePropsProvider>
```

### 2. Provider Props Fill Missing Local Props

```tsx
<TablePropsProvider
  actions={{
    edit: {
      title: "Global Edit",
      buttonProps: { variant: "primary" },
    },
  }}
>
  {/* This button will be "Local Edit" with primary variant (from provider) */}
  <DataTable
    options={{
      actions: {
        edit: {
          title: "Local Edit", // Only title overridden
          // buttonProps inherited from provider
        },
      },
    }}
    // ... other props
  />
</TablePropsProvider>
```

### 3. Element Props Merge Strategy

```tsx
<TablePropsProvider
  props={{
    table: { className: "provider-table" },
    th: { style: { background: "#f8fafc" } },
  }}
>
  {/* Final table will have both classes merged */}
  <DataTable
    config={{
      props: {
        table: { className: "local-table" }, // Merged: "provider-table local-table"
        th: { style: { color: "#1f2937" } }, // Merged styles
      },
    }}
    // ... other props
  />
</TablePropsProvider>
```

---

## Examples

### Complete Application Configuration

```tsx
function App() {
  return (
    <TablePropsProvider
      props={{
        table: {
          className: "app-table",
          style: {
            borderCollapse: "separate",
            borderSpacing: "0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          },
        },
        thead: {
          className: "app-table-header",
          style: { background: "#1f2937", color: "white" },
        },
        th: {
          className: "app-table-th",
          style: {
            fontWeight: "600",
            padding: "16px",
            textAlign: "left",
            border: "none"
          },
        },
        td: {
          className: "app-table-td",
          style: {
            padding: "16px",
            borderBottom: "1px solid #e5e7eb"
          },
        },
        tr: {
          className: "app-table-row",
          style: { transition: "all 0.2s" },
        },
      }}
      actions={{
        edit: {
          title: "Edit",
          buttonProps: {
            variant: "primary",
            size: "sm",
            style: { marginRight: "8px" },
          },
        },
        delete: {
          title: "Delete",
          buttonProps: {
            variant: "danger",
            size: "sm",
          },
        },
      }}
      toggleRows={{
        variant: "outline",
        size: "xs",
      }}
      disableContextMenu={false}
      emptyTable={
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "#f3f4f6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <DocumentIcon style={{ fontSize: "32px", color: "#9ca3af" }} />
          </div>
          <h3 style={{ margin: "0 0 8px", color: "#1f2937" }}>No data found</h3>
          <p style={{ margin: "0 0 20px", color: "#6b7280" }}>
            Get started by creating your first item
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            Create New Item
          </Button>
        </div>
      }
      emptyRowIcon="--"
      keyExtractor={(row) => row.id || row.uuid}
    >
      <Router>
        <Routes>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Router>
    </TablePropsProvider>
  );
}
```

### Theme-Based Provider

```tsx
function ThemeProvider({ children, theme }) {
  const themeConfig = {
    light: {
      props: {
        table: { className: "light-table" },
        th: { style: { background: "#f8fafc", color: "#1f2937" } },
        td: { style: { borderBottom: "1px solid #e5e7eb" } },
      },
      actions: {
        edit: { buttonProps: { variant: "primary" } },
        delete: { buttonProps: { variant: "danger" } },
      },
    },
    dark: {
      props: {
        table: { className: "dark-table" },
        th: { style: { background: "#1f2937", color: "#f9fafb" } },
        td: { style: { borderBottom: "1px solid #374151" } },
      },
      actions: {
        edit: { buttonProps: { variant: "primary-light" } },
        delete: { buttonProps: { variant: "danger-light" } },
      },
    },
  };

  return (
    <TablePropsProvider {...themeConfig[theme]}>
      {children}
    </TablePropsProvider>
  );
}

// Usage
<ThemeProvider theme="dark">
  <App />
</ThemeProvider>
```

### Section-Specific Providers

```tsx
function AdminSection() {
  return (
    <TablePropsProvider
      actions={{
        edit: {
          title: "Edit User",
          buttonProps: { variant: "primary", size: "sm" },
        },
        delete: {
          title: "Delete User",
          buttonProps: { variant: "danger", size: "sm" },
        },
      }}
      toggleRows={{ variant: "outline", size: "xs" }}
    >
      <div className="admin-section">
        <h2>User Management</h2>
        <DataTable
          data={users}
          headers={userHeaders}
          loading={loading}
          title="Users"
          keyExtractor={(row) => row.id}
          options={{
            search: handleUserSearch,
            bulkActions: [
              {
                title: "Export Users",
                onClick: (selectedUsers) => exportUsers(selectedUsers),
              },
            ],
          }}
        />
      </div>
    </TablePropsProvider>
  );
}

function PublicSection() {
  return (
    <TablePropsProvider
      actions={undefined} // No actions in public section
      disableContextMenu={true}
      toggleRows={false}
    >
      <div className="public-section">
        <h2>Public Data</h2>
        <DataTable
          data={publicData}
          headers={publicHeaders}
          loading={loading}
          title="Public Information"
          keyExtractor={(row) => row.id}
        />
      </div>
    </TablePropsProvider>
  );
}
```

### Nested Providers

```tsx
function App() {
  return (
    // Global defaults
    <TablePropsProvider
      props={{
        table: { className: "global-table" },
        th: { style: { background: "#f8fafc" } },
      }}
      actions={{
        edit: { title: "Edit", buttonProps: { variant: "primary" } },
        delete: { title: "Delete", buttonProps: { variant: "danger" } },
      }}
    >
      <Header />

      {/* Override for admin section */}
      <TablePropsProvider
        actions={{
          edit: {
            title: "Edit Admin",
            buttonProps: { variant: "primary", size: "sm" }
          },
          delete: {
            title: "Delete Admin",
            buttonProps: { variant: "danger", size: "sm" }
          },
        }}
        toggleRows={{ variant: "outline", size: "xs" }}
      >
        <AdminDashboard />
      </TablePropsProvider>

      <Footer />
    </TablePropsProvider>
  );
}
```

---

## Dynamic Configuration

```tsx
function DynamicTableProvider({ children }) {
  const [config, setConfig] = useState({
    props: {
      table: { className: "default-table" },
    },
    actions: {
      edit: { title: "Edit", buttonProps: { variant: "primary" } },
    },
  });

  // Update configuration based on user preferences
  useEffect(() => {
    const userPrefs = getUserPreferences();
    setConfig({
      props: {
        table: {
          className: userPrefs.denseMode ? "dense-table" : "default-table"
        },
      },
      actions: {
        edit: {
          title: userPrefs.language === "es" ? "Editar" : "Edit",
          buttonProps: {
            variant: userPrefs.theme === "dark" ? "primary-light" : "primary"
          }
        },
      },
    });
  }, [userPrefs]);

  return (
    <TablePropsProvider {...config}>
      {children}
    </TablePropsProvider>
  );
}
```

---

## Performance Considerations

- **Provider Context**: Uses React Context for efficient prop distribution
- **Selective Updates**: Only tables that use affected props will re-render
- **Shallow Comparison**: Props are compared shallowly to avoid unnecessary re-renders
- **Static Configuration**: Best performance when configuration doesn't change frequently

<Badge color="green">Tip</Badge> Keep provider configuration stable and avoid frequent updates for optimal performance.

---

## Migration Guide

### From Individual Table Configuration

**Before:**
```tsx
// Multiple tables with repeated configuration
<DataTable
  data={users}
  headers={userHeaders}
  loading={false}
  title="Users"
  config={{
    props: {
      table: { className: "app-table" },
      th: { style: { background: "#f8fafc" } },
    },
  }}
  options={{
    actions: {
      edit: { title: "Edit", buttonProps: { variant: "primary" } },
      delete: { title: "Delete", buttonProps: { variant: "danger" } },
    },
  }}
/>

<DataTable
  data={products}
  headers={productHeaders}
  loading={false}
  title="Products"
  config={{
    props: {
      table: { className: "app-table" },
      th: { style: { background: "#f8fafc" } },
    },
  }}
  options={{
    actions: {
      edit: { title: "Edit", buttonProps: { variant: "primary" } },
      delete: { title: "Delete", buttonProps: { variant: "danger" } },
    },
  }}
/>
```

**After:**
```tsx
<TablePropsProvider
  props={{
    table: { className: "app-table" },
    th: { style: { background: "#f8fafc" } },
  }}
  actions={{
    edit: { title: "Edit", buttonProps: { variant: "primary" } },
    delete: { title: "Delete", buttonProps: { variant: "danger" } },
  }}
>
  <DataTable
    data={users}
    headers={userHeaders}
    loading={false}
    title="Users"
  />

  <DataTable
    data={products}
    headers={productHeaders}
    loading={false}
    title="Products"
  />
</TablePropsProvider>
```

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ButtonProps, MenuProps, ModalProps } from "@ousta-ui/components";

type PropsContextType = Partial<{
  props: {
    table?: ComponentPropsWithoutRef<"table">;
    tbody?: ComponentPropsWithoutRef<"tbody">;
    thead?: ComponentPropsWithoutRef<"thead">;
    td?: ComponentPropsWithoutRef<"td">;
    th?: ComponentPropsWithoutRef<"th">;
    tr?: ComponentPropsWithoutRef<"tr">;
  };
  actions: {
    delete?: {
      title?: string | ReactNode;
      buttonProps?: ButtonProps;
    };
    edit?: {
      title?: string | ReactNode;
      buttonProps?: ButtonProps;
    };
  };
  toggleRows: false | Omit<ButtonProps, "onClick">;
  disableContextMenu: boolean;
  noHead: boolean;
  selectFilter: { icon: ReactNode; menuProps?: MenuProps };
  viewComp: {
    type?: "modal" | "extends";
    modalOptions?: Omit<ModalProps, "opened" | "onClose" | "modalTrigger">;
    openModalIcon?: ReactNode;
    extendRowIcon?: ReactNode;
    minimizeRowIcon?: ReactNode;
    openButtonProps?: Omit<ButtonProps, "onClick">;
  };
  emptyTable: ReactNode;
  emptyRowIcon: ReactNode;
  keyExtractor?: (row: unknown) => string | number;
}>;

export const TablePropsProvider: ({
  children,
  ...value
}: PropsWithChildren<PropsContextType>) => JSX.Element;
```

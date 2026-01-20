---
sidebar_position: 0
title: Overview
---

import Badge from '@site/src/components/Badge';

# Table Package

The **@kousta-ui/table** package provides table components for displaying and managing tabular data. It offers both a basic `Table` component for simple use cases and an advanced `DataTable` component with built-in features like selection, actions, and extensible options.

---

## 🚀 Features

- **Two Component Types**: Basic `Table` for simple layouts and advanced `DataTable` for complex data management
- **TypeScript First**: Full TypeScript support with generic type safety
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Customizable**: Extensive styling options and TablePropsProvider for global configuration
- **Performance Optimized**: Efficient rendering for large datasets
- **Responsive Design**: Mobile-friendly table layouts
- **Built-in Features**: Search, sorting, actions, bulk operations, and more

---

## 📦 Installation

```bash
npm install @kousta-ui/table
# or
yarn add @kousta-ui/table
# or
pnpm add @kousta-ui/table
```

### Import styles

```tsx
import "@kousta-ui/styles/tokens.css";
```

---

## 🎯 Quick Start

### Basic Table

```tsx
import { Table } from "@kousta-ui/table";

function BasicTable() {
  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Age</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>John Doe</Table.Td>
          <Table.Td>john@example.com</Table.Td>
          <Table.Td>30</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Jane Smith</Table.Td>
          <Table.Td>jane@example.com</Table.Td>
          <Table.Td>25</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table.Root>
  );
}
```

### Advanced DataTable

```tsx
import { DataTable } from "@kousta-ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function AdvancedTable() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  ]);

  const headers = {
    name: { value: "name" },
    email: { value: "email" },
    age: { value: "age" },
  };

  return (
    <DataTable
      data={users}
      headers={headers}
      loading={false}
      title="Users"
      keyExtractor={(row) => row.id}
      actions={{
        search: {
          static: true,
          searchOnType: true,
          searchTimer: 300,
          onSearch: (row, { reg }) => {
            return reg.test(row.name) || reg.test(row.email);
          },
        },
        edit: {
          title: "Edit",
          onEdit: (user) => console.log("Edit user:", user),
        },
        delete: {
          title: "Delete",
          onDelete: (user) => console.log("Delete user:", user),
        },
      }}
    />
  );
}
```

---

## 📊 Table vs DataTable

### Table Component

**Use when you need:**
- Simple, static data display
- Full control over markup and styling
- Basic table structure without built-in features
- Custom rendering logic

**Features:**
- Lightweight and minimal
- Full control over table structure
- Basic styling with CSS classes
- Accessibility built-in

**Example use cases:**
- Simple data grids
- Pricing tables
- Feature comparison tables
- Static reports

### DataTable Component

**Use when you need:**
- Dynamic data management
- Built-in search and filtering
- Row actions and bulk operations
- Advanced features out of the box

**Features:**
- Search functionality
- Row selection
- Built-in actions (edit, delete, custom)
- Bulk operations
- Context menus
- Loading states
- Empty state handling
- Custom cell rendering

**Example use cases:**
- Admin dashboards
- Data management interfaces
- User management tables
- Product catalogs
- Financial reports

<Badge color="blue">Recommendation</Badge> Start with `Table` for simple cases, upgrade to `DataTable` as your requirements grow.

---

## 🎨 Customization

### TablePropsProvider

Set global defaults for all tables:

```tsx
import { TablePropsProvider } from "@kousta-ui/table";

<TablePropsProvider
  props={{
    table: { className: "global-table" },
    th: { className: "global-header" },
    td: { className: "global-cell" },
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
  toggleRows={{
    variant: "neutral-outline",
    size: "sm",
  }}
>
  <YourApp />
</TablePropsProvider>
```

---

## ♿ Accessibility

All table components are built with accessibility as a priority:

- **Semantic HTML**: Proper table structure with `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- **ARIA Attributes**: Proper roles and labels for screen readers
- **Keyboard Navigation**: Full keyboard support for interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Announcements for actions, selections, and state changes

---

## 🔧 TypeScript Support

Full TypeScript support with generic types:

```tsx
import { DataTable, TableProps } from "@kousta-ui/table";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserTable({ users }: { users: User[] }) {
  const headers = {
    name: { value: "name" },
    email: { value: "email" },
  };

  return (
    <DataTable<User>
      data={users}
      headers={headers}
      loading={false}
      title="Users"
      keyExtractor={(row) => row.id}
    />
  );
}
```

---

## 📚 Advanced Examples

### Custom Cell Rendering

```tsx
const headers = {
  name: { value: "name" },
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
        <Button size="xs" variant="danger" onClick={() => deleteUser(user)}>
          Delete
        </Button>
      </div>
    ),
  },
};
```

### Bulk Actions

```tsx
const options = {
  bulkActions: [
    {
      title: "Delete Selected",
      onClick: (selectedUsers, clearSelection) => {
        console.log("Deleting:", selectedUsers);
        clearSelection();
      },
      buttonProps: { variant: "danger" },
    },
    {
      title: "Export Selected",
      onClick: (selectedUsers) => {
        console.log("Exporting:", selectedUsers);
      },
      buttonProps: { variant: "secondary" },
    },
  ],
};
```

### Search Implementation

```tsx
const handleSearch = (query: string, { visibleHeaders, props }) => {
  if (!query) {
    setUsers(originalUsers);
    return;
  }

  const filtered = originalUsers.filter((user) =>
    Object.values(props).some((value) =>
      String(value).toLowerCase().includes(query.toLowerCase())
    )
  );

  setUsers(filtered);
};

const options = {
  search: handleSearch,
};
```

---

## 🔄 Migration Guide

### From HTML Tables

**Before:**
```tsx
<table className="my-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>john@example.com</td>
    </tr>
  </tbody>
</table>
```

**After:**
```tsx
<Table.Root>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Name</Table.Th>
      <Table.Th>Email</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    <Table.Tr>
      <Table.Td>John</Table.Td>
      <Table.Td>john@example.com</Table.Td>
    </Table.Tr>
  </Table.Tbody>
</Table.Root>
```

### From Other Table Libraries

The API is designed to be familiar while providing enhanced features. Most table libraries can be migrated by:

1. Replacing the table components with Kousta UI equivalents
2. Converting column definitions to the header format
3. Implementing actions using the built-in action system
4. Applying styling through CSS variables or provider

---

## 📖 Next Steps

- Explore [Table component documentation](/docs/Table/overview)
- Learn about [DataTable features](/docs/Table/DataTable/overview)
- Master [TablePropsProvider](/docs/Table/DataTable/TablePropsProvider)
- Check out [Table](/docs/Table/overview)
- [Hooks](/docs/hooks/overview)
- [Helpers](/docs/helpers/overview)
 for table interactions

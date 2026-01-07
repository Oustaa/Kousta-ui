---
sidebar_position: 1
---

import Badge from '@site/src/components/Badge';

# Table

A lightweight, accessible **Table** component that provides the fundamental building blocks for creating custom tables. Perfect for simple data display, pricing tables, feature comparisons, and when you need full control over the table structure.

---

## When to use

- **Simple data display**: When you need to show static or simple dynamic data
- **Pricing tables**: For subscription plans, feature comparisons
- **Reports and dashboards**: When you have complete control over data processing
- **Custom table logic**: When you need to implement your own search, sort, or pagination
- **Performance-critical**: When you want the minimal possible bundle size

---

## Quick start

```tsx
import { Table } from "@kousta-ui/table";

export default function BasicTable() {
  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Features</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>Basic Plan</Table.Td>
          <Table.Td>$9/month</Table.Td>
          <Table.Td>10GB Storage, Email Support</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Pro Plan</Table.Td>
          <Table.Td>$29/month</Table.Td>
          <Table.Td>100GB Storage, Priority Support</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table.Root>
  );
}
```

---

## Components

The Table component exports the following sub-components:

| Component | HTML Element | Purpose |
|-----------|--------------|---------|
| `Table.Root` | `<table>` | Main table container |
| `Table.Thead` | `<thead>` | Table header section |
| `Table.Tbody` | `<tbody>` | Table body section |
| `Table.Tr` | `<tr>` | Table row |
| `Table.Th` | `<th>` | Table header cell |
| `Table.Td` | `<td>` | Table data cell |

---

## Props

### Table.Root

All native `<table>` props are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Table content (thead, tbody, etc.) |
| `className` | `string` | — | Additional CSS classes |
| `...rest` | `ComponentPropsWithoutRef<"table">` | — | Any native table props |

<Badge color="blue">Note</Badge> The component validates that children are provided and are valid React elements.

### Table.Thead

All native `<thead>` props are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Header row content |
| `className` | `string` | — | Additional CSS classes |
| `...rest` | `ComponentPropsWithoutRef<"thead">` | — | Any native thead props |

### Table.Tbody

All native `<tbody>` props are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Body row content |
| `className` | `string` | — | Additional CSS classes |
| `...rest` | `ComponentPropsWithoutRef<"tbody">` | — | Any native tbody props |

### Table.Tr

All native `<tr>` props are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Cell content (th/td elements) |
| `className` | `string` | — | Additional CSS classes |
| `...rest` | `ComponentPropsWithoutRef<"tr">` | — | Any native tr props |

### Table.Th

All native `<th>` props are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Header cell content |
| `className` | `string` | — | Additional CSS classes |
| `...rest` | `ComponentPropsWithoutRef<"th">` | — | Any native th props |

### Table.Td

All native `<td>` props are supported:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Data cell content |
| `className` | `string` | — | Additional CSS classes |
| `...rest` | `ComponentPropsWithoutRef<"td">` | — | Any native td props |

---

## Examples

### Basic data table

```tsx
function UserTable() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "User" },
  ];

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Role</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.role}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
```

### Pricing table

```tsx
function PricingTable() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      features: ["10GB Storage", "Email Support", "Basic Analytics"],
    },
    {
      name: "Pro",
      price: "$29",
      features: ["100GB Storage", "Priority Support", "Advanced Analytics"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited Storage", "24/7 Support", "Custom Features"],
    },
  ];

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Plan</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Features</Table.Th>
        </Table.Str>
      </Table.Thead>
      <Table.Tbody>
        {plans.map((plan, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <strong>{plan.name}</strong>
            </Table.Td>
            <Table.Td>{plan.price}/month</Table.Td>
            <Table.Td>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
```

### Table with custom styling

```tsx
function StyledTable() {
  return (
    <Table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th
            style={{
              background: "#f8fafc",
              padding: "12px",
              textAlign: "left",
              borderBottom: "2px solid #e2e8f0"
            }}
          >
            Column 1
          </Table.Th>
          <Table.Th
            style={{
              background: "#f8fafc",
              padding: "12px",
              textAlign: "left",
              borderBottom: "2px solid #e2e8f0"
            }}
          >
            Column 2
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
            Data 1
          </Table.Td>
          <Table.Td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
            Data 2
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
```

### Responsive table with horizontal scroll

```tsx
function ResponsiveTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table style={{ minWidth: "600px" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Country</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {/* Table rows */}
        </Table.Tbody>
      </Table>
    </div>
  );
}
```

### Table with interactive rows

```tsx
function InteractiveTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedRow(selectedRow === id ? null : id);
  };

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {[
          { id: 1, name: "John Doe", status: "Active" },
          { id: 2, name: "Jane Smith", status: "Inactive" },
        ].map((user) => (
          <Table.Tr
            key={user.id}
            onClick={() => handleRowClick(user.id)}
            style={{
              cursor: "pointer",
              background: selectedRow === user.id ? "#e0f2fe" : "transparent",
            }}
          >
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.status}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
```

### Table with complex cell content

```tsx
function ComplexTable() {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Progress</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#e0e7ff"
              }}>
                JD
              </div>
              <div>
                <div style={{ fontWeight: "bold" }}>John Doe</div>
                <div style={{ fontSize: "12px", color: "#666" }}>john@example.com</div>
              </div>
            </div>
          </Table.Td>
          <Table.Td>
            <div style={{ width: "100px" }}>
              <div style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: "75%",
                  background: "#10b981"
                }} />
              </div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>75%</div>
            </div>
          </Table.Td>
          <Table.Td>
            <div style={{ display: "flex", gap: "4px" }}>
              <button style={{ padding: "4px 8px", fontSize: "12px" }}>
                Edit
              </button>
              <button style={{ padding: "4px 8px", fontSize: "12px" }}>
                Delete
              </button>
            </div>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
```

---

## Styling

### CSS Classes

Each component applies specific CSS classes:

| Component | Class Name | Purpose |
|-----------|------------|---------|
| `Table.Root` | `.kui-table` | Main table styling |
| `Table.Thead` | `.Ouithead` | Header section styling |
| `Table.Tbody` | `.Ouitbody` | Body section styling |
| `Table.Tr` | `.Ouitr` | Row styling |
| `Table.Th` | `.Ouith` | Header cell styling |
| `Table.Td` | `.Ouitd` | Data cell styling |

### CSS Variables

Customize appearance using CSS variables:

```css
:root {
  --ousta-table-border: #e5e7eb;
  --ousta-table-header-bg: #f9fafb;
  --ousta-table-row-hover: #f3f4f6;
  --ousta-table-cell-padding: 12px;
}
```

### Custom styling example

```css
.custom-table .kui-table {
  border: 1px solid var(--ousta-table-border);
  border-radius: 8px;
  overflow: hidden;
}

.custom-table .Ouithead {
  background: var(--ousta-table-header-bg);
}

.custom-table .Ouitr:hover {
  background: var(--ousta-table-row-hover);
}

.custom-table .Ouith,
.custom-table .Ouitd {
  padding: var(--ousta-table-cell-padding);
  text-align: left;
  border-bottom: 1px solid var(--ousta-table-border);
}

.custom-table .Ouitr:last-child .Ouitd {
  border-bottom: none;
}
```

---

## Accessibility

The Table component provides built-in accessibility features:

- **Semantic HTML**: Uses proper table elements for screen readers
- **ARIA Roles**: Automatically applies `role="table"`, `role="tr"`, etc.
- **Keyboard Navigation**: Native table keyboard support
- **Screen Reader Support**: Proper table structure announcements

<Badge color="green">Best Practice</Badge> Always include proper headers (`<th>`) and scope attributes for complex tables:

```tsx
<Table.Th scope="col">Name</Table.Th>
<Table.Th scope="col">Email</Table.Th>
```

---

## Performance Considerations

- **Lightweight**: Minimal bundle impact with no unnecessary dependencies
- **Virtualization Ready**: Can be combined with virtualization libraries for large datasets
- **CSS Modules**: Scoped CSS prevents style conflicts
- **No Internal State**: Stateless design allows for optimal React performance

<Badge color="blue">Tip</Badge> For very large datasets, consider implementing virtual scrolling or pagination to maintain performance.

---

## Migration from HTML Tables

### Simple conversion

**Before:**
```tsx
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
```

**After:**
```tsx
<Table>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Name</Table.Th>
      <Table.Th>Age</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    <Table.Tr>
      <Table.Td>John</Table.Td>
      <Table.Td>30</Table.Td>
    </Table.Tr>
  </Table.Tbody>
</Table>
```

---

## When to Upgrade to DataTable

Consider upgrading to `DataTable` when you need:

- Built-in search and filtering
- Row selection and bulk actions
- Built-in edit/delete actions
- Context menus
- Loading states
- Empty state handling
- Advanced cell rendering

<Badge color="yellow">Note</Badge> You can gradually migrate by starting with Table and adding features as needed.

---

## Types (reference)

```ts
import { ComponentPropsWithRef, PropsWithChildren, ReactNode } from "react";

// Table Root
type TableProps = PropsWithChildren<ComponentPropsWithRef<"table">>;

// Table Head
type TheadProps = PropsWithChildren<ComponentPropsWithRef<"thead">>;

// Table Body
type TbodyProps = PropsWithChildren<ComponentPropsWithRef<"tbody">>;

// Table Row
type TrProps = PropsWithChildren<ComponentPropsWithRef<"tr">>;

// Table Header Cell
type ThProps = PropsWithChildren<ComponentPropsWithRef<"th">>;

// Table Data Cell
type TdProps = PropsWithChildren<ComponentPropsWithRef<"td">>;

// Exported object
const Table = {
  Root: TableComponent,
  Thead: TheadComponent,
  Tbody: TbodyComponent,
  Tr: TrComponent,
  Th: ThComponent,
  Td: TdComponent,
};
```

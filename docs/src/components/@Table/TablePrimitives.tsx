"use client";

import { useState } from "react";
import { Table } from "@kousta-ui/table";

/** Quick start — the shape every other example builds on */
export const QuickStartPreview = () => (
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

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "User" },
];

export const BasicDataTablePreview = () => (
  <Table.Root>
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
  </Table.Root>
);

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

export const PricingTablePreview = () => (
  <Table.Root>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Plan</Table.Th>
        <Table.Th>Price</Table.Th>
        <Table.Th>Features</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {plans.map((plan) => (
        <Table.Tr key={plan.name}>
          <Table.Td>
            <strong>{plan.name}</strong>
          </Table.Td>
          <Table.Td>{plan.price}/month</Table.Td>
          <Table.Td>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table.Root>
);

/**
 * Every part takes the DOM props of the element it renders, so `style` and
 * `className` land where you would expect.
 */
export const StyledTablePreview = () => (
  <Table.Root style={{ borderCollapse: "collapse", width: "100%" }}>
    <Table.Thead>
      <Table.Tr>
        <Table.Th
          style={{
            background: "var(--kui-primary-600)",
            color: "#fff",
            padding: "12px",
            textAlign: "left",
          }}
        >
          Column 1
        </Table.Th>
        <Table.Th
          style={{
            background: "var(--kui-primary-600)",
            color: "#fff",
            padding: "12px",
            textAlign: "left",
          }}
        >
          Column 2
        </Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Tr>
        <Table.Td style={{ padding: "12px" }}>Data 1</Table.Td>
        <Table.Td style={{ padding: "12px" }}>Data 2</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td style={{ padding: "12px" }}>Data 3</Table.Td>
        <Table.Td style={{ padding: "12px" }}>Data 4</Table.Td>
      </Table.Tr>
    </Table.Tbody>
  </Table.Root>
);

const wideRows = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555 0100",
    address: "12 Market St",
    city: "Lisbon",
    country: "Portugal",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555 0111",
    address: "8 Rue Victor Hugo",
    city: "Casablanca",
    country: "Morocco",
  },
];

/** The scroll container is yours — `Table.Root` does not add one */
export const ResponsiveTablePreview = () => (
  <div style={{ overflowX: "auto" }}>
    <Table.Root style={{ minWidth: "600px" }}>
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
        {wideRows.map((row) => (
          <Table.Tr key={row.id}>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>{row.phone}</Table.Td>
            <Table.Td>{row.address}</Table.Td>
            <Table.Td>{row.city}</Table.Td>
            <Table.Td>{row.country}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table.Root>
  </div>
);

export const InteractiveTablePreview = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <Table.Root>
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
            onClick={() =>
              setSelectedRow(selectedRow === user.id ? null : user.id)
            }
            style={{
              cursor: "pointer",
              background:
                selectedRow === user.id
                  ? "var(--kui-primary-600)"
                  : "transparent",
              color: selectedRow === user.id ? "#fff" : undefined,
            }}
          >
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.status}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table.Root>
  );
};

/** A cell is a `<td>` — put whatever you like in it */
export const ComplexCellPreview = () => (
  <Table.Root>
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
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontSize: "12px",
                background: "var(--kui-primary-600)",
                color: "#fff",
              }}
            >
              JD
            </div>
            <div>
              <div style={{ fontWeight: "bold" }}>John Doe</div>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>
                john@example.com
              </div>
            </div>
          </div>
        </Table.Td>
        <Table.Td>
          <div style={{ width: "100px" }}>
            <div
              style={{
                height: "8px",
                background: "var(--kui-neutral-700)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "75%",
                  background: "var(--kui-success-600)",
                }}
              />
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
  </Table.Root>
);

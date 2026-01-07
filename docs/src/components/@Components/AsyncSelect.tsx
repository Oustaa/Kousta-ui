import React from "react";
import { AsyncSelect } from "@kousta-ui/components";

// --- Mock API ---
type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type ApiResponse = {
  items: User[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

const allUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.d@example.com', avatar: 'https://i.pravatar.cc/40?u=1' },
  { id: '2', name: 'Jane Smith', email: 'jane.s@example.com', avatar: 'https://i.pravatar.cc/40?u=2' },
  { id: '3', name: 'Peter Jones', email: 'peter.j@example.com', avatar: 'https://i.pravatar.cc/40?u=3' },
  { id: '4', name: 'Mary Williams', email: 'mary.w@example.com', avatar: 'https://i.pravatar.cc/40?u=4' },
  { id: '5', name: 'David Brown', email: 'david.b@example.com', avatar: 'https://i.pravatar.cc/40?u=5' },
  { id: '6', name: 'Susan Davis', email: 'susan.d@example.com', avatar: 'https://i.pravatar.cc/40?u=6' },
  { id: '7', name: 'Michael Miller', email: 'michael.m@example.com', avatar: 'https://i.pravatar.cc/40?u=7' },
  { id: '8', name: 'Linda Wilson', email: 'linda.w@example.com', avatar: 'https://i.pravatar.cc/40?u=8' },
];

const mockApi = ({ page, limit, searchTerm }): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const totalItems = filteredUsers.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const items = filteredUsers.slice(startIndex, endIndex);

      resolve({
        items,
        totalItems,
        totalPages,
        currentPage: page,
      });
    }, 500); // Simulate network delay
  });
};
// --- End Mock API ---

export const QuickStartPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <AsyncSelect<User>
      label="Search Users"
      getData={mockApi}
      extractDynamicData={(response: ApiResponse) => response.items}
      hasMore={(response: ApiResponse, page) => page < response.totalPages}
      options={{ value: "id", label: "name" }}
      placeholder="Type to search users..."
    />
  </div>
);

export const CustomRenderPreview = () => (
    <div style={{ width: "100%", maxWidth: 420 }}>
    <AsyncSelect<User>
      label="Assign to User"
      getData={mockApi}
      extractDynamicData={(response: ApiResponse) => response.items}
      hasMore={(response: ApiResponse, page) => page < response.totalPages}
      options={{
        value: "id",
        label: "name",
        renderOption: (user: User) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: 24, height: 24, borderRadius: "50%" }}
            />
            <div>
              <div style={{ fontWeight: "bold" }}>{user.name}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>{user.email}</div>
            </div>
          </div>
        )
      }}
      placeholder="Search users by name or email..."
    />
  </div>
);

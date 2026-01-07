---
sidebar_position: 0
title: Helpers Overview
---

import Badge from '@site/src/components/Badge';

# Helpers Package

The **@kousta-ui/helpers** package provides a small set of framework-agnostic utility functions.

---

## 🚀 Features

- **Framework Agnostic**: Works with any JavaScript environment
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Lightweight utilities with no external dependencies
- **Tree Shaking**: Import only what you need
- **Battle Tested**: Thoroughly tested for reliability
- **Performance Optimized**: Efficient implementations for common operations

---

## 📦 Installation

```bash
npm install @kousta-ui/helpers
# or
yarn add @kousta-ui/helpers
# or
pnpm add @kousta-ui/helpers
```

---

## 🎯 Available Helpers

| Helper | Purpose | Common Use Cases |
|--------|---------|------------------|
| [`getNestedProperty`](/docs/helpers/getNestedProperty) | Access nested object properties with string paths | Form data access, API response parsing |
| [`updateNestedProperties`](/docs/helpers/updateNestedProperties) | Update nested object properties immutably | State management, configuration updates |

---

## 🎨 Quick Start

```javascript
// Import individual helpers (recommended for tree shaking)
import { getNestedProperty, updateNestedProperties } from "@kousta-ui/helpers";

// Object manipulation
const user = {
  personal: {
    first_name: "John",
    last_name: "Doe"
  },
  contact: {
    email: "john@example.com"
  }
};

// Get nested property with string concatenation
const fullName = getNestedProperty(user, "personal.first_name personal.last_name");
console.log(fullName); // "John Doe"

// Update nested property immutably
const updatedUser = updateNestedProperties(user, "contact.email", "newemail@example.com");
```

---

## 📊 Helper Categories

### Object Manipulation

Helpers for working with complex nested objects:

- **[`getNestedProperty`](/docs/helpers/getNestedProperty)** - Access nested properties with advanced string parsing
- **[`updateNestedProperties`](/docs/helpers/updateNestedProperties)** - Immutably update nested object properties

### DOM Utilities

Helpers for browser DOM operations:

This package does not currently export DOM utilities.

---

## 🎯 When to Use These Helpers

### Use `getNestedProperty` when:

- Accessing deeply nested API response data
- Working with complex configuration objects
- Parsing form data with nested structures
- Need string concatenation of multiple properties

### Use `updateNestedProperties` when:

- Managing immutable state updates
- Updating configuration objects
- Modifying nested data without mutation
- Working with React/Vue state management

## 🔧 TypeScript Support

All helpers provide full TypeScript support:

```typescript
import { getNestedProperty, updateNestedProperties } from "@kousta-ui/helpers";

// Typed object access
interface User {
  personal: {
    first_name: string;
    last_name: string;
  };
  contact: {
    email: string;
  };
}

const user: User = { /* ... */ };

// Get with type inference
const fullName: string = getNestedProperty(user, "personal.first_name personal.last_name");

// Update with type safety
const updatedUser: User = updateNestedProperties(user, "contact.email", "new@example.com");
```

---

## 🚀 Performance Considerations

- **Optimized Algorithms**: Efficient implementations for common operations
- **Minimal Memory Footprint**: Zero dependencies and small bundle size
- **Immutable Operations**: Safe for functional programming patterns
- **Tree Shaking Ready**: Import only what you need

<Badge color="blue">Performance Tip</Badge> These helpers are designed to be performant out of the box, even with large nested objects.

---

## 🔄 Framework Integration Examples

### React Integration

```jsx
import React, { useState } from "react";
import { getNestedProperty, updateNestedProperties } from "@kousta-ui/helpers";

function UserProfile({ userData }) {
  const [user, setUser] = useState(userData);

  const handleEmailChange = (newEmail) => {
    const updatedUser = updateNestedProperties(user, "contact.email", newEmail);
    setUser(updatedUser);
  };

  const fullName = getNestedProperty(user, "personal.first_name personal.last_name");

  return (
    <div>
      <h1>{fullName}</h1>
      <input
        value={getNestedProperty(user, "contact.email")}
        onChange={(e) => handleEmailChange(e.target.value)}
      />
    </div>
  );
}
```

### Vue Integration

```vue
<template>
  <div>
    <h1>{{ fullName }}</h1>
    <input v-model="email" @input="updateEmail" />
  </div>
</template>

<script>
import { getNestedProperty, updateNestedProperties } from "@kousta-ui/helpers";

export default {
  data() {
    return {
      user: {
        personal: { first_name: "John", last_name: "Doe" },
        contact: { email: "john@example.com" }
      }
    };
  },
  computed: {
    fullName() {
      return getNestedProperty(this.user, "personal.first_name personal.last_name");
    },
    email: {
      get() {
        return getNestedProperty(this.user, "contact.email");
      },
      set(value) {
        this.user = updateNestedProperties(this.user, "contact.email", value);
      }
    }
  }
};
</script>
```

### Node.js Integration

```javascript
const { getNestedProperty, updateNestedProperties } = require("@kousta-ui/helpers");

// Process configuration files
const config = {
  database: {
    host: "localhost",
    port: 5432,
    credentials: {
      username: "admin",
      password: "secret"
    }
  },
  server: {
    port: 3000
  }
};

// Access nested configuration
const dbHost = getNestedProperty(config, "database.host");
const dbCredentials = getNestedProperty(config, "database.credentials.username database.credentials.password");

// Update configuration immutably
const updatedConfig = updateNestedProperties(config, "server.port", 8080);

console.log("Database host:", dbHost);
console.log("Database credentials:", dbCredentials);
```

---

## 📚 Best Practices

### Do's

- ✅ Use helpers for their intended purpose
- ✅ Leverage TypeScript for type safety
- ✅ Use immutable operations for state management
- ✅ Test edge cases with your specific data structures

### Don'ts

- ❌ Don't mutate objects returned by helpers
- ❌ Don't use with circular references in objects
- ❌ Don't ignore TypeScript warnings
- ❌ Don't use `isNodeAChild` in non-browser environments

---

## 📖 Next Steps

- Learn about individual [helpers](/docs/category/helpers)
- Check out [Components package](/docs/category/components)
- Explore [Table package](/docs/category/table)
- Browse [Hooks](/docs/category/hooks)

---

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/Oustaa/ousta-ui/blob/main/CONTRIBUTING.md) for details.

---

## 📄 License

MIT © [Ousta](https://github.com/Oustaa)

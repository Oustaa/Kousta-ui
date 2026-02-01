---
sidebar_position: 2
---

import Badge from '@site/src/components/Badge';

# updateNestedProperties

An immutable utility function that updates nested object properties using dot notation paths. It creates a new object with the updated value while preserving the original object's immutability, making it perfect for state management and functional programming patterns.

---

## Problem it Solves

- **Immutable Updates**: Update nested properties without mutating the original object
- **State Management**: Safely update complex state structures in React/Vue applications
- **Configuration Updates**: Modify nested configuration objects immutably
- **Data Transformation**: Transform nested data structures without side effects
- **Functional Programming**: Maintain immutability principles in data operations

---

## Input/Output Details

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `T extends Record<string, unknown>` | ✅ | The object to update (will not be mutated) |
| `key` | `string` | ✅ | Dot notation path to the property to update |
| `newValue` | `unknown` | ✅ | The new value to set at the specified path |

### Return Value

| Type | Description |
|------|-------------|
| `T` | A new object with the updated property (original object remains unchanged) |

---

## Path String Syntax

The `key` parameter uses dot notation to specify nested property locations:

- **Single Level**: `"property"` - Update a top-level property
- **Nested**: `"parent.child"` - Update a nested property
- **Deep Nested**: `"level1.level2.level3"` - Update deeply nested properties
- **Auto-Creation**: Missing intermediate objects are created automatically

---

## Edge cases & gotchas

- **Overwriting non-objects**: If an intermediate value is not an object (or is `null`), it will be replaced with a new object so the path can be created.
- **Arrays are treated as objects**: The helper does not do special array operations; using keys like `"items.0.name"` will create plain objects unless your existing structure already contains arrays.
- **Type changes**: Setting a path can change the type at that location (e.g. string → object). This is expected—validate inputs if you need stricter guarantees.

---

## Basic Usage

```javascript
import { updateNestedProperties } from "@kousta-ui/helpers";

const user = {
  personal: {
    first_name: "John",
    last_name: "Doe"
  },
  contact: {
    email: "john@example.com"
  }
};

// Update top-level property
const updated1 = updateNestedProperties(user, "contact.email", "newemail@example.com");
console.log(updated1.contact.email); // "newemail@example.com"
console.log(user.contact.email); // "john@example.com" (original unchanged)

// Update nested property
const updated2 = updateNestedProperties(user, "personal.first_name", "Jane");
console.log(updated2.personal.first_name); // "Jane"

// Create new nested property
const updated3 = updateNestedProperties(user, "contact.phone", "123-456-7890");
console.log(updated3.contact.phone); // "123-456-7890"
```

---

## Examples

### React State Management

```javascript
import React, { useState } from "react";
import { updateNestedProperties } from "@kousta-ui/helpers";

function UserProfile() {
  const [user, setUser] = useState({
    personal: {
      first_name: "John",
      last_name: "Doe"
    },
    contact: {
      email: "john@example.com",
      phone: ""
    },
    preferences: {
      theme: "light",
      notifications: true
    }
  });

  const updateEmail = (newEmail) => {
    setUser(prevUser =>
      updateNestedProperties(prevUser, "contact.email", newEmail)
    );
  };

  const updateTheme = (newTheme) => {
    setUser(prevUser =>
      updateNestedProperties(prevUser, "preferences.theme", newTheme)
    );
  };

  const addPhone = (phoneNumber) => {
    setUser(prevUser =>
      updateNestedProperties(prevUser, "contact.phone", phoneNumber)
    );
  };

  return (
    <div>
      <h1>{user.personal.first_name} {user.personal.last_name}</h1>
      <input
        value={user.contact.email}
        onChange={(e) => updateEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={user.contact.phone}
        onChange={(e) => addPhone(e.target.value)}
        placeholder="Phone"
      />
      <select
        value={user.preferences.theme}
        onChange={(e) => updateTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

### Configuration Management

```javascript
import { updateNestedProperties } from "@kousta-ui/helpers";

const defaultConfig = {
  api: {
    baseUrl: "https://api.example.com",
    version: "v1",
    timeout: 5000
  },
  database: {
    host: "localhost",
    port: 5432,
    name: "myapp"
  },
  features: {
    authentication: true,
    logging: false,
    analytics: true
  }
};

// Update API configuration for production
const prodConfig = updateNestedProperties(defaultConfig, "api.baseUrl", "https://api.prod.example.com");
const prodConfigWithTimeout = updateNestedProperties(prodConfig, "api.timeout", 10000);

// Update database for production
const prodDbConfig = updateNestedProperties(prodConfigWithTimeout, "database.host", "prod-db.example.com");

// Enable logging for production
const finalProdConfig = updateNestedProperties(prodDbConfig, "features.logging", true);

console.log(finalProdConfig);
/*
{
  api: {
    baseUrl: "https://api.prod.example.com",
    version: "v1",
    timeout: 10000
  },
  database: {
    host: "prod-db.example.com",
    port: 5432,
    name: "myapp"
  },
  features: {
    authentication: true,
    logging: true,
    analytics: true
  }
}
*/
```

### Form Data Processing

```javascript
import { updateNestedProperties } from "@kousta-ui/helpers";

const initialFormData = {
  user: {
    personal: {},
    contact: {}
  },
  preferences: {}
};

// Process form submission
function processFormSubmission(formData) {
  let updatedData = { ...formData };

  // Update personal information
  updatedData = updateNestedProperties(updatedData, "user.personal.first_name", "John");
  updatedData = updateNestedProperties(updatedData, "user.personal.last_name", "Doe");
  updatedData = updateNestedProperties(updatedData, "user.personal.age", 30);

  // Update contact information
  updatedData = updateNestedProperties(updatedData, "user.contact.email", "john@example.com");
  updatedData = updateNestedProperties(updatedData, "user.contact.phone", "123-456-7890");

  // Update preferences
  updatedData = updateNestedProperties(updatedData, "preferences.theme", "dark");
  updatedData = updateNestedProperties(updatedData, "preferences.notifications", true);

  return updatedData;
}

const processedData = processFormSubmission(initialFormData);
console.log(processedData);
/*
{
  user: {
    personal: {
      first_name: "John",
      last_name: "Doe",
      age: 30
    },
    contact: {
      email: "john@example.com",
      phone: "123-456-7890"
    }
  },
  preferences: {
    theme: "dark",
    notifications: true
  }
}
*/
```

---

## Advanced Examples

### E-commerce Product Updates

```javascript
import { updateNestedProperties } from "@kousta-ui/helpers";

const product = {
  id: "prod_123",
  name: "Wireless Headphones",
  pricing: {
    currency: "USD",
    amounts: {
      regular: 99.99,
      sale: 79.99
    }
  },
  inventory: {
    warehouse: {
      location: "NYC",
      quantity: 150
    }
  },
  metadata: {}
};

// Update sale price
const updatedPrice = updateNestedProperties(product, "pricing.amounts.sale", 69.99);

// Update inventory quantity
const updatedInventory = updateNestedProperties(updatedPrice, "inventory.warehouse.quantity", 125);

// Add new metadata
const withMetadata = updateNestedProperties(updatedInventory, "metadata.last_updated", "2024-01-15");

// Add discount information
const finalProduct = updateNestedProperties(withMetadata, "metadata.discount_percentage", 30);

console.log(finalProduct);
/*
{
  id: "prod_123",
  name: "Wireless Headphones",
  pricing: {
    currency: "USD",
    amounts: {
      regular: 99.99,
      sale: 69.99
    }
  },
  inventory: {
    warehouse: {
      location: "NYC",
      quantity: 125
    }
  },
  metadata: {
    last_updated: "2024-01-15",
    discount_percentage: 30
  }
}
*/
```

### User Settings Management

```javascript
import { updateNestedProperties } from "@kousta-ui/helpers";

const defaultSettings = {
  profile: {
    personal: {},
    professional: {}
  },
  preferences: {
    display: {},
    notifications: {},
    privacy: {}
  },
  security: {
    authentication: {},
    sessions: {}
  }
};

// Update user profile
function updateUserProfile(settings, profileData) {
  let updated = settings;

  updated = updateNestedProperties(updated, "profile.personal.first_name", profileData.firstName);
  updated = updateNestedProperties(updated, "profile.personal.last_name", profileData.lastName);
  updated = updateNestedProperties(updated, "profile.personal.bio", profileData.bio);
  updated = updateNestedProperties(updated, "profile.professional.title", profileData.title);
  updated = updateNestedProperties(updated, "profile.professional.company", profileData.company);

  return updated;
}

// Update preferences
function updatePreferences(settings, prefs) {
  let updated = settings;

  updated = updateNestedProperties(updated, "preferences.display.theme", prefs.theme);
  updated = updateNestedProperties(updated, "preferences.display.language", prefs.language);
  updated = updateNestedProperties(updated, "preferences.notifications.email", prefs.emailNotifications);
  updated = updateNestedProperties(updated, "preferences.notifications.push", prefs.pushNotifications);
  updated = updateNestedProperties(updated, "preferences.privacy.profile_visibility", prefs.profileVisibility);

  return updated;
}

// Usage
const userProfile = {
  firstName: "Alice",
  lastName: "Johnson",
  bio: "Software Developer",
  title: "Senior Developer",
  company: "Tech Corp"
};

const userPrefs = {
  theme: "dark",
  language: "en",
  emailNotifications: true,
  pushNotifications: false,
  profileVisibility: "public"
};

let userSettings = defaultSettings;
userSettings = updateUserProfile(userSettings, userProfile);
userSettings = updatePreferences(userSettings, userPrefs);

console.log(userSettings);
```

---

## Node.js Usage Example

```javascript
const { updateNestedProperties } = require("@kousta-ui/helpers");
const fs = require("fs");

// Configuration management for Node.js application
class ConfigManager {
  constructor(configPath) {
    this.configPath = configPath;
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const data = fs.readFileSync(this.configPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to load config:", error);
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      server: {
        host: "localhost",
        port: 3000
      },
      database: {
        host: "localhost",
        port: 5432,
        name: "myapp"
      },
      logging: {
        level: "info",
        file: "app.log"
      }
    };
  }

  updateConfig(path, value) {
    this.config = updateNestedProperties(this.config, path, value);
    return this.saveConfig();
  }

  saveConfig() {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
      return true;
    } catch (error) {
      console.error("Failed to save config:", error);
      return false;
    }
  }

  getConfig(path) {
    if (path) {
      return this.getNestedProperty(this.config, path);
    }
    return this.config;
  }
}

// Usage
const configManager = new ConfigManager("./config.json");

// Update server configuration
configManager.updateConfig("server.host", "0.0.0.0");
configManager.updateConfig("server.port", 8080);

// Update database configuration
configManager.updateConfig("database.host", "prod-db.example.com");
configManager.updateConfig("database.name", "production_db");

// Update logging configuration
configManager.updateConfig("logging.level", "warn");
configManager.updateConfig("logging.file", "production.log");

console.log("Updated configuration:", configManager.getConfig());
```

---

## Edge Cases

### Creating New Nested Paths

```javascript
const obj = { existing: "value" };

// Creates nested structure automatically
const updated = updateNestedProperties(obj, "new.nested.path", "new value");
console.log(updated);
/*
{
  existing: "value",
  new: {
    nested: {
      path: "new value"
    }
  }
}
*/
```

### Overwriting Different Types

```javascript
const obj = {
  config: "string_value"
};

// Overwrites string with object
const updated = updateNestedProperties(obj, "config.nested", "new value");
console.log(updated);
/*
{
  config: {
    nested: "new value"
  }
}
*/
```

### Handling Null/Undefined Values

```javascript
const obj = {
  existing: {
    prop: "value"
  }
};

// Can set null or undefined values
const updated1 = updateNestedProperties(obj, "existing.prop", null);
const updated2 = updateNestedProperties(updated1, "existing.newProp", undefined);

console.log(updated1); // { existing: { prop: null } }
console.log(updated2); // { existing: { prop: null, newProp: undefined } }
```

---

## Performance Considerations

- **Immutability**: Creates new objects, which has memory overhead
- **Deep Cloning**: Only clones necessary parts of the object
- **Path Parsing**: Efficient dot notation parsing
- **Object Creation**: Minimal object creation for optimal performance

<Badge color="blue">Performance Tip</Badge> For frequent updates to the same object, consider batching updates or using a more specialized state management solution.

---

## TypeScript Support

Full TypeScript support with generic types:

```typescript
import { updateNestedProperties } from "@kousta-ui/helpers";

interface User {
  personal: {
    first_name: string;
    last_name: string;
  };
  contact: {
    email: string;
  };
}

const user: User = {
  personal: { first_name: "John", last_name: "Doe" },
  contact: { email: "john@example.com" }
};

// Type-safe updates
const updatedUser: User = updateNestedProperties(user, "contact.email", "new@example.com");

// With explicit typing
const customUpdate: User = updateNestedProperties<User>(user, "personal.first_name", "Jane");
```

---

## Common Pitfalls

### Forgetting Immutability

```javascript
// ❌ Wrong - expecting original to be mutated
const original = { a: { b: 1 } };
const updated = updateNestedProperties(original, "a.b", 2);
console.log(original.a.b); // Still 1, not 2

// ✅ Correct - use the returned object
console.log(updated.a.b); // 2
```

### Complex Path Updates

```javascript
// ❌ Wrong - multiple separate updates create multiple objects
let obj = { a: { b: { c: 1 } } };
obj = updateNestedProperties(obj, "a.b.c", 2);
obj = updateNestedProperties(obj, "a.b.d", 3);

// ✅ Better - batch updates when possible
const updates = [
  { path: "a.b.c", value: 2 },
  { path: "a.b.d", value: 3 }
];
// Apply updates in sequence
```

---

## Migration from Manual Updates

### Before Manual Updates

```javascript
// Manual immutable updates
function updateUserEmail(user, newEmail) {
  return {
    ...user,
    contact: {
      ...user.contact,
      email: newEmail
    }
  };
}

function updateNestedValue(obj, path, value) {
  const keys = path.split(".");
  const result = { ...obj };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}
```

### After updateNestedProperties

```javascript
import { updateNestedProperties } from "@kousta-ui/helpers";

// Simplified updates
function updateUserEmail(user, newEmail) {
  return updateNestedProperties(user, "contact.email", newEmail);
}

// No need for manual deep cloning
const updated = updateNestedProperties(obj, "deep.nested.path", value);
```

---

## Types (reference)

```typescript
export const updateNestedProperties = <T extends Record<string, unknown>>(
  obj: T,
  key: string,
  newValue: unknown
): T;
```

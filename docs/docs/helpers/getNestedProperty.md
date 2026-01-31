---
sidebar_position: 1
---

import Badge from '@site/src/components/Badge';

# getNestedProperty

A powerful utility function that accesses nested object properties using string paths with advanced parsing capabilities. It supports dot notation for deep access, concatenation of multiple properties, and special character handling for flexible data retrieval.

---

## Problem it Solves

- **Deep Property Access**: Access nested object properties without manual chaining
- **String Concatenation**: Combine multiple properties into a single string
- **API Response Parsing**: Extract data from complex nested API responses
- **Form Data Processing**: Access nested form data structures
- **Configuration Access**: Retrieve values from deeply nested configuration objects

---

## Input/Output Details

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `Record<string, unknown>` | ✅ | The object to search within |
| `key` | `string` | ✅ | The path string describing the property location |

### Return Value

| Type | Description |
|------|-------------|
| `T \| undefined` | The found value of type T, or undefined if not found |

---

## Path String Syntax

The `key` parameter supports advanced syntax:

- **Dot Notation**: `"parent.child.grandchild"` - Access nested properties
- **Concatenation**: `"prop1 prop2"` - Concatenate multiple properties with space
- **Underscore/Dash**: `"first_name"` or `"first-name"` - Access properties with special characters
- **Special Characters**: `"(prop1) (prop2)"` - Include special characters in output
- **Mixed Usage**: `"user.first_name user.last_name"` - Combine nested access and concatenation

---

## Basic Usage

```javascript
import { getNestedProperty } from "@kousta-ui/helpers";

const user = {
  first_name: "John",
  last_name: "Doe",
  contact: {
    email: "john@example.com",
    phone: "123-456-7890"
  },
  profile: {
    settings: {
      theme: "dark",
      notifications: true
    }
  }
};

// Simple property access
const firstName = getNestedProperty(user, "first_name");
console.log(firstName); // "John"

// Nested property access
const email = getNestedProperty(user, "contact.email");
console.log(email); // "john@example.com"

// Deep nested access
const theme = getNestedProperty(user, "profile.settings.theme");
console.log(theme); // "dark"
```

---

## Examples

### Property Concatenation

```javascript
const user = {
  first_name: "John",
  last_name: "Doe",
  age: 30
};

// Concatenate first and last name
const fullName = getNestedProperty(user, "first_name last_name");
console.log(fullName); // "John Doe"

// Concatenate with special characters
const userWithAge = getNestedProperty(user, "first_name (age)");
console.log(userWithAge); // "John (30)"

// Multiple concatenation
const userInfo = getNestedProperty(user, "first_name last_name (age)");
console.log(userInfo); // "John Doe (30)"
```

### API Response Processing

```javascript
const apiResponse = {
  data: {
    user: {
      id: 123,
      profile: {
        personal: {
          first_name: "Jane",
          last_name: "Smith"
        },
        professional: {
          title: "Developer",
          company: "Tech Corp"
        }
      }
    },
    meta: {
      version: "v1",
      timestamp: "2024-01-01"
    }
  }
};

// Extract user full name (space concatenates values)
const userName = getNestedProperty(
  apiResponse,
  "data.user.profile.personal.first_name data.user.profile.personal.last_name"
);
console.log(userName); // "Jane Smith"

// Extract professional info
const jobTitle = getNestedProperty(apiResponse, "data.user.profile.professional.title");
console.log(jobTitle); // "Developer"

// Format response metadata
const versionInfo = getNestedProperty(apiResponse, "meta.version meta.timestamp");
console.log(versionInfo); // "v1 2024-01-01"
```

### Form Data Processing

```javascript
const formData = {
  personal: {
    name: {
      first: "Alice",
      last: "Johnson"
    },
    address: {
      street: "123 Main St",
      city: "New York",
      zip: "10001"
    }
  },
  contact: {
    email: "alice@example.com",
    phone: "555-0123"
  }
};

// Create full address
const fullAddress = getNestedProperty(formData, "personal.address.street personal.address.city personal.address.zip");
console.log(fullAddress); // "123 Main St New York 10001"

// Get contact summary
const contactSummary = getNestedProperty(formData, "personal.name.first personal.name.last (contact.email)");
console.log(contactSummary); // "Alice Johnson (alice@example.com)"
```

### Configuration File Parsing

```javascript
const config = {
  application: {
    name: "MyApp",
    version: "1.0.0"
  },
  server: {
    host: "localhost",
    port: 3000,
    ssl: {
      enabled: true,
      cert_path: "/path/to/cert"
    }
  },
  database: {
    host: "localhost",
    port: 5432,
    name: "myapp_db"
  }
};

// Get application info
const appInfo = getNestedProperty(config, "application.name (application.version)");
console.log(appInfo); // "MyApp (1.0.0)"

// Get server configuration
const serverConfig = getNestedProperty(config, "server.host:server.port");
console.log(serverConfig); // "localhost:3000"

// Check SSL status
const sslStatus = getNestedProperty(config, "server.ssl.enabled");
console.log(sslStatus); // true
```

---

## Advanced Examples

### E-commerce Product Data

```javascript
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
    },
    stores: {
      nyc: 25,
      la: 30,
      chicago: 20
    }
  },
  details: {
    specifications: {
      brand: "AudioTech",
      model: "WH-1000",
      color: "Black"
    }
  }
};

// Format price display
const priceDisplay = getNestedProperty(product, "pricing.currency $pricing.amounts.sale");
console.log(priceDisplay); // "USD $79.99"

// Get inventory summary
const inventoryInfo = getNestedProperty(product, "inventory.warehouse.location (inventory.warehouse.quantity)");
console.log(inventoryInfo); // "NYC (150)"

// Product description
const productDesc = getNestedProperty(product, "details.specifications.brand details.specifications.model (details.specifications.color)");
console.log(productDesc); // "AudioTech WH-1000 (Black)"
```

### User Profile with Preferences

```javascript
const userProfile = {
  user_id: "user_456",
  basic_info: {
    first_name: "Bob",
    last_name: "Wilson",
    age: 28
  },
  preferences: {
    theme: {
      mode: "dark",
      accent_color: "#3b82f6"
    },
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    privacy: {
      profile_visibility: "public",
      show_email: false,
      show_phone: false
    }
  },
  activity: {
    last_login: "2024-01-15T10:30:00Z",
    login_count: 127,
    sessions: {
      current: "web",
      devices: ["web", "mobile", "tablet"]
    }
  }
};

// User display name
const displayName = getNestedProperty(userProfile, "basic_info.first_name basic_info.last_name");
console.log(displayName); // "Bob Wilson"

// Theme settings
const themeSettings = getNestedProperty(userProfile, "preferences.theme.mode (preferences.theme.accent_color)");
console.log(themeSettings); // "dark (#3b82f6)"

// Activity summary
const activitySummary = getNestedProperty(userProfile, "activity.last_login (activity.login_count)");
console.log(activitySummary); // "2024-01-15T10:30:00Z (127)"
```

---

## Node.js Usage Example

```javascript
const { getNestedProperty } = require("@kousta-ui/helpers");
const fs = require("fs");

// Read and parse JSON configuration file
const configData = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const config = {
  database: {
    primary: {
      host: "localhost",
      port: 5432,
      name: "production_db"
    },
    replica: {
      host: "replica.example.com",
      port: 5432,
      name: "read_replica"
    }
  },
  redis: {
    host: "localhost",
    port: 6379,
    db: 0
  },
  logging: {
    level: "info",
    format: "json",
    outputs: ["console", "file"]
  }
};

// Extract database connection strings
const primaryDb = getNestedProperty(config, "database.primary.host:database.primary.port/database.primary.name");
console.log("Primary DB:", primaryDb); // "localhost:5432/production_db"

const replicaDb = getNestedProperty(config, "database.replica.host:database.replica.port/database.replica.name");
console.log("Replica DB:", replicaDb); // "replica.example.com:5432/read_replica"

// Get logging configuration
const loggingConfig = getNestedProperty(config, "logging.level (logging.format)");
console.log("Logging:", loggingConfig); // "info (json)"

// Redis connection
const redisConnection = getNestedProperty(config, "redis.host:redis.port");
console.log("Redis:", redisConnection); // "localhost:6379"
```

---

## Edge Cases

### Non-existent Properties

```javascript
const obj = { existing: "value" };

// Returns undefined for non-existent properties
const nonExistent = getNestedProperty(obj, "non.existent.path");
console.log(nonExistent); // undefined

// Partial path that exists
const partial = getNestedProperty(obj, "existing.nonExistent");
console.log(partial); // undefined
```

### Null/Undefined Objects

```javascript
// Handle null or undefined objects gracefully
const result1 = getNestedProperty(null, "some.path");
console.log(result1); // undefined

const result2 = getNestedProperty(undefined, "some.path");
console.log(result2); // undefined
```

### Special Characters in Keys

```javascript
const obj = {
  "special-key": "value1",
  "special_key": "value2",
  "with spaces": "value3",
  "with.dots": "value4"
};

// Access keys with special characters
const value1 = getNestedProperty(obj, "special-key");
console.log(value1); // "value1"

const value2 = getNestedProperty(obj, "special_key");
console.log(value2); // "value2"
```

### Arrays in Objects

```javascript
const obj = {
  users: [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 }
  ],
  settings: ["dark", "compact", "auto-save"]
};

// Access array properties (limited support)
const users = getNestedProperty(obj, "users");
console.log(users); // Array of user objects

const settings = getNestedProperty(obj, "settings");
console.log(settings); // Array of settings
```

---

## Performance Considerations

- **String Parsing**: The path string is parsed character by character for maximum flexibility
- **Object Traversal**: Efficient traversal of nested object properties
- **Memory Usage**: Minimal memory overhead with no additional data structures
- **Type Safety**: TypeScript support ensures type checking at compile time

<Badge color="blue">Performance Tip</Badge> For very deep objects, consider caching frequently accessed paths.

---

## TypeScript Support

Full TypeScript support with generic types:

```typescript
import { getNestedProperty } from "@kousta-ui/helpers";

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

// Type-safe property access
const fullName: string = getNestedProperty(user, "personal.first_name personal.last_name");
const email: string = getNestedProperty(user, "contact.email");

// With explicit typing
const customValue: string | undefined = getNestedProperty<string>(user, "personal.first_name");
```

---

## Common Pitfalls

### Circular References

```javascript
// ❌ Avoid circular references
const obj = {};
obj.self = obj; // This will cause infinite recursion

// ✅ Use acyclic objects
const safeObj = {
  user: { name: "John" },
  meta: { version: "1.0" }
};
```

### Invalid Path Syntax

```javascript
const obj = { prop: "value" };

// ❌ Invalid path (starts with special character)
const result1 = getNestedProperty(obj, ".prop"); // May not work as expected

// ✅ Valid path syntax
const result2 = getNestedProperty(obj, "prop"); // Correct
```

---

## Migration from Manual Property Access

### Before Manual Access

```javascript
// Manual property access with error handling
function getFullName(user) {
  try {
    if (user && user.personal && user.personal.first_name && user.personal.last_name) {
      return `${user.personal.first_name} ${user.personal.last_name}`;
    }
  } catch (error) {
    return undefined;
  }
}
```

### After getNestedProperty

```javascript
// Simplified with helper
import { getNestedProperty } from "@kousta-ui/helpers";

function getFullName(user) {
  return getNestedProperty(user, "personal.first_name personal.last_name");
}
```

---

## Types (reference)

```typescript
export function getNestedProperty<T>(
  obj: Record<string, unknown>,
  key: string
): T | undefined;
```

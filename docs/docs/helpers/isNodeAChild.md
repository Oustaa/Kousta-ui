---
sidebar_position: 3
---

import Badge from '@site/src/components/Badge';

# isNodeAChild

This helper is **not exported** by `@kousta-ui/helpers` in the current codebase.

If you need this behavior, prefer the native DOM API:

```ts
const isChild = parent?.contains(child) ?? false;
```

---

## Recommended replacement

Use `Element.contains` (or `Node.contains`) with optional chaining:

```ts
const parent = document.getElementById("container");
const target = document.getElementById("button");

const isChild = parent?.contains(target) ?? false;
```

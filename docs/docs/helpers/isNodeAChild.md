---
sidebar_position: 3
---

import Badge from '@site/src/components/Badge';

# isNodeAChild

A DOM utility function that checks if a target node is a child of a parent node. It recursively traverses the DOM tree to determine parent-child relationships, making it perfect for click-outside detection, event delegation, and focus management scenarios.

---

## Problem it Solves

- **Click-Outside Detection**: Determine if a click occurred outside a specific component
- **Event Delegation**: Check if an event target is within a container
- **Focus Management**: Validate focus trapping in modals and dropdowns
- **DOM Validation**: Verify node relationships for accessibility
- **Component Boundaries**: Check if elements belong to specific component trees

---

## Input/Output Details

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `parent` | `Node \| null \| undefined` | ✅ | The potential parent node to check against |
| `target` | `Node \| null \| undefined` | ✅ | The target node to check if it's a child |

### Return Value

| Type | Description |
|------|-------------|
| `boolean` | `true` if target is a child of parent (or the same node), `false` otherwise |

---

## Basic Usage

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

// HTML structure:
// <div id="container">
//   <div id="child">
//     <button id="button">Click me</button>
//   </div>
// </div>

const container = document.getElementById("container");
const child = document.getElementById("child");
const button = document.getElementById("button");
const outside = document.getElementById("outside");

console.log(isNodeAChild(container, child));    // true
console.log(isNodeAChild(container, button));  // true
console.log(isNodeAChild(container, outside));  // false
console.log(isNodeAChild(container, container)); // true (same node counts as child)
```

---

## Examples

### Click-Outside Detection

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

class Dropdown {
  constructor(containerElement) {
    this.container = containerElement;
    this.isOpen = false;
    this.setupClickOutsideListener();
  }

  setupClickOutsideListener() {
    document.addEventListener("click", (event) => {
      if (this.isOpen && !isNodeAChild(this.container, event.target)) {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.container.classList.add("open");
  }

  close() {
    this.isOpen = false;
    this.container.classList.remove("open");
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Usage
const dropdownContainer = document.getElementById("dropdown");
const dropdown = new Dropdown(dropdownContainer);

// Toggle button inside dropdown
document.getElementById("dropdown-toggle").addEventListener("click", () => {
  dropdown.toggle();
});
```

### Modal Focus Management

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.isOpen = false;
    this.previousFocus = null;
    this.setupFocusTrap();
  }

  setupFocusTrap() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && this.isOpen) {
        this.handleTabKey(event);
      }
    });

    document.addEventListener("click", (event) => {
      if (this.isOpen && !isNodeAChild(this.modal, event.target)) {
        // Only close if click is on overlay or outside
        if (event.target === this.modal || !isNodeAChild(this.modal, event.target)) {
          this.close();
        }
      }
    });
  }

  handleTabKey(event) {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  open() {
    this.isOpen = true;
    this.previousFocus = document.activeElement;
    this.modal.style.display = "block";

    // Focus first focusable element
    const firstFocusable = this.modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.modal.style.display = "none";

    // Restore previous focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }
}

// Usage
const modalElement = document.getElementById("modal");
const modal = new Modal(modalElement);

document.getElementById("open-modal").addEventListener("click", () => {
  modal.open();
});

document.getElementById("close-modal").addEventListener("click", () => {
  modal.close();
});
```

### Context Menu Component

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

class ContextMenu {
  constructor() {
    this.menu = document.getElementById("context-menu");
    this.isVisible = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Show context menu on right-click
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.show(event.pageX, event.pageY);
    });

    // Hide on click outside
    document.addEventListener("click", (event) => {
      if (this.isVisible && !isNodeAChild(this.menu, event.target)) {
        this.hide();
      }
    });

    // Hide on escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isVisible) {
        this.hide();
      }
    });
  }

  show(x, y) {
    this.menu.style.left = `${x}px`;
    this.menu.style.top = `${y}px`;
    this.menu.classList.add("visible");
    this.isVisible = true;
  }

  hide() {
    this.menu.classList.remove("visible");
    this.isVisible = false;
  }
}

// Usage
const contextMenu = new ContextMenu();

// Context menu items
document.getElementById("context-copy").addEventListener("click", () => {
  console.log("Copy action");
  contextMenu.hide();
});

document.getElementById("context-paste").addEventListener("click", () => {
  console.log("Paste action");
  contextMenu.hide();
});
```

---

## Advanced Examples

### Multi-Level Dropdown Navigation

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

class NavigationDropdown {
  constructor() {
    this.dropdowns = document.querySelectorAll(".nav-dropdown");
    this.activeDropdown = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Handle dropdown triggers
    this.dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector(".dropdown-trigger");

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        this.toggleDropdown(dropdown);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (event) => {
      if (this.activeDropdown && !this.isClickInsideAnyDropdown(event.target)) {
        this.closeAllDropdowns();
      }
    });

    // Handle keyboard navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeAllDropdowns();
      }
    });
  }

  toggleDropdown(dropdown) {
    if (this.activeDropdown === dropdown) {
      this.closeDropdown(dropdown);
    } else {
      this.closeAllDropdowns();
      this.openDropdown(dropdown);
    }
  }

  openDropdown(dropdown) {
    dropdown.classList.add("open");
    this.activeDropdown = dropdown;
  }

  closeDropdown(dropdown) {
    dropdown.classList.remove("open");
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }

  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }

  isClickInsideAnyDropdown(target) {
    return Array.from(this.dropdowns).some(dropdown =>
      isNodeAChild(dropdown, target)
    );
  }
}

// Usage
const navigation = new NavigationDropdown();
```

### Tooltip Component

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

class Tooltip {
  constructor() {
    this.tooltip = document.getElementById("tooltip");
    this.currentTarget = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Show tooltip on hover
    document.addEventListener("mouseover", (event) => {
      const target = event.target.closest("[data-tooltip]");
      if (target) {
        this.show(target, target.dataset.tooltip);
      }
    });

    // Hide tooltip when mouse leaves
    document.addEventListener("mouseout", (event) => {
      const target = event.target.closest("[data-tooltip]");
      if (target && this.currentTarget === target) {
        this.hide();
      }
    });

    // Hide tooltip when clicking outside
    document.addEventListener("click", (event) => {
      if (this.currentTarget && !isNodeAChild(this.currentTarget, event.target)) {
        this.hide();
      }
    });
  }

  show(target, text) {
    this.currentTarget = target;
    this.tooltip.textContent = text;

    // Position tooltip
    const rect = target.getBoundingClientRect();
    this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
    this.tooltip.style.top = `${rect.top - 10}px`;
    this.tooltip.classList.add("visible");
  }

  hide() {
    this.tooltip.classList.remove("visible");
    this.currentTarget = null;
  }
}

// Usage
const tooltip = new Tooltip();

// HTML elements with tooltips
// <button data-tooltip="Click me to submit">Submit</button>
// <span data-tooltip="This field is required">Required field</span>
```

### Drag and Drop Zone

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

class DropZone {
  constructor(element) {
    this.zone = element;
    this.isDragging = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Drag events
    this.zone.addEventListener("dragenter", (event) => {
      event.preventDefault();
      this.zone.classList.add("drag-over");
    });

    this.zone.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    this.zone.addEventListener("dragleave", (event) => {
      // Only remove class if leaving the zone entirely
      if (!isNodeAChild(this.zone, event.relatedTarget)) {
        this.zone.classList.remove("drag-over");
      }
    });

    this.zone.addEventListener("drop", (event) => {
      event.preventDefault();
      this.zone.classList.remove("drag-over");
      this.handleDrop(event);
    });

    // Global drag events
    document.addEventListener("dragenter", (event) => {
      this.isDragging = true;
    });

    document.addEventListener("dragend", (event) => {
      this.isDragging = false;
      this.zone.classList.remove("drag-over");
    });
  }

  handleDrop(event) {
    const files = Array.from(event.dataTransfer.files);
    console.log("Dropped files:", files);

    // Process files
    files.forEach(file => {
      console.log(`File: ${file.name}, Size: ${file.size}, Type: ${file.type}`);
    });
  }
}

// Usage
const dropZone = new DropZone(document.getElementById("drop-zone"));
```

---

## Edge Cases

### Null or Undefined Nodes

```javascript
// Handle null/undefined gracefully
console.log(isNodeAChild(null, document.body));     // false
console.log(isNodeAChild(document.body, null));     // false
console.log(isNodeAChild(null, null));              // false
console.log(isNodeAChild(undefined, document.body)); // false
```

### Same Node Check

```javascript
const element = document.getElementById("my-element");

// A node is considered a child of itself
console.log(isNodeAChild(element, element)); // true
```

### Deep Nesting

```javascript
// Works with deeply nested structures
const parent = document.getElementById("level-1");
const deepChild = document.getElementById("level-10");

console.log(isNodeAChild(parent, deepChild)); // true
```

### Text Nodes

```javascript
const container = document.getElementById("container");
const textNode = container.firstChild; // Text node

console.log(isNodeAChild(container, textNode)); // true
```

---

## Performance Considerations

- **Recursive Traversal**: Uses recursive DOM traversal which is efficient for most cases
- **Early Termination**: Returns immediately when child is found
- **No Memory Allocation**: Doesn't create additional data structures
- **Browser Optimized**: Leverages browser's DOM navigation capabilities

<Badge color="blue">Performance Tip</Badge> For very large DOM trees, consider using `element.contains()` which is natively optimized, though `isNodeAChild` provides additional null safety.

---

## Browser Compatibility

The helper works across all modern browsers:

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers

<Badge color="green">Note</Badge> Uses standard DOM APIs (`childNodes`) that are universally supported.

---

## TypeScript Support

Full TypeScript support with proper DOM types:

```typescript
import { isNodeAChild } from "@ousta-ui/helpers";

// Type-safe DOM node checking
const parent: HTMLElement | null = document.getElementById("parent");
const child: HTMLElement | null = document.getElementById("child");

const isChild: boolean = isNodeAChild(parent, child);

// With specific node types
const button: HTMLButtonElement | null = document.querySelector("button");
const container: HTMLDivElement | null = document.querySelector(".container");

const isButtonInContainer: boolean = isNodeAChild(container, button);
```

---

## Common Pitfalls

### Shadow DOM Considerations

```javascript
// ❌ May not work as expected with shadow DOM
const shadowHost = document.getElementById("shadow-host");
const shadowElement = shadowHost.shadowRoot.querySelector(".shadow-element");

console.log(isNodeAChild(shadowHost, shadowElement)); // false (crossing shadow boundary)
```

### Document Fragment

```javascript
// ❌ Document fragments are not in the DOM tree
const fragment = document.createDocumentFragment();
const div = document.createElement("div");
fragment.appendChild(div);

console.log(isNodeAChild(document.body, div)); // false
```

### Detached Nodes

```javascript
// ❌ Detached nodes are not in DOM tree
const detached = document.createElement("div");
const attached = document.getElementById("attached");

console.log(isNodeAChild(document.body, detached)); // false
```

---

## Migration from Native Methods

### Before Native contains()

```javascript
// Native method (less null-safe)
function isChild(parent, child) {
  return parent && parent.contains(child);
}

// Usage requires null checks
if (parent && child && parent.contains(child)) {
  // Do something
}
```

### After isNodeAChild

```javascript
import { isNodeAChild } from "@ousta-ui/helpers";

// Null-safe and more robust
if (isNodeAChild(parent, child)) {
  // Do something
}
```

### Alternative Native Approach

```javascript
// Modern native alternative (if you don't need null safety)
const isChild = parent?.contains(child) ?? false;
```

---

## Comparison with Native Methods

| Method | Null Safety | Same Node | Performance | Features |
|--------|--------------|------------|-------------|----------|
| `isNodeAChild` | ✅ Safe | ✅ True | Good | Null handling, recursive |
| `element.contains()` | ❌ Throws | ✅ True | Excellent | Native, optimized |
| `parent?.contains(child)` | ⚠️ Partial | ✅ True | Excellent | Modern syntax |

---

## Types (reference)

```typescript
export function isNodeAChild(
  parent: Node | null | undefined,
  target: Node | null | undefined,
): boolean;
```

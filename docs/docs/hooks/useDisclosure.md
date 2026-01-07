---
sidebar_position: 1
---

import Badge from '@site/src/components/Badge';

# useDisclosure

A simple and elegant hook for managing boolean state with common actions like open, close, and toggle. Perfect for controlling modals, dropdowns, sidebars, and any UI component that needs show/hide functionality.

---

## When to use

- **Modal management**: Control modal open/close state
- **Dropdown menus**: Manage dropdown visibility
- **Sidebar navigation**: Toggle sidebar open/closed
- **Accordion panels**: Control expand/collapse state
- **Tooltip visibility**: Show/hide tooltips on demand
- **Form validation**: Show/hide error messages
- **Loading states**: Toggle loading indicators

---

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialState` | `boolean` | `false` | Initial boolean state value |

---

## Return Values

| Property | Type | Description |
|----------|------|-------------|
| `opened` | `boolean` | Current boolean state |
| `open` | `() => void` | Function to set state to `true` |
| `close` | `() => void` | Function to set state to `false` |
| `toggle` | `() => void` | Function to toggle current state |

---

## Basic Usage

```tsx
import { useDisclosure } from "@kousta-ui/hooks";

function BasicExample() {
  const { opened, open, close, toggle } = useDisclosure(false);

  return (
    <div>
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      <button onClick={toggle}>Toggle</button>
      
      <p>Current state: {opened ? "opened" : "closed"}</p>
    </div>
  );
}
```

---

## Examples

### Modal Management

```tsx
function ModalExample() {
  const { opened, open, close } = useDisclosure();

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      
      {opened && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Modal Title</h2>
            <p>This is a modal controlled by useDisclosure.</p>
            <button onClick={close}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Dropdown Menu

```tsx
function DropdownExample() {
  const { opened, open, close, toggle } = useDisclosure();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (opened) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened, close]);

  return (
    <div ref={dropdownRef} className="dropdown">
      <button onClick={toggle}>Menu</button>
      
      {opened && (
        <div className="dropdown-menu">
          <div className="menu-item">Profile</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item">Logout</div>
        </div>
      )}
    </div>
  );
}
```

### Sidebar Navigation

```tsx
function SidebarExample() {
  const { opened, open, close, toggle } = useDisclosure();

  return (
    <div className={`app ${opened ? "sidebar-open" : ""}`}>
      <button className="menu-toggle" onClick={toggle}>
        ☰
      </button>
      
      <aside className={`sidebar ${opened ? "open" : ""}`}>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </aside>
      
      <main className="content">
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  );
}
```

### Accordion Component

```tsx
function AccordionExample() {
  const [panels, setPanels] = useState({
    panel1: false,
    panel2: false,
    panel3: false,
  });

  const createDisclosure = (key: keyof typeof panels) => ({
    opened: panels[key],
    open: () => setPanels(prev => ({ ...prev, [key]: true })),
    close: () => setPanels(prev => ({ ...prev, [key]: false })),
    toggle: () => setPanels(prev => ({ ...prev, [key]: !prev[key] })),
  });

  const panel1 = createDisclosure("panel1");
  const panel2 = createDisclosure("panel2");
  const panel3 = createDisclosure("panel3");

  return (
    <div className="accordion">
      <div className="accordion-item">
        <button onClick={panel1.toggle}>
          Panel 1 {panel1.opened ? "▼" : "▶"}
        </button>
        {panel1.opened && (
          <div className="accordion-content">
            Content for panel 1 goes here.
          </div>
        )}
      </div>
      
      <div className="accordion-item">
        <button onClick={panel2.toggle}>
          Panel 2 {panel2.opened ? "▼" : "▶"}
        </button>
        {panel2.opened && (
          <div className="accordion-content">
            Content for panel 2 goes here.
          </div>
        )}
      </div>
      
      <div className="accordion-item">
        <button onClick={panel3.toggle}>
          Panel 3 {panel3.opened ? "▼" : "▶"}
        </button>
        {panel3.opened && (
          <div className="accordion-content">
            Content for panel 3 goes here.
          </div>
        )}
      </div>
    </div>
  );
}
```

### Form Validation Messages

```tsx
function FormExample() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const emailError = useDisclosure(false);
  const passwordError = useDisclosure(false);

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
      emailError.open();
    } else {
      setErrors(prev => ({ ...prev, email: "" }));
      emailError.close();
    }
  };

  return (
    <form>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        {emailError.opened && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      
      <div>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            if (e.target.value.length < 8) {
              passwordError.open();
            } else {
              passwordError.close();
            }
          }}
        />
        {passwordError.opened && (
          <span className="error">Password must be at least 8 characters</span>
        )}
      </div>
    </form>
  );
}
```

### Loading States

```tsx
function LoadingExample() {
  const { opened: isLoading, open: startLoading, close: stopLoading } = useDisclosure();

  const handleSubmit = async () => {
    startLoading();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Form"}
      </button>
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Please wait...</p>
        </div>
      )}
    </div>
  );
}
```

---

## Advanced Patterns

### Multiple Disclosure States

```tsx
function MultiDisclosureExample() {
  const disclosures = {
    modal: useDisclosure(),
    dropdown: useDisclosure(),
    sidebar: useDisclosure(),
  };

  return (
    <div>
      <button onClick={disclosures.modal.open}>Open Modal</button>
      <button onClick={disclosures.dropdown.toggle}>Toggle Dropdown</button>
      <button onClick={disclosures.sidebar.open}>Open Sidebar</button>
      
      {/* Close all at once */}
      <button onClick={() => {
        Object.values(disclosures).forEach(disclosure => disclosure.close());
      }}>
        Close All
      </button>
    </div>
  );
}
```

### Disclosure with Effects

```tsx
function DisclosureWithEffects() {
  const { opened, open, close } = useDisclosure();

  // Effect when state changes
  useEffect(() => {
    if (opened) {
      console.log("Component opened");
      document.body.style.overflow = "hidden";
    } else {
      console.log("Component closed");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div>
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      <p>State: {opened ? "Open" : "Closed"}</p>
    </div>
  );
}
```

---

## Performance Considerations

- **Lightweight**: Minimal overhead compared to manual state management
- **Stable Functions**: `open`, `close`, and `toggle` functions are stable across re-renders
- **No Dependencies**: Zero external dependencies for optimal bundle size

<Badge color="blue">Performance Tip</Badge> The hook uses `useState` internally, so it follows React's optimization patterns automatically.

---

## TypeScript Support

Full TypeScript support with generic inference:

```tsx
// Basic usage
const { opened, open, close, toggle } = useDisclosure(false);

// With explicit typing
const disclosure: {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} = useDisclosure();

// In custom hook
function useCustomModal() {
  const disclosure = useDisclosure(false);
  
  return {
    ...disclosure,
    // Add custom methods
    openWithDelay: () => setTimeout(disclosure.open, 100),
  };
}
```

---

## Common Pitfalls

### Don't Mutate Return Values

```tsx
// ❌ Wrong - this won't work
const { opened } = useDisclosure();
opened = true; // Error: Cannot assign to 'opened' because it is a read-only property

// ✅ Correct - use the provided functions
const { opened, open, close } = useDisclosure();
open(); // or close(), or toggle()
```

### Don't Use Outside Components

```tsx
// ❌ Wrong - hooks must be called in components
const { open } = useDisclosure(); // This will cause an error

function Component() {
  // ✅ Correct - use inside components
  const { open } = useDisclosure();
  return <button onClick={open}>Open</button>;
}
```

---

## Migration from Manual State

### Before Manual State

```tsx
function OldComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(prev => !prev);
  
  return (
    <div>
      <button onClick={openModal}>Open</button>
      <button onClick={closeModal}>Close</button>
      <button onClick={toggleModal}>Toggle</button>
      {isModalOpen && <div>Modal Content</div>}
    </div>
  );
}
```

### After useDisclosure

```tsx
function NewComponent() {
  const { opened, open, close, toggle } = useDisclosure();
  
  return (
    <div>
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      <button onClick={toggle}>Toggle</button>
      {opened && <div>Modal Content</div>}
    </div>
  );
}
```

---

## Types (reference)

```ts
export function useDisclosure(
  initialState?: boolean
): {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
```

---
sidebar_position: 4
---

import Badge from '@site/src/components/Badge';

# useScrollLock

A utility hook that prevents body scrolling when activated, commonly used for modals, overlays, and drawers. It automatically handles scrollbar compensation to prevent layout shift when the scrollbar is hidden.

---

## When to use

- **Modal dialogs**: Prevent background scrolling when modal is open
- **Overlay menus**: Stop scrolling when dropdown or context menu is active
- **Sidebars**: Lock background when sidebar is open
- **Image lightboxes**: Prevent scrolling when viewing full-screen images
- **Confirmation dialogs**: Stop background interaction during confirmations
- **Loading overlays**: Prevent interaction during loading states
- **Fullscreen components**: Lock scroll for immersive experiences

---

## Parameters

This hook doesn't accept any parameters.

---

## Return Values

| Property | Type | Description |
|----------|------|-------------|
| `lockScroll` | `() => void` | Function to lock body scrolling |
| `unlockScroll` | `() => void` | Function to unlock body scrolling |

---

## Basic Usage

```tsx
import { useScrollLock } from "@kousta-ui/hooks";

function BasicExample() {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    lockScroll();
    setIsLocked(true);
  };

  const handleUnlock = () => {
    unlockScroll();
    setIsLocked(false);
  };

  return (
    <div>
      <button onClick={handleLock}>Lock Scroll</button>
      <button onClick={handleUnlock}>Unlock Scroll</button>
      <p>Scroll is {isLocked ? "locked" : "unlocked"}</p>
    </div>
  );
}
```

---

## Examples

### Modal with Scroll Lock

```tsx
function ModalExample() {
  const { opened, open, close } = useDisclosure(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const handleOpen = () => {
    lockScroll();
    open();
  };

  const handleClose = () => {
    unlockScroll();
    close();
  };

  // Ensure scroll is unlocked when component unmounts
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      
      {opened && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Modal with Scroll Lock</h2>
            <p>The background scroll is locked while this modal is open.</p>
            <p>Try scrolling - you won't be able to scroll the background!</p>
            <button onClick={handleClose}>Close Modal</button>
          </div>
        </div>
      )}
      
      <div style={{ height: "200vh", padding: "20px" }}>
        <h1>Scrollable Content</h1>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Scrollable content paragraph {i + 1}</p>
        ))}
      </div>
    </div>
  );
}
```

### Sidebar Navigation

```tsx
function SidebarExample() {
  const { opened, open, close, toggle } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (opened) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [opened, lockScroll, unlockScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return unlockScroll;
  }, [unlockScroll]);

  return (
    <div className={`app ${opened ? "sidebar-open" : ""}`}>
      <button className="menu-toggle" onClick={toggle}>
        ☰ Menu
      </button>
      
      <aside className={`sidebar ${opened ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Navigation</h3>
          <button onClick={close}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>
      </aside>
      
      <main className="main-content">
        <h1>Main Content Area</h1>
        <p>Click the menu button to open the sidebar. The background scroll will be locked.</p>
        
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ margin: "20px 0", padding: "20px", background: "#f5f5f5" }}>
            <h3>Content Section {i + 1}</h3>
            <p>This is some scrollable content to demonstrate the scroll lock functionality.</p>
          </div>
        ))}
      </main>
    </div>
  );
}
```

### Image Lightbox

```tsx
function LightboxExample() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { lockScroll, unlockScroll } = useScrollLock();

  const openLightbox = (image) => {
    setSelectedImage(image);
    lockScroll();
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    unlockScroll();
  };

  useEffect(() => {
    return unlockScroll;
  }, [unlockScroll]);

  const images = [
    { id: 1, src: "/image1.jpg", alt: "Image 1" },
    { id: 2, src: "/image2.jpg", alt: "Image 2" },
    { id: 3, src: "/image3.jpg", alt: "Image 3" },
  ];

  return (
    <div>
      <div className="image-gallery">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            onClick={() => openLightbox(image)}
            style={{ 
              width: "200px", 
              height: "200px", 
              objectFit: "cover", 
              cursor: "pointer",
              margin: "10px"
            }}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            />
            <button className="close-button" onClick={closeLightbox}>
              ×
            </button>
          </div>
        </div>
      )}

      <div style={{ height: "150vh", padding: "20px" }}>
        <h2>Scroll down to see more content</h2>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Scrollable content {i + 1}</p>
        ))}
      </div>
    </div>
  );
}
```

### Dropdown Menu with Scroll Lock

```tsx
function DropdownExample() {
  const { opened, open, close, toggle } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [opened, lockScroll, unlockScroll]);

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

  useEffect(() => {
    return unlockScroll;
  }, [unlockScroll]);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <h1>Scrollable Page with Dropdown</h1>
      <p>Scroll down and click the dropdown button to see scroll lock in action.</p>
      
      <div ref={dropdownRef} className="dropdown-container">
        <button onClick={toggle} className="dropdown-trigger">
          Open Menu ▼
        </button>
        
        {opened && (
          <div className="dropdown-menu">
            <div className="menu-item">Profile</div>
            <div className="menu-item">Settings</div>
            <div className="menu-item">Help</div>
            <div className="menu-item">Logout</div>
          </div>
        )}
      </div>

      {Array.from({ length: 50 }, (_, i) => (
        <div key={i} style={{ margin: "20px 0", padding: "20px", background: "#f9f9f9" }}>
          <h3>Section {i + 1}</h3>
          <p>This content demonstrates that scrolling is locked when the dropdown is open.</p>
        </div>
      ))}
    </div>
  );
}
```

### Loading Overlay

```tsx
function LoadingOverlayExample() {
  const [loading, setLoading] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const simulateLoading = () => {
    setLoading(true);
    lockScroll();
    
    // Simulate a 3-second loading process
    setTimeout(() => {
      setLoading(false);
      unlockScroll();
    }, 3000);
  };

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <button onClick={simulateLoading} disabled={loading}>
        {loading ? "Loading..." : "Start Loading"}
      </button>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Please wait, processing your request...</p>
          </div>
        </div>
      )}

      <h1>Content Area</h1>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} style={{ margin: "20px 0", padding: "20px", background: "#f0f0f0" }}>
          <h3>Content Block {i + 1}</h3>
          <p>This content is not scrollable during loading.</p>
        </div>
      ))}
    </div>
  );
}
```

### Confirmation Dialog

```tsx
function ConfirmationDialogExample() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const handleDeleteClick = () => {
    lockScroll();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    console.log("Item deleted!");
    setShowConfirm(false);
    unlockScroll();
  };

  const handleCancel = () => {
    setShowConfirm(false);
    unlockScroll();
  };

  useEffect(() => {
    return unlockScroll;
  }, [unlockScroll]);

  return (
    <div style={{ height: "150vh", padding: "20px" }}>
      <h1>Delete Item Example</h1>
      <button onClick={handleDeleteClick} style={{ background: "#dc2626", color: "white" }}>
        Delete Item
      </button>

      {showConfirm && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            
            <div className="confirmation-actions">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleConfirm} className="confirm-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} style={{ margin: "15px 0", padding: "15px", border: "1px solid #ddd" }}>
            <h3>Item {i + 1}</h3>
            <p>This is item {i + 1} that could be deleted.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Advanced Patterns

### Multiple Scroll Locks

```tsx
function MultipleScrollLocksExample() {
  const modalDisclosure = useDisclosure();
  const sidebarDisclosure = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();
  const lockCount = useRef(0);

  const smartLock = () => {
    lockCount.current++;
    if (lockCount.current === 1) {
      lockScroll();
    }
  };

  const smartUnlock = () => {
    lockCount.current--;
    if (lockCount.current === 0) {
      unlockScroll();
    }
  };

  useEffect(() => {
    if (modalDisclosure.opened) {
      smartLock();
    } else {
      smartUnlock();
    }
  }, [modalDisclosure.opened]);

  useEffect(() => {
    if (sidebarDisclosure.opened) {
      smartLock();
    } else {
      smartUnlock();
    }
  }, [sidebarDisclosure.opened]);

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

  return (
    <div>
      <button onClick={modalDisclosure.open}>Open Modal</button>
      <button onClick={sidebarDisclosure.open}>Open Sidebar</button>
      
      {/* Modal and Sidebar components */}
    </div>
  );
}
```

### Scroll Lock with Escape Key

```tsx
function ScrollLockWithEscape() {
  const { opened, open, close } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();

  const handleOpen = () => {
    lockScroll();
    open();
  };

  const handleClose = () => {
    unlockScroll();
    close();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && opened) {
        handleClose();
      }
    };

    if (opened) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [opened, handleClose]);

  useEffect(() => {
    return unlockScroll;
  }, [unlockScroll]);

  return (
    <div>
      <button onClick={handleOpen}>Open Modal (Press ESC to close)</button>
      
      {opened && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Press ESC to close</h2>
            <p>This modal can be closed with the escape key.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Performance Considerations

- **Scrollbar Compensation**: Automatically calculates and compensates for scrollbar width to prevent layout shift
- **Efficient DOM Manipulation**: Direct style manipulation for optimal performance
- **Memory Safe**: Automatic cleanup prevents memory leaks
- **No Dependencies**: Lightweight implementation with no external dependencies

<Badge color="blue">Performance Tip</Badge> The hook automatically handles scrollbar compensation, so your layout won't jump when scrolling is locked.

---

## Browser Compatibility

The hook works across all modern browsers:

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers

<Badge color="green">Note</Badge> The scrollbar compensation uses `window.innerWidth - document.body.offsetWidth` which is widely supported.

---

## TypeScript Support

Full TypeScript support with clear return types:

```tsx
// Basic usage
const { lockScroll, unlockScroll } = useScrollLock();

// With explicit typing
const scrollControls: {
  lockScroll: () => void;
  unlockScroll: () => void;
} = useScrollLock();

// In custom hook
function useModalWithScrollLock() {
  const { opened, open, close } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();

  const openModal = () => {
    lockScroll();
    open();
  };

  const closeModal = () => {
    unlockScroll();
    close();
  };

  return {
    opened,
    openModal,
    closeModal,
  };
}
```

---

## Common Pitfalls

### Don't Forget to Unlock

```tsx
// ❌ Wrong - forgetting to unlock on unmount
function BadModal() {
  const { opened } = useDisclosure();
  const { lockScroll } = useScrollLock();

  useEffect(() => {
    if (opened) {
      lockScroll();
      // Never unlocks!
    }
  }, [opened, lockScroll]);
}

// ✅ Correct - always unlock on unmount
function GoodModal() {
  const { opened } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (opened) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [opened, lockScroll, unlockScroll]);

  useEffect(() => {
    return unlockScroll; // Cleanup on unmount
  }, [unlockScroll]);
}
```

### Don't Lock Multiple Times Without Unlocking

```tsx
// ❌ Wrong - multiple locks without proper unlocking
function BadComponent() {
  const { lockScroll, unlockScroll } = useScrollLock();
  
  const handleAction = () => {
    lockScroll();
    lockScroll(); // Double lock!
  };
}

// ✅ Correct - manage lock state properly
function GoodComponent() {
  const [isLocked, setIsLocked] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  
  const handleAction = () => {
    if (!isLocked) {
      lockScroll();
      setIsLocked(true);
    }
  };
}
```

---

## CSS Considerations

When using scroll lock, you might want to add some CSS to improve the user experience:

```css
/* Prevent visual jump when scroll is locked */
body {
  overflow: hidden;
  transition: padding-right 0.1s ease;
}

/* Optional: Add a subtle indicator that scroll is locked */
body.scroll-locked::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #3b82f6;
  z-index: 9999;
}
```

---

## Migration from Manual Scroll Lock

### Before Manual Implementation

```tsx
function OldModal() {
  const [opened, setOpened] = useState(false);

  const openModal = () => {
    // Manual scroll lock
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
    setOpened(true);
  };

  const closeModal = () => {
    // Manual scroll unlock
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    setOpened(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  return (
    <div>
      <button onClick={openModal}>Open</button>
      {opened && <div>Modal Content</div>}
    </div>
  );
}
```

### After useScrollLock

```tsx
function NewModal() {
  const { opened, open, close } = useDisclosure();
  const { lockScroll, unlockScroll } = useScrollLock();

  const openModal = () => {
    lockScroll();
    open();
  };

  const closeModal = () => {
    unlockScroll();
    close();
  };

  useEffect(() => {
    return unlockScroll;
  }, [unlockScroll]);

  return (
    <div>
      <button onClick={openModal}>Open</button>
      {opened && <div>Modal Content</div>}
    </div>
  );
}
```

---

## Types (reference)

```ts
export function useScrollLock(): {
  lockScroll: () => void;
  unlockScroll: () => void;
};
```

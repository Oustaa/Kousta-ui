---
sidebar_position: 3
---

import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  CM_QuickStartPreview,
  CM_BasicRightClickPreview,
  CM_SubMenusPreview,
  CM_GroupsIconsPreview,
  CM_CloseBehaviorPreview,
  CM_PositioningInteractivePreview,
  CM_CustomWrapperPreview,
  CM_AccessibilityPreview,
} from '@site/src/components/@Components/ContextMenu';

# Context Menu

The **ContextMenu** provides a customizable, nested right‑click menu. It supports options, groups, separators, sub‑menus, per‑item enable/disable, and automatic viewport‑aware placement.

---

## Installation

```bash
npm install @kousta-ui/components
```

### Import styles

```ts
import "@kousta-ui/components/esm/index.css";
```

---

## Quick start

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContextMenuExample.tsx",
      code: `import { ContextMenu } from "@kousta-ui/components";
import { LuCopy, LuTrash2, LuFolderPlus } from "react-icons/lu";

export default function Example() {
  return (
    <ContextMenu
      onOpen={() => {}}
      onClose={() => {}}
      options={[
        { optionType: "Group", groupTitle: "File" },
        { title: "New folder", icon: <LuFolderPlus />, onClick: () => {} },
        { optionType: "Separator" },
        { title: "Copy", icon: <LuCopy />, onClick: () => {} },
        { title: "Delete", icon: <LuTrash2 />, active: true, onClick: () => {} },
      ]}
    >
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click anywhere in this box
      </div>
    </ContextMenu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContextMenuExample.jsx",
      code: `import { ContextMenu } from "@kousta-ui/components";
import { LuCopy, LuTrash2, LuFolderPlus } from "react-icons/lu";

export default function Example() {
  return (
    <ContextMenu
      onOpen={() => {}}
      onClose={() => {}}
      options={[
        { optionType: "Group", groupTitle: "File" },
        { title: "New folder", icon: <LuFolderPlus />, onClick: () => {} },
        { optionType: "Separator" },
        { title: "Copy", icon: <LuCopy />, onClick: () => {} },
        { title: "Delete", icon: <LuTrash2 />, active: true, onClick: () => {} },
      ]}
    >
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click anywhere in this box
      </div>
    </ContextMenu>
  );
}`
    }
  ]}
  preview={<CM_QuickStartPreview />}
  defaultTab="ts"
/>

---

## Anatomy

The Context Menu is built from these pieces:

- **`<ContextMenu …>` (Provider)** – wraps the target area and holds state/positioning
- **`ContextMenuMenu`** – internal popover that renders the menu list
- **`ContextMenuItem`** – a single actionable option
- **`ContextMenuItemWithSubs`** – an option revealing a nested submenu on click
- **`ContextMenuSeparator`** – horizontal separator line
- **`ContextmenuGroup`** – visual group header

You typically only import and use the **Provider**; the other parts are wired internally.

### Preview
<CM_GroupsIconsPreview />

---

## Provider props

```ts
type ContextmenuProviderProps = {
  /** Menu options (items, groups, separators, and sub‑menus) */
  options: ContextMenuOption[];
  /** Wrapper element/tag for the target area; defaults to "div" */
  As?: string;
  /** Disables the context menu (prevents opening) */
  disabled?: boolean;
  /** Called when the menu opens */
  onOpen?: () => void;
  /** Called when the menu closes (outside click, etc.) */
  onClose?: () => void;
  /** Global default: whether clicking an item closes the menu */
  itemCloseOnClick?: boolean; // default: true
} & React.PropsWithChildren;
```

### Options model

```ts
export type ContextMenuTypeOption = {
  optionType?: "option";
  icon?: ReactNode;
  title?: string | ReactNode;
  active?: boolean;        // default: true
  hidden?: boolean;        // if true, item is not rendered
  deactiveMessage?: string;
  closeOnClick?: boolean;  // per-item override
} & (
  | { onClick: () => void; subOptions?: never } // leaf action
  | {
      subOptions: (ContextMenuOption & { type?: "click" | "hover" })[]; // submenu
      onClick?: never;
    }
);

export type ContextMenuTypeSeparato = { optionType: "Separator" };
export type ContextMenuTypeGroup = { optionType: "Group"; groupTitle: string };

export type ContextMenuOption =
  | ContextMenuTypeSeparato
  | ContextMenuTypeGroup
  | ContextMenuTypeOption;
```

> **Tip:** Use `active: false` to disable an option, and `hidden: true` to conditionally hide it.

---

## Usage patterns

### Basic right‑click menu

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContextMenuBasic.tsx",
      code: `import { ContextMenu } from "@kousta-ui/components";

export default function Example() {
  return (
    <ContextMenu options={[{ title: "Rename", onClick() {} }]}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click me
      </div>
    </ContextMenu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContextMenuBasic.jsx",
      code: `import { ContextMenu } from "@kousta-ui/components";

export default function Example() {
  return (
    <ContextMenu options={[{ title: "Rename", onClick() {} }]}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click me
      </div>
    </ContextMenu>
  );
}`
    }
  ]}
  preview={<CM_BasicRightClickPreview />}
  defaultTab="ts"
/>

### Sub‑menus

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContextMenuSubMenus.tsx",
      code: `import { ContextMenu } from "@kousta-ui/components";
import { LuShare2 } from "react-icons/lu";

export default function Example() {
  const options = [
    {
      title: "Share",
      icon: <LuShare2 />,
      subOptions: [
        { title: "Copy link", onClick() {} },
        { title: "Invite people…", onClick() {} },
      ],
    },
    { optionType: "Separator" },
    {
      title: "Move to",
      subOptions: [
        { title: "Project A", onClick() {} },
        { title: "Project B", onClick() {} },
      ],
    },
  ] as any;

  return (
    <ContextMenu options={options}>
      <div
        style={{
          height: 120,
          display: "grid",
          placeItems: "center",
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click
      </div>
    </ContextMenu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContextMenuSubMenus.jsx",
      code: `import { ContextMenu } from "@kousta-ui/components";
import { LuShare2 } from "react-icons/lu";

export default function Example() {
  const options = [
    {
      title: "Share",
      icon: <LuShare2 />,
      subOptions: [
        { title: "Copy link", onClick() {} },
        { title: "Invite people…", onClick() {} },
      ],
    },
    { optionType: "Separator" },
    {
      title: "Move to",
      subOptions: [
        { title: "Project A", onClick() {} },
        { title: "Project B", onClick() {} },
      ],
    },
  ];

  return (
    <ContextMenu options={options}>
      <div
        style={{
          height: 120,
          display: "grid",
          placeItems: "center",
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click
      </div>
    </ContextMenu>
  );
}`
    }
  ]}
  preview={<CM_SubMenusPreview />}
  defaultTab="ts"
/>

### Groups, separators, and icons

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContextMenuGroupsIcons.tsx",
      code: `import { ContextMenu } from "@kousta-ui/components";
import { LuUserPlus, LuDownload, LuArchive } from "react-icons/lu";

export default function Example() {
  const options = [
    { optionType: "Group", groupTitle: "Members" },
    { title: "Invite", icon: <LuUserPlus />, onClick() {} },
    { optionType: "Separator" },
    { optionType: "Group", groupTitle: "File" },
    { title: "Download", icon: <LuDownload />, onClick() {} },
    { title: "Archive", icon: <LuArchive />, active: false, onClick() {} },
  ] as any;

  return (
    <ContextMenu options={options}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click here
      </div>
    </ContextMenu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContextMenuGroupsIcons.jsx",
      code: `import { ContextMenu } from "@kousta-ui/components";
import { LuUserPlus, LuDownload, LuArchive } from "react-icons/lu";

export default function Example() {
  const options = [
    { optionType: "Group", groupTitle: "Members" },
    { title: "Invite", icon: <LuUserPlus />, onClick() {} },
    { optionType: "Separator" },
    { optionType: "Group", groupTitle: "File" },
    { title: "Download", icon: <LuDownload />, onClick() {} },
    { title: "Archive", icon: <LuArchive />, active: false, onClick() {} },
  ];

  return (
    <ContextMenu options={options}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click here
      </div>
    </ContextMenu>
  );
}`
    }
  ]}
  preview={<CM_GroupsIconsPreview />}
  defaultTab="ts"
/>

### Close behavior

- Global default is controlled by **`itemCloseOnClick`** on the provider (default `true`).
- Per-item override with **`closeOnClick`**.

<Badge color="yellow">Implementation note</Badge> In the current implementation, `closeOnClick` defaults to `true` per item. That means items will close the menu on click unless you explicitly set `closeOnClick: false`.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContextMenuCloseBehavior.tsx",
      code: `import { ContextMenu } from "@kousta-ui/components";

export default function Example() {
  const options = [
    { title: "Select", onClick() {}, closeOnClick: false },
    { title: "Apply", onClick() {}, closeOnClick: true },
  ] as any;

  return (
    <ContextMenu itemCloseOnClick={false} options={options}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click (menu stays open unless item overrides)
      </div>
    </ContextMenu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContextMenuCloseBehavior.jsx",
      code: `import { ContextMenu } from "@kousta-ui/components";

export default function Example() {
  const options = [
    { title: "Select", onClick() {}, closeOnClick: false },
    { title: "Apply", onClick() {}, closeOnClick: true },
  ];

  return (
    <ContextMenu itemCloseOnClick={false} options={options}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click (menu stays open unless item overrides)
      </div>
    </ContextMenu>
  );
}`
    }
  ]}
  preview={<CM_CloseBehaviorPreview />}
  defaultTab="ts"
/>

---

## Positioning & viewport awareness

The ContextMenu automatically positions itself at the pointer coordinates (`pageX`, `pageY`) when right-clicked and **intelligently adjusts** if it would overflow the viewport boundaries.

### How it works

- **Automatic measurement**: The provider measures the rendered menu dimensions via a `ref` after it's rendered
- **Vertical flipping**: If `(menuHeight + y) > pageHeight`, the menu flips upward by setting a negative `offsetY`
- **Horizontal flipping**: If `(menuWidth + x) > pageWidth`, the menu flips leftward by setting a negative `offsetX`
- **Sub-menu inheritance**: Nested sub-menus automatically inherit these offsets to render inward (left/up) when needed, ensuring they stay within the viewport

### Benefits

- **No configuration needed**: Viewport awareness is enabled by default—you don't need to pass any props
- **Smart positioning**: The menu always tries to stay visible, even near screen edges
- **Consistent behavior**: Works the same way for all menu items and sub-menus

### Preview (interactive)

Use the controls to simulate a right‑click at different corners/edges and see how the menu flips to stay within the viewport.

<CM_PositioningInteractivePreview />

---

## Custom wrapper element

Use `As` to change the HTML tag of the right‑click area and pass extra props.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContextMenuCustomWrapper.tsx",
      code: `import { ContextMenu } from "@kousta-ui/components";

export default function Example() {
  const options = [{ title: "Open", onClick() {} }] as any;
  return (
    <ContextMenu As="section" options={options}>
      <section
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        <img
          alt="Thumbnail"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=="
          style={{ width: 48, height: 48, borderRadius: 6 }}
        />
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Right‑click the tile (section)
        </div>
      </section>
    </ContextMenu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContextMenuCustomWrapper.jsx",
      code: `import { ContextMenu } from "@kousta-ui/components";

export default function Example() {
  const options = [{ title: "Open", onClick() {} }];
  return (
    <ContextMenu As="section" options={options}>
      <section
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        <img
          alt="Thumbnail"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=="
          style={{ width: 48, height: 48, borderRadius: 6 }}
        />
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Right‑click the tile (section)
        </div>
      </section>
    </ContextMenu>
  );
}`
    }
  ]}
  preview={<CM_CustomWrapperPreview />}
  defaultTab="ts"
/>

---

## Accessibility

The ContextMenu component provides basic accessibility features:

- **Right-click trigger**: Opens on `contextmenu` event (right-click) and closes on outside click or item selection
- **Semantic HTML**: Menu items render as `<button>` elements with proper disabled states
- **Disabled state**: Use `active: false` to disable items, which prevents interaction and provides visual feedback
- **Hidden items**: Use `hidden: true` to conditionally hide items without affecting layout

### Limitations

<Badge color="yellow">Note</Badge> The following accessibility features are **not implemented by default**:

- **Keyboard navigation**: Arrow keys, Enter, Escape, etc. are not handled
- **ARIA roles**: The menu does not use `role="menu"` or `role="menuitem"` attributes
- **Focus management**: Focus is not automatically managed when the menu opens/closes
- **Screen reader announcements**: No live region announcements for menu state changes

### Enhancing accessibility

If you need full keyboard navigation and screen reader support, you can:

1. **Wrap the component** to add keyboard event handlers
2. **Add ARIA attributes** manually using the `As` prop and custom wrapper
3. **Implement focus management** to trap focus within the menu when open
4. **Add live regions** for screen reader announcements

### Preview
<CM_AccessibilityPreview />

---

## Styles & customization

### Runtime classes

You can target these classes with CSS to customize the ContextMenu appearance:

- **Provider container**
  - `kui-contextmenu-container`
- **Menu panel**
  - `kui-contextmenu`
- **Icon gutter (empty spacer column)**
  - `kui-contextmenu-icons`
- **Item**
  - `kui-contextmenu-item`
  - `kui-disabled` (added when `active: false`)
- **Item icon cell**
  - `kui-contextmenu-item-icon`
- **Separator**
  - `kui-contextmenu-separator-container`
  - `kui-contextmenu-separator-icon`
  - `kui-contextmenu-separator`
- **Group**
  - `kui-contextmenu-group-container`
  - `kui-contextmenu-group-title`

### Customization with kui-classnames

```css
/* Customize the menu panel */
.kui-contextmenu {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
}

/* Style menu items on hover */
.kui-contextmenu-item:hover {
  background-color: var(--kui-primary-100);
  border-radius: 6px;
}

/* Customize disabled items */
.kui-contextmenu-item.kui-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Style group titles */
.kui-contextmenu-group-title {
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--kui-neutral-600);
}
```

### Tokens used by the default styles

- **Colors**
  - `--kui-neutral-50`, `--kui-neutral-100`, `--kui-neutral-200`, `--kui-neutral-300`, `--kui-neutral-500`, `--kui-neutral-600`, `--kui-neutral-700`, `--kui-neutral-800`, `--kui-neutral-900`
- **Rounding**
  - `--kui-rounded`

---

## Component Props Provider

Currently, ContextMenu does not support the `ComponentPropsProvider` for global defaults. All configuration must be done via props on the `ContextMenu` component itself.

<Badge color="blue">Future enhancement</Badge> Support for `ComponentPropsProvider` may be added in a future release.

---

## Testing recipes

The test suite can follow these patterns:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ContextMenu from "@kousta-ui/components/ContextMenu";

const onLeaf = jest.fn();
const onSub = jest.fn();

const options = [
  { title: "Leaf", onClick: onLeaf, closeOnClick: false },
  { title: "Has sub", subOptions: [{ title: "Sub leaf", onClick: onSub }] },
];

test("opens on right-click and executes leaf click", () => {
  render(<ContextMenu options={options}>Area</ContextMenu>);
  fireEvent.contextMenu(screen.getByText(/area/i)); // open
  fireEvent.click(screen.getByText(/leaf/i));       // click
  expect(onLeaf).toHaveBeenCalled();
});

test("opens submenu and executes sub click", () => {
  render(<ContextMenu options={options}>Area</ContextMenu>);
  fireEvent.contextMenu(screen.getByText(/area/i));
  fireEvent.click(screen.getByText(/has sub/i)); // reveal submenu
  fireEvent.click(screen.getByText(/sub leaf/i));
  expect(onSub).toHaveBeenCalled();
});
```

---

## Tips & gotchas

- **Don’t render hidden items**: use `hidden: true` to skip an item conditionally.
- **Disable instead of removing** when preserving layout: `active: false` gives a consistent visual state without interaction.
- **Per‑item close behavior**: `closeOnClick` overrides the provider’s `itemCloseOnClick`.
- **Nested sub‑menus** are supported recursively—each submenu honors auto‑flip logic using `offsetX/offsetY`.
- The target area uses `onContextMenu` to intercept the native menu; call `preventDefault()` yourself if you extend behavior.

---

## Types (reference)

```ts
export type ContextMenuTypeOption = {
  optionType?: "option";
  icon?: ReactNode;
  title?: string | ReactNode;
  active?: boolean;
  hidden?: boolean;
  deactiveMessage?: string;
  closeOnClick?: boolean;
} & (
  | { onClick: () => void; subOptions?: never }
  | { subOptions: (ContextMenuOption & { type?: "click" | "hover" })[]; onClick?: never }
);

export type ContextMenuTypeSeparato = {
  optionType: "Separator";
};

export type ContextMenuTypeGroup = {
  optionType: "Group";
  groupTitle: string;
};

export type ContextMenuOption =
  | ContextMenuTypeSeparato
  | ContextMenuTypeGroup
  | ContextMenuTypeOption;

export type ContextmenuProviderProps = {
  options: ContextMenuOption[];
  disabled?: boolean;
  As?: string;
  onOpen?: () => void;
  onClose?: () => void;
  itemCloseOnClick?: boolean;
} & React.PropsWithChildren;
```

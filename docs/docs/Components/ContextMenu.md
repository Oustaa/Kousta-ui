---
sidebar_position: 3
---

import Badge from '@site/src/components/Badge';
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

## Quick start

```tsx
import ContextMenu from "@ousta-ui/components/ContextMenu";
import { LuCopy, LuTrash2, LuFolderPlus } from "react-icons/lu";

export default function Example() {
  return (
    <ContextMenu
      onOpen={() => console.log("opened")}
      onClose={() => console.log("closed")}
      options={[
        { optionType: "Group", groupTitle: "File" },
        {
          title: "New folder",
          icon: <LuFolderPlus />,
          onClick: () => console.log("new folder"),
        },
        { optionType: "Separator" },
        {
          title: "Copy",
          icon: <LuCopy />,
          onClick: () => console.log("copy"),
        },
        {
          title: "Delete",
          icon: <LuTrash2 />,
          active: true, // disable with active: false
          onClick: () => console.log("delete"),
        },
      ]}
    >
      <div style={{ padding: 24, border: "1px dashed var(--Oui-neutral-400)" }}>
        Right‑click anywhere in this box
      </div>
    </ContextMenu>
  );
}
```

### Preview
<CM_QuickStartPreview />

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

```tsx
<ContextMenu options={[{ title: "Rename", onClick() {} }]}>
  <div>Right‑click me</div>
</ContextMenu>
```

### Preview
<CM_BasicRightClickPreview />

### Sub‑menus

```tsx
const options = [
  {
    title: "Share",
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

<ContextMenu options={options}>
  <div style={{ height: 120 }}>Right‑click</div>
</ContextMenu>
```

### Preview
<CM_SubMenusPreview />

### Groups, separators, and icons

```tsx
import { LuUserPlus, LuDownload, LuArchive } from "react-icons/lu";

const options = [
  { optionType: "Group", groupTitle: "Members" },
  { title: "Invite", icon: <LuUserPlus />, onClick() {} },
  { optionType: "Separator" },
  { optionType: "Group", groupTitle: "File" },
  { title: "Download", icon: <LuDownload />, onClick() {} },
  { title: "Archive", icon: <LuArchive />, active: false, onClick() {} },
];
```

### Preview
<CM_GroupsIconsPreview />

### Close behavior

- Global default is controlled by **`itemCloseOnClick`** on the provider (default `true`).
- Per-item override with **`closeOnClick`**.

```tsx
<ContextMenu
  itemCloseOnClick={false}
  options={[
    { title: "Select", onClick() {}, closeOnClick: false }, // stays open
    { title: "Apply", onClick() {}, closeOnClick: true },   // closes
  ]}
>
  <div>Right‑click</div>
</ContextMenu>
```

### Preview
<CM_CloseBehaviorPreview />

---

## Positioning & viewport awareness

The menu opens at pointer coordinates (`pageX`, `pageY`) and **auto‑adjusts** if it would overflow the viewport. Internally:

- The provider measures the rendered menu via a `ref`
- If `(menuHeight + y) > pageHeight`, it flips vertically (sets an `offsetY`)
- If `(menuWidth + x) > pageWidth`, it flips horizontally (sets an `offsetX`)
- Sub‑menus inherit these offsets to render inward (left/up) when needed

You do not need to pass anything to enable this; it's handled automatically.

### Preview (interactive)

Use the controls to simulate a right‑click at different corners/edges and see how the menu flips to stay within the viewport.

<CM_PositioningInteractivePreview />

---

## Custom wrapper element

Use `As` to change the HTML tag of the right‑click area and pass extra props.

```tsx
<ContextMenu As="section" className="file-tile" options={[{ title: "Open", onClick() {} }]}>
  <img src="/thumb.png" alt="Thumbnail" />
</ContextMenu>
```

### Preview
<CM_CustomWrapperPreview />

---

## Accessibility

- Opens on **contextmenu** (right‑click) and closes on outside click.
- Items render as `<button>` with proper disabled states via `active: false`.
- Add visible focus styles in your CSS for keyboard users if you add keyboard support.
- Provide text labels for icon‑only items.

<Badge color="green">Note</Badge> Keyboard navigation is not implemented by default. If you need it, wrap/extend the components to manage focus, arrow‑key navigation, and ARIA roles like `menu`/`menuitem`.

### Preview
<CM_AccessibilityPreview />

---

## Styling hooks

Default class names from `ContextMenu.module.css`:

- `.OuicontextMenu-Container` – absolute stacking context (portal‑like container)
- `.OuicontextMenu` – the floating menu panel
- `.OuicontextMenu-Item` – clickable row
- `.OuicontextMenu-ItemIcon` – leading icon cell
- `.OuicontextMenu_separator_container` – wrapper for separator line
- `.OuicontextMenu_separator` – separator line
- `.OuicontextMenu_separator_icon` – spacer cell aligned with icons
- `.OuicontextMenu_group_title` – group header text
- `.OuicontextMenu-Item_WithSubs` – submenu panel modifier
- `.OuiiconsContainer` – (internal) reserved icon gutter

Override any of these to fit your design system.

---

## Testing recipes

The test suite can follow these patterns:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ContextMenu from "@ousta-ui/components/ContextMenu";

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
  As?: string;
  onOpen?: () => void;
  onClose?: () => void;
  itemCloseOnClick?: boolean;
} & React.PropsWithChildren;
```

---
sidebar_position: 2
---

import Badge from '@site/src/components/Badge';
import {
  QuickStartExample,
  ClickTriggerPreview,
  HoverTriggerPreview,
  CloseBehaviorPreview,
  PositionsPreview,
  IconsLabelsDividersPreview,
  DisabledItemsPreview,
} from '@site/src/components/@Components/Menu';

# Menu

The **Menu** component renders a lightweight, accessible dropdown that can be opened via **click** or **hover** and positioned relative to its trigger. It’s composed, headless-friendly, and easy to customize.

---

## Anatomy

The Menu is a composition of small primitives:

- **`Menu.Menu`**: The container and state provider.
- **`Menu.Target`**: The trigger button that opens the dropdown.
- **`Menu.DropDown`**: The positioned panel that contains the items.
- **`Menu.Item`**: A clickable action row.
- **`Menu.Label`**: A non-interactive label row.
- **`Menu.Divider`**: A horizontal separator.

```tsx
import { Menu } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>Open menu</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Log out</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}
```

### Preview
<QuickStartExample />

---

## Props

### `Menu.Menu` (Container)

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `type` | `"hover" \| "click"` | `"click"` | Yes | How the menu opens. |
| `closeOnClick` | `boolean` | `true` | Yes | If `true`, clicking any `Menu.Item` closes the menu by default. |
| `position` | `MenuPosition` | `"Bottom-Start"`| Yes | Where the dropdown appears relative to the trigger. |
| `offset` | `number` | `4` | Yes | Gap (in px) between the trigger and dropdown. |

### `Menu.Item`

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `closeMenuOnClick` | `boolean` | `undefined` | Yes | Per-item override for the container's `closeOnClick` behavior. |
| `disabled` | `boolean` | `false` | No | Disables the item and prevents interaction. |
| `leftSection` | `ReactNode` | — | No | Optional element/icon rendered on the left. |
| `rightSection` | `ReactNode` | — | No | Optional element/icon rendered on the right. |

<Badge color="blue">Note</Badge> Props marked with **Yes** in the **Provider?** column can be configured globally using the `ComponentPropsProvider`.

---

## Usage

### Trigger Modes

#### Click (Default)

The menu opens when the `Menu.Target` is clicked.

```tsx
<Menu.Menu type="click">
  <Menu.Target>Click me</Menu.Target>
  <Menu.DropDown>
    <Menu.Item>Item 1</Menu.Item>
    <Menu.Item>Item 2</Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<ClickTriggerPreview />

#### Hover

Set `type="hover"` to open the menu on mouse enter and close on mouse leave.

```tsx
<Menu.Menu type="hover">
  <Menu.Target>Hover me</Menu.Target>
  <Menu.DropDown>
    <Menu.Item>Item 1</Menu.Item>
    <Menu.Item>Item 2</Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<HoverTriggerPreview />

### Close Behavior

By default, clicking any item closes the menu (`closeOnClick={true}`). You can override this globally on the container or per-item with `closeMenuOnClick`.

```tsx
// Do NOT close when any item is clicked, except for the one that overrides it
<Menu.Menu closeOnClick={false}>
  <Menu.Target>Bulk actions</Menu.Target>
  <Menu.DropDown>
    <Menu.Item>Pin</Menu.Item>         {/* won't close */}
    <Menu.Item closeMenuOnClick>Share</Menu.Item> {/* will close */}
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<CloseBehaviorPreview />

### Positioning

The dropdown can be placed on any side and alignment relative to the trigger. Use the interactive controls below to see how `position` and `offset` work.

### Preview (interactive)
<PositionsPreview />

### With Icons, Labels & Dividers

Compose the menu with `Menu.Label`, `Menu.Divider`, and `leftSection`/`rightSection` props on items for a richer UI.

```tsx
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu";

<Menu.Menu>
  <Menu.Target>Account</Menu.Target>
  <Menu.DropDown>
    <Menu.Label>Profile</Menu.Label>
    <Menu.Item leftSection={<LuUser />}>View profile</Menu.Item>
    <Menu.Item leftSection={<LuSettings />}>Preferences</Menu.Item>
    <Menu.Divider />
    <Menu.Label>Session</Menu.Label>
    <Menu.Item leftSection={<LuLogOut />} closeMenuOnClick>
      Log out
    </Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<IconsLabelsDividersPreview />

### Disabled Items

Pass the `disabled` prop to any `Menu.Item` to make it non-interactive.

```tsx
<Menu.Menu>
  <Menu.Target>Move</Menu.Target>
  <Menu.DropDown>
    <Menu.Item>Project A</Menu.Item>
    <Menu.Item disabled>Project B (locked)</Menu.Item>
    <Menu.Item>Project C</Menu.Item>
  </Menu.DropDown>
</Menu.Menu>
```

### Preview
<DisabledItemsPreview />

---

## Styles & customization

### Runtime classes

- **`kui-menu`**: The main container (`Menu.Menu`).
- **`kui-menu-target`**: The trigger button (`Menu.Target`).
- **`kui-menu-dropdown`**: The dropdown panel (`Menu.DropDown`).
- **`kui-menu-item`**: A menu item (`Menu.Item`).
- **`kui-disabled`**: Added to a `kui-menu-item` when it is disabled.
- **`kui-menu-label`**: A label (`Menu.Label`).
- **`kui-menu-divider`**: A divider (`Menu.Divider`).

### Tokens used by the default styles

- **Colors**: `--kui-neutral-*`
- **Spacing**: `--kui-spacing-sm`
- **Rounding**: `--kui-rounded`

---

## Types (reference)

```ts
import { ReactNode } from "react";

export type MenuPosition = 'Top-Start' | 'Top-Center' | 'Top-End' | 'Bottom-Start' | 'Bottom-Center' | 'Bottom-End' | 'Left-Start' | 'Left-Center' | 'Left-End' | 'Right-Start' | 'Right-Center' | 'Right-End';

export type MenuProps = {
  type?: "hover" | "click";
  closeOnClick?: boolean;
  position?: MenuPosition;
  offset?: number;
};

export type MenuItemProps = {
  closeMenuOnClick?: boolean;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
};
```

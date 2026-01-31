---
sidebar_position: 2
---

import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
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

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuExample.tsx",
      code: `import { Menu } from "@kousta-ui/components";
import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>
        <Button variant="primary-light">Open menu</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Log out</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuExample.jsx",
      code: `import { Menu } from "@kousta-ui/components";
import { Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>
        <Button variant="primary-light">Open menu</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Log out</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    }
  ]}
  preview={<QuickStartExample />}
  defaultTab="ts"
/>

---

## Props

### `Menu.Menu` (Container)

| Name | Type | Default | Provider? | Description |
|------|------|---------|-----------|-------------|
| `type` | `"hover" \| "click"` | `"click"` | Yes | How the menu opens. |
| `closeOnClick` | `boolean` | `true` | Yes | If `true`, clicking any `Menu.Item` closes the menu by default. |
| `position` | [`MenuPosition`](#types-reference) | `"Bottom-Start"`| Yes | Where the dropdown appears relative to the trigger. |
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

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuClickTrigger.tsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu type="click">
      <Menu.Target>
        <Button>Click me</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuClickTrigger.jsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu type="click">
      <Menu.Target>
        <Button>Click me</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    }
  ]}
  preview={<ClickTriggerPreview />}
  defaultTab="ts"
/>

#### Hover

Set `type="hover"` to open the menu on mouse enter and close on mouse leave.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuHoverTrigger.tsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu type="hover">
      <Menu.Target>
        <Button variant="primary-light">Hover me</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuHoverTrigger.jsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu type="hover">
      <Menu.Target>
        <Button variant="primary-light">Hover me</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    }
  ]}
  preview={<HoverTriggerPreview />}
  defaultTab="ts"
/>

### Close Behavior

By default, clicking any item closes the menu (`closeOnClick={true}`). You can override this globally on the container or per-item with `closeMenuOnClick`.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuCloseBehavior.tsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu closeOnClick={false}>
      <Menu.Target>
        <Button variant="neutral-outline">Bulk actions</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Pin</Menu.Item>
        <Menu.Item closeMenuOnClick>Share</Menu.Item>
        <Menu.Item>Archive</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuCloseBehavior.jsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu closeOnClick={false}>
      <Menu.Target>
        <Button variant="neutral-outline">Bulk actions</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Pin</Menu.Item>
        <Menu.Item closeMenuOnClick>Share</Menu.Item>
        <Menu.Item>Archive</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    }
  ]}
  preview={<CloseBehaviorPreview />}
  defaultTab="ts"
/>

### Positioning

The dropdown can be placed on any side and alignment relative to the trigger. Use the interactive controls below to see how `position` and `offset` work.

### Preview (interactive)
<PositionsPreview />

### With Icons, Labels & Dividers

Compose the menu with `Menu.Label`, `Menu.Divider`, and `leftSection`/`rightSection` props on items for a richer UI.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuIconsLabels.tsx",
      code: `import { Menu, Button } from "@kousta-ui/components";
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>
        <Button variant="primary-light">Account</Button>
      </Menu.Target>
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
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuIconsLabels.jsx",
      code: `import { Menu, Button } from "@kousta-ui/components";
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>
        <Button variant="primary-light">Account</Button>
      </Menu.Target>
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
  );
}`
    }
  ]}
  preview={<IconsLabelsDividersPreview />}
  defaultTab="ts"
/>

### Disabled Items

Pass the `disabled` prop to any `Menu.Item` to make it non-interactive.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuDisabledItems.tsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>
        <Button>Move</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Project A</Menu.Item>
        <Menu.Item disabled>Project B (locked)</Menu.Item>
        <Menu.Item>Project C</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuDisabledItems.jsx",
      code: `import { Menu, Button } from "@kousta-ui/components";

export default function Example() {
  return (
    <Menu.Menu>
      <Menu.Target>
        <Button>Move</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Project A</Menu.Item>
        <Menu.Item disabled>Project B (locked)</Menu.Item>
        <Menu.Item>Project C</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
}`
    }
  ]}
  preview={<DisabledItemsPreview />}
  defaultTab="ts"
/>

---

## Styles & customization

### Runtime classes

You can target these classes with CSS to customize the Menu appearance:

- **`kui-menu`**: The main container (`Menu.Menu`).
- **`kui-menu-target`**: The trigger button (`Menu.Target`).
- **`kui-menu-dropdown`**: The dropdown panel (`Menu.DropDown`).
- **`kui-menu-item`**: A menu item (`Menu.Item`).
- **`kui-disabled`**: Added to a `kui-menu-item` when it is disabled.
- **`kui-menu-label`**: A label (`Menu.Label`).
- **`kui-menu-divider`**: A divider (`Menu.Divider`).

### Customization with kui-classnames

You can use these class names to style Menu components:

```css
/* Customize the dropdown panel */
.kui-menu-dropdown {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Style menu items on hover */
.kui-menu-item:hover {
  background-color: var(--kui-primary-100);
}

/* Customize disabled items */
.kui-menu-item.kui-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Style the divider */
.kui-menu-divider {
  border-color: var(--kui-neutral-300);
  margin: 0.5rem 0;
}
```

### Tokens used by the default styles

- **Colors**: `--kui-neutral-*`
- **Spacing**: `--kui-spacing-sm`
- **Rounding**: `--kui-rounded`

---

## Component Props Provider

You can set global defaults for Menu components using the `ComponentPropsProvider`:

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MenuProvider.tsx",
      code: `import { Menu, ComponentPropsProvider } from "@kousta-ui/components";

export default function Example() {
  return (
    <ComponentPropsProvider
      menu={{
        menu: {
          type: "click",
          closeOnClick: true,
          position: "Bottom-Start",
          offset: 8,
        },
        menuItem: {
          closeMenuOnClick: true,
        },
      }}
    >
      <Menu.Menu>
        <Menu.Target>Open Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item closeMenuOnClick={false}>Item 2 (stays open)</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>
    </ComponentPropsProvider>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MenuProvider.jsx",
      code: `import { Menu, ComponentPropsProvider } from "@kousta-ui/components";

export default function Example() {
  return (
    <ComponentPropsProvider
      menu={{
        menu: {
          type: "click",
          closeOnClick: true,
          position: "Bottom-Start",
          offset: 8,
        },
        menuItem: {
          closeMenuOnClick: true,
        },
      }}
    >
      <Menu.Menu>
        <Menu.Target>Open Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item closeMenuOnClick={false}>Item 2 (stays open)</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>
    </ComponentPropsProvider>
  );
}`
    }
  ]}
  preview={<ClickTriggerPreview />}
  defaultTab="ts"
/>

See the [ComponentPropsProvider documentation](/docs/Components/ComponentPropsProvider) for more details.

---

## Types (reference)

```ts
import { ReactNode } from "react";

export type MenuOpenPosition = "Top" | "Bottom" | "Left" | "Right";
export type MenuOpenLocation = "Start" | "End" | "Center";

export type MenuPosition = \`\${MenuOpenPosition}-\${MenuOpenLocation}\`;

// Valid values:
// 'Top-Start' | 'Top-Center' | 'Top-End' | 
// 'Bottom-Start' | 'Bottom-Center' | 'Bottom-End' | 
// 'Left-Start' | 'Left-Center' | 'Left-End' | 
// 'Right-Start' | 'Right-Center' | 'Right-End'

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

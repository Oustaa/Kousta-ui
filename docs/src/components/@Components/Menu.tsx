import React, { useMemo, useState } from "react";
import { Menu, Button } from "@kousta-ui/components";
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu";

/** Quick start button + simple dropdown */
export const QuickStartExample = () => {
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
};

/** Explicit click trigger preview (default) */
export const ClickTriggerPreview = () => {
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
};

/** Hover trigger preview */
export const HoverTriggerPreview = () => {
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
};

/** Close behavior: container closeOnClick=false + per-item override */
export const CloseBehaviorPreview = () => {
  return (
    <Menu.Menu closeOnClick={false}>
      <Menu.Target>
        <Button variant="secondary">Bulk actions</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Pin</Menu.Item>
        <Menu.Item closeMenuOnClick>Share</Menu.Item>
        <Menu.Item>Archive</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
};

/** Interactive positions + offset control */
const ALL_POSITIONS = [
  "Bottom-Start",
  "Bottom-Center",
  "Bottom-End",
  "Top-Start",
  "Top-Center",
  "Top-End",
  "Left-Start",
  "Left-Center",
  "Left-End",
  "Right-Start",
  "Right-Center",
  "Right-End",
] as const;

type Pos = (typeof ALL_POSITIONS)[number];

export const PositionsPreview = () => {
  const [position, setPosition] = useState<Pos>("Bottom-Start");
  const [offset, setOffset] = useState<number>(6);

  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label htmlFor={`pos-${id}`} style={{ fontSize: 14 }}>
          Position
        </label>
        <select
          id={`pos-${id}`}
          value={position}
          onChange={(e) => setPosition(e.target.value as Pos)}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          {ALL_POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label htmlFor={`off-${id}`} style={{ fontSize: 14 }}>
          Offset
        </label>
        <input
          id={`off-${id}`}
          type="number"
          min={0}
          max={32}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          style={{ width: 80, padding: "6px 8px", borderRadius: 6 }}
        />
      </div>

      <div style={{ minHeight: 120, display: "grid", placeItems: "center" }}>
        <Menu.Menu position={position} offset={offset}>
          <Menu.Target>
            <Button>
              Current: {position} (offset {offset})
            </Button>
          </Menu.Target>
          <Menu.DropDown>
            <Menu.Item>One</Menu.Item>
            <Menu.Item>Two</Menu.Item>
            <Menu.Item>Three</Menu.Item>
          </Menu.DropDown>
        </Menu.Menu>
      </div>
    </div>
  );
};

/** Icons, labels & dividers */
export const IconsLabelsDividersPreview = () => {
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
};

/** Disabled items */
export const DisabledItemsPreview = () => {
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
};

/** Accessibility extras (demonstrative only) */
export const AccessibilityPreview = () => {
  const [open, setOpen] = useState(false);
  return (
    <Menu.Menu>
      <Menu.Target
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Button variant="outline">Options</Button>
      </Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Alpha</Menu.Item>
        <Menu.Item>Beta</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  );
};

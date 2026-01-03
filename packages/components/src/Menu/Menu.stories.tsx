import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Menu from ".";

const meta = {
  title: "Components/Menu",
  component: Menu.Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu.Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Click: Story = {
  render: () => (
    <Menu.Menu>
      <Menu.Target>Open menu</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Log out</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  ),
};

export const Hover: Story = {
  render: () => (
    <Menu.Menu type="hover" position="Bottom-Start" offset={8}>
      <Menu.Target>Hover me</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>One</Menu.Item>
        <Menu.Item>Two</Menu.Item>
        <Menu.Item disabled>Disabled</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  ),
};

export const CloseBehavior: Story = {
  render: () => (
    <Menu.Menu closeOnClick={false}>
      <Menu.Target>Bulk actions</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Pin</Menu.Item>
        <Menu.Item closeMenuOnClick>Share (closes)</Menu.Item>
        <Menu.Item>Archive</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>
  ),
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = React.useState<
      | "Bottom-Start"
      | "Bottom-Center"
      | "Bottom-End"
      | "Top-Start"
      | "Top-Center"
      | "Top-End"
      | "Left-Start"
      | "Left-Center"
      | "Left-End"
      | "Right-Start"
      | "Right-Center"
      | "Right-End"
    >("Bottom-Start");

    const [offset, setOffset] = React.useState(6);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label style={{ fontSize: 14 }}>
            Position
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as typeof position)}
              style={{ marginLeft: 8 }}
            >
              {[
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
              ].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label style={{ fontSize: 14 }}>
            Offset
            <input
              type="number"
              value={offset}
              min={0}
              max={32}
              onChange={(e) => setOffset(Number(e.target.value))}
              style={{ width: 80, marginLeft: 8 }}
            />
          </label>
        </div>

        <div style={{ minHeight: 120, display: "grid", placeItems: "center" }}>
          <Menu.Menu position={position} offset={offset}>
            <Menu.Target>Open ({position})</Menu.Target>
            <Menu.DropDown>
              <Menu.Item>One</Menu.Item>
              <Menu.Item>Two</Menu.Item>
              <Menu.Item>Three</Menu.Item>
            </Menu.DropDown>
          </Menu.Menu>
        </div>
      </div>
    );
  },
};

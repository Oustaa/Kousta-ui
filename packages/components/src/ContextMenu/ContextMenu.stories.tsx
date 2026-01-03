import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ContextMenu from ".";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    options: [
      { optionType: "Group", groupTitle: "File" },
      { title: "Rename", onClick() {} },
      { title: "Duplicate", onClick() {} },
      { optionType: "Separator" },
      { title: "Delete", onClick() {}, active: true },
    ],
  },
  render: (args) => (
    <ContextMenu {...args}>
      <div
        style={{
          padding: 24,
          border: "1px dashed var(--Oui-neutral-400)",
          borderRadius: 8,
          minWidth: 320,
          textAlign: "center",
        }}
      >
        Right-click inside this box
      </div>
    </ContextMenu>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <ContextMenu
      options={[
        {
          title: "Share",
          subOptions: [
            { title: "Copy link", onClick() {} },
            { title: "Invite…", onClick() {} },
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
      ]}
    >
      <div
        style={{
          padding: 24,
          border: "1px dashed var(--Oui-neutral-400)",
          borderRadius: 8,
          minWidth: 320,
          textAlign: "center",
        }}
      >
        Right-click for submenus
      </div>
    </ContextMenu>
  ),
};

export const ProgrammaticPositioningDemo: Story = {
  render: () => {
    const areaRef = React.useRef<HTMLDivElement | null>(null);

    const triggerAt = (xPct: number, yPct: number) => {
      const el = areaRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const clientX = rect.left + rect.width * xPct;
      const clientY = rect.top + rect.height * yPct;

      el.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX,
          clientY,
        }),
      );
    };

    return (
      <ContextMenu
        options={[
          { title: "Item 1", onClick() {} },
          { title: "Item 2", onClick() {} },
        ]}
      >
        <div
          ref={areaRef}
          style={{
            padding: 24,
            border: "1px dashed var(--Oui-neutral-400)",
            borderRadius: 8,
            minWidth: 420,
            minHeight: 200,
            display: "grid",
            gap: 12,
            alignContent: "start",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" onClick={() => triggerAt(0.05, 0.1)}>
              Top-Left
            </button>
            <button type="button" onClick={() => triggerAt(0.95, 0.1)}>
              Top-Right
            </button>
            <button type="button" onClick={() => triggerAt(0.05, 0.9)}>
              Bottom-Left
            </button>
            <button type="button" onClick={() => triggerAt(0.95, 0.9)}>
              Bottom-Right
            </button>
            <button type="button" onClick={() => triggerAt(0.5, 0.5)}>
              Center
            </button>
          </div>
          Right-click anywhere in this box (or click the buttons above).
        </div>
      </ContextMenu>
    );
  },
};

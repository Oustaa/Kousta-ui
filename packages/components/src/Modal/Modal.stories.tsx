import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Modal from ".";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    title: "Uncontrolled modal",
    modalTrigger: "Open modal",
    size: "600",
  },
  render: (args) => (
    <div style={{ minHeight: 240 }}>
      <Modal {...args}>
        <p style={{ margin: 0 }}>Hello from the modal body.</p>
      </Modal>
    </div>
  ),
};

export const Controlled: Story = {
  args: {},
  render: () => {
    const [opened, setOpened] = React.useState(false);

    return (
      <div style={{ minHeight: 240 }}>
        <button type="button" onClick={() => setOpened(true)}>
          Open controlled modal
        </button>

        <Modal
          title="Controlled modal"
          opened={opened}
          onClose={() => setOpened(false)}
          size="600"
        >
          <p style={{ margin: 0 }}>This modal is controlled by state.</p>
        </Modal>
      </div>
    );
  },
};

export const AsDrawer: Story = {
  args: {
    title: "Drawer",
    modalTrigger: "Open drawer",
    position: "left-top",
    fullHeight: true,
    size: "400",
  },
  render: (args) => (
    <div style={{ minHeight: 240 }}>
      <Modal {...args}>
        <p style={{ margin: 0 }}>Drawer-like modal content.</p>
      </Modal>
    </div>
  ),
};

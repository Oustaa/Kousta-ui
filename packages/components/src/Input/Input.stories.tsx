import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Input from ".";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    errors: ["Email is required"],
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithLeftRightSections: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Input
        label="Amount"
        placeholder="0"
        leftSection={<span style={{ padding: "0 8px" }}>$</span>}
        rightSection={<span style={{ padding: "0 8px" }}>USD</span>}
      />
    </div>
  ),
};

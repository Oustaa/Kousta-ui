import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Select from ".";

type Row = { value: string; label: string; group?: string };

const DATA: Row[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "strawberry", label: "Strawberry" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select<Row>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | number | undefined>();

    return (
      <div style={{ width: 420 }}>
        <Select<Row>
          label="Fruit"
          data={DATA}
          value={value}
          onChange={(v) => setValue(v as string)}
        />
        <div style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
          Selected: {String(value ?? "-")}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Select<Row> label="Fruit" data={DATA} disabled />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Select<Row>
        label="Fruit"
        data={DATA}
        disabledOption={(row) => row.value === "banana"}
      />
    </div>
  ),
};

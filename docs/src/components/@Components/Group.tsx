import React from "react";
import { Group, Button, Input } from "@kousta-ui/components";

export const HorizontalGroupPreview = () => (
  <Group>
    <Button variant="primary-outline">Button 1</Button>
    <Button variant="primary-outline">Button 2</Button>
    <Button variant="primary-outline">Button 3</Button>
  </Group>
);

export const VerticalGroupPreview = () => (
  <div style={{ width: '100%', maxWidth: 200 }}>
    <Group direction="column">
        <Button variant="neutral-outline">Button 1</Button>
        <Button variant="neutral-outline">Button 2</Button>
        <Button variant="neutral-outline">Button 3</Button>
    </Group>
  </div>
);

export const GapPreview = () => (
    <Group gap="2rem">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
    </Group>
);

export const InputGroupPreview = () => (
    <div style={{ width: '100%', maxWidth: 420 }}>
        <Group>
            <Input placeholder="Search..." />
            <Button>Search</Button>
        </Group>
    </div>
);

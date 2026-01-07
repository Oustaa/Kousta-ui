---
sidebar_position: 11
---

import Badge from '@site/src/components/Badge';
import {
  HorizontalGroupPreview,
  VerticalGroupPreview,
  GapPreview,
  InputGroupPreview
} from '@site/src/components/@Components/Group';

# Group

The **Group** is a layout component that arranges its children in a stack (horizontally or vertically) and intelligently handles the styling of the first, middle, and last elements to create a cohesive group.

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"row" \| "column"` | `"row"` | The direction to stack the children. |
| `gap` | `string \| number` | `0` | The spacing between the children. |

---

## Usage

### Horizontal Group (Default)

By default, `Group` arranges its children in a row. It automatically handles the border-radius of the first and last elements to create a unified look.

```tsx
import { Group, Button } from "@kousta-ui/components";

<Group>
  <Button variant="primary-outline">Button 1</Button>
  <Button variant="primary-outline">Button 2</Button>
  <Button variant="primary-outline">Button 3</Button>
</Group>
```

### Preview
<HorizontalGroupPreview />

### Vertical Group

Set `direction="column"` to stack the children vertically.

```tsx
<Group direction="column">
  <Button variant="neutral-outline">Button 1</Button>
  <Button variant="neutral-outline">Button 2</Button>
  <Button variant="neutral-outline">Button 3</Button>
</Group>
```

### Preview
<VerticalGroupPreview />

### With Custom Gap

You can specify a `gap` between the elements.

```tsx
<Group gap="2rem">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Group>
```

### Preview
<GapPreview />

### Input Group

`Group` is also useful for creating input groups with buttons or other elements.

```tsx
<Group>
  <Input placeholder="Search..." />
  <Button>Search</Button>
</Group>
```

### Preview
<InputGroupPreview />

---

## Styles & customization

`Group` is a layout component that applies flexbox properties to a container.

### Runtime classes

- **`kui-group`**: The base class applied to the `div` container.

### CSS Properties

- The component applies `flex-direction` and `gap` styles directly to the container based on the `direction` and `gap` props.

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef } from "react";

export type GroupProps = ComponentPropsWithoutRef<"div"> & {
  direction?: "row" | "column";
  gap?: string | number;
};
```

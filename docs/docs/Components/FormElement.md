---
sidebar_position: 10
---

import Badge from '@site/src/components/Badge';
import {
  VerticalLayoutPreview,
  HorizontalLayoutPreview
} from '@site/src/components/@Components/FormElement';

# FormElement

The **FormElement** is a layout component used to arrange a label and its corresponding input field either vertically or horizontally.

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `labelPosition` | `"x" \| "y"` | `"y"` | The layout direction. `y` for vertical (default), `x` for horizontal. |

---

## Usage

### Vertical Layout (Default)

By default, `FormElement` arranges its children in a column.

```tsx
import { FormElement, Label, Input } from "@kousta-ui/components";

<FormElement labelPosition="y">
  <Label>Email Address</Label>
  <Input placeholder="you@example.com" />
</FormElement>
```

### Preview
<VerticalLayoutPreview />

### Horizontal Layout

Set `labelPosition="x"` to arrange the label and input in a row. You may need to set a `minWidth` on the `Label` for proper alignment.

```tsx
<FormElement labelPosition="x">
  <Label style={{ minWidth: 120 }}>Email Address</Label>
  <Input placeholder="you@example.com" />
</FormElement>
```

### Preview
<HorizontalLayoutPreview />

---

## Styles & customization

`FormElement` is a layout component and has minimal styling. It applies flexbox properties to its container.

### Runtime classes

- **`kui-form-element`**: The base class applied to the `div` container.

### CSS Properties

- **`labelPosition="y"`**: applies `flex-direction: column` and `align-items: start`.
- **`labelPosition="x"`**: applies `flex-direction: row` and `align-items: center`.

---

## Types (reference)

```ts
import { PropsWithChildren } from "react";

export type LabelPositionBase = "x" | "y";

export type FormElementProps = PropsWithChildren<{
  labelPosition?: LabelPositionBase;
}>;
```

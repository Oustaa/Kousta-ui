---
sidebar_position: 9
---

import Badge from '@site/src/components/Badge';
import {
  BasicLabelPreview,
  RequiredLabelPreview,
  ErrorLabelPreview
} from '@site/src/components/@Components/Label';

# Label

The **Label** component renders a styled `<label>` element with support for required and error states. It is designed to be used with form components like `Input` and `Select`.

---

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **Required** | The text content of the label. |
| `required` | `boolean` | `false` | If `true`, a required indicator (asterisk) is displayed. |
| `errors` | `string[] \| string \| ReactNode` | — | If present, applies error styling to the label. |
| `contextualClass` | `string` | — | An optional class name to be added to the label element. |

---

## Usage

### Basic Label

This is the default appearance of the label.

```tsx
<Label>Default Label</Label>
```

### Preview
<BasicLabelPreview />

### Required Label

Set the `required` prop to `true` to indicate that the associated field is mandatory.

```tsx
<Label required>Required Label</Label>
```

### Preview
<RequiredLabelPreview />

### Label with Error

When the `errors` prop is provided, the label will be styled to indicate an error state.

```tsx
<Label errors={["This field has an error"]}>Label with Error</Label>
```

### Preview
<ErrorLabelPreview />

---

## Styles & customization

### Runtime classes

- **`kui-label`**: The base class applied to the `<label>` element.

### Data Attributes

- **`data-required="true"`**: Applied when the `required` prop is `true`.
- **`data-error="true"`**: Applied when the `errors` prop is provided.

### Tokens used by the default styles

- **Colors**: `--kui-danger-500` for the required indicator and error state.
- **Typography**: Inherits font size and weight from its parent.

---

## Types (reference)

```ts
import { ComponentPropsWithoutRef, ReactNode } from "react";

export type LabelProps = ComponentPropsWithoutRef<"label"> & {
  children: string;
  required?: boolean;
  errors?: string[] | string | ReactNode;
  contextualClass?: string;
};
```

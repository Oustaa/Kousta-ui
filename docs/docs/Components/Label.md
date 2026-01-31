---
sidebar_position: 9
---

import Badge from '@site/src/components/Badge';
import CodePreviewWrapper from '@site/src/components/CodePreviewWrapper';
import {
  BasicLabelPreview,
  RequiredLabelPreview,
  ErrorLabelPreview
} from '@site/src/components/@Components/Label';

# Label

The **Label** component renders a styled `<label>` element with support for required and error states. It is designed to be used with form components like `Input` and `Select`.

---

## Installation

```bash
npm install @kousta-ui/components
```

### Import styles

```ts
import "@kousta-ui/components/esm/index.css";
```

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

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "BasicLabel.tsx",
      code: `<Label>Default Label</Label>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "BasicLabel.jsx",
      code: `<Label>Default Label</Label>`
    }
  ]}
  preview={<BasicLabelPreview />}
  defaultTab="ts"
/>

### Required Label

Set the `required` prop to `true` to indicate that the associated field is mandatory.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "RequiredLabel.tsx",
      code: `<Label required>Required Label</Label>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "RequiredLabel.jsx",
      code: `<Label required>Required Label</Label>`
    }
  ]}
  preview={<RequiredLabelPreview />}
  defaultTab="ts"
/>

### Label with Error

When the `errors` prop is provided, the label will be styled to indicate an error state.

<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "LabelWithError.tsx",
      code: `<Label errors={["This field has an error"]}>Label with Error</Label>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "LabelWithError.jsx",
      code: `<Label errors={["This field has an error"]}>Label with Error</Label>`
    }
  ]}
  preview={<ErrorLabelPreview />}
  defaultTab="ts"
/>

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

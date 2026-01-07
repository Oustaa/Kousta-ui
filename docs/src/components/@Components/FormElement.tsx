import React from "react";
import { FormElement, Label, Input } from "@kousta-ui/components";

export const VerticalLayoutPreview = () => (
  <div style={{ width: '100%', maxWidth: 420 }}>
    <FormElement labelPosition="y">
      <Label>Email Address</Label>
      <Input placeholder="you@example.com" />
    </FormElement>
  </div>
);

export const HorizontalLayoutPreview = () => (
  <div style={{ width: '100%', maxWidth: 420 }}>
    <FormElement labelPosition="x">
      <Label style={{ minWidth: 120 }}>Email Address</Label>
      <Input placeholder="you@example.com" />
    </FormElement>
  </div>
);

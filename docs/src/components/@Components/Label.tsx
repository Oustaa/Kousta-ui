import React from "react";
import { Label } from "@kousta-ui/components";

export const BasicLabelPreview = () => (
  <Label>Default Label</Label>
);

export const RequiredLabelPreview = () => (
  <Label required>Required Label</Label>
);

export const ErrorLabelPreview = () => (
  <Label errors={["This field has an error"]}>Label with Error</Label>
);

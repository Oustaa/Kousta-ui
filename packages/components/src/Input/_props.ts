import { ComponentPropsWithoutRef, ReactNode } from "react";
import { LabelPositionBase } from "../_core/types";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<"label">;
  errors?: string[] | string | ReactNode;
  required?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  labelPosition?: LabelPositionBase;
};

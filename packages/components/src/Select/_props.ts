import { ComponentPropsWithoutRef, ReactNode } from "react";
import { LabelPositionBase } from "../_core/types";

export type SelectDataConstraints = Record<string | number, unknown>;

type RenderOptionFunction<T> = (row: T) => ReactNode | string;

export type SelectOptionType<T> = {
  value: string;

  label?: string;
  renderOption?: RenderOptionFunction<T>;
} & (
  | {
      label: string;
      renderOption?: RenderOptionFunction<T>;
    }
  | {
      label?: never;
      renderOption: RenderOptionFunction<T>;
    }
);

export type SelectProps<T extends SelectDataConstraints> = {
  // should add an option for getting data dynamically
  data: T[];
  onChange?: (value: unknown) => void;
  value?: string;

  options?: SelectOptionType<T>;
  label?: string;
  labelProps?: ComponentPropsWithoutRef<"label">;
  labelPosition?: LabelPositionBase;
  errors?: string[] | string | ReactNode;
  required?: boolean;
  seachable?: boolean;
  clearable?: boolean;
  emptyMessage?: string;
  disabled?: boolean;

  disabledOption?: (row: T) => boolean;
};

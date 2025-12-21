import { ComponentPropsWithoutRef, ReactNode } from "react";
import { LabelPositionBase } from "../../_core/types";

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
  data: T[];
  onChange?: (value: unknown) => void;
  value?: string | number;
  limit?: number;
  // Async Select Props
  onLastItemRendered?: () => void;
  asyncSearch?: (term: string) => void;
  // End Async Select Props

  loading?: boolean;
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
  onSearch?: (row: T, term: string) => void;
  disabledOption?: (row: T) => boolean;
};

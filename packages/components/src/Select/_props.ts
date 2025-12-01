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

type GetDataFunction = () => Promise<unknown>;
type ExtractDynamicDataFunction<T> = (response: any) => T[];

export type SelectProps<T extends SelectDataConstraints> = {
  // should add an option for getting data dynamically
  data?: T[];
  getData?: GetDataFunction;
  extractDynamicData?: ExtractDynamicDataFunction<T>;
  onChange?: (value: unknown) => void;
  value?: string | number;

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
  // this is meant for if you want to search on a backend or some like that
  // | ((term: string) => Promise<unknown>);
  disabledOption?: (row: T) => boolean;
} & (
  | {
      data: T[];
      getData?: never;
      extractDynamicData?: never;
    }
  | {
      data?: never;
      loading?: never;
      getData: GetDataFunction;
      extractDynamicData?: ExtractDynamicDataFunction<T>;
    }
);

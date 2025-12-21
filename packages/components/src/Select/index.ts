import type {
  SelectProps as BaseSelectProps,
  SelectDataConstraints,
} from "./Base/_props";

export { default as Select } from "./Base";

export type SelectProps<T extends SelectDataConstraints> = Omit<
  BaseSelectProps<T>,
  "onLastItemRendered" | "asyncSearch"
>;

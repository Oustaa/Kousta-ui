import BaseSelect from "./Base";

import type {
  SelectProps as BaseSelectProps,
  SelectDataConstraints,
} from "./Base/_props";

export type SelectProps<T extends SelectDataConstraints> = Omit<
  BaseSelectProps<T>,
  "onLastItemRendered" | "asyncSearch" | "extraOptionsLoading" | "limit"
>;

export const Select = <T extends SelectDataConstraints>(
  props: SelectProps<T>,
) => {
  return <BaseSelect {...props} />;
};

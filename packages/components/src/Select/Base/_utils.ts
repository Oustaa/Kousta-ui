import { ReactNode } from "react";
import { SelectDataConstraints, SelectOptionType } from "./_props";
import { getNestedProperty } from "@kousta-ui/helpers";

export const getOptionLabel = <T extends SelectDataConstraints>(
  row: T,
  options?: SelectOptionType<T>,
): string | ReactNode => {
  if (!options) return "";

  if (options.renderOption && typeof options.renderOption === "function") {
    return options.renderOption(row);
  } else if (options.label) {
    return getNestedProperty(row, options.label);
  }
};

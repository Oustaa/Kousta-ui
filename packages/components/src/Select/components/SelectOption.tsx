import { useEffect, useRef } from "react";
import { SelectDataConstraints, SelectProps } from "../_props";
import { getOptionLabel } from "../_utils";
import classes from "../Select.module.css";
import { getNestedProperty } from "@kousta-ui/helpers";

type SelectOptionProps<T extends SelectDataConstraints> = {
  row: T;
  onSelectValue: (value: unknown) => void;
  value?: unknown;
  isHighlighted: boolean;
  highlightOption: VoidFunction;
} & Pick<SelectProps<T>, "options" | "disabledOption">;

const SelectOption = <T extends SelectDataConstraints>({
  row,
  options,
  onSelectValue,
  value,
  isHighlighted,
  highlightOption,
  disabledOption,
}: SelectOptionProps<T>) => {
  const optionRef = useRef<null | HTMLDivElement>(null);
  const disabled = disabledOption?.(row);

  useEffect(() => {
    if (optionRef && isHighlighted) {
      optionRef.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [isHighlighted]);

  return (
    <div
      role="option"
      ref={optionRef}
      onMouseEnter={highlightOption}
      data-selected={value === getNestedProperty(row, options?.value as string)}
      data-disabled={String(disabled)}
      className={`${classes["select-option"]} ${isHighlighted && classes["highlighted-option"]}`}
      onClick={() => {
        if (!disabled) {
          highlightOption();
          onSelectValue(getNestedProperty(row, options?.value as string));
        }
      }}
    >
      {getOptionLabel(row, options)}
    </div>
  );
};

export default SelectOption;

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
} & Pick<SelectProps<T>, "options">;

const SelectOption = <T extends SelectDataConstraints>({
  row,
  options,
  onSelectValue,
  value,
  isHighlighted,
  highlightOption,
}: SelectOptionProps<T>) => {
  return (
    <div
      onMouseEnter={highlightOption}
      data-selected={value === getNestedProperty(row, options?.value as string)}
      className={`${classes["select-option"]} ${isHighlighted && classes["highlighted-option"]}`}
      onClick={() => {
        highlightOption();
        onSelectValue(getNestedProperty(row, options?.value as string));
      }}
    >
      {getOptionLabel(row, options)}
    </div>
  );
};

export default SelectOption;

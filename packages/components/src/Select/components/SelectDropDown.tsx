import { useCallback, useEffect, useState } from "react";
import { SelectDataConstraints, SelectProps } from "../_props";
import classes from "../Select.module.css";
import SelectOption from "./SelectOption";
import { getNestedProperty } from "@kousta-ui/helpers";

type SelectDropDownProps<T extends SelectDataConstraints> = {
  closeOnClickOutside: (e?: MouseEvent | TouchEvent) => void;
  onSelectValue: (value: unknown) => void;
  value?: unknown;
} & Pick<SelectProps<T>, "data" | "options" | "emptyMessage">;

const SelectDropDown = <T extends SelectDataConstraints>({
  data,
  emptyMessage = "No option found",
  closeOnClickOutside,
  options,
  onSelectValue,
  value,
}: SelectDropDownProps<T>) => {
  const [highlitedOptionIndex, setHighlitedOptionIndex] = useState<number>(
    () => {
      if (value) {
        const rowIndex = data.findIndex(
          (row) => value === getNestedProperty(row, options?.value as string),
        );

        return rowIndex;
      }
      return 0;
    },
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeOnClickOutside);
    document.addEventListener("touchstart", closeOnClickOutside, true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOnClickOutside();
      if (e.key === "ArrowDown")
        setHighlitedOptionIndex((prev) => {
          if (prev >= data.length - 1) {
            return 0;
          }

          return prev + 1;
        });
      if (e.key === "ArrowUp")
        setHighlitedOptionIndex((prev) => {
          if (prev === 0) {
            return data.length - 1;
          }
          return prev - 1;
        });
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", closeOnClickOutside);
      window.removeEventListener("touchstart", closeOnClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const selectedOption = data[highlitedOptionIndex];
        console.log({ selectedOption, highlitedOptionIndex });

        const value = getNestedProperty(
          selectedOption,
          options?.value as string,
        );

        onSelectValue(value);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [highlitedOptionIndex]);

  // should add an effect for presing down/up keys (DONE)
  // add state for the highlithed option (DONE)
  // it should change on the option hover, and if clicking on the up/down keys
  // on clicking on enter the highlithed option should be selected
  const setHighlitedOption = useCallback((index: number) => {
    setHighlitedOptionIndex(index);
  }, []);

  return (
    <div className={classes["select-dropdown"]}>
      {data.length === 0 ? (
        <div className={classes["select-empty-message"]}>{emptyMessage}</div>
      ) : (
        data.map((row, index) => (
          <SelectOption
            row={row}
            isHighlighted={index === highlitedOptionIndex}
            key={getNestedProperty(row, options?.value as string)}
            options={options}
            onSelectValue={onSelectValue}
            value={value}
            highlightOption={() => setHighlitedOption(index)}
          />
        ))
      )}
    </div>
  );
};

export default SelectDropDown;

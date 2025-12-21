import { Ref, useCallback, useEffect, useRef } from "react";
import { SelectDataConstraints, SelectProps } from "../_props";
import { getOptionLabel } from "../_utils";
import classes from "../Select.module.css";
import { getNestedProperty } from "@kousta-ui/helpers";
import WindowBoundary from "components/src/WindowBoundary";

type SelectOptionProps<T extends SelectDataConstraints> = {
  index?: number;
  dataLength?: number;
  row: T;
  onSelectValue: (value: unknown) => void;
  value?: unknown;
  isHighlighted: boolean;
  highlightOption: VoidFunction;
  dropdownRef: Ref<HTMLDivElement>;
} & Pick<SelectProps<T>, "options" | "disabledOption" | "onLastItemRendered">;

const SelectOption = <T extends SelectDataConstraints>({
  index,
  dataLength,
  row,
  options,
  onSelectValue,
  value,
  isHighlighted,
  highlightOption,
  disabledOption,
  onLastItemRendered,
  dropdownRef,
}: SelectOptionProps<T>) => {
  const optionRef = useRef<HTMLDivElement | null>(null);
  const disabled = disabledOption?.(row) ?? false;

  useEffect(() => {
    if (isHighlighted && optionRef.current) {
      optionRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [isHighlighted]);

  const optionValue = getNestedProperty(row, options?.value as string);
  const isSelected = value === optionValue;

  return (
    <WindowBoundary
      onceItemEnter={
        onLastItemRendered
          ? () => {
              console.log("select last item just rendered");
              console.log({ index, onLastItemRendered, dataLength });
              console.log({ onLastItemRendered });
              onLastItemRendered?.();
            }
          : undefined
      }
      root={(dropdownRef as any)?.current ?? undefined}
      threshold={0.5}
    >
      <div
        ref={optionRef}
        role="option"
        onMouseEnter={highlightOption}
        className={[
          classes["select-option"],
          isHighlighted ? classes["highlighted-option"] : "",
        ].join(" ")}
        data-selected={isSelected}
        data-disabled={disabled}
        onClick={() => {
          if (!disabled) {
            highlightOption();
            onSelectValue(optionValue);
          }
        }}
      >
        {getOptionLabel(row, options)}
      </div>
    </WindowBoundary>
  );
};

export default SelectOption;

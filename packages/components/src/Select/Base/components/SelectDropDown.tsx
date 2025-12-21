import { useCallback, useEffect, useRef, useState } from "react";
import { SelectDataConstraints, SelectProps } from "../_props";
import classes from "../Select.module.css";
import SelectOption from "./SelectOption";
import { getNestedProperty } from "@kousta-ui/helpers";

type SelectDropDownProps<T extends SelectDataConstraints> = {
  closeOnClickOutside: (e?: MouseEvent | TouchEvent) => void;
  onSelectValue: (value: unknown) => void;
  value?: unknown;
  data: T[];
  loading: boolean;
} & Pick<
  SelectProps<T>,
  "options" | "emptyMessage" | "disabledOption" | "onLastItemRendered"
>;

const SelectDropDown = <T extends SelectDataConstraints>({
  data,
  emptyMessage = "No option found",
  closeOnClickOutside,
  disabledOption,
  options,
  onSelectValue,
  loading,
  value,
  onLastItemRendered,
}: SelectDropDownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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

  const goNext = useCallback(
    (index: number): number => {
      // check if the current option is not disabled
      const row = data[index];

      if (disabledOption && disabledOption(row)) {
        return goNext(index + 1);
      }

      return index;
    },
    [highlitedOptionIndex],
  );

  const goPrev = useCallback(
    (index: number): number => {
      // check if the current option is not disabled
      const row = data[index];

      if (disabledOption && disabledOption(row)) {
        return goPrev(index - 1);
      }

      return index;
    },
    [highlitedOptionIndex],
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeOnClickOutside);
    document.addEventListener("touchstart", closeOnClickOutside, true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOnClickOutside();
      if (e.key === "ArrowDown") {
        setHighlitedOptionIndex((prev) => {
          if (prev >= data.length - 1) {
            return 0;
          }

          return goNext(prev + 1);
        });
      }
      if (e.key === "ArrowUp") {
        setHighlitedOptionIndex((prev) => {
          if (prev === 0) {
            return data.length - 1;
          }
          return goPrev(prev - 1);
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", closeOnClickOutside);
      window.removeEventListener("touchstart", closeOnClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const selectedOption = data[highlitedOptionIndex];

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

  const setHighlitedOption = useCallback((index: number) => {
    setHighlitedOptionIndex(index);
  }, []);

  return (
    <div ref={dropdownRef} className={classes["select-dropdown"]}>
      {data.length === 0 && !loading ? (
        <div className={classes["select-empty-message"]}>{emptyMessage}</div>
      ) : (
        <>
          {data.map((row, index) => {
            console.log({ index, "data.length - 1": data.length - 1 });
            return (
              <SelectOption
                index={index}
                dataLength={data.length}
                dropdownRef={dropdownRef}
                row={row}
                isHighlighted={index === highlitedOptionIndex}
                key={getNestedProperty(row, options?.value as string)}
                options={options}
                onSelectValue={onSelectValue}
                value={value}
                highlightOption={() => setHighlitedOption(index)}
                disabledOption={disabledOption}
                onLastItemRendered={
                  index === data.length - 1 ? onLastItemRendered : undefined
                }
              />
            );
          })}
          {/* this should be changed */}
          {loading && (
            <SelectOption
              dropdownRef={dropdownRef}
              row={{ label: "Loading...", value: "" } as unknown as T}
              highlightOption={() => {}}
              isHighlighted={false}
              options={{ value: "value", label: "label" }}
              onSelectValue={onSelectValue}
              value={value}
              disabledOption={() => true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SelectDropDown;

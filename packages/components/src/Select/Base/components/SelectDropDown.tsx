import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SelectDataConstraints, SelectProps } from "../_props";
import classes from "../Select.module.css";
import SelectOption from "./SelectOption";
import { getNestedProperty } from "@kousta-ui/helpers";
import ErrorBoundary from "components/src/ErrorBoundary";

type SelectDropDownProps<T extends SelectDataConstraints> = {
  closeOnClickOutside: (e?: MouseEvent | TouchEvent) => void;
  onSelectValue: (value: unknown) => void;
  value?: unknown;
  data: T[];
  extraOptionsLoading: boolean;
  persistedScrollTop?: number;
  restorePersistedScrollTop?: boolean;
  onScrollTopChange?: (scrollTop: number) => void;
} & Pick<
  SelectProps<T>,
  | "options"
  | "emptyMessage"
  | "disabledOption"
  | "onLastItemRendered"
  | "disableErrorBoundaries"
  | "optionErrorFallback"
>;

const SelectDropDown = <T extends SelectDataConstraints>({
  data,
  emptyMessage = "No option found",
  closeOnClickOutside,
  disabledOption,
  options,
  onSelectValue,
  extraOptionsLoading,
  value,
  onLastItemRendered,
  disableErrorBoundaries,
  optionErrorFallback,
  persistedScrollTop,
  restorePersistedScrollTop,
  onScrollTopChange,
}: SelectDropDownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const highlightedByUserRef = useRef(false);
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
      if (index >= data.length) {
        index = 0;
      }

      const row = data[index];

      if (disabledOption && disabledOption(row)) {
        return goNext(index + 1);
      }

      return index;
    },
    [highlitedOptionIndex, data],
  );

  const goPrev = useCallback(
    (index: number): number => {
      if (index < 0) {
        index = data.length - 1;
      }

      const row = data[index];

      if (disabledOption && disabledOption(row)) {
        return goPrev(index - 1);
      }

      return index;
    },
    [highlitedOptionIndex, data],
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeOnClickOutside);
    document.addEventListener("touchstart", closeOnClickOutside, true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOnClickOutside();
      if (e.key === "ArrowDown") {
        highlightedByUserRef.current = true;
        setHighlitedOptionIndex((prev) => {
          return goNext(prev + 1);
        });
        e.preventDefault();
      }
      if (e.key === "ArrowUp") {
        highlightedByUserRef.current = true;
        setHighlitedOptionIndex((prev) => {
          return goPrev(prev - 1);
        });
        e.preventDefault();
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
    highlightedByUserRef.current = false;
    setHighlitedOptionIndex((prev) => {
      if (prev >= data.length) return 0;
      return prev;
    });
  }, [data]);

  useLayoutEffect(() => {
    if (!restorePersistedScrollTop) return;
    if (typeof persistedScrollTop !== "number") return;
    if (!dropdownRef.current) return;

    dropdownRef.current.scrollTop = persistedScrollTop;
  }, [restorePersistedScrollTop, persistedScrollTop, data.length]);

  useEffect(() => {
    if (!extraOptionsLoading) return;
    if (!loadingRef.current) return;

    loadingRef.current.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
  }, [extraOptionsLoading]);

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
    <div
      ref={dropdownRef}
      onScroll={(e) => {
        onScrollTopChange?.((e.target as HTMLDivElement).scrollTop);
      }}
      className={`${classes["select-dropdown"]} kui-select-dropdown`}
    >
      {data.length === 0 && !extraOptionsLoading ? (
        <div
          className={`${classes["select-empty-message"]} kui-select-empty-message`}
          data-disabled={"true"}
        >
          {emptyMessage}
        </div>
      ) : (
        <>
          {data.map((row, index) => {
            return (
              <ErrorBoundary
                key={getNestedProperty(row, options?.value as string)}
                throwOnError={disableErrorBoundaries}
                fallback={
                  optionErrorFallback ? (
                    <div className={classes["select-option"]}>
                      {optionErrorFallback({ row })}
                    </div>
                  ) : (
                    <div
                      className={[
                        classes["select-option"],
                        classes["select-option-fallback"],
                      ].join(" ")}
                    >
                      Error Ocured while rendering option
                    </div>
                  )
                }
              >
                <SelectOption
                  index={index}
                  dataLength={data.length}
                  dropdownRef={dropdownRef}
                  row={row}
                  isHighlighted={index === highlitedOptionIndex}
                  options={options}
                  onSelectValue={onSelectValue}
                  value={value}
                  highlightOption={() => {
                    highlightedByUserRef.current = true;
                    setHighlitedOption(index);
                  }}
                  shouldScrollIntoView={highlightedByUserRef.current}
                  disabledOption={disabledOption}
                  onLastItemRendered={
                    index === data.length - 1 ? onLastItemRendered : undefined
                  }
                />
              </ErrorBoundary>
            );
          })}
          {/* this should be changed */}
          {extraOptionsLoading && (
            <div
              ref={loadingRef}
              role="option"
              data-disabled={"true"}
              className={[classes["select-option"], "kui-select-option"].join(
                " ",
              )}
            >
              Loading...
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectDropDown;

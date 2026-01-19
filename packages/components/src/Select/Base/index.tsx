import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FormElement from "../../FormElement";
import Label from "../../Label";
import { SelectDataConstraints, SelectProps } from "./_props";
import { getNestedProperty } from "@kousta-ui/helpers";
import SelectDropDown from "./components/SelectDropDown";
import SelectSearchInput from "./components/SelectSearchInput";
import SelectLoadingIndicator from "./components/SelectLoadingIndicator";

import classes from "./Select.module.css";
import {
  SelectPropsProvided,
  useComponentContext,
} from "components/src/PropsContext";

const BaseSelect = <T extends SelectDataConstraints>({
  label,
  labelProps,
  errors,
  required,
  labelPosition,
  data,
  options,
  clearable,
  emptyMessage,
  seachable,
  disabled,
  onChange,
  disabledOption,
  onSearch,
  loading,
  asyncSearch,
  onLastItemRendered,
  isMultiple,
  placeholder,
  rawValue,
  extraOptionsLoading,
  onBlur,
  disableErrorBoundaries,
  optionErrorFallback,
  selectErrorFallback,
  icons,
  ...props
}: SelectProps<T>) => {
  const selectProps = useComponentContext("select") as SelectPropsProvided;

  if (selectProps) {
    if (clearable === undefined) {
      if (selectProps.clearable !== undefined)
        clearable = selectProps.clearable;
    }
    if (selectProps.emptyMessage && !emptyMessage) {
      emptyMessage = selectProps.emptyMessage;
    }
    if (selectProps.rawValue && rawValue === undefined) {
      rawValue = selectProps.rawValue;
    }
    if (selectProps.labelPosition && !labelPosition) {
      labelPosition = selectProps.labelPosition;
    }
    if (selectProps.labelProps) {
      labelProps = { ...selectProps.labelProps, ...labelProps };
    }
    if (!options) {
      if (selectProps.options) options = selectProps.options;
      else options = { value: "value", label: "label" };
    }
    if (!optionErrorFallback && selectProps.optionErrorFallback) {
      // @ts-expect-error this is not an error
      optionErrorFallback = selectProps.optionErrorFallback;
    }
    if (!selectErrorFallback) {
      selectErrorFallback = selectProps.selectErrorFallback;
    }
    if (selectProps.icons) {
      if (!icons) icons = selectProps.icons;
      else icons = { ...selectProps.icons, ...icons };
    }
    if (seachable === undefined) {
      if (selectProps.seachable !== undefined)
        seachable = selectProps.seachable;
      else seachable = true;
    }
    if (selectProps.required && required === undefined) {
      required = selectProps.required;
    }
    if (
      selectProps.disableErrorBoundaries &&
      disableErrorBoundaries === undefined
    ) {
      disableErrorBoundaries = selectProps.disableErrorBoundaries;
    }
  } else {
    if (!options) {
      options = { value: "value", label: "label" };
    }
    if (!icons) icons = {};
  }

  const selectSearchInput = useRef<HTMLInputElement | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<T[]>(data);

  /* Select Value Logic */
  const [value, setValue] = useState<unknown>(props.value);

  /* Drop Down Logic */
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectInnerRef = useRef<HTMLDivElement | null>(null);

  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const OpenDropDown = useCallback(() => {
    if (disabled || loading) return;

    if (dropDownOpen) setDropDownOpen(false);
    else setDropDownOpen(true);
  }, [dropDownOpen, disabled, loading]);

  const closeDropDown = useCallback(() => {
    setDropDownOpen(false);
    setSelectData(data);
    setIsSearching(false);

    if (selectRef.current) {
      onBlur?.({
        ...selectRef.current,
        clear() {
          setValue(null);
        },
      });
    }

    if (selectSearchInput.current) selectSearchInput.current.value = "";
  }, [data, onBlur]);

  const closeOnClickOutside = useCallback(
    (e?: MouseEvent | TouchEvent) => {
      if (
        !e ||
        !selectRef.current ||
        !selectRef.current.contains(e.target as Node)
      )
        closeDropDown();
    },
    [data],
  );
  /* End Drop Down Logic */

  const onSelectValue = useCallback(
    (value: string | number | unknown) => {
      setValue(value);

      if (rawValue) {
        onChange?.(
          data.find(
            (row) => getNestedProperty(row, options?.value as string) === value,
          ),
        );
      } else {
        onChange?.(value);
      }

      if (!isMultiple) closeDropDown();

      // checkc if not multiple select clear search input value
      if (selectSearchInput.current && isMultiple)
        selectSearchInput.current.value = "";
    },
    [data, closeDropDown, isMultiple, onChange],
  );

  const selectedRow = useMemo(
    () =>
      data.find(
        (row) => getNestedProperty(row, options?.value as string) === value,
      ),
    [value, data],
  );

  const selectedLabel = useMemo(() => {
    if (!selectedRow) return "";
    return getNestedProperty(selectedRow, options?.label as string) as string;
  }, [selectedRow]);
  /* End Select Value Logic */

  /* Search Logic */
  const searchHandler = useCallback(
    (term: string) => {
      if (asyncSearch && typeof asyncSearch === "function") {
        asyncSearch(term);
      } else if (
        options?.label ||
        (onSearch && typeof onSearch === "function")
      ) {
        const regex = new RegExp(term, "i");

        if ((term && term.trim() === "") || !term) {
          setSelectData(data);
        } else {
          const filteredData = data.filter((row: T) => {
            if (onSearch && typeof onSearch === "function") {
              return onSearch(row, term);
            } else if (options && options.label) {
              const result = regex.test(
                getNestedProperty(row, options.label) as string,
              );
              return result;
            } else {
              return regex.test(getNestedProperty(row, "label") as string);
            }
          });

          setSelectData(filteredData);
        }
      }
    },
    [data],
  );
  /* End of Search Logic */

  /* Effects */
  // if props data changed, select data should be reflected
  useEffect(() => {
    setSelectData(data);
  }, [data]);
  /* End of Effects */

  return (
    <div
      className={`${classes["select-container"]}${disabled ? " disabled" : ""} kui-select-container`}
    >
      <FormElement labelPosition={labelPosition}>
        {label && (
          <Label
            errors={errors}
            required={required}
            contextualClass="kui-select-label"
            {...labelProps}
            onClick={() => {
              selectInnerRef.current?.focus();
              OpenDropDown();
            }}
          >
            {label}
          </Label>
        )}
        <div
          ref={selectRef}
          className={`${classes["select-outer"]} kui-select-outer`}
        >
          <div
            className={`
              ${classes["select-inner"]}
              ${(disabled || loading) && classes.disabled}
              ${errors && classes.error}
              kui-select-inner ${disabled && "kui-disabled"} ${errors && "kui-error"}
            `}
            ref={selectInnerRef}
            tabIndex={disabled || loading ? -1 : 0}
            onBlur={(e) => {
              // this should be fixed
              closeOnClickOutside(e as any);
            }}
            onKeyDown={(e) => {
              if (/^\w$/i.test(e.key)) {
                if (seachable === false) return;

                if (selectSearchInput.current && !isSearching) {
                  if (!dropDownOpen) OpenDropDown();

                  selectSearchInput.current.value =
                    selectSearchInput.current.value + e.key;

                  searchHandler(selectSearchInput.current.value);
                  e.stopPropagation();
                  e.preventDefault();
                }

                setIsSearching(true);
                selectSearchInput.current?.focus();
              }

              if (
                (e.key === "ArrowDown" || e.key === "ArrowUp") &&
                !dropDownOpen
              ) {
                OpenDropDown();
                e.stopPropagation();
                e.preventDefault();
              }

              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onClick={() => {
              OpenDropDown();
            }}
          >
            <SelectSearchInput
              search={searchHandler}
              ref={selectSearchInput}
              isSearching={isSearching}
              placeholder={placeholder}
            />
            {!isSearching && (
              <span className={`${classes["select-value"]} kui-select-value`}>
                {!selectedRow && placeholder ? (
                  <span className={classes["select-placeholder"]}>
                    {placeholder}
                  </span>
                ) : options?.renderOption &&
                  typeof options?.renderOption === "function" &&
                  selectedRow ? (
                  options.renderOption(selectedRow)
                ) : (
                  selectedLabel
                )}
              </span>
            )}

            {loading ? (
              icons?.loading ? (
                <div className={classes["select-loading-indicator"]}>
                  {icons.loading}
                </div>
              ) : (
                <SelectLoadingIndicator />
              )
            ) : (
              clearable !== false &&
              selectedRow && (
                <button
                  className={`
                  ${classes["clear-select"]}
                  ${errors && classes.error}
                  ${disabled && classes.disabled}
                  kui-select-clear ${errors && "kui-error"} ${disabled && "kui-disabled"}
                `}
                  onClick={(e) => {
                    setValue(undefined);
                    onChange?.(undefined);

                    e.stopPropagation();
                  }}
                >
                  {icons?.clear ? icons.clear : "X"}
                </button>
              )
            )}
            <button
              className={`
                ${classes["select-toggle"]}
                ${dropDownOpen && classes.open}
                ${disabled && classes.disabled}
                kui-select-toggle ${dropDownOpen && "kui-open"} ${disabled && "kui-disabled"}
              `}
              tabIndex={-1}
              onClick={(e) => {
                if (dropDownOpen) closeDropDown();
                else OpenDropDown();

                e.stopPropagation();
              }}
            >
              {dropDownOpen
                ? icons?.open
                  ? icons.open
                  : "V"
                : icons?.close
                  ? icons.close
                  : "V"}
            </button>
          </div>
          {dropDownOpen && (
            <SelectDropDown
              key={data.length}
              data={selectData}
              options={options}
              emptyMessage={emptyMessage}
              closeOnClickOutside={closeOnClickOutside}
              onSelectValue={onSelectValue}
              value={value}
              disabledOption={disabledOption}
              extraOptionsLoading={Boolean(extraOptionsLoading)}
              onLastItemRendered={onLastItemRendered}
              disableErrorBoundaries={disableErrorBoundaries}
              optionErrorFallback={optionErrorFallback}
            />
          )}
        </div>
      </FormElement>
      {errors && (
        <div className={classes["select-error-message"]}>
          {typeof errors === "string" ? (
            <p className={classes["error-message"]}>{errors}</p>
          ) : Array.isArray(errors) ? (
            errors.map((error, index) => (
              <p key={index} className={classes["error-message"]}>
                {error}
              </p>
            ))
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default BaseSelect;

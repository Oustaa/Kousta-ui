import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FormElement from "../../FormElement";
import Label from "../../Label";
import { SelectDataConstraints, SelectProps } from "./_props";
import { getNestedProperty } from "@ousta-ui/helpers";
import SelectDropDown from "./components/SelectDropDown";
import SelectSearchInput from "./components/SelectSearchInput";

import classes from "./Select.module.css";

const Select = <T extends SelectDataConstraints>({
  label,
  labelProps,
  errors,
  required,
  labelPosition,
  data,
  options = { value: "value", label: "label" },
  clearable = true,
  emptyMessage,
  seachable = true,
  disabled,
  onChange,
  disabledOption,
  onSearch,
  loading,
  asyncSearch,
  onLastItemRendered,
  isMultiple,
  rawValue,
  ...props
}: SelectProps<T>) => {
  const selectSearchInput = useRef<HTMLInputElement | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<T[]>(data);

  /* Select Value Logic */
  const [value, setValue] = useState<unknown>(props.value);

  /* Drop Down Logic */
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const OpenDropDown = useCallback(() => {
    if (disabled) return;

    if (dropDownOpen) setDropDownOpen(false);
    else setDropDownOpen(true);
  }, [dropDownOpen]);

  const closeDropDown = useCallback(() => {
    setDropDownOpen(false);
    setSelectData(data);
    setIsSearching(false);

    if (selectSearchInput.current) selectSearchInput.current.value = "";
  }, [data]);

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
    [data, closeDropDown],
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
    return getNestedProperty(selectedRow, options.label as string) as string;
  }, [selectedRow]);
  /* End Select Value Logic */

  /* Search Logic */
  const search = useCallback(
    (term: string) => {
      if (asyncSearch && typeof asyncSearch === "function") {
        asyncSearch(term);
      } else if (
        options.label ||
        (onSearch && typeof onSearch === "function")
      ) {
        const regex = new RegExp(term, "i");

        if (term && term.trim() === "") {
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
      className={`${classes["select-container"]}${disabled ? " disabled" : ""}`}
    >
      <FormElement labelPosition={labelPosition}>
        {label && (
          <Label
            errors={errors}
            required={required}
            {...labelProps}
            onClick={OpenDropDown}
          >
            {label}
          </Label>
        )}
        <div ref={selectRef} className={classes["select-outer"]}>
          <div
            className={[
              classes["select-inner"],
              disabled && classes.disabled,
              errors && classes.error,
            ]
              .filter(Boolean)
              .join(" ")}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (!seachable) return;

              if (/^\w$/i.test(e.key)) {
                if (selectSearchInput.current && !isSearching) {
                  if (!dropDownOpen) OpenDropDown();

                  selectSearchInput.current.value =
                    selectSearchInput.current.value + e.key;

                  search(selectSearchInput.current.value);
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
              search={search}
              ref={selectSearchInput}
              isSearching={isSearching}
            />
            {!isSearching && (
              <span className={classes["select-value"]}>
                {options.renderOption &&
                typeof options.renderOption === "function" &&
                selectedRow
                  ? options.renderOption(selectedRow)
                  : selectedLabel}
              </span>
            )}
            {clearable && selectedRow && (
              <button
                className={[
                  classes["clear-select"],
                  errors && classes.error,
                  disabled && classes.disabled,
                ].join(" ")}
                onClick={(e) => {
                  setValue(undefined);

                  e.stopPropagation();
                }}
              >
                X
              </button>
            )}
            <button
              className={[
                classes["select-toggle"],
                dropDownOpen && classes.open,
                disabled && classes.disabled,
              ].join(" ")}
              tabIndex={-1}
              onClick={(e) => {
                if (dropDownOpen) closeDropDown();
                else OpenDropDown();

                e.stopPropagation();
              }}
            >
              V
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
              loading={loading || false}
              onLastItemRendered={onLastItemRendered}
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

export default Select;

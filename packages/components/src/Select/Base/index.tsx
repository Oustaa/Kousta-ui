import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FormElement from "../../FormElement";
import Input from "../../Input";
import Label from "../../Label";
import { SelectDataConstraints, SelectProps } from "./_props";
import { getNestedProperty, isNodeAChild } from "@kousta-ui/helpers";

import classes from "./Select.module.css";
import SelectDropDown from "./components/SelectDropDown";

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
  ...props
}: SelectProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectData, setSelectData] = useState<T[]>(data);

  /* Select Value Logic */
  const [value, setValue] = useState<null | unknown>(props.value);

  const onSelectValue = useCallback(
    (value: string | number | unknown) => {
      setValue(value);
      onChange?.(value);
      setDropDownOpen(false);
      setSearchTerm("");
      setSelectData(data);
    },
    [data],
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

  /* Drop Down Logic */
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const OpenDropDown = useCallback(() => {
    if (dropDownOpen) setDropDownOpen(false);
    else setDropDownOpen(true);
  }, []);

  const closeDropDown = useCallback(() => {
    setDropDownOpen(false);
    setSearchTerm("");
    setSelectData(data);
  }, [data]);

  const closeOnClickOutside = useCallback(
    (e?: MouseEvent | TouchEvent) => {
      if (
        !e ||
        isNodeAChild(
          e.target as HTMLElement,
          selectRef.current as unknown as HTMLElement,
        )
      )
        closeDropDown();
    },
    [data],
  );
  /* End Drop Down Logic */

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
              // lable = "label" is the default...
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

  useEffect(() => {
    console.log("SELECT JUST RENDERED");
  }, []);

  return (
    <div className={`${classes["select"]}${disabled && "disabled"}`}>
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
        <div
          ref={selectRef}
          data-disabled={String(disabled)}
          className={classes["select-container"]}
        >
          {/* this should be a div with the className input to have the some style as the input comp */}
          <Input
            value={searchTerm ? searchTerm : selectedLabel}
            errors={errors}
            onClick={OpenDropDown}
            disabled={disabled}
            readOnly={!seachable}
            onKeyDown={(e) => {
              if (
                (e.key === "ArrowDown" || e.key === "ArrowUp") &&
                !dropDownOpen
              ) {
                OpenDropDown();
                e.stopPropagation();
              }
            }}
            onFocus={(e) => {
              const valueLen = e.target.value.length;
              e.target.setSelectionRange(valueLen, valueLen);
            }}
            onChange={(e) => {
              if (!dropDownOpen) {
                OpenDropDown();
              }
              let value = e.target.value;

              if (value.substring(0, value.length - 1) === selectedLabel)
                value = value[value.length - 1];

              setSearchTerm(value);
              search(value);
            }}
            rightSection={
              <button
                tabIndex={-1}
                disabled={disabled}
                className={classes["select-right-section"]}
                onClick={() => {
                  if (value && clearable) {
                    setValue(null);
                  } else if (!dropDownOpen) {
                    setDropDownOpen(true);
                  }
                }}
              >
                {value && clearable ? (
                  "X"
                ) : (
                  <div
                    style={{
                      transform: "rotate(90deg)",
                      fontSize: "medium",
                      fontWeight: "somibold",
                    }}
                  >
                    &gt;
                  </div>
                )}
              </button>
            }
          />
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
    </div>
  );
};

export default Select;

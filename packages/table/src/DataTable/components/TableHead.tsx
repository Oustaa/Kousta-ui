import { useEffect, useMemo } from "react";
import { useTableContext } from "../tableContext";
import { Button, Menu } from "@kousta-ui/components";
import TableSearch from "./TableSearch";

import classes from "../DataTable.module.css";
import RefreshTableBtn from "./RefreshTableBtn";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";
import { CardViewIcon, DotsIcon, EyeIcon, TableViewIcon } from "./icons";
import TableFilters from "./TableFilters/TableFilters";

const TableHead = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const {
    headers,
    options,
    actions,
    config,
    rowSelection,
    displayAs,
    setDisplayAs,
    setProps,
  } = useTableContext();

  // const filterPosition = options?.filterPosition;

  const extraviewsKeys = useMemo(() => {
    if (!options?.extraviews) return [];
    return Object.keys(options?.extraviews);
  }, [options]);

  const visibleHeaders = Object.keys(headers.data).filter(
    (header) =>
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false,
  );

  const headersCanSee = Object.keys(headers.data).filter(
    (header) => headers.data[header].canSee !== false,
  );

  useEffect(() => {
    if (actions?.get) {
      functionWithTableProps(actions.get);
    }
  }, []);

  if (Object.keys(rowSelection.selectedRows).length) {
    return (
      <div className={`${classes["kui-table-head"]} kui-data-table-head`}>
        <div className={classes["kui-table-head-section"]}></div>
        <div className={classes["kui-table-head-section"]}>
          <span>{Object.keys(rowSelection.selectedRows).length} Selected</span>
          {options?.bulkActions?.map((action) => {
            if (action.canPerformAction) return null;

            return (
              <Button
                key={action.title}
                {...(action.buttonProps || {})}
                onClick={() =>
                  action.onClick(Object.values(rowSelection.selectedRows), () =>
                    rowSelection.setSelectedRows(0, {}, true),
                  )
                }
              >
                {action.title}
              </Button>
            );
          })}
          <Button variant="neutral" onClick={() => rowSelection.diseclectAll()}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (config?.noHead === true) return <></>;

  return (
    <>
      <div className={`${classes["kui-table-head"]} kui-data-table-head`}>
        <div
          className={`${classes["kui-table-head-section"]} kui-data-table-head-section`}
        >
          {/* Hide Table Rows */}
          {config?.toggleRows !== false && (
            <Menu.Menu closeOnClick={false}>
              <Menu.Target>
                <Button
                  variant="neutral"
                  aria-label="toggle columns"
                  children={config?.icons?.toggleRows || <EyeIcon />}
                />
              </Menu.Target>
              <Menu.DropDown>
                {headersCanSee.map((headerName) => (
                  <Menu.Item key={headerName}>
                    <div
                      className={`${classes["kui-table-head_sh_label"]} kui-data-table-head-label`}
                    >
                      <input
                        id={headerName}
                        type="checkbox"
                        // disabled={headers.data[headerName].alwaysVisible}
                        checked={visibleHeaders.includes(headerName)}
                        onChange={(event) => {
                          headers.setHeaders((prev) => ({
                            ...prev,
                            [headerName]: {
                              ...prev[headerName],
                              visible: event.target.checked,
                            },
                          }));
                        }}
                      />
                      <label htmlFor={headerName}>
                        {headerName.toUpperCase()}
                      </label>
                    </div>
                  </Menu.Item>
                ))}
              </Menu.DropDown>
            </Menu.Menu>
          )}
          <TableSearch />
        </div>
        <div
          className={`${classes["kui-table-head-section"]} kui-data-table-head-section`}
        >
          {/* the inline panel is a full row of its own, rendered under the head */}
          {/* {filterPosition !== "inline" && <TableFilters />} */}
          <TableFilters />

          <RefreshTableBtn />

          {(options?.cards || extraviewsKeys.length !== 0) && (
            <Menu.Menu position="Bottom-End">
              <Menu.Target>
                <Button variant="primary" aria-label="change view">
                  {config?.icons?.extraViewsTogle || <DotsIcon />}
                </Button>
              </Menu.Target>
              <Menu.DropDown>
                {displayAs !== "table" && (
                  <Menu.Item
                    leftSection={
                      config?.icons?.tableExtraView || <TableViewIcon />
                    }
                    onClick={() => {
                      setProps({ displayAs: "table" });
                      setDisplayAs("table");
                    }}
                  >
                    Table
                  </Menu.Item>
                )}
                {displayAs !== "card" && options?.cards && (
                  <Menu.Item
                    leftSection={
                      config?.icons?.cardExtraView || <CardViewIcon />
                    }
                    onClick={() => {
                      setProps({ displayAs: "card" });
                      setDisplayAs("card");
                    }}
                  >
                    Card
                  </Menu.Item>
                )}

                {extraviewsKeys.map((key) => {
                  const view = options?.extraviews?.[key];

                  if (!view || displayAs === key || view.canView === false)
                    return;

                  return (
                    <Menu.Item
                      {...view.menuProps}
                      key={key}
                      onClick={() => {
                        setProps({ displayAs: key });
                        setDisplayAs(key);
                      }}
                    >
                      {key}
                    </Menu.Item>
                  );
                })}
              </Menu.DropDown>
            </Menu.Menu>
          )}
        </div>
      </div>
      {/* {filterPosition === "inline" && <TableFilters />} */}
    </>
  );
};

export default TableHead;

import { useEffect, useMemo } from "react";
import { useTableContext } from "../tableContext";
import { Button, Menu } from "@kousta-ui/components";
import TableSearch from "./TableSearch";

import classes from "../DataTable.module.css";
import RefreshTableBtn from "./RefreshTableBtn";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

const TableHead = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const { headers, options, config, rowSelection, displayAs, setDisplayAs } =
    useTableContext();

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
    if (options?.actions?.get) {
      functionWithTableProps(options.actions.get);
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
                children={"S/H"}
                {...config?.toggleRows}
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
        <RefreshTableBtn />
        {(options?.cards || extraviewsKeys.length !== 0) && (
          <Menu.Menu position="Bottom-End">
            <Menu.Target>
              <Button variant="primary">...</Button>
            </Menu.Target>
            <Menu.DropDown>
              {displayAs !== "table" && (
                <Menu.Item onClick={() => setDisplayAs("table")}>
                  Table
                </Menu.Item>
              )}
              {displayAs !== "card" && options?.cards && (
                <Menu.Item onClick={() => setDisplayAs("card")}>Card</Menu.Item>
              )}

              {extraviewsKeys.map((key) => {
                const view = options?.extraviews?.[key];

                if (!view || displayAs === key || view.canView === false)
                  return;

                return (
                  <Menu.Item
                    {...view.menuProps}
                    key={key}
                    onClick={() => setDisplayAs(key)}
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
  );
};

export default TableHead;

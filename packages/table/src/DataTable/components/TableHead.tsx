import { useTableContext } from "../tableContext";
import { Button, Menu } from "@kousta-ui/components";

import classes from "../DataTable.module.css";

import TableSearch from "./TableSearch";

const TableHead = () => {
  const { headers, options, config, rowSelection } = useTableContext();

  const visibleHeaders = Object.keys(headers.data).filter(
    (header) =>
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false,
  );

  const headersCanSee = Object.keys(headers.data).filter(
    (header) => headers.data[header].canSee !== false,
  );

  return (
    <div className={classes["Ouitable-head"]}>
      {Object.keys(rowSelection.selectedRows).length ? (
        options?.bulkActions?.map((action) => {
          if (action.canPerformAction) return null;

          return (
            <Button
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
        })
      ) : config?.noHead !== true ? (
        <div className={classes["Ouitable-head-section"]}>
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
                    <div className={classes["Ouitable-head_sh_label"]}>
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
      ) : null}
    </div>
  );
};

export default TableHead;

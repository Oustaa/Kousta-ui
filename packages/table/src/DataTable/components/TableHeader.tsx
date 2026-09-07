import { useState } from "react";
import Table from "../../Table";
import { useTableContext } from "../tableContext";
import { hasActions, hasBulkActions } from "../utils/tableAction";
import { Menu } from "@kousta-ui/components";
import classes from "../DataTable.module.css";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

function TableHeader() {
  const [, setAllSelected] = useState<boolean>(false);

  const functionWithTableProps = useFunctionWithTableParams();

  const {
    data,
    headers,
    options,
    actions,
    config,
    rowSelection,
    isStatic,
    order,
  } = useTableContext();

  const { orderBy, setOrderBy } = order;

  const headersLabel = Object.keys(headers.data).filter((header) => {
    return (
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false
    );
  });

  const selectAll = (cb?: (row: unknown) => boolean) => {
    data.map((row, index) => {
      if (!cb) {
        rowSelection.setSelectedRows(index, row, true);
      } else if (cb(row)) {
        rowSelection.setSelectedRows(index, row, true);
      }
    });
  };

  const onSort = (header: string) => {
    const valueName = headers.data[header].value || "";

    let props: Record<string, number | string> = {
      sortBy: valueName,
      direction: orderBy.direction,
    };

    if (orderBy.by === valueName) {
      props.direction = Number(props.direction) * -1;
    }

    // @ts-expect-error this is not an error for now
    setOrderBy(props);

    if (isStatic) {
    } else {
      if (actions?.get) {
        // change the props the send to the backend with the get function
        if (options?.sort?.props) {
          // @ts-expect-error this is not an error for now
          props = options.sort.props(props);
        } else if (config?.sort?.props) {
          // @ts-expect-error this is not an error for now
          props = config.sort.props(props);
        }

        functionWithTableProps(actions.get, props);
      }
    }
  };

  return (
    <Table.Thead {...config?.props?.thead}>
      <Table.Tr {...config?.props?.tr}>
        {hasBulkActions(options) && (
          <Table.Th
            {...config?.props?.th}
            style={{ width: "4px", ...config?.props?.th?.style }}
          >
            {options?.selectFilter &&
            Object.keys(options.selectFilter).length > 0 ? (
              <Menu.Menu>
                <Menu.Target>
                  <button onClick={(e) => e.stopPropagation()}>
                    <input
                      checked={!!Object.keys(rowSelection.selectedRows).length}
                      onChange={() => {
                        setAllSelected((prev) => !prev);
                        selectAll();
                      }}
                      type="checkbox"
                    />
                  </button>
                  <button>{config?.icons?.selectRow || "More"}</button>
                </Menu.Target>
                <Menu.DropDown>
                  {Object.keys(options?.selectFilter || {}).map((key) => (
                    <Menu.Item key={key}>
                      <input
                        type="checkbox"
                        onChange={() => {
                          selectAll(options?.selectFilter?.[key]);
                        }}
                      />
                      {key}
                    </Menu.Item>
                  ))}
                </Menu.DropDown>
              </Menu.Menu>
            ) : (
              <>
                <input
                  checked={!!Object.keys(rowSelection.selectedRows).length}
                  onChange={() => {
                    setAllSelected((prev) => !prev);
                    selectAll();
                  }}
                  type="checkbox"
                />
              </>
            )}
          </Table.Th>
        )}
        {headersLabel.map((header, index) => {
          return (
            <Table.Th
              {...config?.props?.th}
              aria-checked="true"
              role="th"
              key={`${header} - ${index}`}
            >
              <div
                className={classes["kui-dtable-th-content"]}
                onClick={() => onSort(header)}
              >
                <span>{header.toUpperCase()}</span>

                {headers.data[header].sortBy && (
                  <div
                    className={
                      classes["kui-dtable-th-orderBy-buttons-container"]
                    }
                  >
                    <div
                      className={
                        headers.data[header].value === orderBy.by &&
                        orderBy.direction === 1
                          ? classes["kui-dtable-th-orderBy"]
                          : ""
                      }
                    >
                      &gt;
                    </div>
                    <div
                      className={
                        headers.data[header].value === orderBy.by &&
                        orderBy.direction === -1
                          ? classes["kui-dtable-th-orderBy"]
                          : ""
                      }
                    >
                      &lt;
                    </div>
                  </div>
                )}
              </div>
            </Table.Th>
          );
        })}
        {hasActions(actions, options) && (
          <Table.Th {...config?.props?.th}>ACTIONS</Table.Th>
        )}
      </Table.Tr>
    </Table.Thead>
  );
}

export default TableHeader;

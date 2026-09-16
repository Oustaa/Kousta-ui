import { FC, useState } from "react";
import Table from "../../Table";
import { useTableContext } from "../tableContext";
import { hasActions, hasBulkActions } from "../utils/tableAction";
import { Menu } from "@kousta-ui/components";
import classes from "../DataTable.module.css";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const DefaultSortIcon: FC<{
  direction?: number;
  isActive: boolean;
}> = ({ direction, isActive }) => {
  const isAsc = isActive && direction === -1;
  const isDesc = isActive && direction === 1;

  return (
    <span className={classes["kui-dtable-sort-icon-group"]}>
      <span
        className={
          isAsc
            ? `${classes["kui-dtable-sort-icon"]} ${classes["kui-dtable-sort-icon-active"]}`
            : classes["kui-dtable-sort-icon"]
        }
      >
        {<ChevronUpIcon />}
      </span>
      <span
        className={
          isDesc
            ? `${classes["kui-dtable-sort-icon"]} ${classes["kui-dtable-sort-icon-active"]}`
            : classes["kui-dtable-sort-icon"]
        }
      >
        {<ChevronDownIcon />}
      </span>
    </span>
  );
};

const TableHeader = <T extends Record<string, unknown>>() => {
  const [, setAllSelected] = useState<boolean>(false);

  const functionWithTableProps = useFunctionWithTableParams();

  const {
    data: { data, setData },
    headers,
    options,
    actions,
    config,
    rowSelection,
    order,
    setProps,
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
    let valueName = headers.data[header].value || "";

    if (headers.data[header].sortBy?.name) {
      valueName = headers.data[header].sortBy?.name;
    }

    let props: { sortBy: string; direction: number } = {
      sortBy: valueName,
      direction: orderBy.direction,
    };

    if (
      orderBy.by === valueName ||
      orderBy.by === headers.data[header].sortBy?.name
    )
      props.direction = (orderBy.direction || 1) * -1;
    else props.direction = 1;

    setOrderBy({ direction: props.direction, by: props.sortBy });

    setProps({ direction: props.direction as 1, sortBy: props.sortBy });

    // table is static and data is possed to the table staticlly
    if (!actions?.get) {
      const sorted = data.toSorted((first: any, second: any) => {
        const firstValue = first[valueName];
        const secondValue = second[valueName];

        if (typeof firstValue === typeof secondValue) {
          console.log("Sorting");
          if (typeof firstValue === "string") {
            return firstValue.localeCompare(secondValue) * props.direction;
          }

          if (typeof firstValue === "number") {
            return (firstValue - secondValue) * props.direction;
          }
        }

        if (headers.data[header].sortBy?.sortFunc) {
          return (
            headers.data[header].sortBy?.sortFunc(first, second) *
            props.direction
          );
        }

        return 0;
      });

      setData(sorted);
    } else {
      if (actions?.get) {
        // change the props the send to the backend with the get function
        if (options?.sort?.props) {
          // @ts-expect-error this is not an error for now
          props = options.sort.props(props);
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
                  <div className={classes["kui-dtable-select-all"]}>
                    <button onClick={(e) => e.stopPropagation()}>
                      <input
                        checked={
                          !!Object.keys(rowSelection.selectedRows).length
                        }
                        onChange={() => {
                          setAllSelected((prev) => !prev);
                          selectAll();
                        }}
                        type="checkbox"
                      />
                    </button>
                    <button>
                      {config?.icons?.selectRow || <ChevronDownIcon />}
                    </button>
                  </div>
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
          const isSortable = !!headers.data[header].sortBy;
          const isActive =
            headers.data[header].value === orderBy.by ||
            headers.data[header].sortBy?.name === orderBy.by;

          const ariaSort = !isSortable
            ? undefined
            : isActive
              ? orderBy.direction === 1
                ? "ascending"
                : "descending"
              : "none";

          return (
            <Table.Th
              {...config?.props?.th}
              role="th"
              aria-sort={ariaSort}
              key={`${header} - ${index}`}
            >
              <div
                className={classes["kui-dtable-th-content"]}
                onClick={isSortable ? () => onSort(header) : undefined}
                style={isSortable ? { cursor: "pointer" } : undefined}
              >
                <span>{header.toUpperCase()}</span>

                {isSortable && (
                  <DefaultSortIcon
                    direction={isActive ? orderBy.direction : undefined}
                    isActive={isActive}
                  />
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
};

export default TableHeader;

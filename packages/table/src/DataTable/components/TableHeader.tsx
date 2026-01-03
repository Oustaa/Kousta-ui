import { useState } from "react";
import Table from "../../Table";
import { useTableContext } from "../tableContext";
import { hasActions, hasBulkActions } from "../utils/tableAction";
import { Menu } from "@kousta-ui/components";

function TableHeader() {
  const [, setAllSelected] = useState<boolean>(false);
  // const [filterFunction, setFilterFunction] = useState<
  //   // eslint-disable-next-line
  //   Record<string, (row: any) => boolean>
  // >({});

  const { data, headers, options, config, rowSelection } = useTableContext();

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
                  <button>{config?.selectFilter?.icon || "More"}</button>
                </Menu.Target>
                <Menu.DropDown {...config?.selectFilter?.menuProps}>
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
              {header.toUpperCase()}
            </Table.Th>
          );
        })}
        {hasActions(options) && (
          <Table.Th {...config?.props?.th}>ACTIONS</Table.Th>
        )}
      </Table.Tr>
    </Table.Thead>
  );
}

export default TableHeader;

import { useTableContext } from "../tableContext";
import Table from "../../Table";

const TableRowCheckbox = <T extends Record<string, unknown>>({
  row,
  index,
  highlighted,
}: {
  row: T;
  index: number;
  highlighted: boolean;
}) => {
  const { rowSelection, config } = useTableContext();

  return (
    <Table.Td
      {...config?.props?.td}
      style={{
        width: "min-content",
        backgroundColor: highlighted
          ? "light-dark(var(--Oui-neutral-100), var(--Oui-neutral-800))"
          : "unset",
        ...config?.props?.td?.style,
      }}
    >
      <input
        type="checkbox"
        checked={index in rowSelection.selectedRows}
        onChange={() => {
          rowSelection.setSelectedRows(index, row);
        }}
      />
    </Table.Td>
  );
};

export default TableRowCheckbox;

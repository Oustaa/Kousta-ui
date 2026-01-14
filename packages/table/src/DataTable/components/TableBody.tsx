import Table from "../../Table";
import { usePaginationData } from "../hooks/usePaginationData";
import { useTableContext } from "../tableContext";
import TableRow from "./TableRow";

const TableBody = <T extends Record<string, unknown>>() => {
  const { config } = useTableContext();

  return (
    <Table.Tbody {...config?.props?.tbody}>
      {usePaginationData().map((row, index) => {
        return <TableRow<T> index={index} key={index} row={row as T} />;
      })}
    </Table.Tbody>
  );
};

export default TableBody;

import Table from "../../Table";
import { useDataToDisplay } from "../hooks/useDataToDisplay";
import { useTableContext } from "../tableContext";
import TableRow from "./TableRow";
import TableTotalRow from "./TotalRow";

const TableBody = <T extends Record<string, unknown>>() => {
  const { config, keyExtractor, headers } = useTableContext();
  const dataToDisplay = useDataToDisplay();

  return (
    <Table.Tbody {...config?.props?.tbody}>
      {dataToDisplay.map((row, index) => {
        return (
          <TableRow<T>
            index={index}
            key={keyExtractor?.(row) || index}
            row={row as T}
          />
        );
      })}
      <TableTotalRow />
    </Table.Tbody>
  );
};

export default TableBody;

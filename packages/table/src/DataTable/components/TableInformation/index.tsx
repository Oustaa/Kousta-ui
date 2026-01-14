import { useTableContext } from "../../tableContext";

import classes from "../../DataTable.module.css";
import TableInformationItem, {
  TableInformationItemProps,
} from "./TableInformationItem";
import { useGetSearchTableFunction } from "../../hooks/useGetTableData";
import { useFunctionWithTableParams } from "../../hooks/useFunctionWithTableParams";

const TableInformation = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const searchFunction = useGetSearchTableFunction();
  const { search } = useTableContext();

  const infos: TableInformationItemProps[] = [];

  if (search.query) {
    infos.push({
      label: "Searching for:",
      value: search.query,
      onClear() {
        search.setQuery("");
        if (typeof searchFunction === "function")
          functionWithTableProps(searchFunction, { search: "" });
      },
    });
  }
  // if (Object.keys(rowSelection.selectedRows).length) {
  //   infos.push({
  //     label: "Selecting ",
  //     value: String(Object.keys(rowSelection.selectedRows).length),
  //     onClear() {
  //       rowSelection.diseclectAll();
  //     },
  //   });
  // }

  if (infos.length === 0) {
    return <></>;
  }

  return (
    <div
      className={[
        classes["table-information-container"],
        "kui-table-information-container",
      ].join(" ")}
    >
      {infos.map((info) => (
        <TableInformationItem {...info} />
      ))}
    </div>
  );
};

export default TableInformation;

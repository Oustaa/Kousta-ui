import { useTableContext } from "../../tableContext";

import classes from "../../DataTable.module.css";
import TableInformationItem, {
  TableInformationItemProps,
} from "./TableInformationItem";
import { useGetSearchFunction } from "../../hooks/useGetSearchFunction";

const TableInformation = () => {
  const searchFunction = useGetSearchFunction();
  const { search } = useTableContext();

  const infos: TableInformationItemProps[] = [];

  if (search.query) {
    infos.push({
      label: "Searching for:",
      value: search.query,
      onClear() {
        search.setQuery("");
        searchFunction("");
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

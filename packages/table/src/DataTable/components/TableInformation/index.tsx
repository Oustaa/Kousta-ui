import { useTableContext } from "../../tableContext";

import classes from "../../DataTable.module.css";
import TableInformationItem from "./TableInformationItem";
import { useGetSearchTableFunction } from "../../hooks/useGetTableData";
import { useFunctionWithTableParams } from "../../hooks/useFunctionWithTableParams";

const TableInformation = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const searchFunction = useGetSearchTableFunction();
  const { search } = useTableContext();

  if (!search.query) return <></>;

  return (
    <div
      className={[
        classes["table-information-container"],
        "kui-table-information-container",
      ].join(" ")}
    >
      {search.query && (
        <TableInformationItem
          onClear={() => {
            search.setQuery("");
            if (typeof searchFunction === "function")
              functionWithTableProps(searchFunction, { search: "" });
          }}
          label="Searching for:"
          value={search.query}
        />
      )}
    </div>
  );
};

export default TableInformation;

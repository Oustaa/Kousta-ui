import { FC } from "react";

import { useTableContext } from "../tableContext";

const EmptyTable: FC = () => {
  const { options } = useTableContext();

  return options && options.emptyTable
    ? options.emptyTable
    : "No Data in the table";
};

export default EmptyTable;

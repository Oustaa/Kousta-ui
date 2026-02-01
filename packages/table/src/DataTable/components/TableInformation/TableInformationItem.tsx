import { FC } from "react";
import classes from "../../DataTable.module.css";

export type TableInformationItemProps = {
  onClear: VoidFunction;
  label: string;
  value: string;
};

const TableInformationItem: FC<TableInformationItemProps> = ({
  label,
  onClear,
  value,
}) => {
  return (
    <div
      className={[
        classes["table-information-item"],
        "kui-table-information-item",
      ].join(" ")}
    >
      <span
        className={[
          classes["table-information-label"],
          "kui-table-information-label",
        ].join(" ")}
      >
        {label}
      </span>{" "}
      <span
        className={[
          classes["table-information-value"],
          "kui-table-information-value",
        ].join(" ")}
      >
        {value}
      </span>
      <button
        className={[
          classes["table-information-clear"],
          "kui-table-information-clear",
        ].join(" ")}
        onClick={onClear}
      >
        x
      </button>
    </div>
  );
};

export default TableInformationItem;

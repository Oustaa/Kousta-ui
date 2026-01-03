import { ReactNode } from "react";
import Table from "../../Table";
import { THeaderValue } from "../_props";

import { getNestedProperty } from "@kousta-ui/helpers";
import { useTableContext } from "../tableContext";

const TableRowCol = <T extends Record<string, unknown>>({
  headerValue,
  row,
  highlighted,
}: {
  row: T;
  headerValue: THeaderValue<T>;
  highlighted: boolean;
}) => {
  const { config } = useTableContext();
  let content: string | ReactNode;

  if (headerValue.visible === false || headerValue.canSee === false) return;

  if (headerValue.exec && typeof headerValue.exec === "function") {
    content = headerValue.exec(row);
  } else {
    content = getNestedProperty?.(
      row satisfies Record<string, unknown>,
      headerValue.value,
    );
  }

  return (
    <Table.Td
      {...config?.props?.td}
      style={{
        backgroundColor: highlighted
          ? "light-dark(var(--Oui-neutral-100), var(--Oui-neutral-800))"
          : "unset",
        ...config?.props?.td?.style,
      }}
    >
      {content || config?.emptyRowIcon}
    </Table.Td>
  );
};

export default TableRowCol;

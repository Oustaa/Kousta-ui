import { useMemo } from "react";
import Table from "../../Table";
import { useDataToDisplay } from "../hooks/useDataToDisplay";
import { useTableContext } from "../tableContext";

const TableTotalRow = <T extends Record<string, unknown>>() => {
  const { config, headers } = useTableContext();
  const dataToDisplay = useDataToDisplay();

  const headersKeys = Object.keys(headers.data).filter(
    (header) =>
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false,
  );

  const headersWithTotal = headersKeys.filter(
    (header) =>
      headers.data[header].total &&
      (!headers.data[header].visible || !headers.data[header].canSee),
  );

  if (headersWithTotal.length === 0) return;

  const totals: Record<string, number> = {};

  for (const row of dataToDisplay) {
    for (const header of headersWithTotal) {
      const headerData = headers.data[header];
      // @ts-expect-error
      const rowValue = row[headerData.total.name || headerData.value];
      if (totals[header] === undefined) totals[header] = 0;

      if (typeof headerData.total === "object" && headerData.total.func) {
        totals[header] = headerData.total.func(totals[header], rowValue);
      } else {
        totals[header] += rowValue;
      }
    }
  }

  const totalRowSpaning: (number | string)[] = useMemo(() => {
    const totalRowSpaning = [];

    for (const key of headersKeys) {
      if (totals[key] !== undefined) {
        totalRowSpaning.push(key);
      } else {
        const lastItem = totalRowSpaning[totalRowSpaning.length - 1];
        if (!lastItem || typeof lastItem === "string") {
          totalRowSpaning.push(0);
        }

        // @ts-expect-error this is not an error
        totalRowSpaning[totalRowSpaning.length - 1]++;
      }
    }

    return totalRowSpaning;
  }, [headers.data]);

  return (
    <Table.Tr {...config?.props?.tr}>
      {totalRowSpaning.map((item) => {
        if (typeof item === "string") {
          return <Table.Td {...config?.props?.td}>{totals[item]}</Table.Td>;
        }
        return <Table.Td {...config?.props?.td} colSpan={item}></Table.Td>;
      })}
    </Table.Tr>
  );
};

export default TableTotalRow;

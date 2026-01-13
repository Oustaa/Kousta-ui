import { Pagination, Select } from "@kousta-ui/components";

import classes from "../DataTable.module.css";
import { useTableContext } from "../tableContext";
import { useEffect } from "react";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

const TableFooter = () => {
  const functionWithTableProps = useFunctionWithTableParams();

  const { pagination, options } = useTableContext();

  if (!pagination) return;

  const { limit, page, total = 1, setLimit, setPage } = pagination;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [limit, page]);

  if (!options?.actions?.get) return <></>;

  return (
    <div className={[classes["table-footer"]].join(" ")}>
      <div className={classes["kui-table-footer-section"]}>
        <Select
          data={[
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 40, value: 40 },
            { label: 50, value: 50 },
          ]}
          value={limit}
          onChange={(limit: any) => {
            setLimit(Number(limit));
            const totalPages = Math.ceil(total / limit);

            if (page > totalPages) {
              setPage(totalPages);
            }

            // @ts-expect-error this is not an error
            functionWithTableProps(options?.actions?.get, {
              page: Math.min(page, totalPages),
              limit,
            });
          }}
        />
        <p className={classes["table-pagination-message"]}>
          Showing <strong>{(page - 1) * limit + 1}</strong> to{" "}
          <strong>{Math.min(page * limit, total)}</strong>, of{" "}
          <strong>{total}</strong>
        </p>
      </div>

      <div className={classes["kui-table-footer-section"]}>
        <Pagination
          key={total}
          page={page}
          totalPages={totalPages}
          onChange={(page) => {
            // @ts-expect-error this is not an error
            functionWithTableProps(options?.actions?.get, {
              page,
              limit,
            });

            setPage(page);
          }}
          seblings={3}
        />
      </div>
    </div>
  );
};

export default TableFooter;

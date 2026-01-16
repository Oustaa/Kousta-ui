import { Pagination, Select } from "@kousta-ui/components";

import classes from "../DataTable.module.css";
import { useTableContext } from "../tableContext";
import { useMemo } from "react";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

const TableFooter = () => {
  const functionWithTableProps = useFunctionWithTableParams();

  const { pagination, actions, rowSelection } = useTableContext();

  if (!pagination) return;

  const { limit, page, total, setLimit, setPage } = pagination;

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  return (
    <div className={[classes["table-footer"], "kui-table-footer"].join(" ")}>
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
            if (actions && actions.get)
              functionWithTableProps(actions.get, {
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
          page={page}
          totalPages={totalPages}
          onChange={(page) => {
            rowSelection.diseclectAll();
            if (actions?.get)
              functionWithTableProps(actions?.get, {
                page,
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

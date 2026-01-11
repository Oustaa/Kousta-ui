import { Pagination, Select } from "@kousta-ui/components";

import classes from "../DataTable.module.css";
import { useTableContext } from "../tableContext";
import { useEffect } from "react";

const TableFooter = () => {
  const { pagination, options, search } = useTableContext();

  if (!pagination) return;

  const { limit, page, total, setLimit, setPage } = pagination;

  useEffect(() => {
    setPage(Math.min(page, Math.ceil(total / limit)));
    if (options && options.actions && options.actions.get)
      options.actions.get({ page, limit, search: search.query });
  }, [limit, page, search.query]);

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
          onChange={(value: any) => {
            setLimit(Number(value));
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
          totalPages={Math.ceil(total / limit)}
          onChange={(page) => {
            console.log("Pager fucking changed to %d.", page);
            setPage(page);
          }}
          seblings={3}
        />
      </div>
    </div>
  );
};

export default TableFooter;

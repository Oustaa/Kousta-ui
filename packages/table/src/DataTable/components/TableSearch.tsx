import { useCallback, useEffect, useState } from "react";
import { useTableContext } from "../tableContext";
import { Button, Input } from "@kousta-ui/components";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";
import { useDebounceCallback } from "@kousta-ui/hooks";

import classes from "../DataTable.module.css";
import { useGetSearchTableFunction } from "../hooks/useGetSearchTableFunction";

const TableSearch = () => {
  const { actions, pagination, search } = useTableContext();
  const [q, setQ] = useState<string>(search.query);
  const functionWithTableProps = useFunctionWithTableParams();
  const searchFunction = useGetSearchTableFunction();

  const searchHandler = useCallback(() => {
    const setPage = pagination?.setPage;

    setPage?.(1);
    search.setQuery(q);
    functionWithTableProps(searchFunction, {
      search: q,
      page: 1,
    });
  }, [q]);

  const debouncedSearch = useDebounceCallback(
    searchHandler,
    actions?.search?.searchTimer || 500,
  );

  if (!actions || (!actions?.search && !actions?.get)) return <></>;

  useEffect(() => {
    if (search.query === "") setQ("");
  }, [search.query]);

  return (
    <div
      className={[
        classes["table-search-container"],
        "kui-table-search-container",
      ].join(" ")}
    >
      <Input
        aria-label="search-input"
        placeholder="search"
        onKeyDown={(event) => {
          if (q === search.query || actions?.search?.searchOnType) return;
          if (event.key === "Enter") {
            searchHandler();
          }
        }}
        value={q}
        rightSection={
          actions?.search?.searchOnType ? undefined : (
            <Button
              variant="primary"
              onClick={searchHandler}
              disabled={search.query === q}
            >
              Search
            </Button>
          )
        }
        onChange={(e) => {
          if (actions?.search?.searchOnType) debouncedSearch();
          setQ(e.target.value);
        }}
      />
    </div>
  );
};

export default TableSearch;

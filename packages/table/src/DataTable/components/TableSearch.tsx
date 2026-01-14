import { useCallback, useEffect, useState } from "react";
import { useTableContext } from "../tableContext";
import { Button, Group, Input } from "@kousta-ui/components";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

import classes from "../DataTable.module.css";

const TableSearch = () => {
  const { options, pagination, search } = useTableContext();
  const [q, setQ] = useState<string>(search.query);
  const functionWithTableProps = useFunctionWithTableParams();

  const searchHandler = useCallback(() => {
    const setPage = pagination?.setPage;

    if (options?.actions?.search) {
      search.setQuery(q);
      functionWithTableProps(options.actions?.search, { search: q, page: 1 });
    } else if (options?.actions?.get) {
      setPage?.(1);
      search.setQuery(q);
      functionWithTableProps(options.actions?.get, { search: q, page: 1 });
    }
  }, [q]);

  if (!options || (!options.actions?.search && !options?.actions?.get))
    return <></>;

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
      <Group>
        <Input
          aria-label="search-input"
          onKeyDown={(event) => {
            if (q === search.query) return;
            if (event.key === "Enter") {
              searchHandler();
            }
          }}
          value={q}
          rightSection={
            <Button
              variant="primary"
              onClick={searchHandler}
              disabled={search.query === q}
            >
              Search
            </Button>
          }
          onChange={(e) => setQ(e.target.value)}
        />
      </Group>
    </div>
  );
};

export default TableSearch;

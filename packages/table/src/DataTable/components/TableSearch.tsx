import { useCallback, useState } from "react";
import { useTableContext } from "../tableContext";
import { Button, Input } from "@kousta-ui/components";

const TableSearch = () => {
  const { options, headers, pagination, search } = useTableContext();
  const [q, setQ] = useState<string>(search.query);

  const visibleHeaders = Object.keys(headers.data).filter(
    (header) =>
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false,
  );

  const searchHandler = useCallback(() => {
    const setPage = pagination?.setPage;
    const limit = pagination?.limit;

    if (options?.search) {
      options.search?.(q, { visibleHeaders, props: {} });
    } else if (options?.actions?.get) {
      setPage?.(1);
      // options.actions.get({
      //   page: 1,
      //   limit: limit,
      //   search: q,
      // });
      search.setQuery(q);
    }
  }, [q]);

  if (!options || (!options.search && !options?.actions?.get)) return <></>;

  return (
    <div className="table-search-container kui-data-table-search-container">
      <Input
        aria-label="search-input"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            searchHandler();
          }
        }}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rightSection={
          <Button
            variant="neutral"
            onClick={searchHandler}
            disabled={search.query === q}
          >
            Search
          </Button>
        }
      />
    </div>
  );
};

export default TableSearch;

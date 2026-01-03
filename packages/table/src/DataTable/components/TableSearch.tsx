import { useState } from "react";
import { useTableContext } from "../tableContext";
import { Button, Input } from "@kousta-ui/components";

const TableSearch = () => {
  const { options, headers } = useTableContext();
  const [q, setQ] = useState<string>("");

  const visibleHeaders = Object.keys(headers.data).filter(
    (header) =>
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false,
  );

  if (!options || !options.search) return <></>;

  return (
    <div className="table-search-container">
      <Input
        aria-label="search-input"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            options.search?.(q, { visibleHeaders, props: {} });
          }
        }}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rightSection={
          <Button
            variant="neutral"
            onClick={() => {
              options.search?.(q, { visibleHeaders, props: {} });
            }}
          >
            Search
          </Button>
        }
      />
    </div>
  );
};

export default TableSearch;

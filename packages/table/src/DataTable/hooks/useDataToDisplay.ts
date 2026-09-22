import { useEffect, useState } from "react";
import { useTableContext } from "../tableContext";

import { usePaginationData } from "./usePaginationData";
import { applyFilters } from "../utils/tableFilters";

export const useDataToDisplay = <T>() => {
  const {
    data: { data },
    actions,
    options,
    search,
    filters,
    total,
  } = useTableContext();

  const [dataToDisplay, setDataToDisplay] = useState(data || []);

  const paginatedData = usePaginationData({ data: dataToDisplay });

  const filtersAreStatic = !actions?.get && !options?.filter?.filterFunction;

  useEffect(() => {
    let next = data || [];
    let narrowed = false;

    if (actions?.search?.static) {
      const reg = new RegExp(search.query, "i");
      next = next.filter((row) =>
        // @ts-expect-error this is not an error
        actions.search?.onSearch(row, { query: search.query, reg }),
      );
      narrowed = true;
    }

    if (filtersAreStatic && filters.applied.length > 0) {
      next = applyFilters(next, filters.applied);
      narrowed = true;
    }

    setDataToDisplay(next);

    if (narrowed) total.setTotal(next.length);
  }, [search.query, data, filters.applied]);

  return paginatedData;
};

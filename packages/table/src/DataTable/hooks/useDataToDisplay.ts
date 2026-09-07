import { useEffect, useState } from "react";
import { useTableContext } from "../tableContext";

import { usePaginationData } from "./usePaginationData";

export const useDataToDisplay = <T>() => {
  const { data, actions, search, total } = useTableContext();
  const [dataToDisplay, setDataToDisplay] = useState(data || []);

  const paginatedData = usePaginationData({ data: dataToDisplay });

  useEffect(() => {
    if (actions?.search?.static) {
      const filteredData = data.filter((row) => {
        const reg = new RegExp(search.query, "i");
        // @ts-expect-error this is not an error
        return actions.search?.onSearch(row, { query: search.query, reg });
      });

      setDataToDisplay(filteredData);
      total.setTotal(filteredData.length);
    } else {
      // Keep dataToDisplay in sync with the `data` prop for non-static-search
      // tables too — otherwise updates from actions.get (pagination, dynamic
      // search, sorting, refresh) never reach the rendered rows after mount.
      setDataToDisplay(data || []);
    }
  }, [search.query, data]);

  return paginatedData;
};

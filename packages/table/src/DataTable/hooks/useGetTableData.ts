import { useCallback } from "react";
import { useTableContext } from "../tableContext";

export const useGetTableData = () => {
  const { pagination, search, options } = useTableContext();

  const getTableDate = useCallback(() => {
    if (!options?.actions?.get) return;

    const props: Record<string, string | number | undefined> = {};

    if (pagination) {
      props.limit = pagination.limit;
      props.page = pagination.page;
    }

    if (search.query) props.search = search.query;

    options.actions.get(props);
  }, []);

  return { getTableDate };
};

export function useGetSearchTableFunction() {
  const { options } = useTableContext();

  if (options?.actions?.search) {
    return options.actions.search;
  } else if (options?.actions?.get) {
    return options.actions.get;
  }
}

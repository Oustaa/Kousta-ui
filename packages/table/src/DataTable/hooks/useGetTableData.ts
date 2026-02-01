import { useCallback } from "react";
import { useTableContext } from "../tableContext";

export const useGetTableData = () => {
  const { pagination, search, actions } = useTableContext();

  const getTableDate = useCallback(() => {
    if (!actions?.get) return;

    const props: Record<string, string | number | undefined> = {};

    if (pagination) {
      props.limit = pagination.limit;
      props.page = pagination.page;
    }

    if (search.query) props.search = search.query;

    actions.get(props);
  }, []);

  return { getTableDate };
};

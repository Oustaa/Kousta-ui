import { useTableContext } from "../tableContext";

export const usePaginationData = () => {
  const { data, pagination } = useTableContext();

  if (!pagination) {
    return data || [];
  }

  const { limit, page } = pagination;

  if (pagination.type === "static")
    return data.slice((page - 1) * limit, limit * page);

  return data;
};

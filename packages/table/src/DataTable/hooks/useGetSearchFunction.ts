import { TParams } from "../_props";
import { useTableContext } from "../tableContext";
import { useFunctionWithTableParams } from "./useFunctionWithTableParams";

export function useGetSearchFunction() {
  const { actions, pagination } = useTableContext();

  const functionWithTableProps = useFunctionWithTableParams();

  const params: TParams = { page: 1 };

  let searchFunction: (params: TParams) => void;

  if (pagination?.type === "static") {
    params.limit = undefined;
  }

  if (actions?.search) {
    if (actions.search.static !== true)
      searchFunction = actions.search.onSearch;
  } else if (actions?.get) {
    searchFunction = actions.get;
  } else searchFunction = () => {};

  return (query: string) => {
    functionWithTableProps(searchFunction, { ...params, search: query });
  };
}

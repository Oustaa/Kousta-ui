import { useTableContext } from "../tableContext";

export function useGetSearchTableFunction() {
  const { actions } = useTableContext();

  if (actions?.search) {
    return actions.search.onSearch;
  } else if (actions?.get) {
    return actions.get;
  } else return () => {};
}

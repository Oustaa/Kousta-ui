import { TableFilter, TableFilterDraft, TTableFilterHeaders } from "../_props";
import { useTableContext } from "../tableContext";
import {
  isFilterComplete,
  operatorNeedsValue,
  resolveOperator,
} from "../utils/tableFilters";
import { useFunctionWithTableParams } from "./useFunctionWithTableParams";

export function useApplyFilters() {
  const { filters, headers, actions, options, pagination, setProps } =
    useTableContext();

  const functionWithTableProps = useFunctionWithTableParams();

  const isStatic = !actions?.get && !options?.filter?.filterFunction;

  const buildFilters = (
    drafts: Record<string, TableFilterDraft>,
    filterHeaders: TTableFilterHeaders,
  ): TableFilter[] => {
    return Object.keys(drafts)
      .filter((header) => filterHeaders[header])
      .map((header) => {
        const type = filterHeaders[header].type;
        const draft = {
          ...drafts[header],
          operator: resolveOperator(drafts[header], type),
        };
        return {
          header,
          name: headers.data[header]?.value || header,
          type,
          operator: draft.operator,
          value: operatorNeedsValue(draft.operator) ? draft.value : undefined,
          to: draft.operator === "between" ? draft.to : undefined,
        };
      })
      .filter((filter) => isFilterComplete(filter));
  };

  const dispatch = (active: TableFilter[]) => {
    filters.setApplied(active);
    setProps({ filters: active, page: 1 });

    pagination?.setPage(1);

    if (isStatic) return;

    const params = options?.filter?.props
      ? options.filter.props(active)
      : { filters: active.length ? JSON.stringify(active) : undefined };

    const fetcher = options?.filter?.filterFunction || actions?.get;
    if (!fetcher) return;

    functionWithTableProps(fetcher, { ...params, page: 1 });
  };

  return {
    isStatic,
    apply: (filterHeaders: TTableFilterHeaders) =>
      dispatch(buildFilters(filters.drafts, filterHeaders)),
    clear: () => {
      filters.clearDrafts();
      dispatch([]);
    },
  };
}

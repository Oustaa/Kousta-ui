import { getNestedProperty } from "@kousta-ui/helpers";
import {
  FilterOperator,
  FilterType,
  NumberFilterOperator,
  SelectFilterOperator,
  StringFilterOperator,
  TableFilter,
  TableFilterDraft,
} from "../_props";

type FilterValue = string | number | Array<string | number> | null | undefined;

const toText = (value: unknown): string =>
  value === null || value === undefined ? "" : String(value);

const toNumber = (value: unknown): number =>
  typeof value === "number" ? value : Number(toText(value));

const isBlank = (value: unknown): boolean => toText(value).trim().length === 0;

const toList = (value: FilterValue): Array<string | number> => {
  if (Array.isArray(value)) return value;
  return value === null || value === undefined ? [] : [value];
};


export const STRING_FILTERS: Record<
  StringFilterOperator,
  (cell: unknown, value?: FilterValue) => boolean
> = {
  contains: (cell, value) =>
    toText(cell).toLowerCase().includes(toText(value).toLowerCase()),
  "not-contains": (cell, value) =>
    !toText(cell).toLowerCase().includes(toText(value).toLowerCase()),
  is: (cell, value) =>
    toText(cell).toLowerCase() === toText(value).toLowerCase(),
  "is-not": (cell, value) =>
    toText(cell).toLowerCase() !== toText(value).toLowerCase(),
  "starts-with": (cell, value) =>
    toText(cell).toLowerCase().startsWith(toText(value).toLowerCase()),
  "ends-with": (cell, value) =>
    toText(cell).toLowerCase().endsWith(toText(value).toLowerCase()),
  "is-empty": (cell) => isBlank(cell),
  "is-not-empty": (cell) => !isBlank(cell),
};

export const NUMBER_FILTERS: Record<
  NumberFilterOperator,
  (cell: unknown, value?: FilterValue, to?: FilterValue) => boolean
> = {
  eq: (cell, value) => toNumber(cell) === toNumber(value),
  neq: (cell, value) => toNumber(cell) !== toNumber(value),
  gt: (cell, value) => toNumber(cell) > toNumber(value),
  gte: (cell, value) => toNumber(cell) >= toNumber(value),
  lt: (cell, value) => toNumber(cell) < toNumber(value),
  lte: (cell, value) => toNumber(cell) <= toNumber(value),
  // an empty bound is treated as unbounded on that side, so "min only" and
  // "max only" both work without a second operator
  between: (cell, value, to) => {
    const current = toNumber(cell);
    const min = isBlank(value) ? NaN : toNumber(value);
    const max = isBlank(to) ? NaN : toNumber(to);

    if (Number.isNaN(min) && Number.isNaN(max)) return true;
    if (Number.isNaN(min)) return current <= max;
    if (Number.isNaN(max)) return current >= min;
    return current >= min && current <= max;
  },
};

export const SELECT_FILTERS: Record<
  SelectFilterOperator,
  (cell: unknown, value?: FilterValue) => boolean
> = {
  is: (cell, value) => toText(cell) === toText(value),
  "is-not": (cell, value) => toText(cell) !== toText(value),
  "is-any-of": (cell, value) =>
    toList(value).some((item) => toText(item) === toText(cell)),
  "is-none-of": (cell, value) =>
    !toList(value).some((item) => toText(item) === toText(cell)),
  "is-empty": (cell) => isBlank(cell),
  "is-not-empty": (cell) => !isBlank(cell),
};

export const DEFAULT_OPERATOR_BY_TYPE: Record<FilterType, FilterOperator> = {
  string: "contains",
  number: "eq",
  select: "is",
};

export function resolveOperator(
  draft: TableFilterDraft | undefined,
  type: FilterType,
): FilterOperator {
  return draft?.operator ?? DEFAULT_OPERATOR_BY_TYPE[type];
}

const VALUELESS_OPERATORS = ["is-empty", "is-not-empty"];

export function operatorNeedsValue(operator?: string): boolean {
  if (!operator) return false;
  return !VALUELESS_OPERATORS.includes(operator);
}

export function isFilterComplete(draft: TableFilterDraft): boolean {
  if (!draft.operator) return false;
  if (!operatorNeedsValue(draft.operator)) return true;

  if (draft.operator === "between") {
    return !isBlank(draft.value) || !isBlank(draft.to);
  }

  if (Array.isArray(draft.value)) return draft.value.length > 0;
  return !isBlank(draft.value);
}

export function matchesFilter(row: unknown, filter: TableFilter): boolean {
  const cell = getNestedProperty(
    row as Record<string, unknown>,
    filter.name,
  ) as unknown;

  switch (filter.type as FilterType) {
    case "number":
      return (
        NUMBER_FILTERS[filter.operator as NumberFilterOperator]?.(
          cell,
          filter.value,
          filter.to,
        ) ?? true
      );
    case "select":
      return (
        SELECT_FILTERS[filter.operator as SelectFilterOperator]?.(
          cell,
          filter.value,
        ) ?? true
      );
    default:
      return (
        STRING_FILTERS[filter.operator as StringFilterOperator]?.(
          cell,
          filter.value,
        ) ?? true
      );
  }
}

export function applyFilters<T>(rows: T[], filters: TableFilter[]): T[] {
  if (!filters || filters.length === 0) return rows;
  return rows.filter((row) =>
    filters.every((filter) => matchesFilter(row, filter)),
  );
}

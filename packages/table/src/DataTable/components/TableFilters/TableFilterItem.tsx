import { FC } from "react";
import {
  FilterOperator,
  FilterType,
  NumberFilterOperator,
  TableHeaderFilter,
} from "../../_props";
import { Input, Select } from "@kousta-ui/components";
import { useTableContext } from "../../tableContext";
import {
  DEFAULT_OPERATOR_BY_TYPE,
  operatorNeedsValue,
  resolveOperator,
} from "../../utils/tableFilters";

import classes from "../../DataTable.module.css";

export type {
  StringFilterOperator,
  NumberFilterOperator,
  SelectFilterOperator,
} from "../../_props";

export const OPERATORS_BY_TYPE: Record<
  FilterType,
  { value: FilterOperator; label: string }[]
> = {
  string: [
    { value: "contains", label: "Contains" },
    { value: "not-contains", label: "Does not contain" },
    { value: "is", label: "Is" },
    { value: "is-not", label: "Is not" },
    { value: "starts-with", label: "Starts with" },
    { value: "ends-with", label: "Ends with" },
    { value: "is-empty", label: "Is empty" },
    { value: "is-not-empty", label: "Is not empty" },
  ],
  number: [
    { value: "eq", label: "=" },
    { value: "neq", label: "≠" },
    { value: "gt", label: ">" },
    { value: "gte", label: "≥" },
    { value: "lt", label: "<" },
    { value: "lte", label: "≤" },
    { value: "between", label: "Between" },
  ],
  select: [
    { value: "is", label: "Is" },
    { value: "is-not", label: "Is not" },
    { value: "is-any-of", label: "Is any of" },
    { value: "is-none-of", label: "Is none of" },
    { value: "is-empty", label: "Is empty" },
    { value: "is-not-empty", label: "Is not empty" },
  ],
};

/**
 * Select options arrive in whatever shape the caller's data uses. Normalise
 * them to { value, label } once so the control below never has to guess.
 */
function normalizeOptions(data: TableHeaderFilter) {
  const options = data.options || [];

  return options.map((option) => {
    if (data.getOption) return data.getOption(option);

    const raw = option as Record<string, unknown>;
    const value = (raw.value ?? raw.id) as string | number;
    return { value, label: String(raw.label ?? value) };
  });
}

const TableFilterItem: FC<{ name: string; data: TableHeaderFilter }> = ({
  data,
  name,
}) => {
  const { filters } = useTableContext();

  const draft = filters.drafts[name] || {};
  // every type starts on a sensible operator, so a row is usable as soon as it
  // is opened — type a value and Apply
  const operator = resolveOperator(draft, data.type);

  const valueDisabled = !operator || !operatorNeedsValue(operator);

  const setDraft = (patch: Partial<typeof draft>) =>
    filters.setDraft(name, { ...draft, ...patch });

  const onOperatorChange = (value: unknown) => {
    const next = (value ||
      DEFAULT_OPERATOR_BY_TYPE[data.type]) as FilterOperator;

    setDraft({
      operator: next,
      to: next === "between" ? draft.to : undefined,
      value: operatorNeedsValue(next) ? draft.value : undefined,
    });
  };

  const renderValue = () => {
    if (data.type === "select") {
      return (
        <Select
          data={normalizeOptions(data)}
          options={{ value: "value", label: "label" }}
          value={draft.value as string | number | undefined}
          disabled={valueDisabled}
          placeholder="value"
          onChange={(value) => setDraft({ value: value as string | number })}
        />
      );
    }

    if (data.type === "number") {
      if (operator === ("between" as NumberFilterOperator)) {
        return (
          <div className={classes["number-filter-range-container"]}>
            <Input
              type="number"
              placeholder="min"
              aria-label={`${name} min`}
              disabled={valueDisabled}
              value={(draft.value as number | string) ?? ""}
              onChange={(event) => setDraft({ value: event.target.value })}
            />
            <Input
              type="number"
              placeholder="max"
              aria-label={`${name} max`}
              disabled={valueDisabled}
              value={draft.to ?? ""}
              onChange={(event) => setDraft({ to: event.target.value })}
            />
          </div>
        );
      }

      return (
        <Input
          type="number"
          placeholder="value"
          aria-label={`${name} value`}
          disabled={valueDisabled}
          value={(draft.value as number | string) ?? ""}
          onChange={(event) => setDraft({ value: event.target.value })}
        />
      );
    }

    return (
      <Input
        placeholder="value"
        aria-label={`${name} value`}
        disabled={valueDisabled}
        value={(draft.value as string) ?? ""}
        onChange={(event) => setDraft({ value: event.target.value })}
      />
    );
  };

  return (
    <div className={classes["table-filter-item-container"]}>
      <span className={classes["table-filter-label"]}>{name}</span>
      <div
        className={`${classes["table-filter-control"]} ${classes["table-filter-operator"]}`}
      >
        <Select
          value={operator}
          clearable={false}
          onChange={onOperatorChange}
          data={OPERATORS_BY_TYPE[data.type]}
        />
      </div>
      <div
        className={`${classes["table-filter-control"]} ${classes["table-filter-value"]}`}
      >
        {renderValue()}
      </div>
    </div>
  );
};

export default TableFilterItem;

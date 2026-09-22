import "@kousta-ui/styles/tokens.css";

export { default as Table } from "./Table/index";

export type {
  THeader,
  TableProps,
  TOptions,
  THeaderValue,
  TParams,
  // filtering
  FilterOperator,
  // FilterPositionType,
  FilterProps,
  FilterType,
  NumberFilterOperator,
  SelectFilterOperator,
  StringFilterOperator,
  TableFilter,
  TableFilterDraft,
  TableHeaderFilter,
} from "./DataTable/_props";
export { default as DataTable } from "./DataTable/index";

export { TablePropsProvider } from "./DataTable/PropsContext";

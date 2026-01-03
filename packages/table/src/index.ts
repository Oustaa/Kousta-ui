import "@kousta-ui/styles/tokens.css";

export { default as Table } from "./Table/index";

export type {
  THeader,
  TableProps,
  TOptions,
  THeaderValue,
} from "./DataTable/_props";
export { default as DataTable } from "./DataTable/index";

export { TablePropsProvider } from "./DataTable/PropsContext";

import { SelectProps, SelectDataConstraints } from "../Base/_props";

type GetDataFunction = (params: {
  page: number;
  limit: number;
  searchTerm?: string;
  // signal: AbortSignal;
}) => Promise<unknown>;

type ExtractDynamicDataFunction<T> = (response: any) => T[];

export type AsyncSelectProps<T extends SelectDataConstraints> = {
  getData: GetDataFunction;
  extractDynamicData?: ExtractDynamicDataFunction<T>;
  infiniteScroll?: boolean;
  hasMore?: (response: any, page: number) => boolean;
  searchTimeout?: number;
} & Omit<SelectProps<T>, "data" | "loading" | "onSearch">;

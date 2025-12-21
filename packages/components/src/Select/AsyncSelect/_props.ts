import { SelectProps, SelectDataConstraints } from "../Base/_props";

type GetDataFunction = (params: {
  page: number;
  limit: number;
  searchTerm?: string;
}) => Promise<unknown>;

type ExtractDynamicDataFunction<T> = (response: any) => T[];

export type AsyncSelectProps<T extends SelectDataConstraints> = {
  getData: GetDataFunction;
  extractDynamicData?: ExtractDynamicDataFunction<T>;
  infiniteScroll?: boolean;
  hasMore?: (responce: any, page: number) => boolean;
} & Omit<SelectProps<T>, "data" | "loading" | "onSearch">;

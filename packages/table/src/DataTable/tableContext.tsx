import React, { createContext, PropsWithChildren, useContext } from "react";
import type {
  TableFilter,
  TableFilterDraft,
  TableProps,
  TablePropsInterface,
  THeader,
} from "./_props";

export type TableHeaders<T> = {
  data: THeader<T>;
  setHeaders: React.Dispatch<React.SetStateAction<THeader<T>>>;
};

export type OrderBy = { by: string; direction: number };

export type TableContextType<T> = Omit<
  TableProps<T>,
  "headers" | "pagination" | "data"
> & {
  headers: TableHeaders<T>;
  data: {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
  };
  rowSelection: {
    selectedRows: Record<number, unknown>;
    setSelectedRows: (index: number, row: unknown, all?: boolean) => void;
    diseclectAll: VoidFunction;
  };
  search: {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  };
  order: {
    orderBy: OrderBy;
    setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>;
  };
  filters: {
    /** what the filter rows currently show, keyed by header label */
    drafts: Record<string, TableFilterDraft>;
    setDraft: (header: string, draft: TableFilterDraft) => void;
    /** what the table is actually filtering by — only changes on Apply */
    applied: TableFilter[];
    setApplied: React.Dispatch<React.SetStateAction<TableFilter[]>>;
    /** resets the rows back to empty; applied filters go through apply() */
    clearDrafts: VoidFunction;
  };
  total: {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
  };
  setProps: (
    props: Partial<TablePropsInterface & { page: number; limit: number }>,
  ) => void;
  displayAs: string;
  setDisplayAs: (as: string) => void;
  pagination?: {
    limit: number;
    page: number;
    total: number;
    type?: "static" | "dynamic";
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
  };
};

const TableContext = createContext<TableContextType<unknown> | null>(null);

export function useTableContext<T>() {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error(
      "useTableContext must be used within a TableContextProvider",
    );
  }
  return ctx as TableContextType<T>;
}

export const TableContextProvider = <T,>({
  children,
  ...value
}: PropsWithChildren<TableContextType<T>>) => {
  return (
    <TableContext.Provider value={value as TableContextType<unknown>}>
      {children}
    </TableContext.Provider>
  );
};

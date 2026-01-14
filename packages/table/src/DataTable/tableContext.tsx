import { createContext, PropsWithChildren, useContext } from "react";
import type { TableProps, THeader } from "./_props";

export type TableHeaders<T> = {
  data: THeader<T>;
  setHeaders: React.Dispatch<React.SetStateAction<THeader<T>>>;
};

type TableContextType<T> = Omit<TableProps<T>, "headers" | "pagination"> & {
  headers: TableHeaders<T>;
  rowSelection: {
    selectedRows: Record<number, unknown>;
    setSelectedRows: (index: number, row: unknown, all?: boolean) => void;
    diseclectAll: VoidFunction;
  };
  search: {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  };
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

---
sidebar_position: 1
title: Props
---

# Props

This page contains the TypeScript type definitions used across the DataTable documentation.

## `THeader<T>` {#theader-t}

```ts
export type THeader<T> = Record<string, THeaderValue<T>>;
```

## `THeaderValue<T>` {#theadervalue-t}

```ts
export type THeaderValue<T> = {
  value?: string | never;
  exec?: never | ((row: T) => string | ReactNode);
  visible?: boolean;
  canSee?: boolean;
  alwaysVisible?: boolean;
} & (
  | {
      value: string;
      exec?: never;
    }
  | {
      value?: never;
      exec: (row: T) => string | ReactNode;
    }
);
```

## `TableProps<T>`

```ts
export type TableProps<T> = {
  data: T[];
  loading: boolean;
  title: string;
  headers: THeader<T>;
  keyExtractor?: (row: T) => string | number;
  pagination?: TablePagination;
  actions?: TActions<T>;
  isStatic?: boolean;
  options?: TOptions<T>;
  config?: TConfig;
};
```

## `TablePagination`

```ts
type TablePagination = {
  total: number;
  page: number;
  limit: number;
  type?: "static" | "dynamic";
};
```

## `TActions<T>` {#tactions-t}

```ts
export type TActions<T> = {
  get?: (params: TParams) => void;
  edit?: {
    canEdit?: CanPerformAction<T>;
    onEdit: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
    afterEdit?: TAfterAction; // Not implemented yet
  };
  delete?: {
    canDelete?: CanPerformAction<T>;
    onDelete: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
    afterDelete?: TAfterAction; // Not implemented yet
  };
  search?: TSearch<T>;
};
```

## `TOptions<T>` {#toptions-t}

```ts
export type TOptions<T> = Partial<{
  extraActions: Array<ExtraActions<T>>;
  emptyTable: ReactNode;
  cards: {
    card: (props: { row: T; visibleHeaders: string[] }) => JSX.Element;
    cardsContainerProps?: ComponentPropsWithoutRef<"div">;
    menuProps?: Omit<MenuItemProps, "onClick" | "closeMenuOnClick">;
    loadingIndicator?: LoadingIndicator;
  };
  viewComp: {
    Component: (row: T) => ReactNode;
    type?: "modal" | "extends";
    modalOptions?: Omit<ModalProps, "opened" | "onClose" | "modalTrigger">;
    openModalIcon?: ReactNode;
    extendRowIcon?: ReactNode;
    minimizeRowIcon?: ReactNode;
    openButtonProps?: Omit<ButtonProps, "onClick">;
    canView?: CanPerformAction<T>;
  } & (
    | {
      type: "modal";
      modalOptions?: Partial<ModalProps>;
    }
    | {
      type?: "extends";
      modalOptions?: never;
    }
  );
  bulkActions: TBulkActions<T>[];
  extraviews: Record<string, TExtraView<T>>;
  selectFilter: Record<string, (row: T, clearAll?: VoidFunction) => boolean>;
}>;
```

## `TConfig`

```ts
export type TConfig = {
  toggleRows?: boolean;
  disableContextMenu?: boolean;
  noHead?: boolean;
  emptyRowIcon?: ReactNode;
  useGetAsRefresh?: boolean;
  loadingIndicator?: LoadingIndicator;
  icons?: {
    toggleRows?: ReactNode;
    selectRow?: ReactNode;
    extraViewsTogle?: ReactNode;
    tableExtraView?: ReactNode;
    cardExtraView?: ReactNode;
    refresh?: ReactNode;
    selectOpened?: ReactNode;
    selectClosed?: ReactNode;
    paginationNext?: ReactNode;
    paginationPrev?: ReactNode;
    paginationDots?: ReactNode;
  };
  props?: {
    table?: ComponentPropsWithoutRef<"table">;
    tbody?: ComponentPropsWithoutRef<"tbody">;
    thead?: ComponentPropsWithoutRef<"thead">;
    td?: ComponentPropsWithoutRef<"td">;
    th?: ComponentPropsWithoutRef<"th">;
    tr?: ComponentPropsWithoutRef<"tr">;
  };
};
```

## `TParams`

```ts
export type TParams = Record<string, number | string | undefined>;
```

## `CanPerformAction<T>`

```ts
export type CanPerformAction<T> = ((row: T) => boolean) | boolean;
```

## `PropsContextType` {#propscontexttype}

The type used by `TablePropsProvider`. It is a partial of props/actions/config that the provider can set as defaults for all `DataTable` instances below it. See [TablePropsProvider](./TablePropsProvider) and [`TConfig`](#tconfig).

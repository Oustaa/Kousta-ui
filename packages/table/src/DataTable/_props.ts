import {
  ComponentPropsWithoutRef,
  FC,
  PropsWithChildren,
  ReactNode,
} from "react";
import { ButtonProps, MenuItemProps, ModalProps } from "@kousta-ui/components";

export type TableProps<T> = {
  data: T[];
  loading: boolean;
  title: string;
  headers: THeader<T>;
  keyExtractor?: (row: T) => string | number;
  pagination?: TablePagination;
  actions?: TActions<T>;

  options?: TOptions<T>;
  config?: TConfig;
};

export type SortProps = {
  props: (props: {
    sortBy: string;
    direction: number;
  }) => Record<string, string | number>;
};

// Table Props
export type TablePropsInterface = {
  // search
  query: string;
  // sort by
  sortBy: string;
  direction: -1 | 1;
  // display as
  displayAs: string;
  // active filters
  filters: TableFilter[];
};
// End Table Props

export type TOptions<T> = Partial<{
  extraActions: Array<ExtraActions<T>>;
  emptyTable: ReactNode;
  sort: SortProps;
  filter: FilterProps;
  // filterPosition: FilterPositionType;

  props: {
    // this will be exectuted by table, so the users can do whatever he want with the passed props, save them in the url, save them in local storage
    set: (
      props: TablePropsInterface & { page: number; limit: number },
      tableTitle: string,
    ) => void;
    // this will be executed by the table to get the saved props and restart the table state based on the return props
    get?: null | (() => Partial<TablePropsInterface>);
  };

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
  // TODO: adding the clearAll function
  selectFilter: Record<string, (row: T, clearAll?: VoidFunction) => boolean>;
}>;

export type TablePropsWithChildren<T> =
  | (PropsWithChildren<TableProps<T>> & { children: ReactNode })
  | (TableProps<T> & { children?: never });

export type FilterType = "string" | "number" | "select";

export type StringFilterOperator =
  | "contains"
  | "not-contains"
  | "is"
  | "is-not"
  | "starts-with"
  | "ends-with"
  | "is-empty"
  | "is-not-empty";

export type NumberFilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "between";

export type SelectFilterOperator =
  | "is"
  | "is-not"
  | "is-any-of"
  | "is-none-of"
  | "is-empty"
  | "is-not-empty";

export type FilterOperator =
  | StringFilterOperator
  | NumberFilterOperator
  | SelectFilterOperator;

/** a filter row while it is still being edited — nothing is applied yet */
export type TableFilterDraft = {
  operator?: FilterOperator;
  value?: string | number | Array<string | number> | null;
  /** upper bound, only used by the number "between" operator */
  to?: string | number | null;
};

/** a filter that is complete enough to actually filter with */
export type TableFilter = TableFilterDraft & {
  /** the header label the filter was built from */
  header: string;
  /** the value path the filter reads — headers[header].value */
  name: string;
  type: FilterType;
  operator: FilterOperator;
};

export type FilterProps = {
  /**
   * Reshape the active filters into whatever the backend expects. The filter
   * twin of options.sort.props — without it the table sends the filters as a
   * JSON string under a `filters` key.
   */
  props?: (filters: TableFilter[]) => TParams;
  /**
   * Called instead of actions.get when the caller wants to own the fetch.
   * Receives the same params actions.get would have received.
   */
  filterFunction?: (params: TParams) => void;
};

export type TableHeaderFilter<
  THF extends { label: string; value: string | number } = any,
> = {
  type: FilterType;
  options?: THF[] | never;
  getOption?:
    | never
    | ((item: THF) => { label: string; value: string | number });
} & (
  | {
      type: "select";
      options: THF[];
      getOption?: (item: THF) => { label: string; value: string | number };
    }
  | {
      type: "string" | "number";
      options?: never;
      getOption?: never;
    }
);

/** the headers that declared a filterBy, keyed by their header label */
export type TTableFilterHeaders = Record<string, TableHeaderFilter>;

// export type FilterPositionType = "inline" | "modal" | "menu";

export type THeaderValue<T> = {
  value?: string | never;
  exec?: never | ((row: T) => string | ReactNode);
  visible?: boolean;
  canSee?: boolean;
  sortBy?: THeaderSort<T>;

  filterBy?: TableHeaderFilter;

  total?:
    | boolean
    | {
        name?: string;
        func?: (prev: number, current: number) => number;
      };
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

type THeaderSort<T> = {
  // this is the name of the props the user want to sort by
  // if not passed the it will goes check by value passed to the THeaderValue.
  // the purpose behine this is if the backend uses a different name for example ( to show a category that is comming in a object yout value might be something like category.name, and when sorting the table will send category.name, but if the backend expect a string category, here you should make the name in the sortBy equal to category ).
  name?: string;
  // this will be called inside the data.sort function, for datatypes that are complex
  sortFunc?: (a: T, b: T) => number;
};

export type THeader<T> = Record<string, THeaderValue<T>>;

type TBulkActions<T> = {
  title: string;
  onClick: (rows: T[], clearSelected: VoidFunction) => void | Promise<unknown>;
  valueExtractor?: (rows: T[]) => unknown;
  buttonProps?: Omit<ButtonProps, "onClick">;
  canPerformAction?: boolean;
};

type TExtraView<T> = {
  View: FC<{ data: T[]; visibleHeaders: string[] }>;
  canView?: boolean;
  menuProps?: Omit<MenuItemProps, "onClick" | "closeMenuOnClick">;
  loadingIndicator?: LoadingIndicator;
};

export type TActions<T> = {
  get?: (params: TParams) => void;
  edit?: {
    canEdit?: CanPerformAction<T>;
    onEdit: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
    // not implemented yet
    afterEdit?: TAfterAction;
  };
  delete?: {
    canDelete?: CanPerformAction<T>;
    onDelete: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
    // not implemented yet
    afterDelete?: TAfterAction;
  };
  search?: TSearch<T>;
};

type TSearch<T> = {
  searchOnType?: boolean;
  searchTimer?: number;
  static?: boolean;
} & (
  | {
      searchOnType?: false;
      searchTimer?: never;
    }
  | {
      searchOnType?: true;
      searchTimer?: number;
    }
) &
  (
    | {
        static: true;
        onSearch?: (row: T, props: { query: string; reg: RegExp }) => boolean;
      }
    | {
        static?: false | undefined;
        onSearch?: (params: TParams) => void;
      }
  );

type ExtraActions<T> = {
  title: string | ReactNode;
  onClick: (row: T) => void;
  Icon?: ReactNode;
  allowed?: CanPerformAction<T>;
};

type TablePagination = {
  total: number;
  page: number;
  limit: number;
  type?: "static" | "dynamic";
};

// Table config
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

export type TParams = Record<string, number | string | undefined>;

type LoadingIndicator = (props: { visibleHeaders: string[] }) => ReactNode;

type TAfterAction = (props: TParams) => unknown;

export type CanPerformAction<T> = ((row: T) => boolean) | boolean;

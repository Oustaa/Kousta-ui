import {
  ComponentPropsWithoutRef,
  FC,
  PropsWithChildren,
  ReactNode,
} from "react";
import {
  ButtonProps,
  MenuItemProps,
  MenuProps,
  ModalProps,
} from "@kousta-ui/components";

export type TableProps<T> = {
  data: T[];
  loading: boolean;
  title: string;
  headers: THeader<T>;
  keyExtractor?: (row: T) => string | number;
  pagination?: TablePagination;

  options?: TOptions<T>;
  config?: TConfig;
};

export type TOptions<T> = Partial<{
  actions: Partial<TActions<T>>;
  extraActions: Array<ExtraActions<T>>;
  emptyTable: ReactNode;

  cards: {
    card: (props: { row: T; visibleHeaders: string[] }) => JSX.Element;
    cardsContainerProps?: ComponentPropsWithoutRef<"div">;
    menuProps?: Omit<MenuItemProps, "onClick" | "closeMenuOnClick">;
  };

  viewComp: {
    Component: (row: T) => ReactNode;
    type?: "modal" | "extends";
    modalOptions?: Omit<ModalProps, "opned" | "onClose" | "modalTrigger">;
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

export type THeaderValue<T> = {
  value?: string | never;
  exec?: never | ((row: T) => string | ReactNode);
  visible?: boolean;
  canSee?: boolean;
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
};

// type TStaticSearch = (
//   q: string,
//   options: {
//     visibleHeaders: string[];
//     props: Record<string, string | number | Array<string> | Array<number>>;
//   },
// ) => void;

type TActions<T> = {
  get: (params: Record<string, number | string | undefined>) => void;
  edit: {
    canEdit?: CanPerformAction<T>;
    onEdit: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
  };
  delete: {
    canDelete?: CanPerformAction<T>;
    onDelete: (row: T) => void;
    title?: string | ReactNode;
    buttonProps?: ButtonProps;
  };
  search: (params: Record<string, number | string | undefined>) => void;
};

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
};

// Table config
type TConfig = {
  toggleRows?: false | Omit<ButtonProps, "onClick">;
  disableContextMenu?: boolean;
  noHead?: boolean;
  selectFilter?: { icon: ReactNode; menuProps?: MenuProps };
  emptyRowIcon?: ReactNode;
  useGetAsRefresh?: boolean;
  props?: {
    table?: ComponentPropsWithoutRef<"table">;
    tbody?: ComponentPropsWithoutRef<"tbody">;
    thead?: ComponentPropsWithoutRef<"thead">;
    td?: ComponentPropsWithoutRef<"td">;
    th?: ComponentPropsWithoutRef<"th">;
    tr?: ComponentPropsWithoutRef<"tr">;
  };
};

export type CanPerformAction<T> = ((row: T) => boolean) | boolean;

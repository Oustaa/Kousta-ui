import { ButtonProps, MenuProps, ModalProps } from "@kousta-ui/components";
import {
  ComponentPropsWithoutRef,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";

type PropsContextType = Partial<{
  props: {
    table?: ComponentPropsWithoutRef<"table">;
    tbody?: ComponentPropsWithoutRef<"tbody">;
    thead?: ComponentPropsWithoutRef<"thead">;
    td?: ComponentPropsWithoutRef<"td">;
    th?: ComponentPropsWithoutRef<"th">;
    tr?: ComponentPropsWithoutRef<"tr">;
  };
  actions: {
    delete?: {
      title?: string | ReactNode;
      buttonProps?: ButtonProps;
    };
    edit?: {
      title?: string | ReactNode;
      buttonProps?: ButtonProps;
    };
  };
  toggleRows: false | Omit<ButtonProps, "onClick">;
  disableContextMenu: boolean;
  noHead: boolean;
  selectFilter: { icon: ReactNode; menuProps?: MenuProps };
  viewComp: {
    type?: "modal" | "extends";
    modalOptions?: Omit<ModalProps, "opened" | "onClose" | "modalTrigger">;
    openModalIcon?: ReactNode;
    extendRowIcon?: ReactNode;
    minimizeRowIcon?: ReactNode;
    openButtonProps?: Omit<ButtonProps, "onClick">;
  };
  emptyTable: ReactNode;
  emptyRowIcon: ReactNode;
  keyExtractor?: (row: unknown) => string | number;
}>;

const PropsContext = createContext<PropsContextType | undefined>({});

export function useComponentContext(): PropsContextType | undefined {
  const ctx = useContext(PropsContext);

  return ctx;
}

export const TablePropsProvider = ({
  children,
  ...value
}: PropsWithChildren<PropsContextType>) => {
  return (
    <PropsContext.Provider value={value as PropsContextType}>
      {children}
    </PropsContext.Provider>
  );
};

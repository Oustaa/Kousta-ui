import { ButtonProps, ModalProps } from "@kousta-ui/components";
import {
  ComponentPropsWithoutRef,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from "react";
import { TConfig } from "./_props";

type PropsContextType = Partial<{
  props: TConfig["props"];
  actions: {
    delete?: {
      title?: string | ReactNode;
      buttonProps?: ButtonProps;
    };
    edit?: {
      title?: string | ReactNode;
      buttonProps?: ButtonProps;
    };
    search?: {
      searchOnType?: boolean;
      searchTimer?: number;
    };
  };
  toggleRows: boolean;
  disableContextMenu: boolean;
  noHead: boolean;
  icons: TConfig["icons"];
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
  useGetAsRefresh?: boolean;
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

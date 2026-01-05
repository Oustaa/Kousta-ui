import {
  ComponentPropsWithoutRef,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { ButtonProps } from "./Button/_props";
import { MenuItemProps, MenuProps } from "./Menu/_props";
import { ModalProps } from "./Modal/_props";
import { SelectProps } from "./Select/index";
import { AsyncSelectProps } from "./Select/AsyncSelect/_props";
import { SelectDataConstraints } from "./Select/Base/_props";

/* Helper Types */
type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

type GetOptionalProperties<T> = Pick<T, OptionalKeys<T>>;

/* Button */
export type ButtonPropsProvided = Pick<
  ButtonProps,
  "size" | "type" | "variant" | "style" | "loadingIndicator" | "className"
> & {
  variants?: Record<string, ComponentPropsWithoutRef<"button">>;
};
/* Menu */
export type MenuPropsProvided = {
  menu: GetOptionalProperties<MenuProps>;
  menuItem: GetOptionalProperties<MenuItemProps>;
};
/* Modal */
export type ModalPropsProvided = GetOptionalProperties<ModalProps>;

export type SelectPropsProvided = Pick<
  SelectProps<SelectDataConstraints>,
  | "rawValue"
  | "options"
  | "labelPosition"
  | "emptyMessage"
  | "seachable"
  | "required"
  | "labelProps"
  | "clearable"
>;

export type AsyncSelectPropsProvided = Pick<
  AsyncSelectProps<SelectDataConstraints>,
  "limit" | "extractDynamicData" | "searchTimeout" | "hasMore"
>;

type PropsContextType = {
  button?: ButtonPropsProvided;
  menu?: MenuPropsProvided;
  modal?: ModalPropsProvided;
  select?: SelectPropsProvided;
  asyncSelect?: SelectPropsProvided;
};

const PropsContext = createContext<PropsContextType | undefined>({});

export function useComponentContext(comp?: keyof PropsContextType) {
  const ctx = useContext(PropsContext);

  if (ctx) {
    if (!comp) return ctx;
    else return ctx[comp] as PropsContextType[typeof comp];
  }

  return undefined;
}

export const ComponentPropsProvider = ({
  children,
  ...value
}: PropsWithChildren<PropsContextType>) => {
  return (
    <PropsContext.Provider value={value as PropsContextType}>
      {children}
    </PropsContext.Provider>
  );
};

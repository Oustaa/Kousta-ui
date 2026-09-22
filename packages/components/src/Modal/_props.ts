// _props.ts
import { Dispatch, ReactNode, SetStateAction } from "react";
import { ButtonVariant } from "../Button/_props";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ModalPosition =
  | "top"
  | "bottom"
  | "right"
  | "right-top"
  | "right-bottom"
  | "left"
  | "left-top"
  | "left-bottom"
  | "center";

// export type ModalAnimation =
//   | "fade"
//   | "slide-left"
//   | "slide-right"
//   | "zoom"
//   | "drop-top"
//   | "none";

export type ModalProps = {
  modalTrigger?: string | ReactNode;
  title?: string | ReactNode;
  withCloseBtn?: boolean;
  size?: ModalSize | string;
  withBackdrop?: boolean;
  offset?: number;
  position?: ModalPosition;
  fullHeight?: boolean;
  fullWidth?: boolean;
  closeOnClickEsc?: boolean;
  closeOnClickOutside?: boolean;
  modalTriggerBtnVariant?: ButtonVariant;

  closeIcon?: ReactNode;

  // Animations will not be implemented now
  // animation?: ModalAnimation;
  // animationDurationMs?: number;

  // controlled modal
  opened?: boolean;
  onClose?: VoidFunction;

  beforeOpen?: () => void | boolean;
  afterOpen?: VoidFunction;
  beforeClose?: () => void | boolean;
  afterClose?: VoidFunction;
} & (
  | {
      opened: boolean;
      onClose: VoidFunction;
      modalTrigger?: never;
      modalTriggerBtnVariant?: never;
    }
  | {
      modalTrigger: string | ReactNode;
      modalTriggerBtnVariant?: ButtonVariant;
      opened?: never;
      onClose?: never;
    }
);

export type ModalExtraProps = {
  setModalTitle: Dispatch<SetStateAction<string | ReactNode>>;
};

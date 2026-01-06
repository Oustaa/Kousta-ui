import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ModalPosition, ModalProps, ModalSize } from "./_props";
import classes from "./Modal.module.css";
import Button from "../Button";
import { useScrollLock } from "@kousta-ui/hooks";
import { modalPositionStyle } from "./modalPositions";
import { ModalPropsProvided, useComponentContext } from "../PropsContext";

const modalSizeValue: Record<ModalSize, string> = {
  xs: "600px",
  sm: "850px",
  md: "1250px",
  lg: "1440px",
  xl: "1800px",
};

const defaultProps: ModalPropsProvided = {
  size: "md",
  withCloseBtn: true,
  withBackdrop: true,
  position: "center",
  offset: 0,
  closeOnClickEsc: true,
  closeOnClickOutside: true,
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  opened,
  onClose,
  size,
  withCloseBtn,
  withBackdrop,
  modalTrigger,
  afterClose,
  beforeClose,
  afterOpen,
  beforeOpen,
  position,
  offset,
  fullHeight,
  fullWidth,
  closeOnClickEsc,
  closeOnClickOutside,
  modalTriggerBtnVariant,
}) => {
  const modalProps = useComponentContext("modal") as ModalPropsProvided;

  // props provider
  if (modalProps) {
    if (modalProps.position && !position) position = modalProps.position;
    if (modalProps.size && !size) size = modalProps.size;
    if (modalProps.offset && typeof offset === "undefined")
      offset = modalProps.offset;
    if (
      typeof modalProps.closeOnClickEsc !== "undefined" &&
      closeOnClickEsc === undefined
    )
      closeOnClickEsc = modalProps.closeOnClickEsc;
    if (
      typeof modalProps.closeOnClickOutside !== "undefined" &&
      closeOnClickOutside === undefined
    )
      closeOnClickOutside = modalProps.closeOnClickOutside;
    if (
      typeof modalProps.withCloseBtn !== "undefined" &&
      withCloseBtn === undefined
    )
      withCloseBtn = modalProps.withCloseBtn;
    if (
      typeof modalProps.withBackdrop !== "undefined" &&
      withBackdrop === undefined
    )
      withBackdrop = modalProps.withBackdrop;
  }

  // default values
  if (!size) size = defaultProps.size;
  if (withCloseBtn === undefined) withCloseBtn = defaultProps.withCloseBtn;
  if (withBackdrop === undefined) withBackdrop = defaultProps.withBackdrop;
  if (!position) position = defaultProps.position;
  if (!offset) offset = defaultProps.offset;
  if (closeOnClickEsc === undefined)
    closeOnClickEsc = defaultProps.closeOnClickEsc;
  if (closeOnClickOutside === undefined)
    closeOnClickOutside = defaultProps.closeOnClickOutside;

  const { lockScroll, unlockScroll } = useScrollLock();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isControlled = typeof opened === "boolean";
  const [modalOpened, setModalOpened] = useState<boolean>(!!opened);
  const isOpen = (isControlled && opened) || modalOpened;

  const modalSize =
    size && size in modalSizeValue
      ? modalSizeValue[size as ModalSize]
      : `${size}px`;

  const handleOpenModal = useCallback(() => {
    if (beforeOpen && beforeOpen() === false) return;

    if (!isControlled) {
      setModalOpened(true);
      afterOpen?.();
    }

    lockScroll();
  }, [beforeOpen, afterOpen, isControlled]);

  const handleCloseModal = useCallback(() => {
    if (beforeClose && beforeClose() === false) return;

    if (isControlled) {
      onClose?.();
      setModalOpened(false);
    } else if (modalRef.current) {
      setModalOpened(false);
      afterClose?.();
    }

    unlockScroll();
  }, [beforeClose, opened, afterClose, isControlled, onClose]);

  useEffect(() => {
    if (isControlled && opened) lockScroll();

    return () => unlockScroll();
  }, [opened]);

  useEffect(() => {
    const dlg = modalRef.current;
    if (!dlg) return;

    if (isOpen) {
      setModalOpened(true);
      lockScroll();
      afterOpen?.();
    } else {
      setModalOpened(false);
      unlockScroll();
      afterClose?.();
    }
  }, [afterOpen, afterClose]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (closeOnClickOutside === false) return;
      const modalEl = modalRef.current;
      if (!modalEl) return;

      const target = e.target as Node | null;
      if (target && modalEl.contains(target)) return;

      const path = (e as MouseEvent | TouchEvent).composedPath?.() as
        | Node[]
        | undefined;
      if (path && path.some((n) => n instanceof Node && modalEl.contains(n)))
        return;

      handleCloseModal();
    };

    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnClickEsc === false) return;
      if (e.key === "Escape") handleCloseModal();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpened, opened, handleCloseModal]);

  return (
    <>
      {!isControlled && modalTrigger && (
        <Button variant={modalTriggerBtnVariant} onClick={handleOpenModal}>
          {modalTrigger}
        </Button>
      )}

      {withBackdrop && ((isControlled && opened) || modalOpened) && (
        <div className={`${classes["backdrop"]} kui-modal-backdrop`} />
      )}
      {((isControlled && opened) || modalOpened) && (
        <div
          data-testid={"dialog-modal"}
          role="modal"
          ref={modalRef}
          style={{
            animation: `toLeft 5s toLeft`,
            width: fullWidth
              ? `calc(100vw - ${(offset || 0) * 2}px)`
              : `clamp(200px, ${modalSize}, calc(100% - ${offset}px))`,
            height: fullHeight
              ? `calc(100vh - ${(offset || 0) * 2}px)`
              : "max-content",
            ...modalPositionStyle(offset)[position as ModalPosition],
          }}
          className={`${classes["modal-container"]} kui-modal kui-modal-${size || defaultProps.size} kui-modal-${position || defaultProps.position}`}
        >
          {(title || withCloseBtn) && (
            <header className={`${classes["modal-header"]} kui-modal-header`}>
              {title ? (
                <h3 className={`${classes["modal-title"]} kui-modal-title`}>
                  {title}
                </h3>
              ) : (
                <h3 />
              )}
              {withCloseBtn ? (
                <button
                  role="modal-close"
                  className="kui-modal-close"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              ) : (
                <div />
              )}
            </header>
          )}
          <div className={`${classes["modal-body"]} kui-modal-body`}>
            {children}
          </div>
          <div className={`${classes["modal-footer"]} kui-modal-footer`}></div>
        </div>
      )}
    </>
  );
};

export default Modal;

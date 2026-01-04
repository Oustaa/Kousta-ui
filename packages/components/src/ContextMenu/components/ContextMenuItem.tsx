import { FC } from "react";
import { ContextMenuItemProps } from "../_props";
import { renderIcon } from "../utils/renderIcon";
import ContextMenuSeparator from "./ContextMenuSeparator";
import ContextMenuGroup from "./ContextMenuGroup";

import classes from "../ContextMenu.module.css";

const ContextMenuItem: FC<
  ContextMenuItemProps & {
    offsetY: number;
    offsetX: number;
    itemCloseOnClick?: boolean;
    onClose?: VoidFunction;
  }
> = (props) => {
  const {
    icon,
    // @ts-expect-error sdfwe fd
    onClick,
    title,
    setMenuVisible,
    active = true,
    hidden,
    closeOnClick = true,
    itemCloseOnClick = true,
    onClose,
  } = props;

  if (hidden) return;

  if (props.optionType && props.optionType === "Separator")
    return <ContextMenuSeparator />;

  if (props.optionType && props.optionType === "Group")
    return <ContextMenuGroup title={props.groupTitle} />;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();

        onClick?.();

        if (
          (itemCloseOnClick !== false && closeOnClick === true) ||
          closeOnClick === true
        ) {
          setMenuVisible(false);
          onClose?.();
        }
      }}
      className={`${classes["OuicontextMenu-Item"]} kui-contextmenu-item ${!active ? "kui-disabled" : ""}`}
      disabled={!active}
    >
      <div
        className={`${classes["OuicontextMenu-ItemIcon"]} kui-contextmenu-item-icon`}
      >
        {renderIcon(icon)}
      </div>
      {title}
    </button>
  );
};

export default ContextMenuItem;

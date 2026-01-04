import React, { forwardRef } from "react";

import { ContextMenuOption } from "../_props";

import ContextMenuItem from "./ContextMenuItem";
import ContextMenuItemWithSubs from "./ContextMenuItemWithSubs";

import classes from "../ContextMenu.module.css";

interface ContextMenuMenuProps {
  x: number;
  y: number;
  offsetY: number;
  offsetX: number;
  options: ContextMenuOption[];
  itemCloseOnClick: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: VoidFunction;
}

export const ContextMenuMenu = forwardRef<HTMLDivElement, ContextMenuMenuProps>(
  (
    {
      x,
      y,
      options,
      setMenuVisible,
      offsetX,
      offsetY,
      itemCloseOnClick,
      onClose,
    },
    ref,
  ) => {
    return (
      <div
        style={{
          top: `${y - offsetY}px`,
          left: `${x - offsetX}px`,
        }}
        className={`${classes["OuicontextMenu"]} kui-contextmenu`}
        ref={ref}
      >
        <div
          className={`${classes["OuiiconsContainer"]} kui-contextmenu-icons`}
        ></div>

        {options.map((option, index): React.ReactNode => {
          if (
            (option.optionType === "option" ||
              option.optionType === undefined) &&
            option.subOptions
          ) {
            return (
              <ContextMenuItemWithSubs
                {...option}
                key={index}
                offsetX={offsetX}
                offsetY={offsetY}
                setMenuVisible={setMenuVisible}
                itemCloseOnClick={itemCloseOnClick}
              />
            );
          }

          return (
            <ContextMenuItem
              {...option}
              key={index}
              setMenuVisible={setMenuVisible}
              offsetX={offsetX}
              offsetY={offsetY}
              itemCloseOnClick={itemCloseOnClick}
              onClose={onClose}
            />
          );
        })}
      </div>
    );
  },
);

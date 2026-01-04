import { FC } from "react";
import Separator from "./ContextMenuSeparator";

import classes from "../ContextMenu.module.css";

const ContextmenuGroup: FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <Separator />
      <div
        className={`${classes["OuicontextMenu_separator_container"]} kui-contextmenu-group-container`}
      >
        <div
          className={`${classes["OuicontextMenu_separator_icon"]} kui-contextmenu-separator-icon`}
        ></div>
        <span
          className={`${classes["OuicontextMenu_group_title"]} kui-contextmenu-group-title`}
        >
          {title}
        </span>
      </div>
    </>
  );
};

export default ContextmenuGroup;

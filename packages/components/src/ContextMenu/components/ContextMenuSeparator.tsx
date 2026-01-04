import { FC } from "react";

import classes from "../ContextMenu.module.css";

const Separator: FC = () => {
  return (
    <div
      className={`${classes["OuicontextMenu_separator_container"]} kui-contextmenu-separator-container`}
    >
      <div
        className={`${classes["OuicontextMenu_separator_icon"]} kui-contextmenu-separator-icon`}
      ></div>
      <div
        className={`${classes["OuicontextMenu_separator"]} kui-contextmenu-separator`}
      ></div>
    </div>
  );
};

export default Separator;

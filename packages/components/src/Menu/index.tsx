import {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MenuContextProvider, useMenuContext } from "./MenuContextProvider";
import { MenuItemProps, MenuPosition, MenuProps } from "./_props";

import classes from "./Menu.module.css";
import { MenuPropsProvided, useComponentContext } from "../PropsContext";

type postionStyleType = Record<MenuPosition, CSSProperties>;

function getPositionStyle(gapSize: number): postionStyleType {
  return {
    "Bottom-Center": {
      top: `calc(100% + ${gapSize}px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "Bottom-Start": {
      top: `calc(100% + ${gapSize}px)`,
      left: "0",
    },
    "Bottom-End": {
      top: `calc(100% + ${gapSize}px)`,
      right: "0",
    },
    "Left-Center": {
      right: `calc(100% + ${gapSize}px)`,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "Left-Start": {
      right: `calc(100% + ${gapSize}px)`,
      top: "0",
    },
    "Left-End": {
      right: `calc(100% + ${gapSize}px)`,
      bottom: "0",
    },
    "Right-Center": {
      top: "50%",
      left: `calc(100% + ${gapSize}px)`,
      transform: "translateY(-50%)",
    },
    "Right-Start": {
      top: "0",
      left: `calc(100% + ${gapSize}px)`,
    },
    "Right-End": {
      left: `calc(100% + ${gapSize}px)`,
      bottom: "0",
    },
    "Top-Center": {
      bottom: `calc(100% + ${gapSize}px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "Top-Start": {
      bottom: `calc(100% + ${gapSize}px)`,
      left: "0",
    },
    "Top-End": {
      bottom: `calc(100% + ${gapSize}px)`,
      right: "0",
    },
  };
}

const defaultProps: MenuProps = {
  type: "click",
  closeOnClick: true,
  position: "Bottom-Start",
  offset: 4,
};

const MenuContainer: FC<PropsWithChildren<MenuProps>> = ({
  children,
  type,
  closeOnClick,
  position,
  offset,
  ...props
}) => {
  const menuProps = useComponentContext("menu") as MenuPropsProvided;

  if (menuProps && menuProps.menu) {
    const { menu } = menuProps;

    if (menu.type && !type) type = menu.type;
    if (menu.offset && !offset) offset = menu.offset;
    if (menu.position && !position) position = menu.position;
    if (menu.closeOnClick && closeOnClick === undefined)
      closeOnClick = menu.closeOnClick;
  }

  if (!type) type = defaultProps.type;
  if (!position) position = defaultProps.position;
  if (!offset) offset = defaultProps.offset;
  if (closeOnClick === undefined) closeOnClick = defaultProps.closeOnClick;

  const menuRef = useRef<null | HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useLayoutEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MenuContextProvider
      {...props}
      opened={opened}
      open={() => setOpened(true)}
      close={() => setOpened(false)}
      toggle={() => setOpened((prev) => !prev)}
      type={type}
      closeOnClick={closeOnClick}
      position={position}
      offset={offset}
    >
      <div
        ref={menuRef}
        onMouseEnter={() => {
          if (type === "click") return;

          setOpened(true);
        }}
        onMouseLeave={() => {
          if (type === "click") return;

          setOpened(false);
        }}
        className={`${classes["menu"]} kui-menu`}
      >
        {children}
      </div>
    </MenuContextProvider>
  );
};

const MenuTarget: FC<PropsWithChildren> = ({ children }) => {
  const { toggle, type } = useMenuContext();

  return (
    <button
      onClick={() => {
        if (type === "hover") return;

        toggle();
      }}
      className={`${classes["menu_target"]} kui-menu-target`}
    >
      {children}
    </button>
  );
};

const MenuDropDown: FC<PropsWithChildren> = ({ children }) => {
  const { opened, position, offset } = useMenuContext();
  if (!opened) return null;

  return (
    <div
      role="menu"
      style={getPositionStyle(offset!)[position!] as CSSProperties}
      className={`${classes["menu_dropdown"]} kui-menu-dropdown`}
    >
      {children}
    </div>
  );
};

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({
  children,
  closeMenuOnClick = undefined,
  leftSection,
  rightSection,
  disabled,
}) => {
  const menuProps = useComponentContext("menu") as MenuPropsProvided;
  if (menuProps && menuProps.menuItem) {
    const { menuItem } = menuProps;

    if (menuItem.closeMenuOnClick && closeMenuOnClick === undefined)
      closeMenuOnClick = menuItem.closeMenuOnClick;
  }
  const { close, closeOnClick } = useMenuContext();

  const shouldClose = (closeMenuOnClick ?? closeOnClick) === true;

  return (
    <button
      disabled={disabled}
      role="menuitem"
      onClick={() => {
        if (shouldClose) close();
      }}
      className={`${classes["menu_item"]} kui-menu-item ${disabled ? "kui-disabled" : ""}`}
    >
      {leftSection && leftSection}
      {children}
      {rightSection && rightSection}
    </button>
  );
};

const MenuLabel: FC<
  PropsWithChildren<{ leftSection?: ReactNode; rightSection?: ReactNode }>
> = ({ children, leftSection, rightSection }) => {
  return (
    <span className={`${classes["menu_label"]} kui-menu-label`}>
      {leftSection && leftSection}
      {children}
      {rightSection && rightSection}
    </span>
  );
};

const MenuDivider = () => {
  return <hr className={`${classes["menu_divider"]} kui-menu-divider`} />;
};

export default {
  Menu: MenuContainer,
  Target: MenuTarget,
  DropDown: MenuDropDown,
  Item: MenuItem,
  Label: MenuLabel,
  Divider: MenuDivider,
};

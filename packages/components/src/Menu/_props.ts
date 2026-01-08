import { ReactNode } from "react";

export type MenuOpenPosition = "Top" | "Bottom" | "Left" | "Right";
export type MenuOpenLocation = "Start" | "End" | "Center";

export type MenuPosition = `${MenuOpenPosition}-${MenuOpenLocation}`;

export type MenuProps = {
  type?: "hover" | "click";
  closeOnClick?: boolean;
  position?: MenuPosition;
  offset?: number;
};

export type MenuItemProps = {
  onClick?: VoidFunction;
  closeMenuOnClick?: boolean;
  disabled?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
};

import { ReactNode } from "react";

export type PaginationProps = {
  page: number;
  onChange?: (page: number) => void;
  total: number;
  seblings?: number;

  // icons
  placeholderIcon?: ReactNode;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
};

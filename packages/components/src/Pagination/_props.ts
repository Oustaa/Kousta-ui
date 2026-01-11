import { ReactNode } from "react";

export type PaginationProps = {
  page: number;
  onChange?: (page: number) => void;
  totalPages: number;
  seblings?: number;
  disabled?: boolean;

  // icons
  placeholderIcon?: ReactNode;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
};

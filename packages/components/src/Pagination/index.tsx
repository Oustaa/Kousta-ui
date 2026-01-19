import { FC, isValidElement, useEffect, useMemo, useState } from "react";
import { PaginationProps } from "./_props";
import { PaginationPropsProvided, useComponentContext } from "../PropsContext";
import { getSeblings } from "./getSeblings";

import classes from "./Pagination.module.css";

const Pagination: FC<PaginationProps> = ({
  page = 1,
  totalPages,
  onChange,
  nextIcon,
  placeholderIcon,
  prevIcon,
  seblings,
  disabled,
}) => {
  const paginationProps = useComponentContext(
    "pagination",
  ) as PaginationPropsProvided;

  if (paginationProps) {
    if (!placeholderIcon) placeholderIcon = paginationProps.placeholderIcon;
    if (!nextIcon) nextIcon = paginationProps.nextIcon;
    if (!prevIcon) prevIcon = paginationProps.prevIcon;
    if (!seblings) seblings = paginationProps.seblings;
  }

  if (!seblings) seblings = 1;

  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    if (totalPages < 1) return;
    if (currentPage > totalPages) setCurrentPage(Math.max(totalPages, 1));
    if (currentPage < 1) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const pagesToDisplay = useMemo(() => {
    let pages: ("" | number)[] = [];

    if (safeCurrentPage <= seblings * 2 + 2) {
      pages = getSeblings(safeCurrentPage, totalPages, seblings, "start");
      if (pages[pages.length - 1] !== totalPages) {
        pages.push("", totalPages);
      }
    } else if (safeCurrentPage > totalPages - seblings * 2 - 1) {
      pages = getSeblings(safeCurrentPage, totalPages, seblings, "end");

      if (pages[0] !== 1) {
        pages = [1, "", ...pages];
      }
    } else {
      pages = getSeblings(safeCurrentPage, totalPages, seblings);

      if (Number(pages[pages.length - 1]) < totalPages - 1) {
        pages.push("", totalPages);
      }
      if (Number(pages[1]) > 2) {
        pages = [1, "", ...pages];
      }
    }

    return pages;
  }, [safeCurrentPage, seblings, totalPages]);

  if (totalPages < 1) return <></>;

  return (
    <div className={classes["pagination-container"]}>
      <button
        disabled={safeCurrentPage === 1 || disabled}
        className={[
          classes["pagination-link"],
          classes["is-control"],
          "kui-pagination-link",
        ].join(" ")}
        onClick={() =>
          setCurrentPage((prev) => {
            onChange?.(prev - 1);
            return prev - 1;
          })
        }
      >
        {prevIcon && isValidElement(prevIcon) ? prevIcon : "Prev"}
      </button>

      {pagesToDisplay.map((page, index) => {
        if (typeof page === "string") {
          return (
            <button
              key={` ${index} `}
              disabled
              className={[
                classes["pagination-link"],
                "kui-pagination-placeholder",
              ].join(" ")}
            >
              {placeholderIcon && isValidElement(placeholderIcon)
                ? placeholderIcon
                : "..."}
            </button>
          );
        }
        return (
          <button
            key={page}
            onClick={() => {
              if (page === safeCurrentPage) return;
              onChange?.(page);
              setCurrentPage(page);
            }}
            disabled={disabled}
            className={[
              classes["pagination-link"],
              page === safeCurrentPage && classes["active"],
              "kui-pagination-link",
              page === safeCurrentPage && "kui-pagination-active-link",
            ].join(" ")}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={safeCurrentPage === totalPages || disabled}
        className={[
          classes["pagination-link"],
          classes["is-control"],
          "kui-pagination-link",
        ].join(" ")}
        onClick={() =>
          setCurrentPage((prev) => {
            onChange?.(prev + 1);
            return prev + 1;
          })
        }
      >
        {nextIcon && isValidElement(nextIcon) ? nextIcon : "Next"}
      </button>
    </div>
  );
};

export default Pagination;

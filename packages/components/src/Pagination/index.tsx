import { FC, isValidElement, useMemo, useState } from "react";
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

  // useEffect(() => {
  if (paginationProps) {
    if (!placeholderIcon) placeholderIcon = paginationProps.placeholderIcon;
    if (!nextIcon) nextIcon = paginationProps.nextIcon;
    if (!prevIcon) prevIcon = paginationProps.prevIcon;
    if (!seblings) seblings = paginationProps.seblings;
  }

  if (!seblings) seblings = 1;
  // }, []);

  const [currentPage, setCurrentPage] = useState<number>(page);

  const pagesToDisplay = useMemo(() => {
    let pages: ("" | number)[] = [];

    if (currentPage <= seblings * 2 + 2) {
      pages = getSeblings(currentPage, totalPages, seblings, "start");
      if (pages[pages.length - 1] !== totalPages) {
        pages.push("", totalPages);
      }
    } else if (currentPage > totalPages - seblings * 2 - 1) {
      pages = getSeblings(currentPage, totalPages, seblings, "end");

      if (pages[0] !== 1) {
        pages = [1, "", ...pages];
      }
    } else {
      pages = getSeblings(currentPage, totalPages, seblings);

      if (pages[pages.length - 1] !== totalPages) {
        pages.push("", totalPages);
      }
      if (pages[0] !== 1) {
        pages = [1, "", ...pages];
      }
    }

    if (currentPage > totalPages) setCurrentPage(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages < 1) return <></>;

  return (
    <div className={classes["pagination-container"]}>
      <button
        disabled={currentPage === 1 || disabled}
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
              if (page === currentPage) return;
              onChange?.(page);
              setCurrentPage(page);
            }}
            disabled={disabled}
            className={[
              classes["pagination-link"],
              page === currentPage && classes["active"],
              "kui-pagination-link",
              page === currentPage && "kui-pagination-active-link",
            ].join(" ")}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages || disabled}
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

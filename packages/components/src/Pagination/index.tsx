import { FC, isValidElement, useMemo, useState } from "react";
import { PaginationProps } from "./_props";
import { PaginationPropsProvided, useComponentContext } from "../PropsContext";
import { getSeblings } from "./getSeblings";

import classes from "./Pagination.module.css";

const Pagination: FC<PaginationProps> = ({
  page,
  total,
  onChange,
  nextIcon,
  placeholderIcon,
  prevIcon,
  seblings,
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

    if (currentPage <= page + seblings * 2 + 1) {
      pages = getSeblings(currentPage, total, seblings, "start");
      if (pages[pages.length - 1] !== total) {
        pages.push("", total);
      }
    } else if (currentPage > total - seblings * 2 - 1) {
      pages = getSeblings(currentPage, total, seblings, "end");

      if (pages[0] !== 1) {
        pages = [1, "", ...pages];
      }
    } else {
      pages = getSeblings(currentPage, total, seblings);

      if (pages[pages.length - 1] !== total) {
        pages.push("", total);
      }
      if (pages[0] !== 1) {
        pages = [1, "", ...pages];
      }
    }

    return pages;
  }, [currentPage]);

  return (
    <div className={classes["pagination-container"]}>
      <button
        disabled={currentPage === 1}
        className={[classes["pagination-link"], "kui-pagination-link"].join(
          " ",
        )}
        onClick={() =>
          setCurrentPage((prev) => {
            onChange?.(prev - 1);
            return prev - 1;
          })
        }
      >
        {prevIcon && isValidElement(prevIcon) ? prevIcon : "Prev"}
      </button>

      {pagesToDisplay.map((page) => {
        if (typeof page === "string") {
          return (
            <button
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
            onClick={() => {
              setCurrentPage(page);
              onChange?.(page);
            }}
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
        disabled={currentPage === total}
        className={[classes["pagination-link"], "kui-pagination-link"].join(
          " ",
        )}
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

import { FC } from "react";

export const ChevronIcon: FC<{ direction: "up" | "down" }> = ({
  direction,
}) => (
  <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
    <path
      d={direction === "up" ? "M1 5L5 1L9 5" : "M1 1L5 5L9 1"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClearIcon: FC = () => (
  <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
    <path
      d="M1 1L9 9M9 1L1 9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

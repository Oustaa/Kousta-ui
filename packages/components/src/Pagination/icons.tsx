import { FC } from "react";

export const ChevronLeftIcon: FC = () => (
  <svg viewBox="0 0 8 12" width="8" height="12" aria-hidden="true">
    <path
      d="M7 1L2 6L7 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon: FC = () => (
  <svg viewBox="0 0 8 12" width="8" height="12" aria-hidden="true">
    <path
      d="M1 1L6 6L1 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DotsIcon: FC = () => (
  <svg viewBox="0 0 16 4" width="16" height="4" aria-hidden="true">
    <circle cx="2" cy="2" r="1.6" fill="currentColor" />
    <circle cx="8" cy="2" r="1.6" fill="currentColor" />
    <circle cx="14" cy="2" r="1.6" fill="currentColor" />
  </svg>
);

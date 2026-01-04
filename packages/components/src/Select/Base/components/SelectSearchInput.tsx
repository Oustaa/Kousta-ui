import { forwardRef } from "react";
import classes from "../Select.module.css";

type SelectSearchInputProps = {
  search: (searchTerm: string) => void;
  isSearching: boolean;
};

const SelectSearchInput = forwardRef<HTMLInputElement, SelectSearchInputProps>(
  ({ search, isSearching }, ref) => {
    return (
      <input
        ref={ref}
        className={`${classes["select-input"]} kui-select-input`}
        style={isSearching ? { display: "block" } : { display: "none" }}
        onChange={(e) => {
          search(e.target.value);
        }}
        onKeyDown={(e) => {
          if (
            e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "Enter"
          ) {
            e.preventDefault();
          }
        }}
      />
    );
  },
);

export default SelectSearchInput;

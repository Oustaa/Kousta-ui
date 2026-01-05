import { forwardRef } from "react";
import classes from "../Select.module.css";

type SelectSearchInputProps = {
  search: (searchTerm: string) => void;
  isSearching: boolean;
  placeholder?: string;
};

const SelectSearchInput = forwardRef<HTMLInputElement, SelectSearchInputProps>(
  ({ search, isSearching, placeholder }, ref) => {
    return (
      <input
        ref={ref}
        className={`${classes["select-input"]} kui-select-input`}
        style={isSearching ? { display: "block" } : { display: "none" }}
        placeholder={placeholder}
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

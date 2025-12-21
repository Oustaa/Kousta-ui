import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import classes from "./Label.module.css";

const Label: FC<
  ComponentPropsWithoutRef<"label"> & {
    children: string;
    required?: boolean;
    errors?: string[] | string | ReactNode;
  }
> = ({ children: label, required, errors, ...labelProps }) => {
  return (
    <label
      data-required={label && String(required)}
      data-error={
        // this is not correct based on the type of the errors...
        Array.isArray(errors) && errors.length > 0 ? "true" : "false"
      }
      className={classes["label"]}
      htmlFor={label}
      {...labelProps}
    >
      {label}
    </label>
  );
};

export default Label;

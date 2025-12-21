import { CSSProperties, FC } from "react";
import { FormElementProps } from "./_props";
import { LabelPositionBase } from "../_core/types";

import classes from "./FormElement.module.css";

function flexDirection(position: LabelPositionBase = "y"): CSSProperties {
  switch (position) {
    case "x":
      return {
        flexDirection: "row",
        alignItems: "center",
      };
    case "y":
      return {
        flexDirection: "column",
        alignItems: "start",
      };
  }
}

const FormElement: FC<FormElementProps> = ({ children, labelPosition }) => {
  return (
    <div
      className={classes["formElement"]}
      style={flexDirection(labelPosition)}
    >
      {children}
    </div>
  );
};

export default FormElement;

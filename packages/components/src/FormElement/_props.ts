import { PropsWithChildren } from "react";
import { LabelPositionBase } from "../_core/types";

export type FormElementProps = PropsWithChildren<{
  labelPosition?: LabelPositionBase;
}>;

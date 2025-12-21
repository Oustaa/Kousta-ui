import { FC } from "react";
import { InputProps } from "./_props";
import {
  renderLeftSectionItem,
  renderMiddleSectionItem,
  renderRightSectionItem,
} from "../utils/renderSections";

import classes from "./Input.module.css";
import Label from "../Label";
import FormElement from "../FormElement";
import Group from "../Group";

const Input: FC<InputProps> = ({
  label,
  errors,
  required,
  leftSection,
  rightSection,
  labelProps,
  labelPosition = "y",
  ...rest
}) => {
  const inputPattern: Record<string, string> = {
    number: "^[0-9]+$",
  };

  return (
    <div className={classes["input-container"]}>
      <FormElement labelPosition={labelPosition}>
        {label && (
          <Label {...labelProps} required={required} errors={errors}>
            {label}
          </Label>
        )}
        <div className={classes["input-inner"]}>
          <Group style={{ width: "100%" }}>
            {leftSection}
            {renderMiddleSectionItem(
              <input
                data-error={
                  // this is not correct based on the type of the errors...
                  Array.isArray(errors) && errors.length > 0 ? "true" : "false"
                }
                className={classes["input"]}
                id={label}
                pattern={inputPattern[rest.type as keyof typeof inputPattern]}
                {...rest}
              />,
              {
                left: leftSection,
                right: rightSection,
              },
            )}
            {rightSection}
          </Group>
        </div>
      </FormElement>
      <span className={classes["error-message"]}>
        {(errors as string[])?.[0]}
      </span>
    </div>
  );
};

export default Input;

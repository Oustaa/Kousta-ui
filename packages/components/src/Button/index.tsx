import React, { PropsWithChildren } from "react";
import { ButtonProps } from "./_props";

import classes from "./Button.module.css";
import { ButtonPropsProvided, useComponentContext } from "../PropsContext";

const defaultProps: Pick<
  ButtonProps,
  "size" | "variant" | "type" | "loadingIndicator"
> = {
  size: "md",
  variant: "primary",
  type: "button",
  loadingIndicator: "Loading...",
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  loading,
  onClick,
  className,
  type,
  size,
  variant,
  ...rest
}) => {
  const buttonProps = useComponentContext("button") as ButtonPropsProvided;
  let buttonClassName: string = "";

  // handle default props and overwriting props
  if (buttonProps) {
    // overwrite the size default value
    if (buttonProps.size && !size) {
      size = buttonProps.size;
    }
    // overwrite the type default value
    if (buttonProps.type && !type) {
      type = buttonProps.type;
    }
    // overwrite the variant default value
    if (buttonProps.variant && !variant) {
      variant = buttonProps.variant;
    }

    // combine the props styles and the variant one
    if (buttonProps.style) {
      rest.style = { ...buttonProps.style, ...rest.style };
    }

    if (buttonProps.loadingIndicator && !rest.loadingIndicator) {
      rest.loadingIndicator = buttonProps.loadingIndicator;
    }

    // combine the props className and the variant one
    buttonClassName = `${buttonProps.className || ""}`;

    if (buttonProps.variants && variant && buttonProps.variants[variant]) {
      rest = {
        ...buttonProps.variants[variant],
        ...rest,
        style: { ...buttonProps.variants[variant].style, ...rest.style },
      };
    }
  }

  buttonClassName =
    // provider props className
    buttonClassName +
    // defaultProps className overwriting
    ` ${classes[`btn-${variant || defaultProps.variant}`]} ${classes[`btn-${size || defaultProps.size}`]} ` +
    // component class name
    className +
    // kui prefixed class
    ` kui-button kui-button-${variant || defaultProps.variant} kui-button-${size || defaultProps.size}`;

  return (
    <button
      {...rest}
      role="button"
      className={buttonClassName}
      data-loading={loading}
      disabled={disabled || loading}
      onClick={(e) => onClick?.(e)}
      type={type || defaultProps.type}
    >
      {loading ? (
        <div className="kui-button-loading">
          {rest.loadingIndicator || defaultProps.loadingIndicator}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

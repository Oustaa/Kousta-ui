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
  loadingIndicator,
  ...rest
}) => {
  const buttonProps = useComponentContext("button") as ButtonPropsProvided;
  // a provider variant may bring its own class; it has to be kept out of the
  // spread props, or the className below would overwrite it
  let variantClassName: string | undefined;

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

    if (buttonProps.loadingIndicator && !loadingIndicator) {
      loadingIndicator = buttonProps.loadingIndicator;
    }

    if (buttonProps.variants && variant && buttonProps.variants[variant]) {
      const { className: fromVariant, ...variantProps } =
        buttonProps.variants[variant];

      variantClassName = fromVariant;
      rest = {
        ...variantProps,
        ...rest,
        style: { ...buttonProps.variants[variant].style, ...rest.style },
      };
    }
  }

  const buttonClassName = [
    // provider props className
    buttonProps?.className,
    // the class the provider variant asked for
    variantClassName,
    // defaultProps className overwriting
    classes[`btn-${variant || defaultProps.variant}`],
    classes[`btn-${size || defaultProps.size}`],
    // component class name
    className,
    // kui prefixed classes
    "kui-button",
    `kui-button-${variant || defaultProps.variant}`,
    `kui-button-${size || defaultProps.size}`,
  ]
    // a custom variant has no CSS-module class, and className is optional —
    // neither should leave an "undefined" behind in the class list
    .filter(Boolean)
    .join(" ");

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
          {loadingIndicator || defaultProps.loadingIndicator}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

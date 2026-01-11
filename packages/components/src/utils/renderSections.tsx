import { cloneElement, isValidElement, ReactNode, CSSProperties } from "react";

function mergeStyles(
  existing: CSSProperties | undefined,
  overrides: CSSProperties,
): CSSProperties {
  return { ...(existing || {}), ...overrides };
}

export function renderLeftSectionItem(
  item: ReactNode,
  direction?: "row" | "column",
): ReactNode {
  if (isValidElement(item)) {
    return cloneElement(item, {
      style: mergeStyles(item.props.style, {
        ...(direction === "column"
          ? {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }
          : {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }),
      }),
    });
  }

  return item;
}

export function renderRightSectionItem(
  item: ReactNode,
  direction?: "row" | "column",
): ReactNode {
  if (isValidElement(item)) {
    return cloneElement(item, {
      style: mergeStyles(item.props.style, {
        ...(direction === "column"
          ? {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }
          : {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }),
      }),
    });
  }

  return item;
}

export function renderMiddleSectionItem(
  item: ReactNode,
  sections?: { left?: ReactNode; right?: ReactNode },
  direction?: "row" | "column",
  key?: string | number,
): ReactNode {
  if (isValidElement(item)) {
    return cloneElement(item, {
      key,
      style: mergeStyles(item.props.style, {
        ...(sections?.left &&
          (direction === "column"
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              })),
        ...(sections?.right &&
          (direction === "column"
            ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }
            : {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              })),
      }),
    });
  }

  return item;
}

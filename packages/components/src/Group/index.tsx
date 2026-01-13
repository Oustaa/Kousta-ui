import { cloneElement, FC, isValidElement, ReactNode } from "react";
import { GroupProps } from "./_props";
import {
  renderMiddleSectionItem,
  renderLeftSectionItem,
  renderRightSectionItem,
} from "../utils/renderSections";

import classes from "./Group.module.css";

const Group: FC<GroupProps> = ({ children, direction, gap, ...rest }) => {
  const items: ReactNode[] = [];

  if (Array.isArray(children)) {
    if (children.length === 1) {
      if (isValidElement(children[0])) {
        items.push(cloneElement(children[0], { key: 0 }));
      } else {
        items.push(children[0]);
      }
    } else if (children.length === 2) {
      const firstChild = renderLeftSectionItem(children[0], direction);
      if (isValidElement(firstChild)) {
        items.push(cloneElement(firstChild, { key: 0 }));
      } else {
        items.push(firstChild);
      }
      const secondChild = renderRightSectionItem(children[1], direction);
      if (isValidElement(secondChild)) {
        items.push(cloneElement(secondChild, { key: 1 }));
      } else {
        items.push(secondChild);
      }
    } else {
      const firstChild = renderLeftSectionItem(children[0], direction);
      if (isValidElement(firstChild)) {
        items.push(cloneElement(firstChild, { key: 0 }));
      } else {
        items.push(firstChild);
      }

      for (let i = 1; i < children.length - 1; i++) {
        const middleChild = renderMiddleSectionItem(
          children[i],
          {
            left: children[0],
            right: children[children.length - 1],
          },
          direction,
          i,
        );
        if (isValidElement(middleChild)) {
          items.push(cloneElement(middleChild, { key: i }));
        } else {
          items.push(middleChild);
        }
      }
      const lastIndex = children.length - 1;
      const lastChild = renderRightSectionItem(children[lastIndex], direction);
      if (isValidElement(lastChild)) {
        items.push(cloneElement(lastChild, { key: lastIndex }));
      } else {
        items.push(lastChild);
      }
    }
  } else {
    items.push(children);
  }

  return (
    <div
      style={{ ...{ gap, flexDirection: direction }, ...rest.style }}
      {...rest}
      className={`${classes["group"]} kui-group`}
      role="group"
    >
      {items}
    </div>
  );
};

export default Group;

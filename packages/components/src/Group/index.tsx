import { FC, ReactNode } from "react";
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
      items.push(children);
    } else if (children.length === 2) {
      items.push(renderLeftSectionItem(children[0], direction));
      items.push(renderRightSectionItem(children[1], direction));
    } else {
      items.push(renderLeftSectionItem(children[0], direction));
      for (let i = 1; i < children.length - 1; i++) {
        items.push(
          renderMiddleSectionItem(
            children[i],
            {
              left: children[0],
              right: children[children.length - 1],
            },
            direction,
          ),
        );
      }
      items.push(
        renderRightSectionItem(children[children.length - 1], direction),
      );
    }
  } else {
    items.push(children);
  }

  return (
    <div
      style={{ ...{ gap, flexDirection: direction }, ...rest.style }}
      {...rest}
      className={classes["group"]}
      role="group"
    >
      {items}
    </div>
  );
};

export default Group;

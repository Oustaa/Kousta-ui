import React, { ComponentPropsWithRef, FC, PropsWithChildren } from "react";

import classes from "./Table.module.css";

const Table: FC<PropsWithChildren<ComponentPropsWithRef<"table">>> = ({
  children,
  className,
  ...rest
}) => {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    throw new Error("Table must have at least one child");
  }

  if (
    !React.isValidElement(children) &&
    !(Array.isArray(children) && children.every(React.isValidElement))
  ) {
    throw new Error("Invalid child component provided to Table");
  }
  return (
    <table
      role="table"
      {...rest}
      className={`${classes["kui-table"]} ${className || ""} kui-table`}
    >
      {children}
    </table>
  );
};

const Thead: FC<PropsWithChildren<ComponentPropsWithRef<"thead">>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <thead
      {...rest}
      className={`${classes["kui-thead"]} ${className || ""} kui-table-thead`}
    >
      {children}
    </thead>
  );
};

const Tbody: FC<PropsWithChildren<ComponentPropsWithRef<"tbody">>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tbody
      {...rest}
      className={`${classes["kui-tbody"]} ${className || ""} kui-table-tbody`}
    >
      {children}
    </tbody>
  );
};

const Tr: FC<PropsWithChildren<ComponentPropsWithRef<"tr">>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tr
      {...rest}
      role="tr"
      className={`${classes["kui-tr"]} ${className || ""} kui-table-tr`}
    >
      {children}
    </tr>
  );
};

const Th: FC<PropsWithChildren<ComponentPropsWithRef<"th">>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <th
      {...rest}
      className={`${classes["kui-th"]} ${className || ""} kui-table-th`}
    >
      {children}
    </th>
  );
};

const Td: FC<PropsWithChildren<ComponentPropsWithRef<"td">>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <td
      {...rest}
      className={`${classes["kui-td"]} ${className || ""} kui-table-td`}
    >
      {children}
    </td>
  );
};

export default {
  Root: Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
};

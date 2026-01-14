import { useTableContext } from "../tableContext";
import TableRowCol from "./TableRowCol";
import {
  Button,
  ContextMenu,
  ContextMenuTypeOption,
  Modal,
} from "@kousta-ui/components";
import {
  canPerformActionResolver,
  hasActions,
  hasBulkActions,
  hasDeleteAction,
  hasEditAction,
} from "../utils/tableAction";
import Table from "../../Table";
import { ReactNode, useState } from "react";
import { useDisclosure } from "@kousta-ui/hooks";
import { getShownHeders } from "../utils/getShownHeaders";
import TableRowCheckbox from "./TableRowSelect";

import classes from "../DataTable.module.css";

const TableRow = <T extends Record<string, unknown>>({
  row,
  index,
}: {
  row: T;
  index: number;
}) => {
  const [highlighted, setHighlighted] = useState(false);
  const { open, opened: rowExtended, close, toggle } = useDisclosure(false);
  const { keyExtractor, headers, options, config } = useTableContext();
  const key = keyExtractor?.(row);

  const contextMenuOptions: ContextMenuTypeOption[] = [];
  const tableActions: ReactNode[] = [];

  if (options && options.actions) {
    if (hasDeleteAction(options, row)) {
      const action = options!.actions!.delete;
      contextMenuOptions.push({
        title: "Delete",
        onClick: () => action?.onDelete!(row),
      });

      tableActions.push(
        <Button
          key="delete-action"
          size="sm"
          variant="neutral-light"
          onClick={() => action?.onDelete!(row)}
          {...action?.buttonProps}
        >
          {action?.title ? action.title : "Delete"}
        </Button>,
      );
    }
    if (hasEditAction(options, row)) {
      const action = options!.actions!.edit;
      contextMenuOptions.push({
        title: "Edit",
        onClick: () => action?.onEdit!(row),
      });
      tableActions.push(
        <Button
          key="edit-action"
          size="sm"
          variant="neutral-light"
          onClick={() => action?.onEdit!(row)}
          {...action?.buttonProps}
        >
          {action?.title ? action.title : "Edit"}
        </Button>,
      );
    }
    if (options?.viewComp) {
      if (options.viewComp.type === "modal") {
        contextMenuOptions.push({
          title: "Open Modal",
          icon: options.viewComp.openModalIcon,
          onClick: open,
        });
      } else {
        contextMenuOptions.push({
          title: rowExtended ? "Minimize" : "Extend",
          icon: rowExtended
            ? options.viewComp.minimizeRowIcon
            : options.viewComp.extendRowIcon,
          onClick: toggle,
        });
      }
    }

    if (options.extraActions && options.extraActions.length > 0) {
      options.extraActions.forEach((action) => {
        if (canPerformActionResolver(row, action.allowed)) {
          contextMenuOptions.push({
            title: action.title,
            icon: action.Icon,
            active: canPerformActionResolver(row, action.allowed),
            onClick: action.onClick.bind(null, row),
          });
          tableActions.push(
            canPerformActionResolver(row, action.allowed) && (
              <Button
                key={action.title as string}
                variant="neutral-light"
                size="sm"
                onClick={() => options!.actions!.edit?.onEdit!(row)}
              >
                {action.Icon} {action.title}
              </Button>
            ),
          );
        }
      });
    }
  }

  if (
    options?.viewComp &&
    ((typeof options.viewComp.canView === "function" &&
      options.viewComp.canView(row)) ||
      (typeof options.viewComp.canView === "boolean" &&
        options.viewComp.canView) ||
      options?.viewComp?.canView === undefined)
  ) {
    if (options.viewComp.type === "modal") {
      tableActions.push(
        <Button
          key="view-comp-action"
          variant="neutral-light"
          size="sm"
          {...options.viewComp.openButtonProps}
          onClick={open}
        >
          {options.viewComp.openModalIcon || "Open Modal"}
        </Button>,
      );
    } else {
      tableActions.push(
        <Button
          key="view-comp-toggle-action"
          variant="neutral-light"
          size="sm"
          {...options.viewComp.openButtonProps}
          onClick={toggle}
        >
          {rowExtended
            ? options.viewComp.minimizeRowIcon || "Minimize"
            : options.viewComp.extendRowIcon || "Extends"}
        </Button>,
      );
    }
  }

  return (
    <>
      {options?.viewComp?.type === "modal" && (
        // @ts-expect-error this is not an error
        <Modal
          withCloseBtn={false}
          opened={rowExtended}
          onClose={close}
          {...options.viewComp.modalOptions}
        >
          {options?.viewComp?.Component(row)}
        </Modal>
      )}

      <ContextMenu
        onOpen={() => setHighlighted(true)}
        onClose={() => setHighlighted(false)}
        disabled={config?.disableContextMenu === true}
        itemCloseOnClick={true}
        options={contextMenuOptions}
        As="tr"
        {...config?.props?.tr}
      >
        {hasBulkActions(options) && (
          <TableRowCheckbox index={index} row={row} highlighted={highlighted} />
        )}
        {Object.keys(headers.data).map((headerName) => {
          const headerValue = headers.data[headerName];

          return (
            <TableRowCol<T>
              key={`${key} ${headerName}`.replaceAll(" ", "_")}
              headerValue={headerValue}
              row={row}
              highlighted={highlighted}
            />
          );
        })}
        {hasActions(options) && (
          <Table.Td
            {...config?.props?.td}
            style={{
              backgroundColor: highlighted
                ? "light-dark(var(--Oui-neutral-100), var(--Oui-neutral-800))"
                : "unset",
              ...config?.props?.td?.style,
            }}
          >
            <div
              className={[
                classes["table-row-actions-container"],
                "kui-table-row-actions-container",
              ].join(" ")}
            >
              {tableActions.length > 0 ? tableActions : config?.emptyRowIcon}
            </div>
          </Table.Td>
        )}
      </ContextMenu>

      {options?.viewComp?.type !== "modal" && rowExtended && (
        <Table.Tr {...config?.props?.tr}>
          <Table.Td
            {...config?.props?.td}
            colSpan={
              getShownHeders(headers.data)?.length +
              (hasActions(options) ? 1 : 0) +
              (hasBulkActions(options) ? 1 : 0)
            }
          >
            {options?.viewComp?.Component(row)}
          </Table.Td>
        </Table.Tr>
      )}
    </>
  );
};

export default TableRow;

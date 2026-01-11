import Table from "../Table";

import TableHead from "./components/TableHead";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { isValidElement, useCallback, useState } from "react";
import { TableProps } from "./_props";
import { TableContextProvider } from "./tableContext";
import { useComponentContext } from "./PropsContext";
import TableCardContainer from "./components/TableCardContainer";
import DisplayExtraView from "./components/DisplayExtraView";
import TableFooter from "./components/TableFooter";
import { usePagination } from "@kousta-ui/hooks";
import TableLoading from "./components/TableLoading";
import EmptyTable from "./components/EmptyTable";

function DataTable<T>(props: TableProps<T>) {
  const providedProps = useComponentContext();
  const [headers, setHeaders] = useState(props.headers);
  const [selectedRows, setSelectedRows] = useState<Record<number, unknown>>({});
  const [query, setQuery] = useState<string>("");

  const [displayAs, setDisplayAs] = useState<string>("table");

  const { limit, setPage, setLimit, page, total } = usePagination({
    total: props.pagination?.total || 0,
    page: props.pagination?.page || 0,
    limit: props.pagination?.limit || 0,
  });

  const setSelectedRowsFunc = useCallback(
    (index: number, row: unknown, all: boolean = false) => {
      if (all && Object.keys(selectedRows).length > 0) {
        setSelectedRows({});
        return;
      }
      setSelectedRows((prev) => {
        if (index in selectedRows) {
          if (!all) {
            // eslint-disable-next-line
            const { [index]: _deleted, ...rest } = prev;
            return rest;
          }
          return prev;
        } else {
          return { ...prev, [index]: row };
        }
      });
    },
    [selectedRows],
  );

  const config = props.config || {};

  if (providedProps) {
    // overwrite table actions
    if (providedProps.actions) {
      const actionsProps = providedProps.actions;

      // overwrite the table delete button
      if (actionsProps.delete) {
        if (actionsProps.delete.title && props.options?.actions?.delete) {
          if (props.options.actions.delete.title === undefined) {
            props.options.actions.delete.title = actionsProps.delete.title;
          }
          if (props.options.actions.delete.buttonProps === undefined) {
            // combine the provided props with the props buttonProps, props should overwrite the provided one
            props.options.actions.delete.buttonProps =
              actionsProps.delete.buttonProps;
          }
        }
      }

      // overwrite the table edit button
      if (actionsProps.edit) {
        if (actionsProps.edit.title && props.options?.actions?.edit) {
          if (props.options.actions.edit.title === undefined) {
            props.options.actions.edit.title = actionsProps.edit.title;
          }
          if (props.options.actions.edit.buttonProps === undefined) {
            // combine the provided props with the props buttonProps, props should overwrite the provided one
            props.options.actions.edit.buttonProps =
              actionsProps.edit.buttonProps;
          }
        }
      }
    }

    if (
      providedProps.disableContextMenu !== undefined &&
      props.config?.disableContextMenu === undefined
    ) {
      config.disableContextMenu = providedProps.disableContextMenu;
    }

    if (
      providedProps.toggleRows !== undefined &&
      props.config?.toggleRows === undefined
    ) {
      config.toggleRows = providedProps.toggleRows;
    }

    if (
      providedProps.noHead !== undefined &&
      props.config?.noHead === undefined
    ) {
      config.noHead = providedProps.noHead;
    }

    if (
      providedProps.emptyTable &&
      isValidElement(providedProps.emptyTable) &&
      props.options &&
      props.options?.emptyTable === undefined
    ) {
      props.options.emptyTable = providedProps.emptyTable;
    }

    if (providedProps.viewComp && props.options?.viewComp) {
      // @ts-expect-error this is not an error, Component prop should be passed to the props
      props.options.viewComp = {
        ...providedProps.viewComp,
        ...props.options.viewComp,
      };
    }

    if (providedProps.selectFilter && props.config) {
      if (props.config.selectFilter !== undefined)
        props.config.selectFilter = {
          ...providedProps.selectFilter,
          ...props.config.selectFilter,
        };
      else props.config.selectFilter = providedProps.selectFilter;
    }

    if (providedProps.props) {
      if (!props.config?.props) config.props = {};

      for (const key of Object.keys(providedProps)) {
        if (
          props.config?.props?.[key as keyof typeof props.config.props] ===
          undefined
        ) {
          // @ts-expect-error this is not an error
          props.config.props[key] =
            // @ts-expect-error this is not an error
            providedProps.props[key];
        } else {
          // @ts-expect-error this is not an error
          config.props[key] = {
            ...providedProps.props[key as keyof typeof providedProps.props],
            // @ts-expect-error this is not an error
            ...props.config.props[key],
          };
        }
      }
    }

    if (providedProps.emptyRowIcon && !props.config?.emptyRowIcon) {
      config.emptyRowIcon = providedProps.emptyRowIcon;
    }

    if (providedProps.props && props.config?.props) {
      config.props = { ...props.config?.props, ...providedProps.props };
    } else if (providedProps.props && !props.config?.props)
      config.props = providedProps.props;

    if (providedProps.keyExtractor && !props.keyExtractor)
      props.keyExtractor = providedProps.keyExtractor;
  }

  // reset the emptyRowIcon to '--' in case non was provided
  if (!props.config?.emptyRowIcon) if (props.config) config.emptyRowIcon = "--";

  return (
    <TableContextProvider
      {...props}
      config={config}
      headers={{ data: headers, setHeaders }}
      search={{ query, setQuery }}
      rowSelection={{
        selectedRows,
        setSelectedRows: setSelectedRowsFunc,
        diseclectAll: () => setSelectedRows({}),
      }}
      displayAs={displayAs}
      setDisplayAs={(as: string) => setDisplayAs(as)}
      pagination={
        props.pagination
          ? {
              limit,
              page,
              total,
              setPage,
              setLimit,
            }
          : undefined
      }
    >
      <TableHead />
      {props.loading ? (
        <TableLoading />
      ) : props.data?.length === 0 ? (
        <EmptyTable />
      ) : displayAs === "table" ? (
        <Table.Root {...props.config?.props?.table}>
          <TableHeader />
          <TableBody />
        </Table.Root>
      ) : displayAs === "card" ? (
        <TableCardContainer />
      ) : (
        <DisplayExtraView />
      )}
      <TableFooter />
    </TableContextProvider>
  );
}

export default DataTable;

import Table from "../Table";

import TableHead from "./components/TableHead";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { isValidElement, useCallback, useEffect, useState } from "react";
import { TableProps } from "./_props";
import { TableContextProvider } from "./tableContext";
import { useComponentContext } from "./PropsContext";
import TableCardContainer from "./components/TableCardContainer";
import DisplayExtraView from "./components/DisplayExtraView";
import TableFooter from "./components/TableFooter";
import { usePagination } from "@kousta-ui/hooks";
import EmptyTable from "./components/EmptyTable";
import TableInformation from "./components/TableInformation";
import TableLoading from "./components/TableLoading";

function DataTable<T>(props: TableProps<T>) {
  const providedProps = useComponentContext();
  const [headers, setHeaders] = useState(props.headers);
  const [selectedRows, setSelectedRows] = useState<Record<number, unknown>>({});
  const [query, setQuery] = useState<string>("");

  const [displayAs, setDisplayAs] = useState<string>("table");

  const { setTotal, total, setLimit, limit, setPage, page } = usePagination({
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

  useEffect(() => {
    setTotal(props.pagination?.total || 0);
  }, [props.pagination?.total]);

  const config = props.config || {};

  if (providedProps) {
    // overwrite table actions
    if (providedProps.actions) {
      const actionsProps = providedProps.actions;

      // overwrite the table delete button
      if (actionsProps.delete) {
        if (actionsProps.delete.title && props.actions?.delete) {
          if (props.actions.delete.title === undefined) {
            props.actions.delete.title = actionsProps.delete.title;
          }
          if (props.actions.delete.buttonProps === undefined) {
            // combine the provided props with the props buttonProps, props should overwrite the provided one
            props.actions.delete.buttonProps = actionsProps.delete.buttonProps;
          }
        }
      }

      // overwrite the table edit button
      if (actionsProps.edit) {
        if (actionsProps.edit.title && props.actions?.edit) {
          if (props.actions.edit.title === undefined) {
            props.actions.edit.title = actionsProps.edit.title;
          }
          if (props.actions.edit.buttonProps === undefined) {
            // combine the provided props with the props buttonProps, props should overwrite the provided one
            props.actions.edit.buttonProps = actionsProps.edit.buttonProps;
          }
        }
      }

      if (actionsProps.search) {
        if (props.actions && props.actions.search) {
          if (
            actionsProps.search.searchOnType &&
            props.actions.search.searchOnType === undefined
          ) {
            props.actions.search.searchOnType =
              actionsProps.search.searchOnType;
          }

          if (
            actionsProps.search.searchTimer &&
            !props.actions.search.searchTimer
          )
            props.actions.search.searchTimer = actionsProps.search.searchTimer;
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
      providedProps.useGetAsRefresh !== undefined &&
      props.config?.useGetAsRefresh === undefined
    ) {
      config.useGetAsRefresh = providedProps.useGetAsRefresh;
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
      total={{ total, setTotal }}
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
              type: props.pagination.type,
            }
          : undefined
      }
    >
      <TableHead />
      <TableInformation />
      <TableLoading>
        {props.data?.length === 0 ? (
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
      </TableLoading>
    </TableContextProvider>
  );
}

export default DataTable;

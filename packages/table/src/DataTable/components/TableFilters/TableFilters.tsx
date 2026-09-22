import { FC } from "react";
import { useTableContext } from "../../tableContext";
import { TTableFilterHeaders } from "../../_props";
import TableFilterItem from "./TableFilterItem";
import { Button, Menu } from "@kousta-ui/components";
// import { useDisclosure } from "@kousta-ui/hooks";
import { useApplyFilters } from "../../hooks/useApplyFilters";

import classes from "../../DataTable.module.css";

const TableFilters: FC = () => {
  // const { opened, close, open } = useDisclosure(false);
  const { headers } = useTableContext();

  const { apply, clear } = useApplyFilters();

  // const filterPosition = options?.filterPosition;

  const filterKeys: string[] = [];
  const headersFilters: TTableFilterHeaders = {};

  for (const key in headers.data) {
    if (headers.data[key].filterBy) {
      filterKeys.push(key);
      headersFilters[key] = headers.data[key].filterBy;
    }
  }

  if (filterKeys.length === 0) {
    return null;
  }

  const rows = filterKeys.map((key) => (
    <TableFilterItem key={key} name={key} data={headersFilters[key]} />
  ));

  const controls = (
    <div className={classes["table-filter-apply-container"]}>
      <Button variant="neutral" onClick={() => clear()}>
        Clear
      </Button>
      <Button onClick={() => apply(headersFilters)}>Apply</Button>
    </div>
  );

  // if (filterPosition === "inline") {
  //   // no grid here on purpose: inline lays the filters out one after another,
  //   // so each row is its own inline group rather than a column in a shared grid
  //   return (
  //     <div className={classes["table-filters-inline"]}>
  //       {rows}
  //       {controls}
  //     </div>
  //   );
  // }
  //
  // if (filterPosition === "modal") {
  //   return (
  //     <>
  //       <Button onClick={open}>Filters</Button>
  //       <Modal opened={opened} onClose={close}>
  //         <div className={classes["table-filters-container"]}>{rows}</div>
  //         {controls}
  //       </Modal>
  //     </>
  //   );
  // }

  return (
    <Menu.Menu position="Bottom-End" closeOnClick={false}>
      <Menu.Target>
        <Button>Filters</Button>
      </Menu.Target>
      <Menu.DropDown>
        <div className={classes["table-filters-container"]}>{rows}</div>
        {controls}
      </Menu.DropDown>
    </Menu.Menu>
  );
};

export default TableFilters;

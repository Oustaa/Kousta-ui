import { render } from "@testing-library/react";
import DataTable from "..";
import { TableProps, THeader } from "../_props";

export type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
};

export const headers: THeader<UserType> = {
  user: {
    exec() {
      return (
        <div>
          <p>this is returned from exec</p>
        </div>
      );
    },
  },
  name: {
    value: "name",
    sortBy: {},
  },
  age: {
    value: "age",
    sortBy: {},
  },
  email: {
    value: "email",
  },
  address: {
    value: "address",
  },
};

export const data: Array<UserType> = [
  {
    name: "Oussama Tailba",
    age: 27,
    email: "otailaba98@gmail.com",
    address: "Bab ghmat syba 37",
  },
  {
    name: "kaoutar Taki",
    age: 22,
    email: "ktaki@gmail.com",
  },
];

export const TABLE_TITLE = "this is a title";

/**
 * Shared render for the suites that all want the same table. It lives here
 * rather than in basic.test.tsx on purpose: importing a *test* file also runs
 * its top-level `beforeEach` and `jest.mock`, which silently rendered a second
 * table into every suite that reached for this helper.
 */
export function renderTableWithExtraProps(
  props?: Partial<TableProps<UserType>>,
) {
  return render(
    <DataTable<UserType>
      data={data}
      headers={headers}
      loading={false}
      title={TABLE_TITLE}
      keyExtractor={(row) => row.name}
      {...props}
    />,
  );
}

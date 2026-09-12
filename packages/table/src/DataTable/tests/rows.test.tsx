import { render, screen } from "@testing-library/react";
import DataTable from "..";
import { data, headers, UserType } from "./test-setup";
import { TableProps } from "../_props";

function renderTableWithExtraProps(props?: Partial<TableProps<unknown>>) {
  render(
    // @ts-expect-error this is not an error
    <DataTable<UserType>
      {...props}
      data={data}
      headers={headers}
      loading={false}
      title="this is a title"
      keyExtractor={(row) => row.name}
    />,
  );
}

describe("Table Rows", () => {
  it("All Rows should be rendered", () => {
    renderTableWithExtraProps();
    const headersKeys = Object.keys(headers);

    for (const header of headersKeys) {
      const headerElem = screen.getByText(new RegExp(header, "i"));
      expect(headerElem).toBeInTheDocument();
    }
  });

  // test header should not be in the dom if visible is set to false
  it("Not visible rows should not be visible in the dom", () => {
    const newHeaders = {
      ...headers,
      name: {
        value: "name",
        visible: false,
      },
    };

    render(
      <DataTable
        data={data}
        headers={newHeaders}
        loading={false}
        title="this is a title"
        keyExtractor={(row) => row.name}
      />,
    );
    const visibleHeadersKeys: string[] = [];
    const hiddenHeadersKeys: string[] = [];

    Object.keys(newHeaders).forEach((key) =>
      newHeaders[key as keyof typeof newHeaders].visible !== false
        ? visibleHeadersKeys.push(key)
        : hiddenHeadersKeys.push(key),
    );

    // should be visible headers
    for (const header of visibleHeadersKeys) {
      const headerElem = screen.getByText(new RegExp(header, "i"));
      expect(headerElem).toBeInTheDocument();
    }

    // should be hidden headers
    for (const header of hiddenHeadersKeys) {
      const headerElem = screen.queryByText(new RegExp(header, "i"));
      expect(headerElem).not.toBeInTheDocument();
    }
  });

  // test header should be visible in the dom if the have been checkek
  // test header should not be visible neither in table nor in the s/h menu, if canSee is set to false
});

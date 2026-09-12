import { useState } from "react";
import DataTable from "..";
import { render, screen } from "@testing-library/react";
import { data, headers } from "./test-setup";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

beforeEach(() => {
  const setHeaders = jest.fn();
  (useState as jest.Mock).mockImplementation((init) => [init, setHeaders]);
  render(
    <DataTable
      data={data}
      headers={headers}
      loading={false}
      title="this is a title"
      keyExtractor={(row) => row.name}
    />,
  );
});
describe("DataTable basic tests", () => {
  it("should render a table", () => {
    const tableElement = screen.getByRole("table");

    expect(tableElement).toBeTruthy();
  });

  it("should render the table headers", () => {
    const headerElements = screen.getAllByRole("th");

    expect(headerElements.length).toBe(5);
  });

  it("should render correct values by value", () => {
    const nameElement = screen.getByText(/Oussama Tailba/i);
    expect(nameElement).toBeTruthy();

    const email = screen.getByText(/otailaba98@gmail.com/i);
    expect(email).toBeTruthy();
  });

  it("should render correct values by exec function", () => {
    const nameElement = screen.getAllByText(/this is returned from exec/i);
    expect(nameElement.length).toBe(2);
  });
});

import { fireEvent, render, screen, within } from "@testing-library/react";
import DataTable from "..";
import { THeader } from "../_props";

const data = [
  {
    id: 1,
    name: "Product one",
    category: "cat 1",
    u_price: 27.88,
    qte: 12,
    total_price: 334.56,
  },
  {
    id: 2,
    name: "Product two",
    category: "cat 3",
    u_price: 5,
    qte: 20,
    total_price: 100,
  },
  {
    id: 3,
    name: "Product three",
    category: "cat 1",
    u_price: 9.99,
    qte: 34,
    total_price: 339.66,
  },
];

const headers: THeader<any> = {
  id: { value: "id", sortBy: {} },
  name: { value: "name", sortBy: {} },
  category: { value: "category", sortBy: {} },
  "Unit Price": { value: "u_price", sortBy: {}, total: {} },
  tva: { value: "tva" },
  units: { value: "qte", sortBy: {}, total: {} },
  "total Price": { value: "total_price", sortBy: {}, total: {} },
};

describe("Table Sorting", () => {
  describe("Basic", () => {
    beforeEach(() => {
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

    it("should display correct totals", () => {
      const upTotalEl = screen.getByText("42.87");
      expect(upTotalEl).toBeInTheDocument();

      const unitsTotalEl = screen.getByText("66");
      expect(unitsTotalEl).toBeInTheDocument();

      const totaplPriceTotalEl = screen.getByText("774.22");
      expect(totaplPriceTotalEl).toBeInTheDocument();
    });

    it("should display totals in correct positions", () => {
      const rows = screen.getAllByRole("row").slice(1);
      const totalRowCells = within(rows[3]).getAllByRole("cell");

      expect(totalRowCells[0]).toHaveProperty("colSpan", 3);
      expect(totalRowCells[2]).toHaveProperty("colSpan", 1);
    });
  });

  describe("With total Props", () => {
    it("should calculate by the total.name if passed", () => {
      render(
        <DataTable
          data={data}
          headers={{
            ...headers,
            name: { value: "name", total: { name: "qte" } },
          }}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );

      const unitsTotalEl = screen.getAllByText("66");
      expect(unitsTotalEl).toHaveLength(2);
    });

    it("should call total.func when passed", () => {
      const totalFunc = jest.fn();
      render(
        <DataTable
          data={data}
          headers={{
            ...headers,
            name: { value: "name", total: { name: "qte", func: totalFunc } },
          }}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );

      expect(totalFunc).toHaveBeenCalled();
      expect(totalFunc).toHaveBeenCalledTimes(3);

      expect(totalFunc).toHaveBeenCalledWith(0, 12);
      expect(totalFunc).toHaveBeenCalledWith(0, 20);
      expect(totalFunc).toHaveBeenCalledWith(0, 34);
    });
  });

  describe("With Show/Hide row", () => {
    beforeEach(() => {
      headers.id = {
        value: "id",
        visible: false,
      };
      render(
        <DataTable
          data={data}
          headers={{ ...headers }}
          loading={false}
          title="this is a title"
          keyExtractor={(row) => row.name}
        />,
      );
    });

    it("should display totals in correct positions when some rows are hidden", () => {
      const rows = screen.getAllByRole("row").slice(1);
      const totalRowCells = within(rows[3]).getAllByRole("cell");

      expect(totalRowCells[0]).toHaveProperty("colSpan", 2);
    });

    it("should change position when an col is hidden", () => {
      const rows = screen.getAllByRole("row").slice(1);
      let totalRowCells = within(rows[3]).getAllByRole("cell");

      expect(totalRowCells[0]).toHaveProperty("colSpan", 2);

      const toggleRows = screen.getByText(/s\/h/i);
      expect(toggleRows).toBeInTheDocument();
      fireEvent.click(toggleRows);

      const nameCheckbox = screen.getByRole("checkbox", {
        name: /name/i,
      });

      expect(nameCheckbox).toBeInTheDocument();
      fireEvent.click(nameCheckbox);

      totalRowCells = within(rows[3]).getAllByRole("cell");
      expect(totalRowCells[0]).toHaveProperty("colSpan", 1);
    });
  });
});

import { fireEvent, render, screen, within } from "@testing-library/react";
import DataTable from "..";
import { TableProps, THeader } from "../_props";

type Row = { id: number; name: string };

const rows: Row[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Row ${index + 1}`,
}));

const headers: THeader<Row> = {
  id: { value: "id" },
  name: { value: "name" },
};

function renderTable(props?: Partial<TableProps<Row>>) {
  return render(
    <DataTable<Row>
      data={rows}
      headers={headers}
      loading={false}
      title="paginated table"
      keyExtractor={(row) => row.id}
      {...props}
    />,
  );
}

/** body rows only — the header row is excluded */
const bodyRows = () => screen.getAllByRole("row").slice(1);

const goToPage = (page: string) =>
  fireEvent.click(screen.getByRole("button", { name: page }));

/** opens the rows-per-page select and picks an option */
const chooseRowsPerPage = (value: string) => {
  fireEvent.click(document.querySelector("[class*=select-toggle]")!);
  // by role, so the option can't be confused with a cell holding the same number
  fireEvent.click(screen.getByRole("option", { name: value }));
};

describe("DataTable pagination", () => {
  describe("static", () => {
    const staticPagination = {
      total: rows.length,
      page: 1,
      limit: 10,
      type: "static" as const,
    };

    it("slices the data down to the first page", () => {
      renderTable({ pagination: staticPagination });

      const displayed = bodyRows();
      expect(displayed).toHaveLength(10);
      expect(displayed[0]).toHaveTextContent("Row 1");
      expect(displayed[9]).toHaveTextContent("Row 10");
      expect(screen.queryByText("Row 11")).not.toBeInTheDocument();
    });

    it("renders the next slice when the page changes", () => {
      renderTable({ pagination: staticPagination });

      goToPage("2");

      const displayed = bodyRows();
      expect(displayed).toHaveLength(10);
      expect(displayed[0]).toHaveTextContent("Row 11");
      expect(displayed[9]).toHaveTextContent("Row 20");
      expect(screen.queryByText("Row 10")).not.toBeInTheDocument();
    });

    it("renders only the remainder on the last page", () => {
      renderTable({ pagination: staticPagination });

      goToPage("3");

      const displayed = bodyRows();
      expect(displayed).toHaveLength(5);
      expect(displayed[0]).toHaveTextContent("Row 21");
      expect(displayed[4]).toHaveTextContent("Row 25");
    });

    it("re-slices when the rows-per-page changes", () => {
      renderTable({ pagination: staticPagination });

      chooseRowsPerPage("20");

      const displayed = bodyRows();
      expect(displayed).toHaveLength(20);
      expect(displayed[19]).toHaveTextContent("Row 20");
    });

    it("still calls actions.get on a page change, even though it slices locally", () => {
      const get = jest.fn();
      renderTable({ actions: { get }, pagination: staticPagination });
      get.mockClear();

      goToPage("2");

      // the rows on screen came from the local slice...
      expect(bodyRows()[0]).toHaveTextContent("Row 11");
      // ...but the fetch fired anyway: `type: "static"` controls slicing, it does
      // not stop the footer from calling actions.get. Pass one or the other.
      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2, limit: 10 }),
      );
    });
  });

  describe("dynamic", () => {
    const dynamicPagination = {
      total: 25,
      page: 1,
      limit: 10,
      type: "dynamic" as const,
    };

    it("renders every row it is handed, without slicing", () => {
      renderTable({
        actions: { get: jest.fn() },
        pagination: dynamicPagination,
      });

      // 25 rows passed in with a limit of 10 — the table does not cut them down,
      // because feeding it one page at a time is the caller's job
      expect(bodyRows()).toHaveLength(25);
      expect(screen.getByText("Row 25")).toBeInTheDocument();
    });

    it("treats an unspecified type the same as dynamic", () => {
      renderTable({
        actions: { get: jest.fn() },
        pagination: { total: 25, page: 1, limit: 10 },
      });

      expect(bodyRows()).toHaveLength(25);
    });

    it("asks actions.get for the new page", () => {
      const get = jest.fn();
      renderTable({ actions: { get }, pagination: dynamicPagination });
      get.mockClear();

      goToPage("3");

      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(
        expect.objectContaining({ page: 3, limit: 10 }),
      );
    });

    it("asks actions.get for the new rows-per-page", () => {
      const get = jest.fn();
      renderTable({ actions: { get }, pagination: dynamicPagination });
      get.mockClear();

      chooseRowsPerPage("20");

      expect(get).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 20, page: 1 }),
      );
    });

    it("fetches once on mount with the starting page and limit", () => {
      const get = jest.fn();
      renderTable({ actions: { get }, pagination: dynamicPagination });

      expect(get).toHaveBeenCalledTimes(1);
      expect(get).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, limit: 10 }),
      );
    });
  });

  describe("the footer", () => {
    it("is not rendered at all when pagination is not configured", () => {
      renderTable();

      expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /next/i }),
      ).not.toBeInTheDocument();
      // and every row renders, since nothing is paginating them
      expect(bodyRows()).toHaveLength(25);
    });

    it("reports the visible range and the total", () => {
      renderTable({
        pagination: { total: 25, page: 1, limit: 10, type: "static" },
      });

      const message = screen.getByText(/showing/i);
      expect(message).toHaveTextContent("Showing 1 to 10, of 25");
    });

    it("updates the range as the page changes, clamping the last page", () => {
      renderTable({
        pagination: { total: 25, page: 1, limit: 10, type: "static" },
      });

      goToPage("2");
      expect(screen.getByText(/showing/i)).toHaveTextContent(
        "Showing 11 to 20, of 25",
      );

      // the last page holds 5 rows, so the range stops at the total
      goToPage("3");
      expect(screen.getByText(/showing/i)).toHaveTextContent(
        "Showing 21 to 25, of 25",
      );
    });

    it("renders one button per page", () => {
      renderTable({
        pagination: { total: 25, page: 1, limit: 10, type: "static" },
      });

      // 25 rows at 10 a page => 3 pages
      expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "4" }),
      ).not.toBeInTheDocument();
    });

    it("recomputes the page count when the rows-per-page changes", () => {
      renderTable({
        pagination: { total: 25, page: 1, limit: 10, type: "static" },
      });

      chooseRowsPerPage("20");

      // 25 rows at 20 a page => 2 pages
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "3" }),
      ).not.toBeInTheDocument();
    });

    it("clears the row selection when the page changes", () => {
      renderTable({
        pagination: { total: 25, page: 1, limit: 10, type: "static" },
        options: {
          bulkActions: [{ title: "Delete", onClick: jest.fn() }],
        },
      });

      const firstRow = bodyRows()[0];
      fireEvent.click(within(firstRow).getByRole("checkbox"));
      expect(screen.getByText(/1 Selected/i)).toBeInTheDocument();

      goToPage("2");

      expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
    });
  });
});

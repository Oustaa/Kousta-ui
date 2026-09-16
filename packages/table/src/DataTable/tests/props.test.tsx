import { fireEvent, screen } from "@testing-library/react";
import { UserType, renderTableWithExtraProps, TABLE_TITLE } from "./test-setup";

const cardsOption = {
  card: ({ row }: { row: UserType }) => <div>card: {row.name}</div>,
};

describe("Table props preserving", () => {
  describe("options.props.get", () => {
    it("restores the search query", () => {
      renderTableWithExtraProps({
        actions: { get: jest.fn() },
        options: {
          props: { set: jest.fn(), get: () => ({ query: "kaoutar" }) },
        },
      });

      expect(screen.getByLabelText("search-input")).toHaveValue("kaoutar");
    });

    it("restores sortBy and an ascending direction", () => {
      renderTableWithExtraProps({
        options: {
          props: {
            set: jest.fn(),
            get: () => ({ sortBy: "age", direction: 1 }),
          },
        },
      });

      expect(screen.getByText(/age/i).closest("th")).toHaveAttribute(
        "aria-sort",
        "ascending",
      );
    });

    it("restores a descending direction", () => {
      renderTableWithExtraProps({
        options: {
          props: {
            set: jest.fn(),
            get: () => ({ sortBy: "age", direction: -1 }),
          },
        },
      });

      expect(screen.getByText(/age/i).closest("th")).toHaveAttribute(
        "aria-sort",
        "descending",
      );
    });

    it("restores displayAs", () => {
      renderTableWithExtraProps({
        options: {
          cards: cardsOption,
          props: { set: jest.fn(), get: () => ({ displayAs: "card" }) },
        },
      });

      expect(screen.queryByRole("table")).not.toBeInTheDocument();
      expect(screen.getByText(/card: Oussama Tailba/)).toBeInTheDocument();
    });

    it("falls back to the defaults when get is not passed", () => {
      renderTableWithExtraProps({
        actions: { get: jest.fn() },
        options: { props: { set: jest.fn() } },
      });

      expect(screen.getByLabelText("search-input")).toHaveValue("");
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText(/age/i).closest("th")).toHaveAttribute(
        "aria-sort",
        "none",
      );
    });

    it("falls back to the defaults for the keys a partial get leaves out", () => {
      renderTableWithExtraProps({
        actions: { get: jest.fn() },
        options: {
          props: { set: jest.fn(), get: () => ({ sortBy: "age" }) },
        },
      });

      // sortBy was restored, everything else fell back
      expect(screen.getByText(/age/i).closest("th")).toHaveAttribute(
        "aria-sort",
        "ascending",
      );
      expect(screen.getByLabelText("search-input")).toHaveValue("");
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("restores the sort indicator but does not re-sort a static table's rows", () => {
      renderTableWithExtraProps({
        options: {
          props: {
            set: jest.fn(),
            get: () => ({ sortBy: "age", direction: -1 }),
          },
        },
      });

      // the header reflects the restored sort...
      expect(screen.getByText(/age/i).closest("th")).toHaveAttribute(
        "aria-sort",
        "descending",
      );

      // ...but the rows are still in their original order
      const rows = screen.getAllByRole("row").slice(1);
      expect(rows[0]).toHaveTextContent("Oussama Tailba");
      expect(rows[1]).toHaveTextContent("kaoutar Taki");
    });

    it("does not send the restored sort on the mount fetch", () => {
      const get = jest.fn();
      renderTableWithExtraProps({
        actions: { get },
        pagination: { total: 30, page: 1, limit: 10 },
        options: {
          props: {
            set: jest.fn(),
            get: () => ({ sortBy: "age", direction: -1, query: "kaoutar" }),
          },
        },
      });

      // the restored query rides along as `search`, the sort does not
      expect(get).toHaveBeenCalledWith({
        limit: 10,
        page: 1,
        search: "kaoutar",
      });
      expect(get.mock.calls[0][0]).not.toHaveProperty("sortBy");
      expect(get.mock.calls[0][0]).not.toHaveProperty("direction");
    });

    it("is called without the table title (unlike set)", () => {
      const get = jest.fn(() => ({}));
      renderTableWithExtraProps({
        options: { props: { set: jest.fn(), get } },
      });

      expect(get).toHaveBeenCalled();
      get.mock.calls.forEach((args) => expect(args).toHaveLength(0));
    });

    it("only seeds the initial state, it does not fight later interaction", () => {
      renderTableWithExtraProps({
        options: {
          props: {
            set: jest.fn(),
            get: () => ({ sortBy: "age", direction: 1 }),
          },
        },
      });

      fireEvent.click(screen.getByText(/age/i));

      expect(screen.getByText(/age/i).closest("th")).toHaveAttribute(
        "aria-sort",
        "descending",
      );
    });
  });

  describe("options.props.set", () => {
    it("is not called on mount", () => {
      const set = jest.fn();
      renderTableWithExtraProps({ options: { props: { set } } });

      expect(set).not.toHaveBeenCalled();
    });

    it("is called with the new sort when a column is sorted", () => {
      const set = jest.fn();
      renderTableWithExtraProps({ options: { props: { set } } });

      fireEvent.click(screen.getByText(/age/i));

      screen.logTestingPlaygroundURL();

      expect(set).toHaveBeenCalledTimes(1);
      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({ sortBy: "age", direction: 1 }),
        TABLE_TITLE,
      );
    });

    it("is called with the query and resets the page when searching", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        actions: { get: jest.fn() },
        options: { props: { set } },
        pagination: { total: 2, page: 1, limit: 10 },
      });

      fireEvent.change(screen.getByLabelText("search-input"), {
        target: { value: "kaoutar" },
      });
      fireEvent.click(screen.getByRole("button", { name: /search/i }));

      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({ query: "kaoutar", page: 1 }),
        TABLE_TITLE,
      );
    });

    it("is called with the new view when the view is switched", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        options: { cards: cardsOption, props: { set } },
      });

      fireEvent.click(screen.getByRole("button", { name: /change view/i }));
      fireEvent.click(screen.getByText("Card"));

      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({ displayAs: "card" }),
        TABLE_TITLE,
      );
    });

    it("is called with the new page when the page changes", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        options: { props: { set } },
        pagination: { total: 30, page: 1, limit: 10 },
      });

      fireEvent.click(screen.getByRole("button", { name: "2" }));

      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 }),
        TABLE_TITLE,
      );
    });

    it("always sends the whole state, not only what changed", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        options: {
          props: {
            set,
            get: () => ({ query: "kaoutar", displayAs: "table" }),
          },
        },
        actions: { get: jest.fn() },
      });

      fireEvent.click(screen.getByText(/age/i));

      // the sort is what changed, but the untouched query/displayAs ride along
      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: "age",
          direction: 1,
          query: "kaoutar",
          displayAs: "table",
        }),
        TABLE_TITLE,
      );
    });

    it("passes the table title as the second argument", () => {
      const set = jest.fn();
      renderTableWithExtraProps({ options: { props: { set } } });

      fireEvent.click(screen.getByText(/age/i));

      expect(set.mock.calls[0][1]).toBe(TABLE_TITLE);
    });

    it("passes whatever title the table was given", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        title: "orders-table",
        options: { props: { set } },
      });

      fireEvent.click(screen.getByText(/age/i));

      expect(set).toHaveBeenCalledWith(expect.any(Object), "orders-table");
    });

    it("sends the same title on every kind of change", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        title: "orders-table",
        actions: { get: jest.fn() },
        pagination: { total: 30, page: 1, limit: 10 },
        options: { cards: cardsOption, props: { set } },
      });

      fireEvent.click(screen.getByText(/age/i));
      fireEvent.click(screen.getByRole("button", { name: "2" }));
      fireEvent.click(screen.getByRole("button", { name: /change view/i }));
      fireEvent.click(screen.getByText("Card"));

      expect(set.mock.calls.length).toBeGreaterThanOrEqual(3);
      set.mock.calls.forEach(([, title]) => expect(title).toBe("orders-table"));
    });

    it("only sends page/limit on the call that changed them", () => {
      const set = jest.fn();
      renderTableWithExtraProps({
        options: { props: { set } },
        pagination: { total: 30, page: 1, limit: 10 },
      });

      fireEvent.click(screen.getByText(/age/i));
      expect(set.mock.calls[0][0]).not.toHaveProperty("page");
      expect(set.mock.calls[0][0]).not.toHaveProperty("limit");

      fireEvent.click(screen.getByRole("button", { name: "2" }));
      expect(set.mock.calls[1][0]).toHaveProperty("page", 2);
      expect(set.mock.calls[1][0]).not.toHaveProperty("limit");
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import DataTable from "..";
import { TableFilter, TableProps, THeader } from "../_props";
import {
  applyFilters,
  DEFAULT_OPERATOR_BY_TYPE,
  isFilterComplete,
  NUMBER_FILTERS,
  operatorNeedsValue,
  resolveOperator,
  SELECT_FILTERS,
  STRING_FILTERS,
} from "../utils/tableFilters";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  note?: string;
};

const products: Product[] = [
  { id: 1, name: "Keyboard", category: "input", price: 30, note: "wired" },
  { id: 2, name: "Monitor", category: "display", price: 200, note: "" },
  { id: 3, name: "Mouse", category: "input", price: 20 },
  { id: 4, name: "Webcam", category: "video", price: 60, note: "hd" },
];

const headers: THeader<Product> = {
  Name: { value: "name", filterBy: { type: "string" } },
  Category: {
    value: "category",
    filterBy: {
      type: "select",
      options: [
        { value: "input", label: "Input" },
        { value: "display", label: "Display" },
        { value: "video", label: "Video" },
      ],
    },
  },
  Price: { value: "price", filterBy: { type: "number" } },
};

function renderTable(props?: Partial<TableProps<Product>>) {
  return render(
    <DataTable<Product>
      data={products}
      headers={headers}
      loading={false}
      title="products"
      keyExtractor={(row) => row.id}
      {...props}
    />,
  );
}

const openFilters = () =>
  fireEvent.click(screen.getByRole("button", { name: "Filters" }));

/**
 * The panel lives in a menu dropdown that renders nothing until it is opened,
 * so anything that touches a filter row has to open it first.
 */
function renderWithFiltersOpen(props?: Partial<TableProps<Product>>) {
  const result = renderTable(props);
  openFilters();
  return result;
}

const bodyRows = () => screen.getAllByRole("row").slice(1);
const rowNames = () =>
  bodyRows().map(
    (row) => row.textContent?.match(/Keyboard|Monitor|Mouse|Webcam/)?.[0],
  );

/** the filter row for a header, found through its label */
const filterRow = (header: string) =>
  screen
    .getByText(header, { selector: "[class*=table-filter-label]" })
    .closest("[class*=table-filter-item-container]") as HTMLElement;

const operatorSelect = (header: string) =>
  filterRow(header).querySelector("[class*=select-inner]") as HTMLElement;

const chooseOperator = (header: string, option: string) => {
  fireEvent.click(operatorSelect(header));
  fireEvent.click(screen.getByRole("option", { name: option }));
};

const chooseSelectValue = (header: string, option: string) => {
  const selects = filterRow(header).querySelectorAll("[class*=select-inner]");
  fireEvent.click(selects[1]);
  fireEvent.click(screen.getByRole("option", { name: option }));
};

/** the label the operator select is currently showing */
const operatorLabel = (header: string) =>
  filterRow(header).querySelector("[class*=select-value]")?.textContent?.trim();

const typeValue = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

const apply = () =>
  fireEvent.click(screen.getByRole("button", { name: "Apply" }));
const clear = () =>
  fireEvent.click(screen.getByRole("button", { name: "Clear" }));

describe("DataTable filters", () => {
  describe("the predicate tables", () => {
    it("filters strings by every operator", () => {
      expect(STRING_FILTERS.contains("Keyboard", "key")).toBe(true);
      expect(STRING_FILTERS["not-contains"]("Keyboard", "key")).toBe(false);
      expect(STRING_FILTERS.is("Keyboard", "keyboard")).toBe(true);
      expect(STRING_FILTERS["is-not"]("Keyboard", "Mouse")).toBe(true);
      expect(STRING_FILTERS["starts-with"]("Keyboard", "Key")).toBe(true);
      expect(STRING_FILTERS["ends-with"]("Keyboard", "board")).toBe(true);
      expect(STRING_FILTERS["is-empty"]("")).toBe(true);
      expect(STRING_FILTERS["is-empty"](undefined)).toBe(true);
      expect(STRING_FILTERS["is-not-empty"]("x")).toBe(true);
    });

    it("compares strings case-insensitively", () => {
      expect(STRING_FILTERS.contains("KEYBOARD", "key")).toBe(true);
      expect(STRING_FILTERS.is("keyboard", "KEYBOARD")).toBe(true);
    });

    it("filters numbers by every operator", () => {
      expect(NUMBER_FILTERS.eq(30, 30)).toBe(true);
      expect(NUMBER_FILTERS.neq(30, 20)).toBe(true);
      expect(NUMBER_FILTERS.gt(30, 20)).toBe(true);
      expect(NUMBER_FILTERS.gte(30, 30)).toBe(true);
      expect(NUMBER_FILTERS.lt(20, 30)).toBe(true);
      expect(NUMBER_FILTERS.lte(30, 30)).toBe(true);
      expect(NUMBER_FILTERS.between(30, 20, 40)).toBe(true);
      expect(NUMBER_FILTERS.between(50, 20, 40)).toBe(false);
    });

    it("compares numbers numerically, not as text", () => {
      // "9" > "10" as a string, but 9 < 10 as a number
      expect(NUMBER_FILTERS.gt("9", "10")).toBe(false);
      expect(NUMBER_FILTERS.lt("9", "10")).toBe(true);
    });

    it("treats a missing bound on `between` as unbounded on that side", () => {
      expect(NUMBER_FILTERS.between(900, 100, "")).toBe(true);
      expect(NUMBER_FILTERS.between(50, "", 100)).toBe(true);
      expect(NUMBER_FILTERS.between(150, "", 100)).toBe(false);
      expect(NUMBER_FILTERS.between(5, 100, "")).toBe(false);
    });

    it("filters selects by every operator", () => {
      expect(SELECT_FILTERS.is("input", "input")).toBe(true);
      expect(SELECT_FILTERS["is-not"]("input", "video")).toBe(true);
      expect(SELECT_FILTERS["is-any-of"]("input", ["input", "video"])).toBe(
        true,
      );
      expect(SELECT_FILTERS["is-any-of"]("display", ["input", "video"])).toBe(
        false,
      );
      expect(SELECT_FILTERS["is-none-of"]("display", ["input", "video"])).toBe(
        true,
      );
      expect(SELECT_FILTERS["is-empty"]("")).toBe(true);
      expect(SELECT_FILTERS["is-not-empty"]("input")).toBe(true);
    });

    it("accepts a single value where a list is expected", () => {
      // restored props and filterFunction callers can hand back either shape
      expect(SELECT_FILTERS["is-any-of"]("input", "input")).toBe(true);
      expect(SELECT_FILTERS["is-none-of"]("input", "input")).toBe(false);
    });

    it("reads nested value paths", () => {
      const rows = [{ spec: { weight: 5 } }, { spec: { weight: 50 } }];
      const filter: TableFilter = {
        header: "Weight",
        name: "spec.weight",
        type: "number",
        operator: "gt",
        value: 10,
      };

      expect(applyFilters(rows, [filter])).toEqual([{ spec: { weight: 50 } }]);
    });

    it("combines several filters with AND", () => {
      const filters: TableFilter[] = [
        {
          header: "Category",
          name: "category",
          type: "select",
          operator: "is",
          value: "input",
        },
        {
          header: "Price",
          name: "price",
          type: "number",
          operator: "lt",
          value: 25,
        },
      ];

      expect(applyFilters(products, filters).map((row) => row.name)).toEqual([
        "Mouse",
      ]);
    });

    it("leaves the rows untouched when there is nothing to apply", () => {
      expect(applyFilters(products, [])).toBe(products);
    });
  });

  describe("validation", () => {
    it("knows which operators take a value", () => {
      expect(operatorNeedsValue("contains")).toBe(true);
      expect(operatorNeedsValue("is-empty")).toBe(false);
      expect(operatorNeedsValue("is-not-empty")).toBe(false);
      expect(operatorNeedsValue(undefined)).toBe(false);
    });

    it("treats a draft without an operator as incomplete", () => {
      expect(isFilterComplete({ value: "Keyboard" })).toBe(false);
      expect(isFilterComplete({ operator: "contains" })).toBe(false);
      expect(
        isFilterComplete({ operator: "contains", value: "Keyboard" }),
      ).toBe(true);
    });

    it("treats a valueless operator as complete on its own", () => {
      expect(isFilterComplete({ operator: "is-empty" })).toBe(true);
    });

    it("accepts `between` with only one bound", () => {
      expect(isFilterComplete({ operator: "between" })).toBe(false);
      expect(isFilterComplete({ operator: "between", value: 10 })).toBe(true);
      expect(isFilterComplete({ operator: "between", to: 10 })).toBe(true);
    });

    it("starts each type on its default operator", () => {
      expect(DEFAULT_OPERATOR_BY_TYPE).toEqual({
        string: "contains",
        number: "eq",
        select: "is",
      });

      renderWithFiltersOpen();

      expect(operatorLabel("Name")).toBe("Contains");
      expect(operatorLabel("Price")).toBe("=");
      expect(operatorLabel("Category")).toBe("Is");
    });

    it("falls back to the type default when a row has no operator of its own", () => {
      expect(resolveOperator(undefined, "string")).toBe("contains");
      expect(resolveOperator({}, "number")).toBe("eq");
      expect(resolveOperator({}, "select")).toBe("is");
      // an explicit operator always wins
      expect(resolveOperator({ operator: "gt" }, "number")).toBe("gt");
    });

    it("leaves the value control usable from the start", () => {
      renderWithFiltersOpen();

      // the default operator takes a value, so there is nothing to unlock
      expect(screen.getByLabelText("Name value")).toBeEnabled();
    });

    it("filters on the default operator without touching it", () => {
      renderWithFiltersOpen();

      typeValue("Name value", "mouse");
      apply();

      expect(rowNames()).toEqual(["Mouse"]);
    });

    it("disables the value control again for an operator that takes none", () => {
      renderWithFiltersOpen();

      chooseOperator("Name", "Contains");
      expect(screen.getByLabelText("Name value")).toBeEnabled();

      chooseOperator("Name", "Is empty");
      expect(screen.getByLabelText("Name value")).toBeDisabled();
    });

    it("ignores a row that has an operator but no value", () => {
      renderWithFiltersOpen();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      // Price sits on its default operator with nothing typed — it cannot
      // decide anything, so it must not narrow the rows
      apply();

      expect(rowNames()).toEqual(["Mouse"]);
    });
  });

  describe("static filtering", () => {
    it("filters the rows the table already has", () => {
      renderWithFiltersOpen();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "o");
      apply();

      // every name with an "o" in it, and only those — Webcam has none
      expect(rowNames()).toEqual(["Keyboard", "Monitor", "Mouse"]);
    });

    it("does not filter until Apply is pressed", () => {
      renderWithFiltersOpen();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");

      expect(bodyRows()).toHaveLength(4);

      apply();

      expect(rowNames()).toEqual(["Mouse"]);
    });

    it("filters numbers with a comparison operator", () => {
      renderWithFiltersOpen();

      chooseOperator("Price", "≥");
      typeValue("Price value", "60");
      apply();

      expect(rowNames()).toEqual(["Monitor", "Webcam"]);
    });

    it("filters numbers with a range", () => {
      renderWithFiltersOpen();

      chooseOperator("Price", "Between");
      typeValue("Price min", "25");
      typeValue("Price max", "100");
      apply();

      expect(rowNames()).toEqual(["Keyboard", "Webcam"]);
    });

    it("filters by a select option", () => {
      renderWithFiltersOpen();

      chooseOperator("Category", "Is");
      chooseSelectValue("Category", "Input");
      apply();

      expect(rowNames()).toEqual(["Keyboard", "Mouse"]);
    });

    it("narrows by every active filter at once", () => {
      renderWithFiltersOpen();

      chooseOperator("Category", "Is");
      chooseSelectValue("Category", "Input");
      chooseOperator("Price", "<");
      typeValue("Price value", "25");
      apply();

      expect(rowNames()).toEqual(["Mouse"]);
    });

    it("restores every row when the filters are cleared", () => {
      renderWithFiltersOpen();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      apply();
      expect(bodyRows()).toHaveLength(1);

      clear();

      expect(bodyRows()).toHaveLength(4);
      expect(screen.getByLabelText("Name value")).toHaveValue("");
      expect(operatorLabel("Name")).toBe("Contains");
    });

    it("goes back to the first page, so the slice cannot fall off the end", () => {
      renderWithFiltersOpen({
        pagination: {
          total: products.length,
          page: 2,
          limit: 2,
          type: "static",
        },
      });

      // page 2 of 2 holds Mouse and Webcam
      expect(rowNames()).toEqual(["Mouse", "Webcam"]);

      chooseOperator("Category", "Is");
      chooseSelectValue("Category", "Input");
      apply();

      // 2 matches now, which is a single page — staying on page 2 would slice
      // past the end and show nothing
      expect(rowNames()).toEqual(["Keyboard", "Mouse"]);
    });

    it("reports the filtered count as the total", () => {
      renderWithFiltersOpen({
        pagination: {
          total: products.length,
          page: 1,
          limit: 10,
          type: "static",
        },
      });

      chooseOperator("Category", "Is");
      chooseSelectValue("Category", "Input");
      apply();

      expect(screen.getByText(/showing/i)).toHaveTextContent("of 2");
    });
  });

  describe("dynamic filtering", () => {
    it("hands the filters to actions.get instead of filtering locally", () => {
      const get = jest.fn();
      renderWithFiltersOpen({ actions: { get } });
      get.mockClear();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      apply();

      expect(get).toHaveBeenCalledTimes(1);
      const params = get.mock.calls[0][0];
      expect(JSON.parse(params.filters)).toEqual([
        expect.objectContaining({
          header: "Name",
          name: "name",
          type: "string",
          operator: "contains",
          value: "mouse",
        }),
      ]);

      // the rows it was handed are still all there — narrowing them is the
      // caller's job now
      expect(bodyRows()).toHaveLength(4);
    });

    it("resets to the first page when the filters change", () => {
      const get = jest.fn();
      renderWithFiltersOpen({
        actions: { get },
        pagination: { total: 40, page: 3, limit: 10 },
      });
      get.mockClear();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      apply();

      expect(get).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
    });

    it("reshapes the params through options.filter.props", () => {
      const get = jest.fn();
      const props = jest.fn((filters) => ({
        where: filters
          .map((f: TableFilter) => `${f.name}:${f.operator}:${f.value}`)
          .join(","),
      }));

      renderWithFiltersOpen({
        actions: { get },
        options: { filter: { props } },
      });
      get.mockClear();

      chooseOperator("Price", ">");
      typeValue("Price value", "50");
      apply();

      expect(props).toHaveBeenCalledWith([
        expect.objectContaining({ name: "price", operator: "gt", value: "50" }),
      ]);
      expect(get).toHaveBeenCalledWith(
        expect.objectContaining({ where: "price:gt:50" }),
      );
      // the default JSON payload is replaced, not merged alongside
      expect(get.mock.calls[0][0]).not.toHaveProperty("filters");
    });

    it("calls filterFunction instead of actions.get when one is given", () => {
      const get = jest.fn();
      const filterFunction = jest.fn();

      renderWithFiltersOpen({
        actions: { get },
        options: { filter: { filterFunction } },
      });
      get.mockClear();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      apply();

      expect(filterFunction).toHaveBeenCalledTimes(1);
      expect(get).not.toHaveBeenCalled();
    });

    it("uses filterFunction even without an actions.get", () => {
      const filterFunction = jest.fn();
      renderWithFiltersOpen({
        options: { filter: { filterFunction } },
      });

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      apply();

      expect(filterFunction).toHaveBeenCalledTimes(1);
      // filterFunction owns the fetch, so the table must not also filter
      expect(bodyRows()).toHaveLength(4);
    });

    it("sends no filters key once they are cleared", () => {
      const get = jest.fn();
      renderWithFiltersOpen({ actions: { get } });

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      apply();
      get.mockClear();

      clear();

      expect(get).toHaveBeenCalledWith(
        expect.objectContaining({ filters: undefined }),
      );
    });
  });

  describe("props preserving", () => {
    it("sends the applied filters to options.props.set", () => {
      const set = jest.fn();
      renderWithFiltersOpen({ options: { props: { set } } });

      chooseOperator("Price", ">");
      typeValue("Price value", "50");
      apply();

      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            expect.objectContaining({
              header: "Price",
              name: "price",
              operator: "gt",
              value: "50",
            }),
          ],
        }),
        "products",
      );
    });

    it("drops the value of an operator that takes none", () => {
      const set = jest.fn();
      renderWithFiltersOpen({ options: { props: { set } } });

      chooseOperator("Name", "Contains");
      typeValue("Name value", "mouse");
      chooseOperator("Name", "Is empty");
      apply();

      expect(set).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            expect.objectContaining({ operator: "is-empty", value: undefined }),
          ],
        }),
        "products",
      );
    });

    it("restores the filters from options.props.get on mount", () => {
      const saved: TableFilter[] = [
        {
          header: "Category",
          name: "category",
          type: "select",
          operator: "is",
          value: "input",
        },
      ];

      renderWithFiltersOpen({
        options: {
          props: { set: jest.fn(), get: () => ({ filters: saved }) },
        },
      });

      // unlike a restored sort, a restored filter really does narrow the rows
      expect(rowNames()).toEqual(["Keyboard", "Mouse"]);
    });

    it("shows a restored filter in its row, not just in the data", () => {
      renderWithFiltersOpen({
        options: {
          props: {
            set: jest.fn(),
            get: () => ({
              filters: [
                {
                  header: "Name",
                  name: "name",
                  type: "string",
                  operator: "contains",
                  value: "mouse",
                } as TableFilter,
              ],
            }),
          },
        },
      });

      expect(screen.getByLabelText("Name value")).toHaveValue("mouse");
      expect(screen.getByLabelText("Name value")).toBeEnabled();
    });
  });

  describe("the panel", () => {
    it("is not offered at all when no header declares a filterBy", () => {
      render(
        <DataTable<Product>
          data={products}
          headers={{ Name: { value: "name" } }}
          loading={false}
          title="products"
          keyExtractor={(row) => row.id}
        />,
      );

      expect(
        screen.queryByRole("button", { name: "Filters" }),
      ).not.toBeInTheDocument();
    });

    it("keeps the rows behind the Filters trigger until it is opened", () => {
      renderTable();

      expect(
        screen.getByRole("button", { name: "Filters" }),
      ).toBeInTheDocument();
      // the dropdown renders nothing while closed
      expect(screen.queryByLabelText("Name value")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Apply" }),
      ).not.toBeInTheDocument();

      openFilters();

      expect(screen.getByLabelText("Name value")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
    });

    it("stays open while filters are being built, so several can be set", () => {
      renderWithFiltersOpen();

      chooseOperator("Name", "Contains");
      typeValue("Name value", "o");
      // picking an operator and typing must not dismiss the panel
      expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();

      apply();

      // and it survives Apply, so the result can be refined without reopening
      expect(screen.getByLabelText("Name value")).toHaveValue("o");
      expect(rowNames()).toEqual(["Keyboard", "Monitor", "Mouse"]);
    });
  });
});

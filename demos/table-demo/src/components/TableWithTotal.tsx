import { DataTable, THeader } from "@kousta-ui/table";

const products = [
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

const TableWithTotal = () => {
  const headers: THeader<any> = {
    id: { value: "id", sortBy: {} },
    name: { value: "name", sortBy: {}, total: { func: () => 2_000_000 } },
    category: {
      value: "category",
      sortBy: {},
      filterBy: {
        type: "select",
        options: [
          { id: "cat 1", label: "category one" },
          { id: "cat 2", label: "category two" },
          { id: "cat 3", label: "category three" },
        ],
      },
    },
    "Unit Price": {
      value: "u_price",
      sortBy: {},
      total: {},
      filterBy: {
        type: "number",
      },
    },
    tva: { value: "tva" },
    units: { value: "qte", sortBy: {}, total: {} },
    "total Price": {
      value: "total_price",
      sortBy: {},
      total: {},
      filterBy: {
        type: "number",
      },
    },
  };

  return (
    <>
      <h2>Static Table With Total</h2>
      <DataTable
        loading={false}
        title="users-static-table"
        data={products}
        headers={headers}
      />
    </>
  );
};

export default TableWithTotal;

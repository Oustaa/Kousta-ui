import { DataTable, THeader } from "@kousta-ui/table";
import { ProductType } from "../App";
import { useCallback, useState } from "react";
import { BsTrash, BsEye, BsKanbanFill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";

const getProducts = (
  props: Record<string, number | string | undefined> = {},
) => {
  const params = new URLSearchParams();

  Object.keys(props).forEach((key) => {
    if (props[key]) params.append(key, String(props[key]));
  });

  return fetch(`http://localhost:8001/api/v1/products?${params.toString()}`);
};

const DynamicTable = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [totalProducts, setTotalProducts] = useState(0);

  const headers: THeader<ProductType> = {
    id: {
      value: "id",
      sortBy: {},
      filterBy: {
        type: "number",
      },
    },
    label: { value: "designation" },
    category: {
      value: "category.ref",
      sortBy: {},
      filterBy: {
        type: "string",
      },
    },
  };

  const getTableProducts = useCallback(
    (params: Record<string, string | number | undefined>) => {
      setProductsLoading(true);
      getProducts(params)
        .then((resp) => {
          if (resp.status === 204) return { products: [], meta: { total: 0 } };
          return resp.json();
        })
        .then((data) => {
          setProducts(data.products);
          console.log({ data });
          if (data.meta?.total) setTotalProducts(data.meta.total);
          else setTotalProducts(data.products.length);
        })
        .catch(console.log)
        .finally(() => setProductsLoading(false));
    },
    [],
  );

  return (
    <>
      <h2>Dynamic Table</h2>

      <DataTable<ProductType>
        data={products}
        headers={{
          ...headers,
          id: {
            value: "id",
            sortBy: {
              name: "ido",
            },
          },
        }}
        loading={productsLoading}
        keyExtractor={(row) => row.id}
        title="this is a title"
        pagination={{
          total: totalProducts,
          limit: JSON.parse(localStorage.getItem("props") || "{}")?.limit || 10,
          page: JSON.parse(localStorage.getItem("props") || "{}")?.page || 1,
          // type: "static",
        }}
        actions={{
          get: getTableProducts,
          // search: getTableProducts,
          delete: {
            canDelete: (row) => row?.gestion_stock > 25,
            buttonProps: {
              // variant: "danger-link",
              // size: "sm",
            },
            title: <BsTrash size={12} />,
            onDelete: (row) => {
              console.log({ row });
            },
          },
          edit: {
            buttonProps: {
              // variant: "success-link",
              // size: "sm",
              // style: {
              //   paddingInline: 0,
              // },
            },
            // title: <BsPen size={".75rem"} />,
            // canEdit: (row) => {
            //   return !!row?.flux_fabrication;
            // },
            onEdit: (row) => {
              console.log({ row });
            },
          },
        }}
        options={{
          sort: {
            props(props) {
              return {
                order: `${props.direction === -1 ? "-" : ""}${props.sortBy}`,
              };
            },
          },
          props: {
            set: (props) => {
              console.log({ props });
              localStorage.setItem("props", JSON.stringify(props));
            },
            get() {
              return JSON.parse(localStorage.getItem("props") || "{}");
            },
          },
          bulkActions: [
            {
              title: "Delete All",
              onClick: (rows, clearSelected) => {
                console.log({ rows });
                clearSelected();
              },
              buttonProps: {
                variant: "danger",
              },
            },
          ],
          cards: {
            card({ row, visibleHeaders }) {
              return (
                <div
                  style={{
                    background: "var(--kui-neutral-700)",
                    padding: "var(--kui-spacing-sm)",
                    borderRadius: "var(--kui-spacing-xs)",
                  }}
                >
                  {visibleHeaders.includes("label") && (
                    <h2>{row.designation}</h2>
                  )}
                  {visibleHeaders.includes("category") && (
                    <p>{row.category.ref}</p>
                  )}
                </div>
              );
            },
            cardsContainerProps: {
              style: {
                display: "grid",
                gridColumn: "4",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "var(--kui-spacing-sm)",
              },
            },
            loadingIndicator(props) {
              return (
                <>
                  <h1>Card Loading</h1>
                  {JSON.stringify(props)}
                </>
              );
            },
          },
          emptyTable: <h1>Nop Nop Nop</h1>,
          // viewComp: {
          //   Component: (row) => {
          //     return <h2>{row.email}</h2>;
          //   },
          //   canView(row) {
          //     return row?.name !== "Imane Berrada";
          //   },
          //
          //   // type: "extends",
          //   extendRowIcon: <BsChevronDown />,
          //   minimizeRowIcon: <BsChevronUp />,
          //   openModalIcon: <BsEye />,
          //   openButtonProps: {
          //     variant: "primary-link",
          //   },
          // },
          extraActions: [
            {
              Icon: <BsEye />,
              title: "do Something",
              onClick(row) {
                console.log(row);
              },
              allowed(row) {
                return !!row.stock_negatif;
              },
            },
          ],
          extraviews: {
            map: {
              View: ({ data }) => {
                return (
                  <>
                    <h1>Map View</h1>
                    <p>{data.length}</p>
                  </>
                );
              },
              menuProps: {
                leftSection: <FaMap />,
              },
              loadingIndicator(props) {
                return (
                  <>
                    <h1>Map Loading</h1>
                    {JSON.stringify(props)}
                  </>
                );
              },
            },
            kanban: {
              View: ({ data }) => {
                return (
                  <>
                    <h1>Kanban View</h1>
                    <p>{data.length}</p>
                  </>
                );
              },
              menuProps: {
                leftSection: <BsKanbanFill />,
              },
              loadingIndicator(props) {
                return (
                  <>
                    <h1>Kanban Loading</h1>
                    {JSON.stringify(props)}
                  </>
                );
              },
            },
          },
          // extraActions: [
          //   {
          //     title: "Do Something",
          //     onClick: () => {},
          //     allowed: (row) => row.age < 23,
          //     Icon: <Bs123 />,
          //   },
          // ],
          selectFilter: {
            "Stock Negative allowed": (row) => !!row.stock_negatif,
            "Flux Fabrication": (row) => !!row.flux_fabrication,
          },
          // emptyTable: <div style={{ color: "red" }}>Whaaat The fuck</div>,
          // search: searchHandler,
          // showHideRow: false
        }}
        config={{
          // noHead: false,
          // toggleRows: false,
          // toggleRows: {
          //   children: <BsEye />,
          // },
          // disableContextMenu: false,
          loadingIndicator(props) {
            return (
              <>
                <h1>Table Loading</h1>
                {JSON.stringify(props)}
              </>
            );
          },
        }}
      />
    </>
  );
};

export default DynamicTable;

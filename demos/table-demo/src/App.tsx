import { useCallback, useEffect, useState } from "react";
import { DataTable, TablePropsProvider } from "@kousta-ui/table";
import { ComponentPropsProvider } from "@kousta-ui/components";
import {
  BsChevronDown,
  BsDash,
  BsEye,
  BsKanbanFill,
  BsThreeDots,
  BsTrash,
} from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { usePagination } from "@kousta-ui/hooks";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";
import "./App.css";

import { THeader } from "@kousta-ui/table/lib/DataTable/_props";

export type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
  location: { name: string };
};

type ProductType = {
  id: number;
  ref: string;
  designation: string;
  nature: string;
  famille: string;
  flux_fabrication: number;
  stock_negatif: number;
  gestion_lot: number;
  gestion_stock: number;
  controle_quality: number;
  category_product_id: number;
  category: {
    id: number;
    ref: string;
    flux_vente: number;
    flux_achat: number;
  };
  categoryUnit: {
    id: number;
    label: string;
  };
};

const getProducts = (
  props: Record<string, number | string | undefined> = {},
) => {
  const params = new URLSearchParams();

  Object.keys(props).forEach((key) => {
    if (props[key]) params.append(key, String(props[key]));
  });

  return fetch(`http://localhost:8001/products?${params.toString()}`);
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  // const headers: THeader<UserType> = {
  //   user: {
  //     exec(user: UserType) {
  //       return (
  //         <div>
  //           <h2>{user.email}</h2>
  //         </div>
  //       );
  //     },
  //     visible: false,
  //   },
  //   name: {
  //     exec() {
  //       return "WHAAAAAAAAAA";
  //     },
  //     visible: false,
  //     canSee: false,
  //   },
  //   age: {
  //     value: "age",
  //   },
  //   email: {
  //     value: "email",
  //   },
  //   address: {
  //     value: "address",
  //   },
  //   local: {
  //     value: "location.name",
  //   },
  // };
  const headers: THeader<ProductType> = {
    id: { value: "id" },
    label: { value: "designation" },
    category: { value: "category.ref" },
  };

  // const searchHandler = useCallback(
  //   (q: string, { visibleHeaders: vh }: { visibleHeaders: string[] }) => {
  //     const reg = new RegExp(q);
  //
  //     setData(() =>
  //       users.filter(
  //         (user) =>
  //           (vh?.includes("name") && reg.test(user.name)) ||
  //           (vh?.includes("email") && reg.test(user.email)) ||
  //           reg.test(user.address || "") ||
  //           reg.test(user.location.name),
  //       ),
  //     );
  //   },
  //   [],
  // );

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

  // useEffect(() => {
  //   getTableProducts({});
  // }, []);

  return (
    <ComponentPropsProvider
      pagination={{
        placeholderIcon: <BsThreeDots />,
        prevIcon: <FaAngleLeft />,
        nextIcon: <FaAngleRight />,
        seblings: 2,
      }}
    >
      <TablePropsProvider
        actions={{
          delete: {
            buttonProps: { variant: "success" },
            title: <BsTrash />,
          },
          edit: {
            buttonProps: { variant: "primary" },
          },
        }}
        toggleRows={{
          children: <BsEye />,
        }}
        emptyRowIcon={<BsDash />}
        emptyTable={<h1>There is not data.....</h1>}
        // selectFilter={{ icon: <IoMdArrowDropdown /> }}
        // disableContextMenu={true}
        // toggleRows={{ variant: "warning", children: <BsEye /> }}
        // toggleRows={false}
        selectFilter={{ icon: <BsChevronDown /> }}
        // props={{
        //   table: {
        //     style: { borderColor: "white" },
        //   },
        //   td: {
        //     style: { borderColor: "white" },
        //   },
        //   th: {
        //     // style: { backgroundColor: "blue", borderColor: "white" },
        //   },
        // }}
      >
        <div style={{ width: "90%", marginInline: "auto", marginTop: "2rem" }}>
          {/* <Table.Root> */}
          {/*   <Table.Thead> */}
          {/*     <Table.Tr> */}
          {/*       <Table.Th>Full Name</Table.Th> */}
          {/*       <Table.Th>Age</Table.Th> */}
          {/*       <Table.Th>Email</Table.Th> */}
          {/*       <Table.Th>Address</Table.Th> */}
          {/*     </Table.Tr> */}
          {/*   </Table.Thead> */}
          {/*   <Table.Tbody> */}
          {/*     {data.map((row, index) => { */}
          {/*       return ( */}
          {/*         <Table.Tr key={index}> */}
          {/*           <Table.Td>{row.name}</Table.Td> */}
          {/*           <Table.Td>{row.age}</Table.Td> */}
          {/*           <Table.Td>{row.email}</Table.Td> */}
          {/*           <Table.Td>{row.address}</Table.Td> */}
          {/*         </Table.Tr> */}
          {/*       ); */}
          {/*     })} */}
          {/*   </Table.Tbody> */}
          {/* </Table.Root> */}
          {/* <Pagination */}
          {/*   page={page} */}
          {/*   totalPages={Math.ceil(total / limit)} */}
          {/*   seblings={3} */}
          {/*   onChange={setPage} */}
          {/* /> */}
          <br />
          <br />
          <br />
          <DataTable<ProductType>
            data={products}
            headers={headers}
            loading={productsLoading}
            keyExtractor={(row) => row.id}
            title="this is a title"
            pagination={{
              total: totalProducts,
              limit: 10,
              page: 1,
              // type: "static",
            }}
            options={{
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
              actions: {
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
              },
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
              toggleRows: {
                children: <BsEye />,
              },
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
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </TablePropsProvider>
    </ComponentPropsProvider>
  );
};

export default App;

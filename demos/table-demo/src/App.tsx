import { DataTable, TablePropsProvider } from "@kousta-ui/table";
import { ComponentPropsProvider } from "@kousta-ui/components";
import { BsDash, BsThreeDots, BsTrash } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";
import "./App.css";

import { THeader } from "@kousta-ui/table/lib/DataTable/_props";
import { users } from "./data/users";
import TableWithTotal from "./components/TableWithTotal";
import DynamicTable from "./components/DynamicTable";

export type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
  location: { name: string };
};

export type ProductType = {
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

const App = () => {
  const staticTHeaders: THeader<UserType> = {
    user: {
      exec(user: UserType) {
        return (
          <div>
            <h2>{user.email}</h2>
          </div>
        );
      },
      visible: false,
      sortBy: {
        name: "email",
        // sortFunc(a, b) {
        //   return a.email.localeCompare(b.email);
        // },
      },
    },
    name: {
      value: "name",
      // exec() {
      //   return "WHAAAAAAAAAA";
      // },
      // visible: false,
      // canSee: false,
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
    local: {
      value: "location.name",
    },
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

  // useEffect(() => {
  //   getTableProducts({ page: 1, limit: 20 });
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
        // toggleRows={{
        //   children: <BsEye />,
        // }}
        emptyRowIcon={<BsDash />}
        emptyTable={<h1>There is not data.....</h1>}
        // selectFilter={{ icon: <IoMdArrowDropdown /> }}
        // disableContextMenu={true}
        // toggleRows={{ variant: "warning", children: <BsEye /> }}
        // toggleRows={false}
        // selectFilter={{ icon: <BsChevronDown /> }}
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
          <DataTable<UserType>
            loading={false}
            title="users-static-table"
            data={users}
            headers={staticTHeaders}
          />
          <br />
          <br />
          <br />
          <TableWithTotal />
          <br />
          <br />
          <br />
          <DynamicTable />
          <br />
          <br />
          <br />
        </div>
      </TablePropsProvider>
    </ComponentPropsProvider>
  );
};

export default App;

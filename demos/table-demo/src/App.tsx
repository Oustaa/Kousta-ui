import { useCallback, useState } from "react";
import { DataTable, TablePropsProvider } from "@kousta-ui/table";
import { Input, Menu } from "@kousta-ui/components";
import {
  BsChevronDown,
  BsChevronUp,
  BsDash,
  BsEye,
  BsPen,
  BsTrash,
} from "react-icons/bs";

import { users } from "./data/users";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

import { THeader } from "@kousta-ui/table/lib/DataTable/_props";

export type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
  location: { name: string };
};

const App = () => {
  const [data, setData] = useState<Array<UserType>>(users);

  const headers: THeader<UserType> = {
    user: {
      exec(user: UserType) {
        return (
          <div>
            <h2>{user.email}</h2>
          </div>
        );
      },
      visible: false,
    },
    name: {
      exec() {
        return "WHAAAAAAAAAA";
      },
      visible: false,
      canSee: false,
    },
    age: {
      value: "age",
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

  const searchHandler = useCallback(
    (q: string, { visibleHeaders: vh }: { visibleHeaders: string[] }) => {
      const reg = new RegExp(q);

      setData(() =>
        users.filter(
          (user) =>
            (vh?.includes("name") && reg.test(user.name)) ||
            (vh?.includes("email") && reg.test(user.email)) ||
            reg.test(user.address || "") ||
            reg.test(user.location.name),
        ),
      );
    },
    [],
  );

  return (
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
      <Input
        label="Society"
        placeholder="this is my placeholder"
        // errors={["There is an error"]}
        // required={true}
        // value={value}
        // onChange={(e) => {
        //   setValue(e.target.value);
        // }}
        // i should add this
        // leftSection={<Button onClick={alert("Hello InputLeft Section")} />}
      />
      <br />
      <br />
      <br />
      <TablePropsProvider
        actions={{
          delete: {
            buttonProps: { variant: "success" },
            title: <BsTrash />,
          },
        }}
        emptyRowIcon={<BsDash />}
        emptyTable={<h1>There is not data.....</h1>}
        // selectFilter={{ icon: <IoMdArrowDropdown /> }}
        // disableContextMenu={true}
        // toggleRows={{ variant: "warning", children: <BsEye /> }}
        toggleRows={false}
        selectFilter={{ icon: <BsChevronDown /> }}
        props={{
          table: {
            style: { borderColor: "white" },
          },
          td: {
            style: { borderColor: "white" },
          },
          th: {
            style: { backgroundColor: "blue", borderColor: "white" },
          },
        }}
      >
        <DataTable<UserType>
          data={data}
          headers={headers}
          loading={false}
          keyExtractor={(row) => `${row.name}`}
          title="this is a title"
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
            emptyTable: <h1>Nop Nop Nop</h1>,
            viewComp: {
              Component: (row) => {
                return <h2>{row.email}</h2>;
              },
              canView(row) {
                return row?.name !== "Imane Berrada";
              },

              // type: "extends",
              extendRowIcon: <BsChevronDown />,
              minimizeRowIcon: <BsChevronUp />,
              openModalIcon: <BsEye />,
              openButtonProps: {
                variant: "primary-link",
              },
            },
            actions: {
              delete: {
                canDelete: (row) => row?.age > 25,
                buttonProps: {
                  // variant: "danger-link",
                  // size: "sm",
                },
                title: <BsTrash size={12} />,
                onDelete: (row: UserType) => {
                  console.log({ row });
                },
              },
              edit: {
                buttonProps: {
                  variant: "success-link",
                  // size: "sm",
                  // style: {
                  //   paddingInline: 0,
                  // },
                },
                title: <BsPen size={".75rem"} />,
                canEdit: (row) => {
                  return row?.name !== "Imane Berrada";
                },
                onEdit: (row: UserType) => {
                  console.log({ row });
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
              adult: (row) => row.age > 22 && row.age < 33,
              young: (row) => row.age <= 22,
            },
            // emptyTable: <div style={{ color: "red" }}>Whaaat The fuck</div>,
            search: searchHandler,
            // showHideRow: false
            // noHead: true
          }}
          config={
            {
              // noHead: false,
              // toggleRows: false,
              // toggleRows: {
              //   variant: "warning",
              //   children: <BsEye />,
              // },
              // disableContextMenu: false,
            }
          }
        />
        <br />
        <br />
        <br />
        <DataTable<UserType>
          data={data}
          headers={headers}
          loading={false}
          keyExtractor={(row) => `${row.name}`}
          title="this is a title"
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
            emptyTable: <h1>Nop Nop Nop</h1>,
            viewComp: {
              Component: (row) => {
                return <h2>{row.email}</h2>;
              },
              canView(row) {
                return row?.name !== "Imane Berrada";
              },

              // type: "extends",
              extendRowIcon: <BsChevronDown />,
              minimizeRowIcon: <BsChevronUp />,
              openModalIcon: <BsEye />,
              openButtonProps: {
                variant: "primary-link",
              },
            },
            actions: {
              delete: {
                canDelete: (row) => row?.age > 25,
                buttonProps: {
                  // variant: "danger-link",
                  // size: "sm",
                },
                title: <BsTrash size={12} />,
                onDelete: (row: UserType) => {
                  console.log({ row });
                },
              },
              edit: {
                buttonProps: {
                  variant: "success-link",
                  // size: "sm",
                  // style: {
                  //   paddingInline: 0,
                  // },
                },
                title: <BsPen size={".75rem"} />,
                canEdit: (row) => {
                  return row?.name !== "Imane Berrada";
                },
                onEdit: (row: UserType) => {
                  console.log({ row });
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
              adult: (row) => row.age > 22 && row.age < 33,
              young: (row) => row.age <= 22,
            },
            // emptyTable: <div style={{ color: "red" }}>Whaaat The fuck</div>,
            search: searchHandler,
            // showHideRow: false
            // noHead: true
          }}
          config={
            {
              // noHead: false,
              // toggleRows: false,
              // toggleRows: {
              //   variant: "warning",
              //   children: <BsEye />,
              // },
              // disableContextMenu: false,
            }
          }
        />
        <br />
        <br />
        <Menu.Menu closeOnClick type="click">
          <Menu.Target>I AM A MENU</Menu.Target>
          <Menu.DropDown>
            <Menu.Label>Hello Application</Menu.Label>
            <Menu.Item closeMenuOnClick={false}>Dont Close</Menu.Item>
            <Menu.Item>Hello There 2</Menu.Item>
            <Menu.Item>Hello There 3</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Hello There 4</Menu.Item>
            <Menu.Item>Hello There 5</Menu.Item>
          </Menu.DropDown>
        </Menu.Menu>
      </TablePropsProvider>
    </div>
  );
};

export default App;

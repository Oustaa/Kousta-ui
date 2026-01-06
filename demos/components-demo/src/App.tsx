import { useCallback, useEffect, useState } from "react";
import {
  Button,
  ContextMenu,
  Menu,
  Input,
  Modal,
  ComponentPropsProvider,
  Group,
  Select,
  WindowBoundary,
  AsyncSelect,
} from "@kousta-ui/components";
import {
  Bs123,
  BsAlphabet,
  BsAmazon,
  BsArchive,
  BsArchiveFill,
  BsAt,
  BsFacebook,
  BsHouseLock,
  BsX,
} from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { getNestedProperty } from "@kousta-ui/helpers";

import "@kousta-ui/components/esm/index.css";
import "./App.css";
import "./index.css";
import { useDisclosure, useScrollLock } from "@kousta-ui/hooks";

// import { getUsers } from "./app";
// import { useDebounceCallback } from "@kousta-ui/hooks";

type User = { first_name: string; last_name: string; id: number };
type ProductInterface = { ref: string; id: number; designation: string };

async function getProducts({
  limit,
  page,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const resp = await fetch(
    `http://localhost:3000/products?limit=${limit}&page=${page}&search=${search}`,
  );

  const result = await resp.json();

  return result;
}

function App() {
  const { lockScroll, unlockScroll } = useScrollLock();
  const { opened, close, open } = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [, setValue] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  // const debouncedOnChange = useDebounceCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e);
  //     alert(e.target.value);
  //   },
  //   500,
  // );

  const [selectData] = useState([
    { first_name: "Youness", last_name: "Tailba", id: 1 },
    { first_name: "Oussama", last_name: "Tailba", id: 2 },
    { first_name: "Abd eladim", last_name: "Tailba", id: 3 },
    { first_name: "Khalid", last_name: "Tailba", id: 4 },
    { first_name: "Youness", last_name: "Tailba", id: 5 },
    { first_name: "Oussama", last_name: "Tailba", id: 6 },
    { first_name: "Abd eladim", last_name: "Tailba", id: 7 },
    { first_name: "Khalid", last_name: "Tailba", id: 8 },
    { first_name: "Youness", last_name: "Tailba", id: 9 },
    { first_name: "Oussama", last_name: "Tailba", id: 10 },
    { first_name: "Abd eladim", last_name: "Tailba", id: 11 },
    { first_name: "Khalid", last_name: "Tailba", id: 12 },
    { first_name: "Youness", last_name: "Tailba", id: 13 },
    { first_name: "Oussama", last_name: "Tailba", id: 14 },
    { first_name: "Abd eladim", last_name: "Tailba", id: 15 },
    { first_name: "Khalid", last_name: "Tailba", id: 16 },
  ]);

  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    return clearTimeout(timeout);
  }, [loading]);

  const getSelectProducts = useCallback(
    async ({ page, searchTerm }: { page: number; searchTerm?: string }) => {
      return getProducts({
        page,
        limit: 20,
        search: searchTerm,
      });
    },
    [],
  );

  return (
    <>
      <ComponentPropsProvider
        button={{
          size: "sm",
          // variant: "mine",
          type: "submit",
          // className: "btn-class",
          loadingIndicator: "Asbeeeer",
          variants: {
            mine: {
              style: {
                backgroundColor: "red",
                color: "green",
              },
            },
          },
        }}
        menu={{
          menu: {
            type: "click",
            closeOnClick: false,
            position: "Top-Center",
            offset: 0,
          },
          menuItem: {},
        }}
        modal={{
          closeOnClickOutside: false,
          closeOnClickEsc: false,
          withCloseBtn: false,
          // withBackdrop: false,
          position: "top",
          offset: 20,
          size: "lg",
        }}
        select={{
          // clearable: false,
          // seachable: false,
          emptyMessage: "EMPTY EMPTY",
          // disableErrorBoundaries: true,
          icons: {
            clear: <BsX size={18} />,
            open: <BsArchiveFill />,
            close: <BsFacebook />,
            loading: <BsAlphabet />,
          },
        }}
      >
        <Button onClick={() => setValue("")}>Clear</Button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="scrool-area" style={{ height: "100vh" }}>
          <WindowBoundary
            onItemExit={() => {
              console.log("hello just exited");
            }}
            onItemEnter={() => {
              console.log("hello just entered");
            }}
            onceItemEnter={() => {
              console.log("It just once entered");
            }}
            onceItemExit={() => {
              console.log("It just once exited");
            }}
            root={document.querySelector("#scrool-area")}
            threshold={1}
          >
            <div style={{ paddingBlock: "60px", backgroundColor: "blue" }}>
              Hello I am here
            </div>
          </WindowBoundary>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              width: "100%",
            }}
          >
            <Select<User>
              // loading
              // clearable={false}
              // seachable={false}
              data={selectData}
              placeholder="select static"
              // value={7}
              options={{
                value: "id",
                label: "first_name last_name",
                renderOption(row) {
                  if (row.id === 6)
                    throw Error("Id 6 is not accepted in my application");
                  return (
                    <span>
                      {getNestedProperty(row, "(id) first_name last_name")}
                    </span>
                  );
                },
              }}
              label="Static Select"
              disabledOption={(user) => [1, 5].includes(user.id)}
              optionErrorFallback={({ row }) => {
                return <span>options with id ({row.id}) is not working</span>;
              }}
              // errors={["There is an error", "there is another one"]}
              // labelPosition="x"
              // required
              // emptyMessage="Give me some options"
              // seachable={false}
              // disabled
              // isMultiple
              // onSearch={(user: User, term: string) => user.first_name === term}
              // disableErrorBoundaries={true}
              // loading
            />
            <Input
              label="Input label"
              placeholder="Kui input"
              // errors={["There is an error"]}
              // labelPosition="x"
            />
            <AsyncSelect<ProductInterface>
              // clearable={false}
              hasMore={(resp, page) => page < resp.meta.totalPages}
              getData={getSelectProducts}
              extractDynamicData={(resp) => resp.products}
              value={4}
              options={{
                value: "id",
                label: "id - designation",
                renderOption(row) {
                  return `id: ${row.id} - ${row.designation}`;
                },
              }}
              label="Dynamic Select"
              placeholder="Dynamic Select"
              // errors={["There is an error"]}
              // labelPosition="x"
              // required
              emptyMessage="Give me some options"
              // seachable={false}
              // disabled
              disabledOption={(row) => {
                return row.id === 4 || row.id === 9;
              }}
              onChange={(value) => {
                console.log({ value });
              }}
              // searchTimeout={100}
              // rawValue
              // isMultiple
            />
          </div>
          {/* <Input */}
          {/*   label="Society" */}
          {/*   placeholder="this is my placeholder" */}
          {/*   // errors={["There is an error"]} */}
          {/*   // required={true} */}
          {/*   // type="numbenumberr" */}
          {/*   value={value} */}
          {/*   // type="number" */}
          {/*   step={2.5} */}
          {/*   // onChange={(e) => { */}
          {/*   //   setValue(e.target.value); */}
          {/*   //   alert(e.target.value); */}
          {/*   // }} */}
          {/*   onChange={(e) => { */}
          {/*     debouncedOnChange(e); */}
          {/*     setValue(e.target.value); */}
          {/*   }} */}
          {/*   // labelPosition="x" */}
          {/*   // i should add this */}
          {/*   leftSection={ */}
          {/*     <Button onClick={() => alert("Hello InputLeft Section")}> */}
          {/*       left */}
          {/*     </Button> */}
          {/*   } */}
          {/*   rightSection={ */}
          {/*     <Button onClick={() => alert("Hello InputLeft Section")}> */}
          {/*       right */}
          {/*     </Button> */}
          {/*   } */}
          {/* /> */}
        </div>
        <br />
        <br />

        <Group direction="row">
          <Button disabled variant="primary">
            Primary Link
          </Button>
          <Button variant="primary">Neutral Link</Button>
          <Button variant="success">Success Link</Button>
          <Button variant="danger">Danger Link</Button>
        </Group>
        <br />
        <br />

        <Group gap="10px">
          <Button
            variant="neutral"
            onClick={() => setCount((prev) => prev - 1)}
            disabled={count === 0}
          >
            -
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            {count}
          </div>
          <Button
            variant="neutral"
            onClick={() => setCount((prev) => prev + 1)}
            disabled={count === 23}
          >
            +
          </Button>
        </Group>
        <br />
        <br />

        <Modal
          opened={opened}
          onClose={close}
          // modalTrigger={"Create Project In Modal"}
          title={
            <img
              style={{ width: "50px" }}
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png"
              }
            />
          }
          closeOnClickEsc={true}
          closeOnClickOutside={true}
          withCloseBtn={true}
          // withBackdrop={true}
          // beforeClose={() => {
          //   alert("How are you??");
          //   // return false;
          // }}

          position="right-bottom"
          size="480"
          offset={10}
          fullHeight
          // fullWidth
        >
          Hello I Am A Modal Hello I Am A Modal Hello I Am A Modal Hello I Am A
          Modal Hello I Am A Modal Hello I Am A Modal Hello I Am A Modal Hello I
          Am A Modal cs dsfdsg f
        </Modal>

        <Button
          loading={loading}
          onClick={() => {
            setLoading((prev) => !prev);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          variant="neutral-light"
          size="sm"
        >
          Primary Button
        </Button>
        <br />
        <br />
        <Button onClick={open}>Open Modal</Button>
        <Button
          variant="danger"
          loading={loading}
          onClick={() => {
            setLoading((prev) => !prev);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        >
          Secondary Button
        </Button>
        <br />
        <br />

        <ContextMenu
          // itemCloseOnClick={false}
          options={[
            {
              title: "Export to excel",
              icon: <RiFileExcel2Line />,
              subOptions: [
                {
                  title: "Option 1 sub 1 er",
                  icon: <BsAlphabet />,
                  subOptions: [
                    {
                      title: "Option 1 sub 1 sub 1",
                      closeOnClick: false,
                      onClick() {
                        console.log("Option 1 sub 1");
                      },
                    },
                  ],
                },
                {
                  optionType: "Separator",
                },
                {
                  title: "Option 1 sub 2",
                  onClick() {
                    console.log("Option 1 sub 2");
                  },
                  active: false,
                },
                {
                  title: "Option 1 sub 3",
                  subOptions: [
                    {
                      title: "Option 1 sub 3 sub 1",
                      subOptions: [
                        {
                          title: "Hello words ",
                          icon: <BsHouseLock />,
                          onClick() {
                            console.log("Hello words ");
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  title: "Option 1 sub 4",
                  onClick() {
                    console.log("Option 1 sub 4");
                  },
                  closeOnClick: false,
                },
                {
                  title: "Option 1 sub 5",
                  onClick() {
                    console.log("Option 1 sub 5");
                  },
                },
              ],
            },
            {
              optionType: "Separator",
            },
            {
              title: "Option number 3",
              subOptions: [
                {
                  closeOnClick: true,
                  title: "Option 3 Sub 1",
                  icon: <Bs123 />,
                  onClick() {
                    console.log("Option 3 sub 1");
                  },
                },
              ],
            },
            {
              title: "Option number 3",
              icon: <BsAmazon />,
              subOptions: [
                {
                  closeOnClick: true,
                  title: "Option 3 Sub 1",
                  icon: <Bs123 />,
                  onClick() {
                    console.log("Option 3 sub 1");
                  },
                },
              ],
            },
            {
              optionType: "Separator",
            },
            {
              optionType: "Group",
              groupTitle: "Hello World",
            },
            {
              title: "Option number 3",
              icon: <BsArchive />,
              subOptions: [
                {
                  closeOnClick: true,
                  title: "Option 3 Sub 1",
                  icon: <Bs123 />,
                  onClick() {
                    console.log("Option 3 sub 1");
                  },
                },
              ],
            },
          ]}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </ContextMenu>
        <br />
        <br />

        <Menu.Menu
          // position="Top-Center"
          closeOnClick={false}
        >
          <Menu.Target>
            <Button>Menu Target Button</Button>
          </Menu.Target>
          <Menu.DropDown>
            <Menu.Label>Hello Application</Menu.Label>
            <Menu.Item
              leftSection={
                <div>
                  <BsHouseLock />
                </div>
              }
              closeMenuOnClick={true}
            >
              Hello There 1
            </Menu.Item>
            <Menu.Item disabled={true}>Hello There 2</Menu.Item>
            <Menu.Item>Hello There 3</Menu.Item>
            <Menu.Divider />
            <Menu.Item>Hello There 4</Menu.Item>
            <Menu.Item>Hello There 5</Menu.Item>
          </Menu.DropDown>
        </Menu.Menu>
        <br />
        <br />

        <Button variant="success-light" onClick={open}>
          Open Modal
        </Button>
        <Modal
          offset={24}
          withBackdrop={true}
          closeOnClickOutside={true}
          closeOnClickEsc={true}
          modalTriggerBtnVariant="success-outline"
          modalTrigger="Open Me"
        >
          Hello there
        </Modal>
        <br />
        <br />

        <Menu.Menu offset={4} position="Bottom-Start" closeOnClick={true}>
          <Menu.Target>
            <Button>Menu</Button>
          </Menu.Target>
          <Menu.DropDown>
            <Menu.Item closeMenuOnClick={false}>Menu Item 1</Menu.Item>
            <Menu.Item>Menu Item 2</Menu.Item>
            <Menu.Item>Menu Item 3</Menu.Item>
          </Menu.DropDown>
        </Menu.Menu>
        <br />
        <br />

        <Button variant="danger-light" onClick={lockScroll}>
          Disable Scroll
        </Button>
        <Button variant="warning-light" onClick={unlockScroll}>
          Enable Scroll
        </Button>
      </ComponentPropsProvider>
    </>
  );
}

export default App;

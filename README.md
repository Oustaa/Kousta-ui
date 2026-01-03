# Kousta-ui
Kousta-ui is a react ui library i have build after 3 years of experementing with other awesome ui libraries, and creating some custome ui components, it is meant for ease if use, and performance focuse.

[Docs](https://ui.kousta.org)

# Available Packges

## Components
- #### Installations:
  ```
    npm i @kousta-ui/components
  ```
- ### Usage:
```tsx
import { Modal, Button } from "@kousta-ui/components";
import { useDisclosure } from "@kousta-ui/hooks";

import "@kousta-ui/components/esm/index.css";

const App = () => {
  const { opened, close, open } = useDisclosure(false);

    <>
      {/* Uncontrolled Modal */}
      <Modal
        title="Modal Title"
        modalTrigger="Open Modal"
        position="left-top"
        fullHeight
        size="500"
      >
        Uncontrolled Modal
      </Modal>
      {/* Controlled Modal */}
      <Modal opened={opened} onClose={close} position="center" offset={0}>
        Controlled Modal
      </Modal>
      {/* Buttons */}
      <Button variant="primary-link" onClick={open}>
        Primary
      </Button>
      <Button variant="success-link" onClick={open}>
        Success Link | Open Controlled Modal
      </Button>
    </>
}

export default App;
```

- ### Preview
![Table preview](/static/images/rmd-file-components-preview.png)

## Table
- ### Installations:
  ```
    npm i @kousta-ui/table
  ```
- ### Usage:
```tsx
import { DataTable } from "@kousta-ui/table";
import { THeader } from "@kousta-ui/table/lib/DataTable/_props";

import "@kousta-ui/table/esm/index.css";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  location: { address: string; zipCode: string; country: string };
}

const App = () => {
  const users: Array<User> = [
    {
      id: 1,
      name: "User1",
      age: 27,
      email: "user1@gmail.com",
      location: {
        address: "street 1 city 1",
        zipCode: "11111",
        country: "country 1",
      },
    },
    {
      id: 2,
      name: "User2",
      age: 13,
      email: "user2@gmail.com",
      location: {
        address: "street 2 city 2",
        zipCode: "22222",
        country: "country 2",
      },
    },
  ];

  const headers: THeader<User> = {
    name: { value: "name" },
    age: { value: "age" },
    email: { value: "email" },
    address: { value: "location.address" },
    "Zip Code": {
      exec(row) {
        return <span>{row.location.zipCode}</span>;
      },
    },
  };

  return (
    <DataTable<User>
      title="users-table"
      data={users}
      headers={headers}
      loading={false}
      keyExtractor={(row) => row.id}
    />
  );
};

export default App;
```
- ### Preview
![Table preview](/static/images/rmd-file-table-preview.png)

## Helpers
- ### Installations:
  ```
    npm i @kousta-ui/helpers
  ```
- ### Usage:


## Hooks
- ### Installations:
  ```
    npm i @kousta-ui/hooks
  ```
- ### Usage:

```tsx
import { useDisclosure } from "@kousta-ui/hooks";

const App = () => {
  const { opened, open, close, toggle } = useDisclosure(false);
  const {  lockScroll, unlockScroll } = useScrollLock();

  return <>
    {opened && <p>Hello There</p>}
    <button onClick={open}>Open</button>
    <button onClick={close}>Close</button>
    <button onClick={toggle}>Toggle</button>

    <button onClick={lockScroll}>Lock Scroll</button>
    <button onClick={unlockScroll}>unlock Scroll</button>
  </>
}

export default App;
```

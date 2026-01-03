import { Button, Modal } from "@kousta-ui/components";
import { useDisclosure } from "@kousta-ui/hooks";

import "@kousta-ui/components/esm/index.css";

export const UncontrolledModal = () => {
  return (
    <Modal modalTrigger="Uncontrolled Modal">
      <p>This is a Uncontrolled Modal</p>
    </Modal>
  );
};

export const ControlledModal = () => {
  const { close, open, opened } = useDisclosure(false);

  return (
    <>
      <Modal onClose={close} opened={opened}>
        <p>This is a Controlled Modal</p>
      </Modal>
      <Button onClick={() => open()}>Controlled Modal</Button>
    </>
  );
};

export const ModalAsDrawer = () => {
  return (
    <>
      <Modal
        title="Drawer"
        modalTrigger="Modal As Drawer"
        position="left-top"
        fullHeight
        size="400"
      >
        <p>This is a Drawer Preview</p>
      </Modal>
    </>
  );
};

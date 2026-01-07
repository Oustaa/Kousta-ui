import React, { useMemo, useState } from "react";
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

const ALL_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
type Size = (typeof ALL_SIZES)[number];

const ALL_POSITIONS = [
  "center",
  "top",
  "bottom",
  "left",
  "left-top",
  "left-bottom",
  "right",
  "right-top",
  "right-bottom",
] as const;

type Position = (typeof ALL_POSITIONS)[number];

export const ModalSizePositionPreview = () => {
  const [size, setSize] = useState<Size>("md");
  const [position, setPosition] = useState<Position>("center");
  const [offset, setOffset] = useState<number>(0);
  const { close, open, opened } = useDisclosure(false);

  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <label htmlFor={`modal-size-${id}`} style={{ fontSize: 14 }}>
          Size
        </label>
        <select
          id={`modal-size-${id}`}
          value={size}
          onChange={(e) => setSize(e.target.value as Size)}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          {ALL_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label htmlFor={`modal-pos-${id}`} style={{ fontSize: 14 }}>
          Position
        </label>
        <select
          id={`modal-pos-${id}`}
          value={position}
          onChange={(e) => setPosition(e.target.value as Position)}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          {ALL_POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label htmlFor={`modal-off-${id}`} style={{ fontSize: 14 }}>
          Offset
        </label>
        <input
          id={`modal-off-${id}`}
          type="number"
          min={0}
          max={64}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          style={{ width: 90, padding: "6px 8px", borderRadius: 6 }}
        />

        <Button onClick={open}>Open modal</Button>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title={`Modal (${size}, ${position}, offset ${offset})`}
        size={size}
        position={position}
        offset={offset}
      >
        <p>Use the controls above, then open the modal.</p>
      </Modal>
    </div>
  );
};

export const ModalCloseBehaviorPreview = () => {
  const { close, open, opened } = useDisclosure(false);

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button onClick={open}>Open (outside+esc disabled)</Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Close behavior"
        closeOnClickEsc={false}
        closeOnClickOutside={false}
      >
        <p>
          This modal will not close on outside click or Escape. Use the close
          button.
        </p>
      </Modal>
    </div>
  );
};

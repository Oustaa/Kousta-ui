import React, { useRef } from "react";
import { ContextMenu } from "@kousta-ui/components";
import {
  LuCopy,
  LuTrash2,
  LuFolderPlus,
  LuUserPlus,
  LuDownload,
  LuArchive,
  LuShare2,
} from "react-icons/lu";

/** Quick start preview */
export const CM_QuickStartPreview = () => {
  return (
    <ContextMenu
      onOpen={() => {}}
      onClose={() => {}}
      options={[
        { optionType: "Group", groupTitle: "File" },
        { title: "New folder", icon: <LuFolderPlus />, onClick: () => {} },
        { optionType: "Separator" },
        { title: "Copy", icon: <LuCopy />, onClick: () => {} },
        {
          title: "Delete",
          icon: <LuTrash2 />,
          active: true,
          onClick: () => {},
        },
      ]}
    >
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click anywhere in this box
      </div>
    </ContextMenu>
  );
};

/** Basic right-click preview */
export const CM_BasicRightClickPreview = () => {
  return (
    <ContextMenu options={[{ title: "Rename", onClick() {} }]}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click me
      </div>
    </ContextMenu>
  );
};

/** Sub‑menus preview */
export const CM_SubMenusPreview = () => {
  const options = [
    {
      title: "Share",
      icon: <LuShare2 />,
      subOptions: [
        { title: "Copy link", onClick() {} },
        { title: "Invite people…", onClick() {} },
      ],
    },
    { optionType: "Separator" },
    {
      title: "Move to",
      subOptions: [
        { title: "Project A", onClick() {} },
        { title: "Project B", onClick() {} },
      ],
    },
  ] as any;

  return (
    <ContextMenu options={options}>
      <div
        style={{
          height: 120,
          display: "grid",
          placeItems: "center",
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click
      </div>
    </ContextMenu>
  );
};

/** Groups, separators, and icons preview */
export const CM_GroupsIconsPreview = () => {
  const options = [
    { optionType: "Group", groupTitle: "Members" },
    { title: "Invite", icon: <LuUserPlus />, onClick() {} },
    { optionType: "Separator" },
    { optionType: "Group", groupTitle: "File" },
    { title: "Download", icon: <LuDownload />, onClick() {} },
    { title: "Archive", icon: <LuArchive />, active: false, onClick() {} },
  ] as any;

  return (
    <ContextMenu options={options}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click here
      </div>
    </ContextMenu>
  );
};

/** Close behavior preview */
export const CM_CloseBehaviorPreview = () => {
  const options = [
    { title: "Select", onClick() {}, closeOnClick: false },
    { title: "Apply", onClick() {}, closeOnClick: true },
  ] as any;

  return (
    <ContextMenu itemCloseOnClick={false} options={options}>
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click (menu stays open unless item overrides)
      </div>
    </ContextMenu>
  );
};

/** Positioning interactive preview
 * We simulate right‑clicks at preset coordinates by dispatching a synthetic `contextmenu` event.
 */
export const CM_PositioningInteractivePreview = () => {
  const areaRef = useRef<HTMLDivElement | null>(null);

  const triggerAt = (xPct: number, yPct: number) => {
    const el = areaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = rect.left + rect.width * xPct;
    const clientY = rect.top + rect.height * yPct;
    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX,
      clientY,
    });
    el.dispatchEvent(event);
  };

  return (
    <ContextMenu
      options={
        [
          { title: "Item 1", onClick() {} },
          { title: "Item 2", onClick() {} },
          { title: "Item 3", onClick() {} },
        ] as any
      }
    >
      <div
        ref={areaRef}
        style={{
          position: "relative",
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
          padding: 24,
          minHeight: 180,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <button type="button" onClick={() => triggerAt(0.05, 0.1)}>
            Open at Top‑Left
          </button>
          <button type="button" onClick={() => triggerAt(0.95, 0.1)}>
            Open at Top‑Right
          </button>
          <button type="button" onClick={() => triggerAt(0.05, 0.9)}>
            Open at Bottom‑Left
          </button>
          <button type="button" onClick={() => triggerAt(0.95, 0.9)}>
            Open at Bottom‑Right
          </button>
          <button type="button" onClick={() => triggerAt(0.5, 0.5)}>
            Open at Center
          </button>
        </div>
        Right‑click anywhere in this box, or use the buttons above to simulate
        at edges/corners.
      </div>
    </ContextMenu>
  );
};

/** Custom wrapper element preview */
export const CM_CustomWrapperPreview = () => {
  const options = [{ title: "Open", onClick() {} }] as any;
  return (
    <ContextMenu As="section" options={options}>
      <section
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        <img
          alt="Thumbnail"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=="
          style={{ width: 48, height: 48, borderRadius: 6 }}
        />
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Right‑click the tile (section)
        </div>
      </section>
    </ContextMenu>
  );
};

/** Accessibility preview (demonstrative) */
export const CM_AccessibilityPreview = () => {
  return (
    <ContextMenu
      options={
        [
          { title: "Alpha", onClick() {} },
          { title: "Beta", onClick() {} },
        ] as any
      }
    >
      <div
        style={{
          padding: 16,
          border: "1px dashed var(--kui-neutral-400)",
          borderRadius: 8,
        }}
      >
        Right‑click; disabled items render as disabled buttons (via
        active:false)
      </div>
    </ContextMenu>
  );
};

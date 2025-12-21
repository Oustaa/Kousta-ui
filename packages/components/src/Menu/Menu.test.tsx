import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Menu from "./";
import { MenuPosition } from "./_props";

function renderMenu(position: MenuPosition, offset = 4) {
  render(
    <Menu.Menu position={position} offset={offset}>
      <Menu.Target>Menu</Menu.Target>
      <Menu.DropDown>
        <Menu.Item>Menu Item 1</Menu.Item>
      </Menu.DropDown>
    </Menu.Menu>,
  );
}

async function openMenu() {
  const user = userEvent.setup();

  const menuTarget = screen.getByText("Menu");

  await user.click(menuTarget);
}

describe("Menu", () => {
  describe("Menu Target Component", () => {
    beforeEach(() => {
      render(
        <Menu.Menu>
          <Menu.Target>Menu</Menu.Target>
          <Menu.DropDown>
            <Menu.Item>Menu Item 1</Menu.Item>
            <Menu.Item>Menu Item 2</Menu.Item>
            <Menu.Item>Menu Item 3</Menu.Item>
          </Menu.DropDown>
        </Menu.Menu>,
      );
    });
    it("should render the content", () => {
      const menuTarget = screen.getByText("Menu");
      expect(menuTarget).toBeInTheDocument();
    });

    it("should render drop down on click", async () => {
      const user = userEvent.setup();

      const menuTarget = screen.getByText("Menu");
      expect(menuTarget).toBeInTheDocument();

      const menuItemB = screen.queryByText("Menu Item 1");
      expect(menuItemB).not.toBeInTheDocument();

      await user.click(menuTarget);
    });

    it("should close menu on click on MenuItem", async () => {
      const user = userEvent.setup();

      const menuTarget = screen.getByText("Menu");

      await user.click(menuTarget);

      const menuItem = screen.getByText("Menu Item 1");

      await user.click(menuItem);

      const menuItemA = screen.queryByText("Menu Item 1");
      expect(menuItemA).not.toBeInTheDocument();
    });

    // should close menu on click outside the menu
  });

  it("should open Menu on hover type", async () => {
    render(
      <Menu.Menu type="hover" position="Left-End">
        <Menu.Target>Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Item>Menu Item 1</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>,
    );

    const target = screen.getByText("Menu");
    await userEvent.hover(target);

    const dropdown = screen.getByText("Menu Item 1")
      .parentElement as HTMLElement;
    expect(dropdown).toHaveStyle({ right: "calc(100% + 4px)", bottom: "0" });
  });

  it("should not close menu if click on the MenuItem, with closeItemOnClick=false", async () => {
    const user = userEvent.setup();

    render(
      <Menu.Menu>
        <Menu.Target>Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
          <Menu.Item>Menu Item 3</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>,
    );

    await openMenu();

    const menuItems = screen.getAllByText(/Menu Item \d/);
    expect(menuItems).toHaveLength(3);

    for (const menuItem of menuItems) {
      user.click(menuItem);
      const menuItems = screen.getAllByText(/Menu Item \d/);
      expect(menuItems).toHaveLength(3);
    }
  });

  it("should close menu onClick on MenuItem if closeMenuOnClick is true", async () => {
    const user = userEvent.setup();

    render(
      <Menu.Menu closeOnClick={false}>
        <Menu.Target>Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
          <Menu.Item closeMenuOnClick={true}>Menu Item 3</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>,
    );

    await openMenu();

    const menuItems = screen.getAllByText(/Menu Item (?!3\b)\d+\b/);
    expect(menuItems).toHaveLength(2);

    for (const menuItem of menuItems) {
      await user.click(menuItem);
      const menuItems = screen.getAllByText(/Menu Item \d/);
      expect(menuItems).toHaveLength(3);
    }

    const menuItem3 = screen.getByText(/Menu Item 3/);
    expect(menuItem3).toBeInTheDocument();

    await user.click(menuItem3);

    const menuItem3A = screen.queryByText(/Menu Item 3/);
    expect(menuItem3A).not.toBeInTheDocument();
  });

  it("should render a divider properly", async () => {
    render(
      <Menu.Menu closeOnClick={false}>
        <Menu.Target>Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
          <Menu.Item closeMenuOnClick={true}>Menu Item 3</Menu.Item>
          <Menu.Divider />
        </Menu.DropDown>
      </Menu.Menu>,
    );

    await openMenu();

    const hrElement = screen.getByRole("separator");
    expect(hrElement).toBeInTheDocument();
  });

  it("should render a label", async () => {
    render(
      <Menu.Menu closeOnClick={false}>
        <Menu.Target>Menu</Menu.Target>
        <Menu.DropDown>
          <Menu.Label>Menu label</Menu.Label>
          <Menu.Item>Menu Item 1</Menu.Item>
          <Menu.Item>Menu Item 2</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>,
    );

    await openMenu();

    const labelElement = screen.getByText("Menu label");
    expect(labelElement).toBeInTheDocument();
  });

  describe("Menu position styles", () => {
    it.each([
      ["Bottom-Start", { top: "calc(100% + 4px)", left: "0" }],
      [
        "Bottom-Center",
        { top: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)" },
      ],
      ["Bottom-End", { top: "calc(100% + 4px)", right: "0" }],
      ["Top-End", { bottom: "calc(100% + 4px)", right: "0" }],
      [
        "Left-Center",
        {
          right: "calc(100% + 4px)",
          top: "50%",
          transform: "translateY(-50%)",
        },
      ],
      ["Right-Start", { top: "0", left: "calc(100% + 4px)" }],
    ] as const)("applies correct style for %s", async (pos, expected) => {
      renderMenu(pos as MenuPosition);
      await openMenu();
      const dropdown = screen.getByRole("menu");

      expect(dropdown).toHaveStyle(expected);
    });

    it("respects custom offset", async () => {
      renderMenu("Bottom-Center", 12);
      await openMenu();
      const dropdown = screen.getByRole("menu");
      expect(dropdown).toHaveStyle({ top: "calc(100% + 12px)" });
    });
  });
});

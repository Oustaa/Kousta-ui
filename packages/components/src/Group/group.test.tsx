import { render, screen } from "@testing-library/react";
import Group from ".";
import Button from "../Button";

describe("Group Tests", () => {
  describe("One Element Tests", () => {
    describe("default props", () => {
      beforeEach(() => {
        render(
          <Group>
            <Button>hello</Button>
          </Group>,
        );
      });

      it("should render the elements", () => {
        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();

        const buttonElements = screen.getAllByRole("button");
        expect(buttonElements).toHaveLength(1);
      });

      it("should render in the row direction by default", () => {
        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();
        expect(groupElement).not.toHaveStyle({ flexDirection: "column" });
      });
    });

    describe("passed props", () => {
      it("should render in the column direction if passed", () => {
        render(
          <Group direction="column">
            <Button>hello</Button>
          </Group>,
        );

        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();
        expect(groupElement).toHaveStyle({ flexDirection: "column" });
      });

      it("should render a gap if gap is passed", () => {
        render(
          <Group direction="column" gap="12px">
            <Button>hello</Button>
          </Group>,
        );

        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();
        expect(groupElement).toHaveStyle({
          flexDirection: "column",
          gap: "12px",
        });
      });
    });
  });

  describe("Multi Element Tests", () => {
    describe("row direction", () => {
      it("should trancate the borders of 2 elements correctly", () => {
        render(
          <Group>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </Group>,
        );

        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();

        const buttonElements = screen.getAllByRole("button");
        expect(buttonElements).toHaveLength(2);

        expect(buttonElements[0]).toHaveStyle({
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        });

        expect(buttonElements[1]).toHaveStyle({
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        });
      });

      it("should trancate the borders of n(n>2) elements correctly", () => {
        render(
          <Group>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </Group>,
        );

        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();

        const buttonElements = screen.getAllByRole("button");
        expect(buttonElements).toHaveLength(3);

        expect(buttonElements[0]).toHaveStyle({
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        });

        expect(buttonElements[1]).toHaveStyle({
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        });

        expect(buttonElements[2]).toHaveStyle({
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        });
      });
    });

    describe("column direction", () => {
      it("should trancate the borders of 2 elements correctly", () => {
        render(
          <Group direction="column">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </Group>,
        );

        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();

        const buttonElements = screen.getAllByRole("button");
        expect(buttonElements).toHaveLength(2);

        expect(buttonElements[0]).toHaveStyle({
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        });

        expect(buttonElements[1]).toHaveStyle({
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        });
      });

      it("should trancate the borders of n(n>2) elements correctly", () => {
        render(
          <Group direction="column">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </Group>,
        );

        const groupElement = screen.getByRole("group");
        expect(groupElement).toBeInTheDocument();

        const buttonElements = screen.getAllByRole("button");
        expect(buttonElements).toHaveLength(3);

        expect(buttonElements[0]).toHaveStyle({
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        });

        expect(buttonElements[1]).toHaveStyle({
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        });

        expect(buttonElements[2]).toHaveStyle({
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        });
      });
    });
  });
});

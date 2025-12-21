import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";
import { ComponentPropsProvider } from "../PropsContext";

describe("Button test", () => {
  it("should render props", () => {
    const content = "Kousta ui";
    render(<Button>{content}</Button>);
    const buttonElement = screen.getByRole("button", { name: content });

    expect(buttonElement).toBeTruthy();
  });

  it("should invoke the onClick function", () => {
    const onClickCallBack = jest.fn();

    render(<Button onClick={onClickCallBack}>Kousta ui</Button>);
    const buttonElement = screen.getByRole("button", { name: /Kousta ui/i });

    fireEvent.click(buttonElement);

    expect(onClickCallBack).toHaveBeenCalledTimes(1);
  });

  it("should not invoke the onClick function if the button was desibled", () => {
    const onClickCallBack = jest.fn();

    render(
      <Button onClick={onClickCallBack} disabled>
        Kousta ui
      </Button>,
    );
    const buttonElement = screen.getByRole("button", { name: /Kousta ui/i });

    fireEvent.click(buttonElement);

    expect(onClickCallBack).not.toHaveBeenCalled();
  });

  it("renders and handles click", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Kousta ui</Button>);

    fireEvent.click(screen.getByRole("button", { name: /Kousta ui/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not click when disabled", () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Kousta ui
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Kousta ui/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="neutral-light" size="lg">
        A
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "A" });
    expect(btn.className).toMatch(/btn-neutral-light/);
    expect(btn.className).toMatch(/btn-lg/);
  });

  it("shows loadingIndicator and disables when loading", () => {
    render(
      <Button loading loadingIndicator="Please wait">
        Load
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("data-loading", "true");
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });

  it("provider sets defaults", () => {
    render(
      <ComponentPropsProvider button={{ size: "sm", type: "submit" }}>
        <Button>Save</Button>
      </ComponentPropsProvider>,
    );
    const btn = screen.getByRole("button", {
      name: "Save",
    }) as HTMLButtonElement;
    expect(btn.type).toBe("submit");
    expect(btn.className).toMatch(/btn-sm/);
  });

  it("provider custom variant is merged", () => {
    render(
      <ComponentPropsProvider
        button={{ variants: { mine: { style: { backgroundColor: "red" } } } }}
      >
        <Button variant="mine" style={{ opacity: 0.5 }}>
          X
        </Button>
      </ComponentPropsProvider>,
    );
    const btn = screen.getByRole("button", { name: "X" });
    expect((btn as HTMLButtonElement).style.backgroundColor).toBe("red");
    expect((btn as HTMLButtonElement).style.opacity).toBe("0.5");
  });
});

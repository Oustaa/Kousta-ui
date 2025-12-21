import { render, screen } from "@testing-library/react";
import Label from ".";

describe("Label Tests", () => {
  it("should render a label", () => {
    render(<Label>label</Label>);

    const labelElement = screen.getByText(/label/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("data-error", "false");
  });

  it("adds the required data attribute", () => {
    render(<Label required>label</Label>);

    const labelElement = screen.getByText(/label/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("data-required", "true");
  });

  it("should have a data-error set to true, in case of error ", () => {
    render(<Label errors={["Error"]}>label</Label>);
    const labelElement = screen.getByText(/label/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("data-error", "true");
    expect(labelElement).toHaveStyle({ color: "var(--kui-danger-600)" });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from ".";

describe("Paginaiton", () => {
  describe("Basic Pages display", () => {
    const totalPages = 10;

    it.each([
      [
        "start",
        { page: 1, totalPages },
        { elements: [1, 2, 3, 4, 5, "...", 10], dots: 1 },
      ],
      [
        "middle",
        { page: 6, totalPages },
        { elements: [1, 5, 6, 7, 10], dots: 2 },
      ],
      [
        "end",
        { page: 10, totalPages },
        { elements: [1, "...", 6, 7, 8, 9, 10], dots: 1 },
      ],
    ] as const)(
      "should render the correct items in the %s",
      (_position, renderProps, expected) => {
        render(<Pagination {...renderProps} />);

        expected.elements.forEach((item) => {
          const element = screen.getByText(String(item));
          expect(element).toBeInTheDocument();

          if (item === renderProps.page) {
            expect(element).toHaveClass("kui-pagination-active-link");
          }
        });

        if (expected.dots !== undefined) {
          expect(screen.getAllByText("...")).toHaveLength(expected.dots);
        }
      },
    );
  });

  describe("Basic Pages display with seblings", () => {
    const totalPages = 20;
    const seblings = 2;

    it.each([
      [
        "start",
        { page: 1, totalPages, seblings },
        { elements: [1, 2, 3, 4, 5, 6, 7, "...", 20], dots: 1 },
      ],
      [
        "middle",
        { page: 10, totalPages, seblings },
        { elements: [1, 8, 9, 10, 11, 12, 20], dots: 2 },
      ],
      [
        "end",
        { page: 20, totalPages, seblings },
        { elements: [1, "...", 16, 17, 18, 19, 20], dots: 1 },
      ],
    ] as const)(
      "should render the correct items in the %s",
      (_position, renderProps, expected) => {
        render(<Pagination {...renderProps} />);

        expected.elements.forEach((item) => {
          expect(screen.getByText(String(item))).toBeInTheDocument();
        });

        if (expected.dots !== undefined) {
          expect(screen.getAllByText("...")).toHaveLength(expected.dots);
        }
      },
    );
  });

  describe("Prev, Next disable when they should", () => {
    it("Prev, Should be desibled on first page", () => {
      render(<Pagination page={1} totalPages={10} />);

      const prevButton = screen.getByRole("button", {
        name: /prev/i,
      });

      expect(prevButton).toHaveProperty("disabled", true);
    });

    it("Next, Should be desibled on last page", () => {
      render(<Pagination page={10} totalPages={10} />);

      const nextButton = screen.getByRole("button", { name: /next/i });

      expect(nextButton).toHaveProperty("disabled", true);
    });
  });

  it("should call onChange callback with function on click", async () => {
    const onChange = jest.fn();

    render(<Pagination page={1} totalPages={10} onChange={onChange} />);

    // next change
    const nextButton = screen.getByRole("button", { name: /next/i });
    await userEvent.click(nextButton);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);

    // prev change
    const prevButton = screen.getByRole("button", { name: /prev/i });
    await userEvent.click(prevButton);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(1);

    // page change
    const pageButton = screen.getByRole("button", { name: /4/i });
    await userEvent.click(pageButton);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("all buttons should have a disabled state, and call back should not workd", () => {
    const onChange = jest.fn();

    render(
      <Pagination page={1} totalPages={10} disabled onChange={onChange} />,
    );

    [1, 2, 3, 4, 5, "...", 10].forEach((item) => {
      const element = screen.getByText(item);
      expect(element).toHaveProperty("disabled", true);
    });
  });
});

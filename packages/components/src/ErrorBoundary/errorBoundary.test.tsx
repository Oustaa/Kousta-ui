import { render, screen } from "@testing-library/react";

import ErrorBoundry from ".";
import { useEffect } from "react";

const ErrorComp = () => {
  useEffect(() => {
    throw "Error";
  }, []);

  return <></>;
};

describe("ErrorBoundary Tests", () => {
  it("should catch the error and thow the default error message", () => {
    render(
      <ErrorBoundry>
        <ErrorComp />
      </ErrorBoundry>,
    );

    const errorMessage = screen.getByRole("heading", {
      name: /An Error Has Ocured/,
    });

    expect(errorMessage).toBeInTheDocument();
  });

  it("should catch the error and render the passed fallback component", () => {
    render(
      <ErrorBoundry fallback={<h4>Custom error message</h4>}>
        <ErrorComp />
      </ErrorBoundry>,
    );

    const errorMessage = screen.getByRole("heading", {
      name: /Custom error message/i,
    });

    expect(errorMessage).toBeInTheDocument();
  });

  it("should catch the error and call onError function", () => {
    const onErrorCb = jest.fn();
    render(
      <ErrorBoundry onError={onErrorCb}>
        <ErrorComp />
      </ErrorBoundry>,
    );

    expect(onErrorCb).toHaveBeenCalled();
  });
});

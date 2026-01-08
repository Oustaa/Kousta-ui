import { Component, isValidElement, PropsWithChildren, ReactNode } from "react";

import classes from "./ErrorBoundary.module.css";

type ErrorBoundryProps = PropsWithChildren<{
  fallback?: ReactNode;
  onError?: (error: Error) => void;
  throwOnError?: boolean;
}>;

type ErrorBoundryState = {
  hasError: boolean;
  error?: { message: string; stack: string };
};

class ErrorBoundry extends Component<ErrorBoundryProps, ErrorBoundryState> {
  state = { hasError: false, error: undefined, loading: false };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error): void {
    const onError = this.props.onError;

    if (onError && typeof onError === "function") onError(error);
    if (this.props.throwOnError) {
      throw error;
    }
  }

  render() {
    const fallback = this.props.fallback;

    if (this.state.hasError) {
      if (fallback && isValidElement(fallback)) return fallback;
      return (
        <h3 className={`${classes["error-text"]} kui-error-boundary-text`}>
          An Error Has Ocured
        </h3>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;

import "@testing-library/jest-dom";

// jsdom ships no IntersectionObserver, and the Select dropdown observes its
// options — without this the dropdown throws and the ErrorBoundary swallows it,
// so any test that opens a select sees an empty menu.
if (!("IntersectionObserver" in globalThis)) {
  globalThis.IntersectionObserver = class {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}

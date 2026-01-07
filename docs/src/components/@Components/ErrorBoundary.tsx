import React, { useState } from "react";
import { ErrorBoundary, Button } from "@kousta-ui/components";

// A component that will throw an error when a button is clicked
const ProblematicComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Kaboom! An error was thrown.");
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="danger-outline">
      Click to Trigger Error
    </Button>
  );
};

export const DefaultFallbackPreview = () => (
  <div style={{ border: '1px solid var(--kui-neutral-300)', padding: '1rem', borderRadius: 'var(--kui-rounded)' }}>
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  </div>
);

export const CustomFallbackPreview = () => {
  const CustomFallback = (
    <div style={{ color: 'orange', padding: '1rem', border: '1px dashed orange' }}>
      <p><strong>Oops! Something went wrong.</strong></p>
      <p>We've been notified and are looking into it.</p>
    </div>
  );

  return (
    <div style={{ border: '1px solid var(--kui-neutral-300)', padding: '1rem', borderRadius: 'var(--kui-rounded)' }}>
      <ErrorBoundary fallback={CustomFallback}>
        <ProblematicComponent />
      </ErrorBoundary>
    </div>
  );
};

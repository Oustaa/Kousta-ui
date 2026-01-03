import type { Preview } from "@storybook/react";
import type { Decorator } from "@storybook/react";

import "@kousta-ui/styles/tokens.css";
import "@kousta-ui/components/esm/index.css";
import "@kousta-ui/table/esm/index.css";

import React from "react";

const withOustaUiTheme: Decorator = (Story) =>
  React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        padding: 24,
        background: "light-dark(var(--Oui-neutral-50), var(--Oui-neutral-900))",
        color: "light-dark(var(--Oui-neutral-950), var(--Oui-neutral-50))",
      },
    },
    React.createElement(Story),
  );

const preview: Preview = {
  decorators: [withOustaUiTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

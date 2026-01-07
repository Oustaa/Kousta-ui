import React, { useState } from "react";
import { Input } from "@kousta-ui/components";

export const QuickStartPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Input label="Email" placeholder="you@example.com" type="email" />
  </div>
);

export const WithErrorsPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Input
      label="Email"
      placeholder="you@example.com"
      defaultValue="not-an-email"
      errors={["Please enter a valid email"]}
    />
  </div>
);

export const WithSectionsPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Input
      label="Amount"
      placeholder="0.00"
      type="number"
      leftSection={<span style={{ padding: "0 8px", opacity: 0.7 }}>$</span>}
      rightSection={<span style={{ padding: "0 8px", opacity: 0.7 }}>USD</span>}
    />
  </div>
);

export const PasswordInputPreview = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Input
        label="Password"
        placeholder="Enter password"
        type={visible ? "text" : "password"}
        rightSection={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "0 8px",
            }}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? "🙈" : "👁️"}
          </button>
        }
        required
      />
    </div>
  );
};

export const HorizontalLabelPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Input
      label="Username"
      placeholder="john_doe"
      labelPosition="x"
      labelProps={{ style: { minWidth: 100 } }}
    />
  </div>
);

export const DisabledInputPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Input
      label="Read-only Field"
      placeholder="Cannot edit"
      disabled
      defaultValue="Some read-only value"
    />
  </div>
);

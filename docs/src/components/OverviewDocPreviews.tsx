"use client";
import React, { useState } from "react";
import CodePreviewWrapper from "@/components/CodePreviewWrapper";
import { Button, Modal, Input, Select, WindowBoundary, ComponentPropsProvider } from "@kousta-ui/components";


/** a tiny inline image, so the lazy-loading demo never depends on a host */
const LAZY_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
       <rect width="400" height="200" fill="#9141ac"/>
       <text x="200" y="108" font-family="system-ui, sans-serif" font-size="20"
             fill="#fff" text-anchor="middle">Loaded when scrolled into view</text>
     </svg>`,
  );

const validate = (values: { name: string; email: string }) => {
  const next: Record<string, string> = {};
  if (!values.name.trim()) next.name = "Name is required";
  if (!values.email.trim()) next.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    next.email = "Enter a valid email address";
  return next;
};

function FormValidationPreview() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const update = (field: "name" | "email") => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    setSent(false);
    // re-validate as they type, but only once the field has been flagged
    if (errors[field]) setErrors(validate(next));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}
    >
      <Input
        label="Name"
        required
        value={values.name}
        errors={errors.name ? [errors.name] : []}
        onChange={update("name")}
      />
      <Input
        label="Email"
        type="email"
        required
        value={values.email}
        errors={errors.email ? [errors.email] : []}
        onChange={update("email")}
      />
      <Button variant="primary" type="submit">
        Send Message
      </Button>
      {sent && (
        <span style={{ fontSize: 13, color: "var(--kui-success-600)" }}>
          Looks good — this is where you would submit.
        </span>
      )}
    </form>
  );
}

export function OverviewQuickStart() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "App.tsx",
      code: `import { Button, Modal, Input } from "@kousta-ui/components";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Form">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button>Submit</Button>
      </Modal>
    </div>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "App.jsx",
      code: `import { Button, Modal, Input } from "@kousta-ui/components";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Form">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button>Submit</Button>
      </Modal>
    </div>
  );
}`
    }
  ]}
  preview={
    (() => {
      const QuickStartPreview = () => {
        const [opened, setOpened] = useState(false);
        return (
          <div>
            <Button onClick={() => setOpened(true)}>
              Open Modal
            </Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Form">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Input label="Email" placeholder="you@example.com" />
                <Input label="Password" type="password" />
                <Button>Submit</Button>
              </div>
            </Modal>
          </div>
        );
      };
      return <QuickStartPreview />;
    })()
  }
  defaultTab="ts"
/>
  );
}

export function OverviewProvider() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ComponentPropsProvider.tsx",
      code: `import { ComponentPropsProvider } from "@kousta-ui/components";

<ComponentPropsProvider
  button={{
    size: "sm",
    variant: "primary",
    variants: {
      brand: {
        className: "brand-btn",
        style: { background: "#your-brand-color" },
      },
    },
  }}
>
  <YourApp />
</ComponentPropsProvider>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ComponentPropsProvider.jsx",
      code: `import { ComponentPropsProvider } from "@kousta-ui/components";

<ComponentPropsProvider
  button={{
    size: "sm",
    variant: "primary",
    variants: {
      brand: {
        className: "brand-btn",
        style: { background: "#your-brand-color" },
      },
    },
  }}
>
  <YourApp />
</ComponentPropsProvider>`
    }
  ]}
  preview={
    (() => {
      const ComponentPropsProviderPreview = () => {
        return (
          <ComponentPropsProvider
            button={{
              size: "sm",
              variant: "primary",
              variants: {
                brand: {
                  className: "brand-btn",
                  style: { background: "#your-brand-color" },
                },
              },
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Provider defaults (small, primary)</div>
                <Button>Default Button</Button>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Custom variant (brand)</div>
                <Button variant="brand">Brand Button</Button>
              </div>
            </div>
          </ComponentPropsProvider>
        );
      };
      return <ComponentPropsProviderPreview />;
    })()
  }
  defaultTab="ts"
/>
  );
}

export function OverviewTsOnly() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "CustomButton.tsx",
      code: `import { Button, ButtonProps } from "@kousta-ui/components";
import { FC } from "react";

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />;
};`
    },
    {
      value: "js",
      language: "jsx",
      filename: "CustomButton.jsx",
      code: `import { Button } from "@kousta-ui/components";

const CustomButton = ({ customProp, ...props }) => {
  return <Button {...props} />;
};`
    }
  ]}
  preview={null}
  defaultTab="ts"
/>
  );
}

export function OverviewFormValidation() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "ContactForm.tsx",
      code: `import { Input, Button } from "@kousta-ui/components";
import { useState } from "react";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    errors.email = "Enter a valid email address";
  return errors;
};

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    // only re-check a field once it has already been flagged
    if (errors[field]) setErrors(validate(next));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Input
        label="Name"
        required
        value={values.name}
        errors={errors.name ? [errors.name] : []}
        onChange={update("name")}
      />
      <Input
        label="Email"
        type="email"
        required
        value={values.email}
        errors={errors.email ? [errors.email] : []}
        onChange={update("email")}
      />
      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </form>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "ContactForm.jsx",
      code: `import { Input, Button } from "@kousta-ui/components";
import { useState } from "react";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    errors.email = "Enter a valid email address";
  return errors;
};

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    // only re-check a field once it has already been flagged
    if (errors[field]) setErrors(validate(next));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Input
        label="Name"
        required
        value={values.name}
        errors={errors.name ? [errors.name] : []}
        onChange={update("name")}
      />
      <Input
        label="Email"
        type="email"
        required
        value={values.email}
        errors={errors.email ? [errors.email] : []}
        onChange={update("email")}
      />
      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </form>
  );
}`
    }
  ]}
  preview={
    (() => {
      return <FormValidationPreview />;
    })()
  }
  defaultTab="ts"
/>
  );
}

export function OverviewLazyImage() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "LazyImage.tsx",
      code: `import { WindowBoundary } from "@kousta-ui/components";
import { useState } from "react";

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <WindowBoundary
      onceItemEnter={() => setIsLoaded(true)}
      threshold={0.1}
    >
      <div style={{ minHeight: "200px" }}>
        {isLoaded ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            background: "#f5f5f5"
          }}>
            Loading...
          </div>
        )}
      </div>
    </WindowBoundary>
  );
}`
    },
    {
      value: "js",
      language: "jsx",
      filename: "LazyImage.jsx",
      code: `import { WindowBoundary } from "@kousta-ui/components";
import { useState } from "react";

function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <WindowBoundary
      onceItemEnter={() => setIsLoaded(true)}
      threshold={0.1}
    >
      <div style={{ minHeight: "200px" }}>
        {isLoaded ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            background: "#f5f5f5"
          }}>
            Loading...
          </div>
        )}
      </div>
    </WindowBoundary>
  );
}`
    }
  ]}
  preview={
    (() => {
      const LazyImagePreview = () => {
        const [isLoaded, setIsLoaded] = useState(false);
        return (
          <WindowBoundary
            onceItemEnter={() => setIsLoaded(true)}
            threshold={0.1}
          >
            <div style={{ minHeight: "200px" }}>
              {isLoaded ? (
                <img
                  src={LAZY_IMAGE}
                  alt="Lazy loaded"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              ) : (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  background: "#f5f5f5"
                }}>
                  Loading...
                </div>
              )}
            </div>
          </WindowBoundary>
        );
      };
      return <LazyImagePreview />;
    })()
  }
  defaultTab="ts"
/>
  );
}

export function OverviewMuiMigration() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MigrationMaterialUI.tsx",
      code: `// Material-UI
<Button variant="contained" color="primary">
  Click me
</Button>

// Kousta UI
<Button variant="primary">
  Click me
</Button>`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MigrationMaterialUI.jsx",
      code: `// Material-UI
<Button variant="contained" color="primary">
  Click me
</Button>

// Kousta UI
<Button variant="primary">
  Click me
</Button>`
    }
  ]}
  preview={
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Material-UI</div>
        <Button variant="primary">Click me</Button>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Kousta UI</div>
        <Button variant="primary">Click me</Button>
      </div>
    </div>
  }
  defaultTab="ts"
/>
  );
}

export function OverviewAntMigration() {
  return (
<CodePreviewWrapper
  tabs={[
    {
      value: "ts",
      language: "tsx",
      filename: "MigrationAntDesign.tsx",
      code: `// Ant Design
<Input placeholder="Enter text" />
<Select>
  <Option value="1">Option 1</Option>
</Select>

// Kousta UI
<Input placeholder="Enter text" />
<Select data={[{ value: "1", label: "Option 1" }]} />`
    },
    {
      value: "js",
      language: "jsx",
      filename: "MigrationAntDesign.jsx",
      code: `// Ant Design
<Input placeholder="Enter text" />
<Select>
  <Option value="1">Option 1</Option>
</Select>

// Kousta UI
<Input placeholder="Enter text" />
<Select data={[{ value: "1", label: "Option 1" }]} />`
    }
  ]}
  preview={
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Ant Design</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input placeholder="Enter text" />
          <Select data={[{ value: "1", label: "Option 1" }]} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Kousta UI</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input placeholder="Enter text" />
          <Select data={[{ value: "1", label: "Option 1" }]} />
        </div>
      </div>
    </div>
  }
  defaultTab="ts"
/>
  );
}


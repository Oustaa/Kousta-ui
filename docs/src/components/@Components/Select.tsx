import React, { useState } from "react";
import { ComponentPropsProvider, Select } from "@kousta-ui/components";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  X,
  XCircle,
} from "lucide-react";

const frameworkData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
  { value: "angular", label: "Angular" },
];

export const QuickStartPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="Choose a framework"
      data={frameworkData}
      onChange={(value) => console.log(value)}
      clearable
    />
  </div>
);

export const DisabledOptionsPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="Svelte is disabled"
      data={frameworkData}
      disabledOption={(item) => item.disabled}
    />
  </div>
);

export const ClearablePreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="Choose a framework"
      data={frameworkData}
      clearable
    />
  </div>
);

export const NonSearchablePreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="Search is disabled"
      data={frameworkData}
      seachable={false}
    />
  </div>
);

export const WithErrorsPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="Choose a framework"
      data={frameworkData}
      errors={["This field is required"]}
      required
    />
  </div>
);

type UserRow = {
  id: number;
  first_name: string;
  last_name: string;
};

const usersData: UserRow[] = [
  { id: 1, first_name: "Nova", last_name: "Reed" },
  { id: 2, first_name: "Kai", last_name: "Morgan" },
  { id: 3, first_name: "Zara", last_name: "Quinn" },
  { id: 4, first_name: "Milo", last_name: "Hayes" },
];

export const GenericTypesPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select<UserRow>
      label="Users"
      placeholder="Select a user"
      data={usersData}
      options={{ value: "id", label: "first_name last_name" }}
      onChange={(value) => console.log(value)}
    />
  </div>
);

export const CustomRenderPreview = () => {
  const userData = [
    { id: 1, name: "John Doe", email: "john@work.com", online: true },
    { id: 2, name: "Jane Smith", email: "jane@work.com", online: false },
    { id: 3, name: "Peter Jones", email: "peter@work.com", online: true },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Select
        label="Assign to"
        placeholder="Select a user"
        data={userData}
        options={{
          value: "id",
          label: "name",
          renderOption: (user) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: user.online ? 'green' : 'gray'
              }} />
              <div>
                <div>{user.name}</div>
                <div style={{ fontSize: '0.8em', opacity: 0.7 }}>{user.email}</div>
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export const IconsOverrideWithPropPreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="With custom icons"
      data={frameworkData}
      clearable
      icons={{
        clear: <X size={16} />,
        open: <ChevronUp size={16} />,
        close: <ChevronDown size={16} />,
        loading: <Loader2 size={16} />,
      }}
    />
  </div>
);

export const IconsOverrideWithProviderPreview = () => (
  <ComponentPropsProvider
    select={{
      icons: {
        clear: <X size={16} />,
        open: <ChevronUp size={16} />,
        close: <ChevronDown size={16} />,
      },
    }}
  >
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Select
        label="Framework"
        placeholder="Icons from provider"
        data={frameworkData}
        clearable
      />
    </div>
  </ComponentPropsProvider>
);

export const ComponentPropsProviderPreview = () => (
  <ComponentPropsProvider
    select={{
      seachable: false,
      clearable: false,
      emptyMessage: "Nothing here",
      labelProps: { style: { color: "#555" } },
      icons: {
        clear: <X size={16} />,
        open: <ChevronUp size={16} />,
        close: <ChevronDown size={16} />,
      },
    }}
  >
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Select
        label="Framework"
        placeholder="Provider overrides"
        data={frameworkData}
      />
    </div>
  </ComponentPropsProvider>
);

export const OnSearchPreview = () => {
  const users = [
    { id: 1, first_name: "Nova", last_name: "Reed" },
    { id: 2, first_name: "Kai", last_name: "Morgan" },
    { id: 3, first_name: "Zara", last_name: "Quinn" },
    { id: 4, first_name: "Milo", last_name: "Hayes" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Select
        label="Users"
        placeholder="Search by exact first name"
        data={users}
        options={{ value: "id", label: "first_name last_name" }}
        onSearch={(row, term) =>
          row.first_name.toLowerCase() === term.toLowerCase()
        }
      />
    </div>
  );
};

export const ErrorHandlingPreview = () => {
  const users = [
    { id: 5, first_name: "Safe", last_name: "User" },
    { id: 6, first_name: "Broken", last_name: "Option" },
    { id: 7, first_name: "Another", last_name: "User" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Select
        label="Option error boundary"
        placeholder="Option with id 6 throws"
        data={users}
        options={{
          value: "id",
          label: "first_name last_name",
          renderOption: (row) => {
            if (row.id === 6) throw new Error("Option render failed");
            return `${row.first_name} ${row.last_name}`;
          },
        }}
        optionErrorFallback={({ row }) => (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 8px",
              borderRadius: 8,
              background: "rgba(220, 38, 38, 0.12)",
              color: "#dc2626",
              fontSize: 12,
            }}
          >
            <XCircle size={14} />
            Failed to render option (id: {row.id})
          </span>
        )}
      />
    </div>
  );
};

export const EmptyMessagePreview = () => (
  <div style={{ width: "100%", maxWidth: 420 }}>
    <Select
      label="Framework"
      placeholder="No options"
      data={[]}
      emptyMessage="Nothing to show"
    />
  </div>
);

export const OnBlurPreview = () => {
  const [blurCount, setBlurCount] = useState(0);

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <div style={{ fontSize: 12, marginBottom: 8 }}>onBlur calls: {blurCount}</div>
      <Select
        label="Framework"
        placeholder="Close dropdown to trigger onBlur"
        data={frameworkData}
        onBlur={(target) => {
          setBlurCount((c) => c + 1);
          target.clear();
        }}
      />
    </div>
  );
};

export const RawValuePreview = () => {
  const [selected, setSelected] = useState<unknown>(null);

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <Select
        label="Framework"
        placeholder="rawValue=true"
        data={frameworkData}
        rawValue
        onChange={(value) => setSelected(value)}
      />
      <pre style={{ marginTop: 12, fontSize: 12, whiteSpace: "pre-wrap" }}>
        {selected ? JSON.stringify(selected, null, 2) : "No selection"}
      </pre>
    </div>
  );
};

import React from "react";
import { Select } from "@kousta-ui/components";

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

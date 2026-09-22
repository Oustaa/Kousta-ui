"use client";
import React, { useMemo, useState } from "react";
import { Button, ComponentPropsProvider, Group } from "@kousta-ui/components";

export const QuickStartPreview = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button>Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
};

const ALL_VARIANTS = [
  "primary",
  "primary-outline",
  "primary-light",
  "primary-link",
  "success",
  "success-outline",
  "success-light",
  "success-link",
  "danger",
  "danger-outline",
  "danger-light",
  "danger-link",
  "neutral",
  "neutral-outline",
  "neutral-light",
  "neutral-link",
  "warning",
  "warning-outline",
  "warning-light",
  "warning-link",
] as const;

type Variant = (typeof ALL_VARIANTS)[number];

export const VariantsPreview = () => {
  const [variant, setVariant] = useState<Variant>("primary");
  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label htmlFor={`btn-variant-${id}`} style={{ fontSize: 14 }}>
          Variant
        </label>
        <select
          id={`btn-variant-${id}`}
          value={variant}
          onChange={(e) => setVariant(e.target.value as Variant)}
          style={{ padding: "6px 8px", borderRadius: 6 }}
        >
          {ALL_VARIANTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant={variant}>Button</Button>
        <Button variant={variant} disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
};

export const SizesPreview = () => {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
};

export const LoadingDisabledPreview = () => {
  return (
    <Group gap="12px">
      <Button loading>Saving…</Button>
      <Button loading variant="neutral-outline" loadingIndicator="Please wait…" />
      <Button disabled variant="neutral-outline">
        Disabled
      </Button>
    </Group>
  );
};

export const ProviderDefaultsPreview = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button>Default</Button>
      <ComponentPropsProvider button={{ size: "lg" }}>
        <Button>Large (provider default)</Button>
        <Button size="sm">Small (local override)</Button>
      </ComponentPropsProvider>
    </div>
  );
};

export const ProviderVariantsPreview = () => {
  return (
    <ComponentPropsProvider
      button={{
        variant: "neutral",
        variants: {
          // a variant can be a class you own …
          ghost: {
            className: "btn-ghost",
          },
          // … or any other button props, with no CSS of your own
          loud: {
            type: "button",
            title: "Styled entirely through props",
            style: {
              background: "var(--kui-success-600)",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            },
          },
        },
      }}
    >
      <Group gap="12px">
        <Button>Provider default (neutral)</Button>
        <Button variant="ghost">Ghost (class variant)</Button>
        <Button variant="loud">Loud (props variant)</Button>
      </Group>
    </ComponentPropsProvider>
  );
};

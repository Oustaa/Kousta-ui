import React from "react";

export default function Badge({
  children,
  color = "warning",
}: {
  children: React.ReactNode;
  color?: "info" | "success" | "danger" | "warning" | "blue" | "green" | "purple" | "orange";
}) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}

"use client";

import React from "react";
import { HomepageTablePreview } from "@/components/@Table/DataTable";

export default function TableExample() {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #cbd5e1",
        borderRadius: "0.5rem",
        background: "#ffffff",
      }}
    >
      <HomepageTablePreview />
    </div>
  );
}

"use client";

import React from "react";
import { HomepageTablePreview } from "@/components/@Table/DataTable";
import styles from "./examples.module.css";

export default function TableExample() {
  return (
    <div className={styles.cardCompact}>
      <HomepageTablePreview />
    </div>
  );
}

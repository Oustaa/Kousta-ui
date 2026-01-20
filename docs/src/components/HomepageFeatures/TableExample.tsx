import React from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { HomepageTablePreview } from "@site/src/components/@Table/DataTable";

export default function TableExample() {
    const isBrowser = useIsBrowser();

    return (
        <div
            style={{
                padding: "1rem",
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "var(--ifm-card-border-radius)",
                background: "var(--ifm-background-color)",
            }}
        >
            {isBrowser ? <HomepageTablePreview /> : null}
        </div>
    );
}

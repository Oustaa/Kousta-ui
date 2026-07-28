import type { ReactNode } from "react";

const PALETTE: Record<string, { background: string; color: string }> = {
  blue: { background: "#dbeafe", color: "#1d4ed8" },
  green: { background: "#dcfce7", color: "#15803d" },
  red: { background: "#fee2e2", color: "#b91c1c" },
  yellow: { background: "#fef9c3", color: "#a16207" },
  gray: { background: "#f3f4f6", color: "#4b5563" },
  orange: { background: "#ffedd5", color: "#c2410c" },
  purple: { background: "#f3e8ff", color: "#7e22ce" },
};

export type DocBadgeProps = {
  color?: string;
  children?: ReactNode;
};

/** Inline callout pill used across migrated MDX (replaces Docusaurus `<Badge>`). */
export function DocBadge({ color = "blue", children }: DocBadgeProps) {
  const tone = PALETTE[color] ?? PALETTE.blue;
  return (
    <span
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "0.35em",
        padding: "0.15em 0.55em",
        fontSize: "0.85em",
        fontWeight: 600,
        borderRadius: 9999,
        lineHeight: 1.35,
        ...tone,
      }}
    >
      {children}
    </span>
  );
}

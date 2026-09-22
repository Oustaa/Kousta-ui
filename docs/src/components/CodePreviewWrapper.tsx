"use client";

import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";
import { useState, type ReactNode } from "react";

interface CodeTab {
  value: string;
  language: "ts" | "tsx" | "js" | "jsx";
  filename: string;
  code: string;
}

interface CodePreviewWrapperProps {
  tabs: CodeTab[];
  preview: ReactNode;
  defaultTab?: string;
  /** show the source straight away — for snippets that *are* the explanation */
  defaultExpanded?: boolean;
}

function prismLanguage(language: CodeTab["language"]): "tsx" | "jsx" {
  if (language === "ts" || language === "tsx") {
    return "tsx";
  }
  return "jsx";
}

const isTs = (language: string) => language.startsWith("ts");

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{
        transform: open ? "rotate(180deg)" : undefined,
        transition: "transform 150ms ease",
      }}
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard can be blocked (insecure origin, permissions) — say nothing
      // rather than breaking the page
    }
  };

  return (
    <button
      aria-label="Copy code"
      className="code-preview-copy"
      onClick={copy}
      type="button"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/**
 * The demo comes first and the source sits behind a toggle — a reader scanning
 * the page wants to see what a prop *does* before they read how it is wired.
 */
export default function CodePreviewWrapper({
  tabs,
  preview,
  defaultTab,
  defaultExpanded = false,
}: CodePreviewWrapperProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab || tabs[0]?.value || "",
  );
  const [expanded, setExpanded] = useState(defaultExpanded);

  const activeTabData = tabs.find((tab) => tab.value === activeTab) || tabs[0];

  // A lot of our snippets are identical in TS and JS. Offering two tabs that
  // show the same characters just makes the reader check whether they differ,
  // so collapse them into one and say it runs as both.
  const sameInEveryLanguage =
    tabs.length > 1 &&
    tabs.every((tab) => tab.code.trim() === tabs[0].code.trim());

  return (
    <div className="code-preview-wrapper">
      {preview && <div className="code-preview-preview-section">{preview}</div>}

      <div className="code-preview-toolbar">
        <button
          aria-expanded={expanded}
          className="code-preview-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          type="button"
        >
          <ChevronIcon open={expanded} />
          {expanded ? "Hide code" : "Show code"}
        </button>

        {expanded && sameInEveryLanguage && (
          <span className="code-preview-shared-label">
            <span
              className="code-preview-tab-icon"
              style={{ background: "#007acc", color: "#fff" }}
            >
              TS
            </span>
            <span
              className="code-preview-tab-icon"
              style={{ background: "#f7df1e", color: "#000" }}
            >
              JS
            </span>
            Same in TypeScript and JavaScript
          </span>
        )}

        {expanded && tabs.length > 1 && !sameInEveryLanguage && (
          <div className="code-preview-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={clsx("code-preview-tab-button", {
                  active: activeTab === tab.value,
                })}
                onClick={() => setActiveTab(tab.value)}
                type="button"
              >
                <span
                  className="code-preview-tab-icon"
                  style={{
                    background: isTs(tab.language) ? "#007acc" : "#f7df1e",
                    color: isTs(tab.language) ? "#fff" : "#000",
                  }}
                >
                  {isTs(tab.language) ? "TS" : "JS"}
                </span>
                <span className="code-preview-tab-filename">
                  {tab.filename}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {expanded && activeTabData && (
        <div className="code-preview-code-block">
          <div className="code-preview-code-content">
            <CopyButton code={activeTabData.code.trimEnd()} />
            <Highlight
              code={activeTabData.code.trimEnd()}
              language={prismLanguage(activeTabData.language)}
              theme={themes.vsDark}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, margin: 0 }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      )}
    </div>
  );
}

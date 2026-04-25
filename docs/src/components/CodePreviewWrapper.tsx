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
}

function prismLanguage(language: CodeTab["language"]): "tsx" | "jsx" {
  if (language === "ts" || language === "tsx") {
    return "tsx";
  }
  return "jsx";
}

export default function CodePreviewWrapper({
  tabs,
  preview,
  defaultTab,
}: CodePreviewWrapperProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab || tabs[0]?.value || "",
  );

  const activeTabData = tabs.find((tab) => tab.value === activeTab) || tabs[0];

  const getLanguageIcon = (language: string) => {
    return language.startsWith("ts") ? "TS" : "JS";
  };

  const getLanguageColor = (language: string) => {
    return language.startsWith("ts") ? "#007acc" : "#f7df1e";
  };

  const getLanguageTextColor = (language: string) => {
    return language.startsWith("ts") ? "white" : "#000";
  };

  return (
    <div className="code-preview-wrapper">
      <div className="code-preview-code-block">
        <div className="code-preview-header">
          <div className="code-preview-tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;
              const iconBg = getLanguageColor(tab.language);
              const iconTextColor = getLanguageTextColor(tab.language);

              return (
                <button
                  key={tab.value}
                  className={clsx("code-preview-tab-button", {
                    active: isActive,
                  })}
                  onClick={() => setActiveTab(tab.value)}
                  type="button"
                >
                  <span
                    className="code-preview-tab-icon"
                    style={{
                      background: iconBg,
                      color: iconTextColor,
                    }}
                  >
                    {getLanguageIcon(tab.language)}
                  </span>
                  <span className="code-preview-tab-filename">
                    {tab.filename}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="code-preview-code-content">
          {activeTabData && (
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
          )}
        </div>
      </div>

      {preview && <div className="code-preview-preview-section">{preview}</div>}
    </div>
  );
}

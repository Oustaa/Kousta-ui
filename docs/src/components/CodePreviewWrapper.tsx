import React, { useState, ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";

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

export default function CodePreviewWrapper({
  tabs,
  preview,
  defaultTab,
}: CodePreviewWrapperProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab || tabs[0]?.value || "",
  );
  const codeRef = useRef<HTMLElement>(null);

  const activeTabData = tabs.find((tab) => tab.value === activeTab) || tabs[0];

  // Trigger Prism highlighting when tab changes or component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && codeRef.current && activeTabData) {
      const highlightCode = () => {
        const Prism = (window as any).Prism;
        if (Prism && codeRef.current) {
          // Ensure the code element has the correct class and content
          const codeElement = codeRef.current;
          if (codeElement.textContent === activeTabData.code) {
            // Use Prism to highlight the specific code element
            Prism.highlightElement(codeElement);
          }
        }
      };

      // Try immediately
      highlightCode();

      // Also try after a small delay to ensure DOM is ready and content is set
      const timer1 = setTimeout(highlightCode, 50);
      const timer2 = setTimeout(highlightCode, 100);

      // Also listen for Prism to be available if it loads later
      if (!(window as any).Prism) {
        const checkPrism = setInterval(() => {
          if ((window as any).Prism) {
            highlightCode();
            clearInterval(checkPrism);
          }
        }, 100);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearInterval(checkPrism);
        };
      }

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeTab, activeTabData]);

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
      {/* Code block with custom tabs in header */}
      <div className="code-preview-code-block">
        {/* Custom tab buttons in header */}
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

        {/* Code content */}
        <div className="code-preview-code-content">
          {activeTabData && (
            <pre className={`language-${activeTabData.language}`}>
              <code
                ref={codeRef}
                className={`language-${activeTabData.language}`}
                data-language={activeTabData.language}
              >
                {activeTabData.code}
              </code>
            </pre>
          )}
        </div>
      </div>

      {/* Preview section */}
      {preview && <div className="code-preview-preview-section">{preview}</div>}
    </div>
  );
}

import React, { useState, ReactNode, Children, isValidElement } from 'react';
import clsx from 'clsx';

interface CodePreviewProps {
  children: ReactNode;
  preview: ReactNode;
  defaultTab?: string;
}

export default function CodePreview({ children, preview, defaultTab }: CodePreviewProps) {
  // Extract tabs from children - expecting TabItem components
  const tabs: Array<{ value: string; language: string; filename: string; code: ReactNode }> = [];
  
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type && typeof child.type === 'function') {
      const props = child.props as any;
      if (props.value && props.children) {
        // Extract language and filename from code block
        const codeBlock = props.children;
        if (isValidElement(codeBlock) && codeBlock.props) {
          const codeProps = codeBlock.props as any;
          const language = codeProps.className?.replace('language-', '') || 'tsx';
          const filename = codeProps.title || `${props.value === 'ts' ? 'Example.tsx' : 'Example.jsx'}`;
          
          tabs.push({
            value: props.value,
            language: language,
            filename: filename,
            code: codeBlock,
          });
        }
      }
    }
  });

  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value || '');

  const activeTabData = tabs.find(tab => tab.value === activeTab) || tabs[0];

  const getLanguageIcon = (language: string) => {
    return language.startsWith('ts') ? 'TS' : 'JS';
  };

  const getLanguageColor = (language: string) => {
    return language.startsWith('ts') ? '#007acc' : '#f7df1e';
  };

  const getLanguageTextColor = (language: string) => {
    return language.startsWith('ts') ? 'white' : '#000';
  };

  if (tabs.length === 0) {
    // Fallback: render children as-is if no tabs detected
    return (
      <div className="code-preview-wrapper">
        <div className="code-preview-code-block">
          <div className="code-preview-code-content">
            {children}
          </div>
        </div>
        {preview && (
          <div className="code-preview-preview-section">
            {preview}
          </div>
        )}
      </div>
    );
  }

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
                  className={clsx('code-preview-tab-button', { active: isActive })}
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
                  <span className="code-preview-tab-filename">{tab.filename}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Code content - render the active tab's code block */}
        <div className="code-preview-code-content">
          {activeTabData?.code}
        </div>
      </div>

      {/* Preview section */}
      {preview && (
        <div className="code-preview-preview-section">
          {preview}
        </div>
      )}
    </div>
  );
}

import React from 'react';

interface CodeBlockProps {
  filename: string;
  language: 'ts' | 'tsx' | 'js' | 'jsx';
  children: React.ReactNode;
}

export default function CodeBlock({ filename, language, children }: CodeBlockProps) {
  const iconClass = language.startsWith('ts') ? 'ts' : 'js';
  const iconText = language.startsWith('ts') ? 'TS' : 'JS';
  
  return (
    <div className="code-block-wrapper">
      <div className="code-block-filename">
        <span className={`code-block-filename-icon ${iconClass}`}>{iconText}</span>
        <span>{filename}</span>
      </div>
      {children}
    </div>
  );
}

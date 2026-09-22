"use client";

import { useState, type ReactNode } from "react";

interface DocHeaderProps {
  /** one line on what this page is for — sits directly under the H1 */
  description: ReactNode;
  /** the npm package it ships in, e.g. "@kousta-ui/table" */
  pkg?: string;
  /** the named export(s) the page documents, e.g. "DataTable" */
  exports?: string;
  /** path inside the repo, e.g. "packages/table/src/DataTable" */
  source?: string;
}

const REPO = "https://github.com/Oustaa/kousta-ui";

function InstallCommand({ pkg }: { pkg: string }) {
  const [copied, setCopied] = useState(false);
  const command = `npm i ${pkg}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard can be blocked — leave the command visible to copy by hand
    }
  };

  return (
    <button className="doc-header-install" onClick={copy} type="button">
      <code>{command}</code>
      <span className="doc-header-install-hint">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/**
 * The orientation block every page opens with: what this is, which package it
 * comes from, what to import, and where the code lives.
 */
export default function DocHeader({
  description,
  pkg,
  exports,
  source,
}: DocHeaderProps) {
  return (
    <div className="doc-header">
      <p className="doc-header-description">{description}</p>

      {(pkg || exports || source) && (
        <dl className="doc-header-meta">
          {pkg && (
            <div className="doc-header-meta-row">
              <dt>Package</dt>
              <dd>
                <a
                  href={`https://www.npmjs.com/package/${pkg}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {pkg}
                </a>
              </dd>
            </div>
          )}
          {exports && (
            <div className="doc-header-meta-row">
              <dt>Import</dt>
              <dd>
                <code>{`import { ${exports} } from "${pkg ?? "@kousta-ui/components"}";`}</code>
              </dd>
            </div>
          )}
          {source && (
            <div className="doc-header-meta-row">
              <dt>Source</dt>
              <dd>
                <a
                  href={`${REPO}/tree/main/${source}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source}
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}

      {pkg && <InstallCommand pkg={pkg} />}
    </div>
  );
}

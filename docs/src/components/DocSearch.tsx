"use client";

import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

const appId = process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_DOCSEARCH_SEARCH_API_KEY;
const indexName = process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME;

export default function DocSearchWidget() {
  if (!appId || !apiKey || !indexName) {
    return null;
  }

  return <DocSearch appId={appId} apiKey={apiKey} indexName={indexName} />;
}

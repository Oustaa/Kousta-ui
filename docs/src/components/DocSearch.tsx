"use client";

import { DocSearch } from "@docsearch/react";
import "@docsearch/css";

const appId = process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_DOCSEARCH_SEARCH_API_KEY;
const indexName = process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME;

// Records are scraped against the production domain (see docsearch.config.json's
// start_urls), so every hit's `url` is an absolute production URL. Rewrite it to
// the current origin so results navigate correctly on localhost, previews, etc.
function transformItems<T extends { url: string }>(items: T[]): T[] {
  if (typeof window === "undefined") return items;
  return items.map((item) => {
    try {
      const url = new URL(item.url);
      return { ...item, url: `${window.location.origin}${url.pathname}${url.hash}` };
    } catch {
      return item;
    }
  });
}

export default function DocSearchWidget() {
  if (!appId || !apiKey || !indexName) {
    return null;
  }

  return (
    <DocSearch
      appId={appId}
      apiKey={apiKey}
      indexName={indexName}
      transformItems={transformItems}
    />
  );
}

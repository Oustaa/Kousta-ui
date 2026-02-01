import React from "react";
import { AsyncSelect } from "@kousta-ui/components";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type GetDataParams = {
  page: number;
  limit: number;
  searchTerm?: string;
};

type Product = {
  id: number;
  designation: string;
};

type ProductsResponse =
  | {
      meta: { last_page: number };
      products: Product[];
    }
  | any;

const CACHE_PREFIX = "kousta_ui_docs_async_select:";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 365 * 10;

function readCache<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { value: T; expiresAt: number };
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      localStorage.removeItem(key);
      return undefined;
    }
    return parsed.value;
  } catch {
    return undefined;
  }
}

function writeCache<T>(key: string, value: T) {
  try {
    const payload = JSON.stringify({
      value,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });
    localStorage.setItem(key, payload);
  } catch {
    // ignore (quota exceeded, etc.)
  }
}

const createGetProducts =
  (apiBaseUrl: string = "http://localhost:8001") =>
  async ({ page, limit, searchTerm }: GetDataParams) => {
    const url = new URL("/products", apiBaseUrl);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    if (searchTerm) url.searchParams.set("search", searchTerm);

    const cacheKey = `${CACHE_PREFIX}${url.toString()}`;
    const cached = readCache<unknown>(cacheKey);
    if (cached) return cached;

    const resp = await fetch(url.toString());
    const json = await resp.json();
    writeCache(cacheKey, json);
    return json;
  };

export const QuickStartPreview = () => {
  const { siteConfig } = useDocusaurusContext();

  const API_BASE_URL = String(
    siteConfig.customFields?.API_BASE_URL || "http://localhost:8001",
  );

  const getProducts = React.useMemo(
    () => createGetProducts(String(API_BASE_URL)),
    [API_BASE_URL],
  );

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <AsyncSelect<Product>
        label="Dynamic Select"
        placeholder="Search products"
        getData={getProducts}
        extractDynamicData={(resp: ProductsResponse) => resp.products}
        hasMore={(resp: ProductsResponse, page) => page < resp.meta.last_page}
        options={{ value: "id", label: "id - designation" }}
      />
    </div>
  );
};

export const GenericTypesPreview = () => {
  const { siteConfig } = useDocusaurusContext();

  const API_BASE_URL = String(
    siteConfig.customFields?.API_BASE_URL || "http://localhost:8001",
  );

  const getProducts = React.useMemo(
    () => createGetProducts(String(API_BASE_URL)),
    [API_BASE_URL],
  );

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <AsyncSelect<Product>
        label="Products"
        placeholder="Search products"
        getData={getProducts}
        extractDynamicData={(resp: ProductsResponse) => resp.products}
        hasMore={(resp: ProductsResponse, page) => page < resp.meta.last_page}
        options={{ value: "id", label: "designation" }}
      />
    </div>
  );
};

export const CustomRenderPreview = () => {
  const { siteConfig } = useDocusaurusContext();

  const API_BASE_URL = String(
    siteConfig.customFields?.API_BASE_URL || "http://localhost:8001",
  );

  const getProducts = React.useMemo(
    () => createGetProducts(String(API_BASE_URL)),
    [API_BASE_URL],
  );
  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <AsyncSelect<Product>
        label="Custom option rendering"
        placeholder="Search products"
        getData={getProducts}
        extractDynamicData={(resp: ProductsResponse) => resp.products}
        hasMore={(resp: ProductsResponse, page) => page < resp.meta.last_page}
        options={{
          value: "id",
          label: "designation",
          renderOption: (row: Product) => `id: ${row.id} - ${row.designation}`,
        }}
      />
    </div>
  );
};

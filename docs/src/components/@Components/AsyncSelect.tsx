"use client";

import React from "react";
import { AsyncSelect } from "@kousta-ui/components";
import { getApiBaseUrl } from "@/lib/api-base-url";

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
      meta: { last_page: number; total: number };
      products: Product[];
    }
  | any;

const createGetProducts =
  (apiBaseUrl: string = "http://localhost:8001") =>
  async ({ page, limit, searchTerm }: GetDataParams) => {
    const url = new URL("/products", apiBaseUrl);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    if (searchTerm) url.searchParams.set("search", searchTerm);

    const resp = await fetch(url.toString(), {
      cache: "force-cache",
    });

    const json = await resp.json();
    return json;
  };

export const QuickStartPreview = () => {
  const API_BASE_URL = getApiBaseUrl();

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
  const API_BASE_URL = getApiBaseUrl();

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
  const API_BASE_URL = getApiBaseUrl();

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

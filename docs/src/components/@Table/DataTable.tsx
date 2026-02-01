import React, { useEffect, useMemo, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DataTable, TablePropsProvider } from "@kousta-ui/table";
import { Button } from "@kousta-ui/components";
import { LayoutGrid, Trash2 } from "lucide-react";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

type Product = {
  id: number;
  designation: string;
  category?: { ref?: string };
};

type ProductsResponse =
  | {
      meta?: { total?: number; last_page?: number };
      products?: Product[];
    }
  | any;

type TableParams = Record<string, string | number | undefined>;

const previewContainerStyle: React.CSSProperties = {
  width: "100%",
  display: "block",
  overflow: "hidden",
};

const fullWidthTableProps = {
  table: { style: { width: "100%" } },
} as const;

const CACHE_PREFIX = "kousta_ui_docs_data_table:";
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
    // ignore
  }
}

const createGetProducts =
  (apiBaseUrl: string) => async (params: TableParams) => {
    const url = new URL("/products", apiBaseUrl);

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    const cacheKey = `${CACHE_PREFIX}${url.toString()}`;
    const cached = readCache<unknown>(cacheKey);
    if (cached) return cached;

    const resp = await fetch(url.toString());
    const json = await resp.json();
    writeCache(cacheKey, json);
    return json;
  };

function useApiBaseUrl() {
  const { siteConfig } = useDocusaurusContext();
  const fallback =
    process.env.NODE_ENV === "production"
      ? "https://api.ui.kousta.org/"
      : "http://localhost:8001";
  return String(siteConfig.customFields?.API_BASE_URL || fallback);
}

export const BasicPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Products"
        loading={false}
        data={data}
        headers={{
          id: { value: "id" },
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const HeadersPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Headers"
        loading={false}
        data={data}
        headers={{
          id: { value: "id", canSee: false },
          designation: { value: "designation" },
          "category ref": {
            exec: (row) => (
              <span style={{ fontWeight: 600 }}>
                {row.category?.ref ?? "-"}
              </span>
            ),
          },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const LoadingPreview = () => {
  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Loading"
        loading={true}
        data={[]}
        headers={{ designation: { value: "designation" } }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const StaticPaginationPreview = () => {
  const data = useMemo<Product[]>(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i + 1,
        designation: `Product ${i + 1}`,
        category: { ref: i % 2 ? "UI" : "TABLE" },
      })),
    [],
  );

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Static pagination"
        loading={false}
        data={data}
        headers={{ id: { value: "id" }, designation: { value: "designation" } }}
        pagination={{ total: data.length, page: 1, limit: 10, type: "static" }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const DynamicPaginationPreview = () => {
  const API_BASE_URL = useApiBaseUrl();

  const getProducts = useMemo(
    () => createGetProducts(String(API_BASE_URL)),
    [API_BASE_URL],
  );

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const get = async (params: TableParams = {}) => {
    setLoading(true);
    try {
      const json = (await getProducts(params)) as ProductsResponse;
      const products = (json?.products || []) as Product[];
      const totalFromApi =
        Number(json?.meta?.total ?? products.length) || products.length;

      setRows(products);
      setTotal(totalFromApi);
    } catch {
      const fallback = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        designation: `Mock Product ${i + 1}`,
        category: { ref: i % 2 ? "UI" : "TABLE" },
      }));
      setRows(fallback);
      setTotal(fallback.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get({ page: 1, limit: 10 });
  }, []);

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Dynamic pagination"
        loading={loading}
        data={rows}
        headers={{
          id: { value: "id" },
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        pagination={{ total, page: 1, limit: 10, type: "dynamic" }}
        actions={{ get }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const StaticSearchPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
    { id: 3, designation: "Components", category: { ref: "UI" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Static search"
        loading={false}
        data={data}
        headers={{
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        pagination={{ total: data.length, page: 1, limit: 10, type: "static" }}
        actions={{
          search: {
            static: true,
            searchOnType: true,
            searchTimer: 300,
            onSearch: (row, { reg }) => {
              return (
                reg.test(row.designation) || reg.test(row.category?.ref || "")
              );
            },
          },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const DynamicSearchPreview = () => {
  const API_BASE_URL = useApiBaseUrl();

  const getProducts = useMemo(
    () => createGetProducts(String(API_BASE_URL)),
    [API_BASE_URL],
  );

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const searchOrGet = async (params: TableParams = {}) => {
    setLoading(true);
    try {
      const json = (await getProducts(params)) as ProductsResponse;
      const products = (json?.products || []) as Product[];
      const totalFromApi =
        Number(json?.meta?.total ?? products.length) || products.length;

      setRows(products);
      setTotal(totalFromApi);
    } catch {
      const fallback = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        designation: `Mock Product ${i + 1}`,
        category: { ref: i % 2 ? "UI" : "TABLE" },
      }));
      setRows(fallback);
      setTotal(fallback.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchOrGet({ page: 1, limit: 10, search: "" });
  }, []);

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Dynamic search"
        loading={loading}
        data={rows}
        headers={{
          id: { value: "id" },
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        pagination={{ total, page: 1, limit: 10, type: "dynamic" }}
        actions={{
          search: {
            static: false,
            searchOnType: true,
            searchTimer: 300,
            onSearch: searchOrGet,
          },
          get: searchOrGet,
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const ViewsPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Views"
        loading={false}
        data={data}
        headers={{
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        options={{
          cards: {
            card: ({ row }) => (
              <div
                style={{
                  border: "1px solid var(--ifm-color-emphasis-300)",
                  borderRadius: 10,
                  padding: 12,
                  background: "var(--ifm-background-color)",
                }}
              >
                <div style={{ fontWeight: 700 }}>{row.designation}</div>
                <div style={{ opacity: 0.8 }}>{row.category?.ref ?? "-"}</div>
              </div>
            ),
          },
          extraviews: {
            grid: {
              View: ({ data }) => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  {(data as Product[]).map((row) => (
                    <div
                      key={row.id}
                      style={{
                        border: "1px solid var(--ifm-color-emphasis-300)",
                        borderRadius: 10,
                        padding: 12,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{row.designation}</div>
                      <div style={{ opacity: 0.8 }}>
                        {row.category?.ref ?? "-"}
                      </div>
                    </div>
                  ))}
                </div>
              ),
              menuProps: { leftSection: <LayoutGrid size={14} /> } as any,
            },
          },
        }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const ActionsPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
    { id: 3, designation: "Components", category: { ref: "UI" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <TablePropsProvider
        actions={{
          delete: {
            title: <Trash2 size={14} />,
            buttonProps: { variant: "danger-outline", size: "sm" } as any,
          },
          edit: {
            title: "Edit",
            buttonProps: { variant: "neutral-outline", size: "sm" } as any,
          },
          search: {
            searchOnType: true,
            searchTimer: 300,
          },
        }}
      >
        <DataTable<Product>
          title="Actions"
          loading={false}
          data={data}
          headers={{
            designation: { value: "designation" },
            category: { exec: (row) => row.category?.ref ?? "-" },
          }}
          pagination={{
            total: data.length,
            page: 1,
            limit: 10,
            type: "static",
          }}
          actions={{
            search: {
              static: true,
              searchOnType: true,
              searchTimer: 300,
              onSearch: (row, { reg }) => reg.test(row.designation),
            },
            edit: {
              onEdit: (row) => alert(`Edit ${row.designation}`),
            },
            delete: {
              onDelete: (row) => alert(`Delete ${row.designation}`),
            },
          }}
          options={{
            bulkActions: [
              {
                title: "Delete selected",
                onClick: (rows, clear) => {
                  alert(`Bulk delete: ${rows.length}`);
                  clear();
                },
              },
            ],
            extraActions: [
              {
                title: "Archive",
                onClick: (row) => alert(`Archive ${row.designation}`),
                Icon: <span style={{ fontSize: 14 }}>A</span>,
                allowed: true,
              },
            ],
            viewComp: {
              type: "extends",
              Component: (row) => (
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{row.designation}</div>
                  <div style={{ opacity: 0.8 }}>
                    Category: {row.category?.ref ?? "-"}
                  </div>
                </div>
              ),
              openButtonProps: {
                variant: "neutral-outline",
                size: "sm",
              } as any,
            },
          }}
          config={{ props: fullWidthTableProps }}
          keyExtractor={(row) => row.id}
        />
      </TablePropsProvider>
    </div>
  );
};

export const RowActionsPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <TablePropsProvider
        actions={{
          delete: {
            title: <Trash2 size={14} />,
            buttonProps: { variant: "danger-outline", size: "sm" } as any,
          },
          edit: {
            title: "Edit",
            buttonProps: { variant: "neutral-outline", size: "sm" } as any,
          },
        }}
      >
        <DataTable<Product>
          title="Row actions"
          loading={false}
          data={data}
          headers={{
            designation: { value: "designation" },
            category: { exec: (row) => row.category?.ref ?? "-" },
          }}
          actions={{
            edit: { onEdit: (row) => alert(`Edit ${row.designation}`) },
            delete: { onDelete: (row) => alert(`Delete ${row.designation}`) },
          }}
          config={{ props: fullWidthTableProps }}
          keyExtractor={(row) => row.id}
        />
      </TablePropsProvider>
    </div>
  );
};

export const ExtraActionsPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Extra actions"
        loading={false}
        data={data}
        headers={{
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        options={{
          extraActions: [
            {
              title: "Archive",
              onClick: (row) => alert(`Archive ${row.designation}`),
              Icon: <span style={{ fontSize: 14 }}>A</span>,
              allowed: true,
            },
          ],
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const BulkActionsPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
    { id: 3, designation: "Components", category: { ref: "UI" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Bulk actions"
        loading={false}
        data={data}
        headers={{
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        pagination={{ total: data.length, page: 1, limit: 10, type: "static" }}
        options={{
          bulkActions: [
            {
              title: "Delete selected",
              onClick: (rows, clear) => {
                alert(`Bulk delete: ${rows.length}`);
                clear();
              },
            },
          ],
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const ViewCompPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="View component"
        loading={false}
        data={data}
        headers={{
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        options={{
          viewComp: {
            type: "extends",
            Component: (row) => (
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{row.designation}</div>
                <div style={{ opacity: 0.8 }}>
                  Category: {row.category?.ref ?? "-"}
                </div>
              </div>
            ),
            openButtonProps: {
              variant: "neutral-outline",
              size: "sm",
            } as any,
          },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const ConfigPreview = () => {
  const data: Product[] = [
    { id: 1, designation: "Kousta UI", category: { ref: "UI" } },
    { id: 2, designation: "Table Package", category: { ref: "TABLE" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Config"
        loading={false}
        data={data}
        headers={{
          designation: { value: "designation" },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        config={{
          toggleRows: { variant: "neutral-outline", size: "sm" } as any,
          disableContextMenu: false,
          props: {
            table: {
              style: { border: "1px solid var(--ifm-color-emphasis-200)" },
            },
          },
        }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const HomepageTablePreview = () => {
  return (
    <div style={previewContainerStyle}>
      <ActionsPreview />
      <div
        style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="neutral"
          onClick={() => window.open("/docs/category/table", "_blank")}
        >
          View Table docs
        </Button>
      </div>
    </div>
  );
};

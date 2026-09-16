"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataTable, TablePropsProvider } from "@kousta-ui/table";
import { getApiBaseUrl } from "@/lib/api-base-url";
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

const createGetProducts =
  (apiBaseUrl: string) => async (params: TableParams) => {
    const url = new URL("/products", apiBaseUrl);

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    const resp = await fetch(url.toString(), {
      cache: "force-cache",
    });

    const json = await resp.json();
    return json;
  };

function useApiBaseUrl() {
  return getApiBaseUrl();
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

export const StaticSortingPreview = () => {
  const baseData: Product[] = [
    { id: 3, designation: "Widget C", category: { ref: "TABLE" } },
    { id: 1, designation: "Widget A", category: { ref: "UI" } },
    { id: 2, designation: "Widget B", category: { ref: "UI" } },
  ];

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Sorting (static)"
        loading={false}
        data={baseData}
        headers={{
          id: { value: "id", sortBy: {} },
          designation: { value: "designation", sortBy: {} },
          category: {
            exec: (row) => row.category?.ref ?? "-",
            sortBy: {
              sortFunc: (a, b) =>
                (a.category?.ref ?? "").localeCompare(b.category?.ref ?? ""),
            },
          },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
      <p style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
        No <code>actions.get</code> here — clicking a header re-sorts{" "}
        <code>data</code> in place, client-side.
      </p>
    </div>
  );
};

export const DynamicSortingPreview = () => {
  const baseData = useMemo<Product[]>(
    () => [
      { id: 3, designation: "Widget C", category: { ref: "TABLE" } },
      { id: 1, designation: "Widget A", category: { ref: "UI" } },
      { id: 2, designation: "Widget B", category: { ref: "UI" } },
    ],
    [],
  );

  const [rows, setRows] = useState<Product[]>(baseData);
  const [lastParams, setLastParams] = useState<TableParams | null>(null);

  const get = async (params: TableParams) => {
    setLastParams(params);
    const { sortBy, direction } = params;

    if (!sortBy) {
      setRows(baseData);
      return;
    }

    const sorted = [...baseData].sort((a, b) => {
      const av = (a as any)[sortBy as string];
      const bv = (b as any)[sortBy as string];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (Number(direction) || 1);
    });
    setRows(sorted);
  };

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Sorting (dynamic)"
        loading={false}
        data={rows}
        headers={{
          id: { value: "id", sortBy: {} },
          designation: { value: "designation", sortBy: {} },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        actions={{ get }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
      <p style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
        Params sent to <code>actions.get</code> on the last click:{" "}
        <code>{lastParams ? JSON.stringify(lastParams) : "(none yet)"}</code>
      </p>
    </div>
  );
};

export const DynamicSortingCustomPropsPreview = () => {
  const baseData = useMemo<Product[]>(
    () => [
      { id: 3, designation: "Widget C", category: { ref: "TABLE" } },
      { id: 1, designation: "Widget A", category: { ref: "UI" } },
      { id: 2, designation: "Widget B", category: { ref: "UI" } },
    ],
    [],
  );

  const [rows, setRows] = useState<Product[]>(baseData);
  const [lastParams, setLastParams] = useState<TableParams | null>(null);

  const get = async (params: TableParams) => {
    setLastParams(params);
    const orderBy = params.order_by as string | undefined;
    const orderDir = params.order_dir as string | undefined;

    if (!orderBy) {
      setRows(baseData);
      return;
    }

    const sorted = [...baseData].sort((a, b) => {
      const av = (a as any)[orderBy];
      const bv = (b as any)[orderBy];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (orderDir === "desc" ? -1 : 1);
    });
    setRows(sorted);
  };

  return (
    <div style={previewContainerStyle}>
      <DataTable<Product>
        title="Sorting (dynamic, custom param names)"
        loading={false}
        data={rows}
        headers={{
          id: { value: "id", sortBy: {} },
          designation: { value: "designation", sortBy: {} },
          category: { exec: (row) => row.category?.ref ?? "-" },
        }}
        options={{
          sort: {
            props: ({ sortBy, direction }) => ({
              order_by: sortBy,
              order_dir: direction === -1 ? "desc" : "asc",
            }),
          },
        }}
        actions={{ get }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
      <p style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
        Params sent to <code>actions.get</code> on the last click:{" "}
        <code>{lastParams ? JSON.stringify(lastParams) : "(none yet)"}</code>
      </p>
    </div>
  );
};

type OrderLine = {
  id: number;
  item: string;
  qty: number;
  price: number;
};

const orderLines: OrderLine[] = [
  { id: 1, item: "Widget A", qty: 12, price: 27.88 },
  { id: 2, item: "Widget B", qty: 20, price: 5 },
  { id: 3, item: "Widget C", qty: 34, price: 9.99 },
];

export const TotalPreview = () => {
  return (
    <div style={previewContainerStyle}>
      <DataTable<OrderLine>
        title="Order lines"
        loading={false}
        data={orderLines}
        headers={{
          id: { value: "id" },
          item: { value: "item" },
          qty: { value: "qty", total: {} },
          price: { value: "price", total: {} },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};

export const TotalWithPaginationPreview = () => {
  return (
    <div style={previewContainerStyle}>
      <DataTable<OrderLine>
        title="Order lines (static pagination, limit 2)"
        loading={false}
        data={orderLines}
        headers={{
          id: { value: "id" },
          item: { value: "item" },
          qty: { value: "qty", total: {} },
          price: { value: "price", total: {} },
        }}
        pagination={{
          total: orderLines.length,
          page: 1,
          limit: 2,
          type: "static",
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />
      <p style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
        Page through this table — the total recomputes from whatever rows are
        on the current page, not all 3 order lines.
      </p>
    </div>
  );
};

type PreservedState = {
  query?: string;
  sortBy?: string;
  direction?: 1 | -1;
  displayAs?: string;
  page?: number;
  limit?: number;
};

const preservingRows: OrderLine[] = [
  { id: 1, item: "Widget A", qty: 12, price: 27.88 },
  { id: 2, item: "Widget B", qty: 20, price: 5 },
  { id: 3, item: "Widget C", qty: 34, price: 9.99 },
  { id: 4, item: "Widget D", qty: 7, price: 14.5 },
];

export const PropsPreservingPreview = () => {
  const [saved, setSaved] = useState<PreservedState>({});
  const [mountKey, setMountKey] = useState(0);

  // `get` runs while DataTable renders, so read from a ref to stay current
  const savedRef = React.useRef(saved);
  savedRef.current = saved;

  // restoring a sort restores the indicator, not the order — so apply it here
  const rows = useMemo(() => {
    const { sortBy, direction } = saved;
    if (!sortBy) return preservingRows;

    return [...preservingRows].sort((a, b) => {
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (direction ?? 1);
    });
  }, [saved.sortBy, saved.direction]);

  return (
    <div style={previewContainerStyle}>
      <DataTable<OrderLine>
        key={mountKey}
        title="Order lines"
        loading={false}
        data={rows}
        headers={{
          id: { value: "id", sortBy: {} },
          item: { value: "item", sortBy: {} },
          qty: { value: "qty", sortBy: {} },
        }}
        actions={{
          search: {
            static: true,
            onSearch: (row, { reg }) => reg.test(row.item),
          },
        }}
        pagination={{
          total: preservingRows.length,
          // page and limit are NOT restored by `get` — you feed them back in here
          page: saved.page ?? 1,
          limit: saved.limit ?? 10,
          type: "static",
        }}
        options={{
          cards: {
            card: ({ row }) => (
              <div
                style={{
                  border: "1px solid rgb(148 163 184 / 0.4)",
                  borderRadius: 6,
                  padding: 8,
                }}
              >
                <strong>{row.item}</strong>
                <div style={{ fontSize: 13, opacity: 0.75 }}>qty {row.qty}</div>
              </div>
            ),
          },
          props: {
            // merge, don't replace — page/limit only arrive on the call that changed them
            set: (params) => setSaved((prev) => ({ ...prev, ...params })),
            get: () => savedRef.current,
          },
        }}
        config={{ props: fullWidthTableProps }}
        keyExtractor={(row) => row.id}
      />

      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <div style={{ fontSize: 13 }}>
          Preserved state:{" "}
          <code>
            {Object.keys(saved).length ? JSON.stringify(saved) : "(nothing yet)"}
          </code>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button
            variant="primary"
            onClick={() => setMountKey((key) => key + 1)}
          >
            Remount table
          </Button>
          <Button
            variant="neutral"
            onClick={() => {
              setSaved({});
              setMountKey((key) => key + 1);
            }}
          >
            Clear + remount
          </Button>
        </div>
        <p style={{ fontSize: 13, opacity: 0.75, margin: 0 }}>
          Sort a column, search, or switch to the card view, then hit{" "}
          <strong>Remount table</strong> — the table is thrown away and rebuilt,
          and <code>get</code> puts it back exactly how you left it. (This
          preview re-applies the saved sort to <code>data</code> itself, since
          restoring a sort only restores the indicator.)
        </p>
      </div>
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
  return <ActionsPreview />;
};

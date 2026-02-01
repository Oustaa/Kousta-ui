import React, { useState } from "react";
import { ComponentPropsProvider, Pagination } from "@kousta-ui/components";
import { usePagination } from "@kousta-ui/hooks";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export const QuickStartPreview = () => {
  const [page, setPage] = useState(1);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={10} onChange={setPage} />
    </div>
  );
};

export const SeiblingsPreview = () => {
  const [page, setPage] = useState(10);

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={20} onChange={setPage} seblings={2} />
    </div>
  );
};

export const DisabledPreview = () => (
  <div style={{ width: "100%" }}>
    <Pagination page={1} totalPages={10} disabled />
  </div>
);

export const IconsOverrideWithPropPreview = () => {
  const [page, setPage] = useState(6);

  return (
    <div style={{ width: "100%" }}>
      <Pagination
        page={page}
        totalPages={20}
        onChange={setPage}
        prevIcon={<ChevronLeft size={16} />}
        nextIcon={<ChevronRight size={16} />}
        placeholderIcon={<MoreHorizontal size={16} />}
        seblings={1}
      />
    </div>
  );
};

export const IconsOverrideWithProviderPreview = () => {
  const [page, setPage] = useState(6);

  return (
    <ComponentPropsProvider
      pagination={{
        prevIcon: <ChevronLeft size={16} />,
        nextIcon: <ChevronRight size={16} />,
        placeholderIcon: <MoreHorizontal size={16} />,
        seblings: 1,
      }}
    >
      <div style={{ width: "100%" }}>
        <Pagination page={page} totalPages={20} onChange={setPage} />
      </div>
    </ComponentPropsProvider>
  );
};

export const UsePaginationHookPreview = () => {
  const { page, totalPages, setPage } = usePagination({ total: 240, limit: 20 });

  return (
    <div style={{ width: "100%" }}>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
};

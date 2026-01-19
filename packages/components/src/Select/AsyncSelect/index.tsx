import { useCallback, useEffect, useRef, useState } from "react";
import { SelectDataConstraints } from "../Base/_props";
import { AsyncSelectProps } from "./_props";
import Select from "../Base";
import { useDebounceCallback } from "@kousta-ui/hooks";
import { AsyncSelectPropsProvided, useComponentContext } from "../../PropsContext";

const AsyncSelect = <T extends SelectDataConstraints>({
  getData,
  extractDynamicData,
  limit,
  hasMore,
  searchTimeout,
  ...rest
}: AsyncSelectProps<T>) => {
  const isFetchingRef = useRef<boolean>(false);

  const asyncSelectProps = useComponentContext(
    "asyncSelect",
  ) as AsyncSelectPropsProvided;

  if (asyncSelectProps) {
    if (typeof asyncSelectProps.limit !== "undefined" && limit === undefined)
      limit = asyncSelectProps.limit;
    if (!extractDynamicData && asyncSelectProps.extractDynamicData)
      // @ts-expect-error this is not an error
      extractDynamicData = asyncSelectProps.extractDynamicData;
    if (!hasMore && asyncSelectProps.hasMore) hasMore = asyncSelectProps.hasMore;
    if (
      typeof asyncSelectProps.searchTimeout !== "undefined" &&
      searchTimeout === undefined
    )
      searchTimeout = asyncSelectProps.searchTimeout;
  }

  if (limit === undefined) limit = 50;
  if (searchTimeout === undefined) searchTimeout = 500;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(true);

  const handleGetData = useCallback(() => {
    if (!next || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    getData({ limit, page, searchTerm })
      .then((response) => {
        const result = extractDynamicData
          ? extractDynamicData(response)
          : (response as T[]);

        setData((prev) => [...prev, ...result]);

        if (hasMore) {
          setNext(hasMore(response, page));
        }

        setPage((prev) => prev + 1);
      })
      .catch(console.error)
      .finally(() => {
        isFetchingRef.current = false;
        setLoading(false);
      });
  }, [extractDynamicData, getData, hasMore, limit, next, page, searchTerm]);

  useEffect(() => {
    handleGetData();
  }, []);

  const debouncedSearch = useDebounceCallback(() => {
    setData([]);
    handleGetData();
  }, searchTimeout);

  return (
    <Select
      data={data}
      loading={loading}
      extraOptionsLoading={loading && page > 1}
      {...rest}
      onLastItemRendered={handleGetData}
      asyncSearch={(term: string) => {
        setSearchTerm(term || "");
        setPage(1);
        setNext(true);

        return debouncedSearch();
      }}
    />
  );
};

export default AsyncSelect;

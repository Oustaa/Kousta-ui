import { useCallback, useEffect, useRef, useState } from "react";
import { SelectDataConstraints } from "../Base/_props";
import { AsyncSelectProps } from "./_props";
import Select from "../Base";
import { useDebounceCallback } from "@kousta-ui/hooks";

const AsyncSelect = <T extends SelectDataConstraints>({
  getData,
  extractDynamicData,
  limit = 50,
  hasMore,
  ...rest
}: AsyncSelectProps<T>) => {
  const isFetchingRef = useRef<boolean>(false);

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
        let result = extractDynamicData
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
  }, [limit, page, searchTerm, next]);

  useEffect(() => {
    handleGetData();
  }, []);

  const debouncedSearch = useDebounceCallback(() => {
    setData([]);
    handleGetData();
  }, 500);

  return (
    <Select
      data={data}
      loading={loading}
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

// import { useCallback } from "react";
import { useTableContext } from "../tableContext";

type PropsType = Record<string, string | number | undefined>;

export const useFunctionWithTableParams = () => {
  const { pagination, search } = useTableContext();

  const props: Record<string, string | number | undefined> = {};

  if (pagination) {
    props.limit = pagination.limit;
    props.page = pagination.page;
  }

  if (search.query) props.search = search.query;

  return (cb: (props: PropsType) => unknown, localProps: PropsType = {}) => {
    return cb({ ...props, ...localProps });
  };
};

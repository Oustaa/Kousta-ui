import { FC, PropsWithChildren } from "react";
import { useTableContext } from "../tableContext";
import { getShownHeders } from "../utils/getShownHeaders";

const TableLoadingIndicator: FC<PropsWithChildren> = ({ children }) => {
  const { config, loading, options, displayAs, headers } = useTableContext();
  const visibleHeaders = getShownHeders(headers.data);

  if (!loading) return <>{children}</>;

  if (displayAs === "card" && options?.cards?.loadingIndicator) {
    return options?.cards?.loadingIndicator({ visibleHeaders });
  }

  if (options?.extraviews && options.extraviews[displayAs]?.loadingIndicator)
    return options.extraviews[displayAs]?.loadingIndicator({ visibleHeaders });

  if (config?.loadingIndicator)
    return config?.loadingIndicator({ visibleHeaders });
  return <div>Loading...</div>;
};

export default TableLoadingIndicator;

import { isValidElement } from "react";
import { useTableContext } from "../tableContext";
import { getShownHeders } from "../utils/getShownHeaders";

const DisplayExtraView = () => {
  const { data, displayAs, options, headers } = useTableContext();

  if (
    !options?.extraviews ||
    (!options.extraviews?.[displayAs] &&
      isValidElement(options.extraviews[displayAs]?.View))
  )
    return <></>;

  const viewConf = options.extraviews[displayAs];

  return (
    <viewConf.View data={data} visibleHeaders={getShownHeders(headers.data)} />
  );
};

export default DisplayExtraView;

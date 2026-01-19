import { isValidElement } from "react";
import { useTableContext } from "../tableContext";
import { getShownHeders } from "../utils/getShownHeaders";
import { useDataToDisplay } from "../hooks/useDataToDisplay";

const DisplayExtraView = () => {
  const { displayAs, options, headers } = useTableContext();
  const dataToDisplay = useDataToDisplay();

  if (
    !options?.extraviews ||
    (!options.extraviews?.[displayAs] &&
      isValidElement(options.extraviews[displayAs]?.View))
  )
    return <></>;

  const viewConf = options.extraviews[displayAs];

  return (
    <viewConf.View
      data={dataToDisplay}
      visibleHeaders={getShownHeders(headers.data)}
    />
  );
};

export default DisplayExtraView;

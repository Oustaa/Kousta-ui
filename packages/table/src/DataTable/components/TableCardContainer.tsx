import { useTableContext } from "../tableContext";
import { getShownHeders } from "../utils/getShownHeaders";

import classes from "../DataTable.module.css";
import { useDataToDisplay } from "../hooks/useDataToDisplay";

const TableCardContainer = () => {
  const { keyExtractor, options, headers } = useTableContext();
  const dataToDisplay = useDataToDisplay();

  if (!options?.cards || !options.cards.card) return <>no cards</>;

  const Card = options.cards.card;

  if (dataToDisplay.length === 0) {
    return options.emptyTable;
  }

  return (
    <div
      className={[
        classes["kui-dtable-cards-container"],
        "kui-dtable-cards-container",
      ].join(" ")}
      {...options.cards.cardsContainerProps}
    >
      {dataToDisplay.map((row, index) => (
        <Card
          key={keyExtractor?.(row) || index}
          row={row}
          visibleHeaders={getShownHeders(headers.data)}
        />
      ))}
    </div>
  );
};

export default TableCardContainer;

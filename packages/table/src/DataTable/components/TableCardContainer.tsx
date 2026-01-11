import { useTableContext } from "../tableContext";
import { getShownHeders } from "../utils/getShownHeaders";

import classes from "../DataTable.module.css";

const TableCardContainer = () => {
  const { data, keyExtractor, options, headers } = useTableContext();

  if (!options?.cards || !options.cards.card) return <>no cards</>;

  const Card = options.cards.card;

  if (data.length === 0) {
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
      {data.map((row, index) => (
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

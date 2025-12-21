import { useMemo, useState } from "react";
import { VirtualWindowProps } from "./_props";

const VirtualWindow = <T,>({ data }: VirtualWindowProps<T>) => {
  const [totalDisplayed, setTotalDisplayed] = useState<number>(10);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const [startIndex, setStartIndex] = useState(0);

  const dataToDisaplay = useMemo(() => {
    return data.splice(startIndex, totalDisplayed);
  }, [startIndex, totalDisplayed]);

  return <div></div>;
};

export default VirtualWindow;

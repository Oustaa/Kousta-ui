import { Button } from "@kousta-ui/components";
import { useTableContext } from "../tableContext";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";
import { RefreshIcon } from "./icons";

const RefreshTableBtn = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const { actions, config } = useTableContext();

  return (
    actions?.get &&
    config?.useGetAsRefresh !== false && (
      <Button
        variant="neutral"
        aria-label="refresh"
        onClick={() => {
          if (actions?.get) functionWithTableProps(actions?.get);
        }}
      >
        {config?.icons?.refresh || <RefreshIcon />}
      </Button>
    )
  );
};

export default RefreshTableBtn;

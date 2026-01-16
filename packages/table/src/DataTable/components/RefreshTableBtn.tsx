import { Button } from "@kousta-ui/components";
import { useTableContext } from "../tableContext";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

const RefreshTableBtn = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const { actions, config } = useTableContext();

  return (
    actions?.get &&
    config?.useGetAsRefresh !== false && (
      <Button
        variant="neutral"
        onClick={() => {
          if (actions?.get) functionWithTableProps(actions?.get);
        }}
      >
        Refresh
      </Button>
    )
  );
};

export default RefreshTableBtn;

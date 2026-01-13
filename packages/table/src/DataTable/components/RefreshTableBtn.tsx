import { Button } from "@kousta-ui/components";
import { useTableContext } from "../tableContext";
import { useFunctionWithTableParams } from "../hooks/useFunctionWithTableParams";

const RefreshTableBtn = () => {
  const functionWithTableProps = useFunctionWithTableParams();
  const { options, config } = useTableContext();

  return (
    options?.actions?.get &&
    config?.useGetAsRefresh !== false && (
      <Button
        variant="neutral"
        onClick={() => {
          if (options?.actions?.get)
            functionWithTableProps(options?.actions?.get);
        }}
      >
        Refresh
      </Button>
    )
  );
};

export default RefreshTableBtn;

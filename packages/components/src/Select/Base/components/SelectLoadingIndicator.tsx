import classes from "../Select.module.css";

const SelectLoadingIndicator = () => {
  return (
    <div className={classes["select-loading-indicator"]}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};

export default SelectLoadingIndicator;

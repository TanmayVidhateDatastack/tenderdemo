import styles from "../dsButton/dsButton.module.css";

interface DSFilterButtonProps {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  tooltip?: string;
  type?: string;
  count?: string | "00";
  buttonSize?: "btnSmall" | "btnMedium" | "btnLarge";
  iconSize?: "iconSmall" | "iconMedium" | "iconLarge";
  buttonColor?:
    | "btnPrimary"
    | "btnSecondary"
    | "btnDanger"
    | "btnWarning"
    | "btnDark"
    | "btnInfo";
  className?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  img?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  spliticon?: React.ReactElement;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DSFilterButton: React.FC<DSFilterButtonProps> = ({
  id,
  label,
  count = "00",
  className,
  buttonSize = "btnMedium",
  iconSize = "iconSmall",
  buttonColor = "btnPrimary",
  tooltip,
  handleOnClick,
  children,
  handleOnHover,
  handleMouseLeave,
  startIcon,
  endIcon,
}) => {
  return (
    <>
      <button
        id={id}
        className={
          styles.btn +
          " " +
          className +
          " " +
          styles[buttonSize] +
          " " +
          styles[buttonColor]
        }
        title={tooltip !== undefined ? tooltip : label}
        onClick={handleOnClick}
        onMouseOver={handleOnHover}
        onMouseLeave={handleMouseLeave}
      >
        {startIcon !== undefined && (
          <span className={"icon " + styles.startIcon + " " + styles[iconSize]}>
            {startIcon}
          </span>
        )}
        {(label && (
          <>
            {label} <div className={styles.count}>{count}</div>
          </>
        )) ||
          children}

        {endIcon !== undefined && (
          <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
            {endIcon}
          </span>
        )}
      </button>
    </>
  );
};

export default DSFilterButton;

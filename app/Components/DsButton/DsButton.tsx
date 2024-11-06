import styles from "../dsButton/dsButton.module.css";


export interface DSButtonProps {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  tooltip?: string;
  type?: string;
  buttonSize?: "btnSmall" | "btnMedium" | "btnLarge";
  iconSize?: "iconSmall" | "iconMedium" | "iconLarge";
  buttonColor?:
    | "btnPrimary"
    | "btnSecondary"
    | "btnDanger"
    | "btnWarning"
    | "btnDark"
    | "btnInfo";
  buttonClass?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  img?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  spliticon?: React.ReactElement;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DSButton: React.FC<DSButtonProps> = ({
  id,
  label,
  buttonClass,
  buttonSize = "btnMedium",
  iconSize = "iconSmall",
  buttonColor = "btnPrimary",
  type = "standard",
  tooltip,
  handleOnClick,
  children,
  handleOnHover,
  handleMouseLeave,
  startIcon,
  endIcon,
  spliticon,
}) => {
  function displayFileBrowser(e: React.MouseEvent<HTMLButtonElement>) {
    const id = (e.target as HTMLElement)?.id;
    document.getElementById(id + "_upload")?.click();
  }
  return (
    <>
      {type == "standard" && (
        <button
          id={id}
          className={
            styles.btn +
            " " +
            buttonClass +
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
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
            >
              {startIcon}
            </span>
          )}
          {label || children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {endIcon}
            </span>
          )}
        </button>
      )}
      {type == "split" && (
        <div className={styles.split_container}>
          <button
            id={id}
            className={
              styles.btn +
              " " +
              buttonClass +
              " " +
              styles.split_btn +
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
              <span
                className={"icon " + styles.startIcon + " " + styles[iconSize]}
              >
                {startIcon}
              </span>
            )}
            {label || children}

            {endIcon !== undefined && (
              <span
                className={
                  "icon " +
                  styles.endIcon +
                  " " +
                  styles.split_icon_btn +
                  " " +
                  styles[iconSize] +
                  " " +
                  styles[buttonColor]
                }
              >
                {endIcon}
              </span>
            )}
          </button>

          <div className={styles.split_icon_btn + " " + styles.left_separator}>
            {spliticon}
          </div>
        </div>
      )}
      {type == "toggle" && (
        <div className={styles.toggle}>
          <button
            id={id}
            className={
              styles.btn + " " + buttonClass + " " + styles[buttonSize]
            }
            onClick={handleOnClick}
            onMouseOver={handleOnHover}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.thumb}></div>
          </button>
        </div>
      )}
      {type == "icon_image" && (
        <div className={styles.icon_image}>
          <button
            id={id}
            className={
              styles.btn +
              " " +
              buttonClass +
              " " +
              styles.icon_image +
              " " +
              styles[buttonSize]
            }
            onClick={handleOnClick}
            onMouseOver={handleOnHover}
            onMouseLeave={handleMouseLeave}
          >
            {startIcon !== undefined && (
              <span
                className={"icon " + styles.startIcon + " " + styles[iconSize]}
                title={tooltip !== undefined ? tooltip : tooltip}
              >
                {startIcon}
              </span>
            )}
          </button>
        </div>
      )}
      {type == "button_icon" && (
        <div className={styles.icon_image}>
          <button
            id={id}
            className={
              styles.btn +
              " " +
              buttonClass +
              " " +
              styles.icon_btn +
              " " +
              styles[buttonSize]
            }
            onClick={handleOnClick}
            onMouseOver={handleOnHover}
            onMouseLeave={handleMouseLeave}
          >
            {startIcon !== undefined && (
              <span
                className={"icon " + styles[iconSize]}
                title={tooltip !== undefined ? tooltip : tooltip}
              >
                {startIcon}
              </span>
            )}
          </button>
        </div>
      )}
      {type == "upload" && (
        <button
          id={id}
          className={styles.btn + " " + buttonClass + " " + styles[buttonSize]}
          title={tooltip !== undefined ? tooltip : label}
          onClick={displayFileBrowser}
          onMouseOver={handleOnHover}
          onMouseLeave={handleMouseLeave}
        >
          {startIcon !== undefined && (
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
              onClick={displayFileBrowser}
            >
              {startIcon}
            </span>
          )}
          {label || children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {endIcon}
            </span>
          )}
          <input id={id + "_upload"} type="file" hidden />
        </button>
      )}
      {type == "tab" && (
        <button
          id={id}
          className={
            styles.btn +
            " " +
            buttonClass +
            " " +
            styles.tab_btn +
            " " +
            styles[buttonSize]
          }
          title={tooltip !== undefined ? tooltip : label}
          onClick={displayFileBrowser}
          onMouseOver={handleOnHover}
          onMouseLeave={handleMouseLeave}
        >
          {startIcon !== undefined && (
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
            >
              {startIcon}
            </span>
          )}
          {label || children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {endIcon}
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default DSButton;

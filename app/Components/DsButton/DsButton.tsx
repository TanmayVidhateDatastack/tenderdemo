import styles from "../dsButton/dsButton.module.css";
import btnStyles from "./dsButton.module.css";
import pageStyle from "../../page.module.css";

interface DSButtonProps {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  tooltip?: string;
  type?: string;
  buttonSize?: "btnSmall" | "btnMedium" | "btnLarge";
  iconSize?: "iconSmall" | "iconMedium" | "iconLarge";
  buttonClass?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  img?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  spliticon?: React.ReactNode;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DSButton: React.FC<DSButtonProps> = ({
  id,
  label,
  buttonClass,
  buttonSize = "btnMedium",
  iconSize = "iconSmall",
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
  return (
    <>
      {type == "standard" && (
        <button
          id={id}
          className={styles.btn + " " + buttonClass + " " + styles[buttonSize]}
          title={tooltip !== undefined ? tooltip : label}
          onClick={handleOnClick}
          onMouseOver={handleOnHover}
          onMouseLeave={handleMouseLeave}
        >
          {startIcon !== undefined && (
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
            >
              {/* <Image src={startIcon} alt="icon" /> */}
              {startIcon}
            </span>
          )}
          {label || children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {/* <Image src={endIcon} alt="icon" /> */}
              {endIcon}
            </span>
          )}
        </button>
      )}
      {type == "split" && (
        <div className={btnStyles.split_container}>
          <button
            id={id}
            className={
              styles.btn + " " + buttonClass + " " + styles[buttonSize]
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
                {/* <Image src={startIcon} alt="icon" /> */}
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
                  btnStyles.split_icon_btn +
                  " " +
                  styles[iconSize]
                }
              >
                {/* <Image src={endIcon} alt="icon" /> */}
                {endIcon}
              </span>
            )}
          </button>

          <div
            // className={"icon" + " " + styles.button_icon + " " + styles[iconSize]}
            className={
              btnStyles.split_icon_btn + " " + pageStyle.left_separator
            }
          >
            {/* {spliticon !== undefined && <Image src={spliticon} alt="icon" />} */}
            {spliticon}
          </div>
        </div>
      )}
      {type == "toggle" && (
        <div className={btnStyles.toggle}>
          <button
            id={id}
            className={
              styles.btn + " " + buttonClass + " " + styles[buttonSize]
            }
            onClick={handleOnClick}
            onMouseOver={handleOnHover}
            onMouseLeave={handleMouseLeave}
          >
            <div className={btnStyles.thumb}></div>
          </button>
        </div>
      )}
    </>
  );
};

export default DSButton;

import styles from "./dsButton.module.css";

import React from "react";

interface DSButtonGroupProps {
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
const DSButtonGroup: React.FC<DSButtonGroupProps> = ({
  label,
  children,
  buttonClass,
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={buttonClass}>
          {label || child}

          {index < React.Children.count(children) - 1 && (
            <div className={styles.separator}></div>
          )}
        </div>
      ))}
    </>
  );
};

export default DSButtonGroup;

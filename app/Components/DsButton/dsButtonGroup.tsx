// import { types } from "util";
import styles from "./dsButton.module.css";

import React, { useEffect } from "react";

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
  className?: string;
  img?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  spliticon?: React.ReactElement;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DSButtonGroup: React.FC<DSButtonGroupProps> = ({
  id,
  label,
  children,
  className,
  handleMouseLeave,
  handleOnHover,
}) => {
  useEffect(() => {
    if (id) {
      const buttonGroup = document.getElementById(id);
      if (buttonGroup) {
        const buttons = buttonGroup.querySelectorAll("button");
        buttons?.forEach((button, index) => {
          if (button) {
            if (index === 0) {
              button.classList.add(styles.active);
            }
            button.addEventListener("click", (e) => {
              buttons?.forEach((button) => {
                if (button) {
                  if (button.classList.contains(styles.active)) {
                    button.classList.remove(styles.active);
                  }
                }
              });

              (e.target as HTMLElement).classList.add(styles.active);
            });
          }
        });
      }
    }
  }, []);

  return (
    <div
      className={styles.flex + " " + className + " " + styles.btngroup}
      id={id}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleOnHover}
    >
      {React.Children.map(children, (child, index) => (
        <>
          {label || child}

          {index < React.Children.count(children) - 1 && (
            <div className={styles.separator}></div>
          )}
        </>
      ))}
    </div>
  );
};

export default DSButtonGroup;
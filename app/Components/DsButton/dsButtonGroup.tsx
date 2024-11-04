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
    const buttonGroup = document.getElementById("btngroup1");
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll("button");
      buttons?.forEach((button) => {
        if (button) {
          button.addEventListener("click", (e) =>
            handleButtonClick(e, button.id)
          );
        }
      });
    }
  }, []);
  const handleButtonClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const buttonGroup = document.getElementById("btngroup1");
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll("button");
      buttons?.forEach((button) => {
        if (button) {
          if (button.classList.contains(styles.active)) {
            button.classList.remove(styles.active);
          }
        }
      });
    }

    const clickedButton = document.getElementById(id);
    if (clickedButton) {
      clickedButton.classList.add(styles.active);
    }
  };
  return (
    <div
      className={styles.flex + " " + className}
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

"use client";
import styles from "./dsstatusIndicator.module.css";
// import btnStyles from "../dsButton/dsButton.module.css";
import dsStatus from "../../constant";
import React, { useState } from "react";

interface DsStatusIndicatorProps {
  status?: dsStatus;
  className?: string;
  id?: string;
  label?: string;
  type?: string;
  status_icon?: React.ReactElement;
  btn_label?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  tooltip?: string;
  positionProp?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
  comment?: string;
}

const DsStateChange: React.FC<DsStatusIndicatorProps> = ({
  className,
  id,
  label,
  status = "under_approved",
  type = "system_default",
  status_icon,
  handleOnClick,
  handleOnHover,
  btn_label,
  tooltip,
  positionProp = "top",
  showArrow = "false",
  comment,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleonmousehover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    let x = buttonRect.left;
    let y = buttonRect.top;

    if (positionProp === "top") {
      y = buttonRect.top - buttonRect.height; // Above the button
    } else if (positionProp === "bottom") {
      y = buttonRect.bottom + 3; // Below the button
    } else if (positionProp === "left") {
      x = buttonRect.left - 68; // Left of the button
      y = buttonRect.top + buttonRect.height / 4;
    } else if (positionProp === "right") {
      x = buttonRect.right + 5; // Right of the button
      y = buttonRect.top + buttonRect.height / 4;
    }

    setPosition({ x, y });
    setIsVisible(!isVisible);
  };
  return (
    <>
      {type == "system_default" && (
        <>
          <div className={styles.statusIndicator}>
            <div
              className={
                styles.btnContained +
                " " +
                styles.statusIndicator +
                " " +
                className +
                " " +
                styles[status]
              }
              id={id}
            >
              {label}
            </div>

            {btn_label && (
              <button
                onClick={handleOnClick}
                className={"icon " + styles.button_label}
                title={tooltip != undefined ? tooltip : tooltip}
                onMouseOver={handleOnHover}
              >
                {btn_label}
              </button>
            )}
          </div>
        </>
      )}
      {type == "user_defined" && (
        <>
          <div className={styles.statusIndicator}>
            <div
              className={
                styles.btnContained + " " + className + " " + styles[status]
              }
              id={id}
            >
              {label}
            </div>
            {status_icon && (
              <button
                id={id}
                onClick={handleOnClick}
                className={"icon " + styles.status_icon}
                onMouseOver={handleonmousehover}
              >
                {status_icon}
              </button>
            )}
          </div>
          {isVisible && (
            <div
              className={styles.popUp}
              style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
              }}
            >
              {comment}
              {showArrow && (
                <div
                  className={`${styles.arrow} ${styles[positionProp]}`}
                ></div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DsStateChange;

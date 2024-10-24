"use client";
import React, { useState } from "react";
import styles from "./dscontext.module.css";
import DSButton from "../dsButton/DsButton";

// Define type for position prop
interface PopUpContextProps {
  positionProp?: "top" | "bottom" | "left" | "right";
  showArrow: boolean;
}

const PopUpContext: React.FC<PopUpContextProps> = ({
  positionProp = "top",
  showArrow = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
      <DSButton handleOnClick={handleClick}>Save</DSButton>

      {isVisible && (
        <div
          className={styles.popUp}
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
        >
          Submit
          {showArrow && (
            <div className={`${styles.arrow} ${styles[positionProp]}`}></div>
          )}
        </div>
      )}
    </>
  );
};

export default PopUpContext;

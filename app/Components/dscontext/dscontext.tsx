"use client";
import React, { useState } from "react";
import styles from "./dscontext.module.css";



const PopUpContext: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const x = buttonRect.left + (buttonRect.width / 2); 
    const y = buttonRect.top - 40;
   
    setPosition({ x, y });
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>Save</button>

      {isVisible && (
        <div
          className={styles.popUp}
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
    
          }}
          
        >
          Submit
          <div className={styles.arrow}></div> {/* Add arrow under the popup */}
        </div>
      )}
    </div>
  );
};

export default PopUpContext;

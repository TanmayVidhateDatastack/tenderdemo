'use client'
import React, { useEffect, useState } from "react";

import Image from "next/image";

import success from "../../Icons/success.svg";
import error from "../../Icons/error.svg";
import warning from "../../Icons/info.svg";
import normal from "../../Icons/bonus.svg";
import styles from "./DsToaster.module.css"
import DSButton from "../dsButton/dsButton";

interface ToasterProps {
  message: string;
  type: "success" | "bonus" | "info" | "error";
  handleClose: () => void;
  position: "top" | "topleft" | "topright" | "middle" | "bottom" | "bottomleft" | "bottomright";
  duration?: number;
}
const Toaster: React.FC<ToasterProps> = ({
  message,
  type="info",
  position="top",
  duration,
  handleClose

}) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (duration || duration === 0)
   {

    const timer = setTimeout(() => {
      handleClose();
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }
  }, [duration]);

  if (!visible) return null;




  const getIconSrc = () => {
    switch (type) 
    {
      case 'success': return success;
      case 'info': return warning; 
      case 'error': return error;
      case 'bonus': return normal;
      default:
        return <div> <Image className="add" src="" alt="Add icon" /> </div>;
    }
  };
  const handleButtonClick = () => {
    console.log(`Button clicked for message ID:`);
   
  };

  return (
  
    <div
      className={`${styles.floatter} ${styles.toast}  ${styles[position]} ${styles[type]} `}>
      <div className={styles.toastImg}> <Image className="add" src={getIconSrc()} alt={type} /> </div>
     


      <div className={styles.messageContainer}> {message}      
    </div>
   
{/* <span> </span> */}
<div> </div>

{type === 'info' && (
    <div className={styles.buttonContainer}>
      <DSButton
        id="actionBtn"
        buttonClass={`${styles.action_btn} `}
        handleOnClick={() => handleButtonClick()}
        label="Okay"
      />
    </div>
  )}
</div>
  );
};

export default Toaster;















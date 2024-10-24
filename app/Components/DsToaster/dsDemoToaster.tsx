"use client";

import { useState } from "react";
import DSButton from "../dsButton/dsButton";
import Toaster from "./DsToaster";
import styles from "../DsButton/dsButton.module.css"

const DemoToaster: React.FC = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [pos, setPos] = useState<"top" | "topleft" | "topright" | "middle" | "bottom" | "bottomleft" | "bottomright">("bottom");
  return (
    <>
    <div className={styles.btn}>
    <DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("top")
      }}
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-top"
    />

<DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("bottom")
      }
      }
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-bottom"
    />
    <DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("top")
      }}
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-top"
    />

   

<DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("bottom")
      }
      }
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-bottom"
    />
    <DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("top")
      }}
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-top"
    />

   

<DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("bottom")
      }
      }
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-bottom"
    />
    <DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("top")
      }}
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-top"
    />

   

<DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("bottom")
      }
      }
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-bottom"
    />
    <DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("top")
      }}
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-top"
    />

   

<DSButton
      id="actionBtn"
      buttonClass={styles.action_btn}
      handleOnClick={() =>{ setShowNotification(true)
        setPos("bottom")
      }
      }
      // handleOnClick={handleActionClick}
      // handleOnHover={handleMouseHover}
      // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
      label="info-bottom"
    />
</div>

    {showNotification && (
      <Toaster
        handleClose={() => setShowNotification(false)}
        type="info"
        message="this is simple error msg you cant acess this side now .............!"
        position={pos}
      />
    )}

      
     </>
        
  );
};

export default DemoToaster;







'use client'
import { useState } from "react";
import DSButton from "./Components/dsButton/dsButton";
import styles from "./Components/dsButton/dsButton.module.css";
import PaneStyles from "./Components/Dspane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import DemoButtons from "./Components/dsButton/dsDemoButtons";
import Toaster from "./Components/DsToaster/DsToaster";
// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
import addIcon from "./Icons/add.svg";
import Image from "next/image";
import TextField from "./Components/DsTextField/DsTextField";
import DsPane from "./Components/Dspane/DsPane";

export default function Home() {
  // const handleMouseHover = (e) => {
  //   const button = e.target;
  //   if (button) {
  //     const icon = button.querySelector(".add") as HTMLImageElement;
  //     if (icon) {
  //       icon.src = addIconHover;
  //       console.log(addIconHover);
  //     }
  //   }
  // };
  // const handleActionClick = () => {
  //   console.log("Action button clicked");
  // };
  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (
    <>
      <div className={styles.btn}>
        {/* <DSButton
        id="actionBtn"
        buttonClass={styles.action_btn}
        // handleOnClick={handleActionClick}
        // handleOnHover={handleMouseHover}
        startIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
        buttonText="New"
      /> */}
        <DemoButtons />


      
        <DsPane type="ClosePane" side={PaneStyles.left}>
        <TextField
          placeholder="placeholder"
          label="label"
          disable={false}
          // onClick={false}
          type="multiline"
          icon="📋"
          iconEnd="📋" 
        

        />
      <div className={styles.btn}>

      <DSButton
        id="actionBtn"
        buttonClass={styles.action_btn}
        handleOnClick={() => setShowNotification(true)}
        // handleOnClick={handleActionClick}
        // handleOnHover={handleMouseHover}
        // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
        label="show notification "
        />

{ showNotification && (
      <Toaster
          handleClose={() => setShowNotification(false)}
          type="error"
          message="this is simple error msg you cant acess this side now .............!"
          position="bottomright" 
          duration={3000}
         />
    )}

</div>
</DsPane>


 {/* <DsPane type="ClosePane" side={PaneStyles.left}>
      <div className={styles.input}>

      <TextField
          placeholder="placeholder"
          label="label"
          disable={false}
          // onClick={false}
          type="multiline"
          icon="📋"
          iconEnd="📋" 
        

        />
</div> 
 
       </DsPane>  */}


{/* </div> */}


 </div>




      {/* <div className={styles.btn}>
        <SaveButton />
      </div> */}
    </>
  );
}

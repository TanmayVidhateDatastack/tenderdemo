"use client";
import { useState } from "react";
import DSButton from "./Components/dsButton/dsButton";
import styles from "./page.module.css";
import buttonStyles from "./Components/dsButton/dsButton.module.css";
import PaneStyles from "./Components/Dspane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import Toaster from "./Components/DsToaster/DsToaster";
// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
import Image from "next/image";
import addIcon from "./Icons/add.svg";
// import Image from "next/image";
import TextField from "./Components/DsTextField/DsTextField";
import DsPane from "./Components/dsPane/dsPane";
import PaneOpenButton from "./Components/dsPane/paneOpenButton";
import Application from "./ElProComponents/ApplicationComponents/Application";
import DsPopup from "./Components/dsPopup/dsPopup";
import PopupOpenButton from "./Components/dsPopup/popupOpenButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import DemoButtons from "./Components/dsButton/dsDemoButtons";
import DsSelect from "./Components/dsSelect/dsSelect";
import PopUPContext from "./Components/dscontext/dscontext";

// import SaveButton from "./Components/DsButton/Ds_SaveBtn";

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
  const options=[ "option1" , "option2" , "option3","option4","option5"];

  
  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (
    <>
      <Application
        appTitle="Sales and Order"
        appMenu={
          <div className={styles.container}>
            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneInset"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Inset"
            />
            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneRight"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Overlay"
            />
          </div>
        }
      >
        <div className={styles.fluidContainer}>
          <DsPane id="PaneInset" type="inset" side={PaneStyles.left}>
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

              {showNotification && (
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
          <div className={styles.container}>
          <DsSelect options={options} placeholder= "Click me to select" label="multiselect"></DsSelect>
          <PopUPContext/>

            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneInset"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Inset"
            />
            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneRight"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Overlay"
            />
            <PopupOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              popupId="test"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Popup"
            />
        <DemoButtons />

          </div>
        </div>
      </Application>
      <DsPopup
        id={"test"}
        /*position="center" type="document"*/ title={"check"}
      >
        <div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            buttonClass={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            startIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            label="New"
          />
        </div>
      </DsPopup>
      <DsPane id="PaneRight" side={"right"}>
        <div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            buttonClass={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            startIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            label="New"
          />
        </div>
      </DsPane>
    </>
  );
};

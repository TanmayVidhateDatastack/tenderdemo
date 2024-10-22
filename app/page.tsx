import Image from "next/image";
import styles from "./page.module.css";
import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
import PaneStyles from "./Components/DsPane/DsPane.module.css";
import addIcon from "./Icons/add.svg";
import DSButton from "./Components/DsButton/DsButton";
import DsPane from "./Components/dsPane/dsPane";
import PaneOpenButton from "./Components/dsPane/paneOpenButton";
import Application from "./ElProComponents/ApplicationComponents/Application";
import DsPopup from "./Components/dsPopup/dsPopup";
import PopupOpenButton from "./Components/dsPopup/popupOpenButton";

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
          <DsPane id="PaneInset" type="inset" side={PaneStyles.left}></DsPane>
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
          </div>
        </div>
        
        
      </Application>
      <DsPopup id={"test"} /*position="center" type="document"*/ title={"check"} ><div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            buttonClass={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            buttonText="New"
          />
        </div></DsPopup>
      <DsPane id="PaneRight" side={"right"}>
        <div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            buttonClass={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            buttonText="New"
          />
        </div>
      </DsPane>
    </>
  );
}

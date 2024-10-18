import Image from "next/image";
import styles from "./page.module.css";
import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
import PaneStyles from "./Components/DsPane/DsPane.module.css";
import addIcon from "./Icons/add.svg";
import DSButton from "./Components/DsButton/DsButton";
import DsPane from "./Components/DsPane/DsPane";
import PaneOpenButton from "./Components/DsPane/PaneOpenButton";

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
    <div className={styles.fluidContainer}>

      <DsPane id="PaneInset" type="inset" side={PaneStyles.left}></DsPane>
      <div className={styles.container}>
        <PaneOpenButton
          id="actionBtn"
          buttonClass={buttonStyles.action_btn}
          paneId="PaneInset"
          // handleOnClick={handleActionClick}
          // handleOnHover={handleMouseHover}
          beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
          buttonText="Inset"
          />
          <PaneOpenButton
          id="actionBtn"
          buttonClass={buttonStyles.action_btn}
          paneId="PaneRight"
          // handleOnClick={handleActionClick}
          // handleOnHover={handleMouseHover}
          beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
          buttonText="Overlay"
          />
      </div>
      <DsPane id="PaneRight" type="ClosePane" side={PaneStyles.right}>
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
            </div>
    </>
  );
}

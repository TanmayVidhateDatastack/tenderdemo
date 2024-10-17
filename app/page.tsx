// import Image from "next/image";
// import styles from "./page.module.css";
// import styles from "./Components/DsButton/Ds_Button.module.css";
import styles from "./Components/dsButton/dsButton.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import DemoButtons from "./Components/dsButton/dsDemoButtons";
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
      </div>
      {/* <div className={styles.btn}>
        <SaveButton />
      </div> */}
    </>
  );
}

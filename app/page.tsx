import Image from "next/image";
// import styles from "./page.module.css";
 import styles from "./Components/DsButton/Ds_Button.module.css";
import addIcon from "./Icons/add.svg";
import DSButton from "./Components/DsButton/DsButton";

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
    <div className={styles.btn}>
      <DSButton
        id="actionBtn"
        buttonClass={styles.action_btn}
        // handleOnClick={handleActionClick}
        // handleOnHover={handleMouseHover}
        beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
        buttonText="New"
      />
    </div>
  );
}

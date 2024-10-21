import Image from "next/image";
import styles from "./page.module.css";
import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
import PaneStyles from "./Components/DsPane/DsPane.module.css";
import addIcon from "./Icons/add.svg";
import DSButton from "./Components/DsButton/DsButton";
import DsPane from "./Components/DsPane/DsPane";
import PaneOpenButton from "./Components/DsPane/PaneOpenButton";
import DsSelect from "./Components/dsSelect/dsSelect";

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
  const options=[ "option1" , "option2" , "option3"];

  

  return (
    <>
      <DsSelect options={options} placeholder={"Click me to select"}></DsSelect>
    </>
  );
};

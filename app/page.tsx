import Image from "next/image";
// import styles from "./page.module.css";
 import styles from "./Components/DsButton/Ds_Button.module.css";
 import PaneStyles from "./Components/DsPane/DsPane.module.css";
import addIcon from "./Icons/add.svg";
import DSButton from "./Components/DsButton/DsButton";
import DsPane from "./Components/DsPane/DsPane";


import TextField from "./Components/DsTextField/DsTextField";

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
 
  return (<>
    <DsPane type="ClosePane" side={PaneStyles.right}></DsPane>
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
      <DsPane type="ClosePane" side={PaneStyles.left}>
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
      </DsPane>
      {/* <DsPane type="ClosePane" side={PaneStyles.left}>
      <div className={styles.input}>

      <InputText
          placeholder="placeholder"
          label="label"
          disable={false}
          onClick={false}
          type="text"
          icon="📋"
          iconEnd="📋" 
        

        />
      
      </div> */}
      {/* </DsPane> */}

      <DsPane type="ClosePane" side={PaneStyles.left}>
      <div className={styles.textarea}>

      <TextField
          placeholder="placeholder"
          label="label"
          disable={false}
          type="multiline"
          icon="📋"
          iconEnd="📋"
          rows={10}
         />  
         
      </div>
      </DsPane>
      
      
        </>
  );
}

import Image from "next/image";
import React from "react";
import styles from "./ElLayout.module.css";
import pageStyles from "../../page.module.css";

import addIcon from "../../Icons/add.svg";
import IpcaLogo from "../../Icons/mediumIcons/Ipca.svg";
import ChatIcon from "../../Icons/mediumIcons/chat.svg";
import NotiIcon from "../../Icons/mediumIcons/Bell.svg";

function ApplicationTitleBar() {
  return (
    <>
      <div className={styles.appTitleBar + " " + styles.row}>
        <div className={styles.col + " " + styles.titleBarItem +" "+styles.left_align}>
          <Image src={IpcaLogo} alt="IPCA" />
        </div>
        <div className={styles.col}>
          <div className={styles.titleBarItem + " " + pageStyles.left_separator}>
            <Image src={ChatIcon} alt="Chat" />
          </div>
          <div className={styles.titleBarItem + " " + pageStyles.left_separator}>
            <Image src={NotiIcon} alt="Bell" />
          </div>
          <div className={styles.titleBarItem + " " + pageStyles.left_separator}>
            <Image src={addIcon} alt="Add Icon" />
          </div>
          <div className={styles.titleBarItem + " " + pageStyles.left_separator}>
            <Image src={addIcon} alt="Add Icon" />
          </div>
            
        </div>
      </div>
    </>
  );
}
export default ApplicationTitleBar;

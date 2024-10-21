// import Image from "next/image";
import React from "react";
import styles from "./Application.module.css";
// import pageStyles from "../../page.module.css";

// import addIcon from "../../Icons/add.svg";
// import IpcaLogo from "../../Icons/mediumIcons/Ipca.svg";
// import ChatIcon from "../../Icons/mediumIcons/chat.svg";
// import NotiIcon from "../../Icons/mediumIcons/Bell.svg";

export interface ApplicationHeaderProps {
    children:React.ReactNode
    appTitle:string;
}

function ApplicationHeader({children,appTitle}:ApplicationHeaderProps) {
  return (
    <>
        <div className={styles.applicationHeader}>
            <div className={styles.appTitle}>{appTitle}</div>
            <div className={styles.appMenu}>{children}</div>
        </div>
    </>
  );
}
export default ApplicationHeader;

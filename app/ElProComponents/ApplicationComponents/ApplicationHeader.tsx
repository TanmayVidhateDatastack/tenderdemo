// import Image from "next/image";
import React from "react";
import styles from "./Application.module.css";
import NavBack from "../NavigationComponent/navBack";
import pageStyles from "../../page.module.css";

// import addIcon from "../../Icons/add.svg";
// import IpcaLogo from "../../Icons/mediumIcons/Ipca.svg";
// import ChatIcon from "../../Icons/mediumIcons/chat.svg";
// import NotiIcon from "../../Icons/mediumIcons/Bell.svg";

export interface ApplicationHeaderProps {
  children: React.ReactNode;
  appTitle: string;
  hasPrevious: boolean;
}
/**
 * ApplicationHeader displays the header row of the applicaiton.
 *
 * application header is only used in application not need use it again.
 * @param {string} hasPrevious - decides whether there is back button or not.
 * @param {string} appTitle - application Title passed to application.
 * @param {React.ReactNode} children - appMenu passed in application will be placed here.
 */
function ApplicationHeader({
  children,
  appTitle,
  hasPrevious,
}: ApplicationHeaderProps) {
  return (
    <>
      {!hasPrevious && (
        <div className={styles.applicationHeader}>
          <div className={styles.appTitle}>{appTitle}</div>
          <div className={styles.appMenu}>{children}</div>
        </div>
      )}
      {hasPrevious && (
        <div className={styles.applicationHeader}>
          <div className={styles.appTitle}>
            <NavBack>Back</NavBack>
            <span className={pageStyles.left_separator+" "+pageStyles["pad-l"]}>
            {appTitle}
              </span>
          </div>
          <div className={styles.appMenu}>{children}</div>
        </div>
      )}
    </>
  );
}
export default ApplicationHeader;

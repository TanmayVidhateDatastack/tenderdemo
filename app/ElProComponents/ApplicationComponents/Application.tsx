// import Image from "next/image";
import React from "react";
import styles from "./Application.module.css";
import pageStyles from "../../page.module.css";

import ApplicationHeader from "./ApplicationHeader";

export interface ApplicationProps {
    children:React.ReactNode
    appMenu?:React.ReactNode
    appTitle:string;
}

function Application({children,appTitle,appMenu}:ApplicationProps) {
  return (
    <>
            <ApplicationHeader appTitle={appTitle}>{appMenu}</ApplicationHeader>
            <div className={styles.application}>{children}</div>
    </>
  );
}
export default Application;

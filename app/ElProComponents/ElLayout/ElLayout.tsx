// import Image from "next/image";
import React from "react";
import styles from "./ElLayout.module.css";
import ApplicationTitleBar from "../ApplicationComponents/ApplicationTitleBar";

export interface ElLayoutProps {
    children:React.ReactNode
}
function ElLayout({children}: ElLayoutProps) {
  return (
    <>
      <div className={styles.layout+" "+styles.container}>
        <ApplicationTitleBar></ApplicationTitleBar>
        
        <div className={styles.applicationTitleBar+" "+styles.row}></div>
        <div className={styles.row+" "+styles.applicationContent}>
            {/* <ApplicationNavigator></ApplicationNavigator>
            <Application></Application> */}
          <div className={styles.applicationNavigator}>

          </div>
          <div className={styles.applicationViewArea}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
export default ElLayout;

// import Image from "next/image";
import React from "react";
import styles from "./ElLayout.module.css";
import ApplicationTitleBar from "./ApplicationTitleBar";
import ApplicationNavigator from "./ApplicationNavigator";

export interface ElLayoutProps {
    children:React.ReactNode
}

/**
 * ELayout provides the basic layout of ERP project 
 * All application wiil have this same layout 
 * All components of the application should be placed inside elayout which will be treated as children here 
 */
function ElLayout({children}: ElLayoutProps) {
  return (
    <>
      <div className={styles.layout+" "+styles.container}>
        <ApplicationTitleBar></ApplicationTitleBar>
        
        <div className={styles.row+" "+styles.appContent}>
            <ApplicationNavigator></ApplicationNavigator>
            {/* <Application></Application> */}

          <div className={styles.appViewArea}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
export default ElLayout;

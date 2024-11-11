// import Image from "next/image";
import React from "react";
import styles from "./Application.module.css";
// import pageStyles from "../../page.module.css";

import ApplicationHeader from "./ApplicationHeader";

export interface ApplicationProps {
    children:React.ReactNode;
    appMenu?:React.ReactNode;
    hasPrevious?:boolean;
    appTitle:string;
}
/**
 * Application is the view area for every application.
 * 
 * @param {React.ReactNode} children - all components required for a application should be passed as children.
 * @param {React.ReactNode} appMenu - compoenent within the title bar of the application should be passed here.
 * @param {boolean} hasPrevious - to decide wheter the back button is available for this page.
 * @param {string} apptitle - Title of the application.
 * @param {string} title - The title displayed in the DsPane component.
 * 
 * 
 */
function Application({children,appTitle,appMenu,hasPrevious=false}:ApplicationProps) {
  return (
    <>
            <ApplicationHeader appTitle={appTitle} hasPrevious={hasPrevious}>{appMenu}</ApplicationHeader>
            <div className={styles.application }>{children}</div>
    </>
  );
}
export default Application;

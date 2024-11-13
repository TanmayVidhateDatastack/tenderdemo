// import Image from "next/image";
import React from "react";
import styles from "./Application.module.css";
// import pageStyles from "../../page.module.css";

import ApplicationHeader from "./ApplicationHeader";
import TabContainer, { tab } from "@/app/Components/dsTabs/TabContainer";

export interface ApplicationProps  {
  children: React.ReactNode;
  appMenu?: React.ReactNode;
  hasPrevious?: boolean;
  appTitle: string;
  tabs?:tab[];
  selectedTabId?:string;
  isDataTable?:boolean;
}
/**
 * Application is the view area for every application.
 *
 * @param {React.ReactNode} children - all components required for a application should be passed as children.
 * @param {React.ReactNode} appMenu - compoenent within the title bar of the application should be passed here.
 * @param {boolean} hasPrevious - to decide wheter the back button is available for this page.
 * @param {string} apptitle - Title of the application.
 * @param {string} title - The title displayed in the DsPane component.
 * @param {tab[]} tabs - if page hase diffrent tabs.
 * @param {string} selectedTabId - by default selected Tab Id.
 * @param {boolean} isDataTable - depending upon the value view will be changed.
 *
 *
 */
function Application({
  children,
  appTitle,
  appMenu,
  hasPrevious = false,
  tabs,
  selectedTabId,
  isDataTable =false
}: ApplicationProps) {
  return (
    <>
      <ApplicationHeader appTitle={appTitle} hasPrevious={hasPrevious}>
        {appMenu}
      </ApplicationHeader>
      {tabs && selectedTabId && (
        <TabContainer selectedTabId={selectedTabId} tabs={tabs}>
          <div className={styles.application+ " "+`${isDataTable?styles.dataTable:" "}`}>{children}</div>
        </TabContainer>
      )}
      {!tabs && <div className={styles.application + " "+`${isDataTable?styles.dataTable:" "}`}>{children}</div>}
    </>
  );
}
export default Application;

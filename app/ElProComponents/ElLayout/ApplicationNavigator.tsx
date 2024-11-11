import Image from "next/image";
import React from "react";
import styles from "./ElLayout.module.css";
import prodesk from "../../Icons/mediumIcons/Prodesk.svg";
import salesNorder from "../../Icons/mediumIcons/SalesNOrder.svg";
import datastack from "../../Icons/smallIcons/datastack.svg";
/**
 * ApplicationNavigator links to all application in the ERP will be available here based on user access levels.
 */
function ApplicationNavigator() {
  return (
    <div className={styles.appNavigator}>
      <div className={styles.appRoutes}>
        <div className={styles.app}>
          <Image src={prodesk} alt="Pro desk"></Image>
          <div className={styles.appTitle}>Pro Desk</div>
        </div>
        <div className={styles.app}>
          <Image src={salesNorder} alt="Sales Order"></Image>
          <div className={styles.appTitle}>Sales Order</div>
        </div>
      </div>
      <div className={styles.navigationFooter}>
        <div className={styles.poweredByLogo}>
            <Image src={datastack} alt="Datastack"></Image>
        </div>
        <div className={styles.poweredBy}> 
            Powered by Datastack
        </div>
      </div>
    </div>
  );
}
export default ApplicationNavigator;

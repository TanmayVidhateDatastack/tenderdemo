import Image from "next/image";
import addIcon from "../../Icons/add.svg";
import React from "react";
import styles from "../ElLayout/ElLayout.module.css";

function ApplicationTitleBar() {
  return (
    <>
      <div className={styles.applicationTitleBar + " " + styles.row}>
        <div className={styles.col + " " + styles.titleBarItem}>
          <Image src={addIcon} alt="Add Icon" />
        </div>
        <div className={styles.col}>
          <div className={styles.titleBarItem + " " + styles.separator}>
            <Image src={addIcon} alt="Add Icon" />
          </div>
          <div className={styles.titleBarItem + " " + styles.separator}>
            <Image src={addIcon} alt="Add Icon" />
          </div>
          <div className={styles.titleBarItem + " " + styles.separator}>
            <Image src={addIcon} alt="Add Icon" />
          </div>
          <div className={styles.titleBarItem + " " + styles.separator}>
            <Image src={addIcon} alt="Add Icon" />
          </div>
        </div>
      </div>
    </>
  );
}
export default ApplicationTitleBar;

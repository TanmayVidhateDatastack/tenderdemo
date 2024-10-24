"use client";
import Image from "next/image";

import React from "react";
import styles from "./dsPane.module.css";

import CloseBtn from "../../Icons/mediumIcons/cross.svg";

export interface DsPaneProps {
  id?: string;
  type?: string;
  side?: string;
  className?: string;
  title?: string;
  width?: string;
  paneMenus?: React.ReactNode;
  children?: React.ReactNode;
}

function ClosePane(e: React.MouseEvent<HTMLDivElement>) {
  e.preventDefault();
  const currentPane = (e.target as HTMLElement).closest(".DsPane");
  if (currentPane) {
    currentPane.classList.toggle(styles.close);
  }
}
export function DisplayPane(id: string) {
  const currentPane = document.getElementById(id);
  // const currentPane = document.getElementById('container');

//   currentPane?.addEventListener("transitionend", (event) => {
//     // Ensure the event is for the opacity property
//     if (event.propertyName === "opacity") {
//       // Check if the opacity is 0 after the transition
//       if (window.getComputedStyle(currentPane).opacity == "0") {
//         currentPane.style.minWidth="0px"; // Set display to none after fade-out
//         currentPane.style.maxWidth="0px"; // Set display to none after fade-out
//       }
//       else{
//         currentPane.style.minWidth="20vw"; // Set display to none after fade-out
//         currentPane.style.maxWidth="100vw";
//       }
//     }
//   });
  if (currentPane) {
    currentPane.classList.toggle(styles.close);
  }
}
/**
 * DsPane component displays pane.
 *
 * @param {string} id - Set id for pane.
 * @param {string} type - (default/ inset)#Set type of pane i.e.  #default, closeable and over the elements(overlay) ,inset - #closeable but occupies width of the container
 * @param {string} side -(left / right) The side where the Ane will be displayed (e.g., left, right).
 * @param {string} className - #Additional class names to be applied to the main DsPane div.
 * @param {string} title - The title displayed in the DsPane component.
 * @param {React.ReactNode} paneMenus - The menu items that will be displayed in the DsPane.
 * @param {React.ReactNode} children - The child elements to be rendered inside the DsPane component.
 */
function DsPane({
  id,
  type,
  side,
  className,
  title,
  paneMenus,
  children,
}: DsPaneProps) {
  return (
    <>
      <div
        id={id !== undefined ? id : ""}
        className={
          styles.DsPane +
          ` DsPane ${
            className !== undefined && className !== null && className
          } ${side !== undefined && side !== null && styles[side]} ${
            type !== undefined ? styles[type] : ""
          }`
        }
      >
        <div className={styles.PaneTitleBar}>
          <div className={styles.PaneTitle}>{title ? title : "DsPane"}</div>
          <div className={styles.PaneMenus}>
            {paneMenus ? (
              <>
                {paneMenus}
                {
                  <div
                    className={styles.closePane}
                    onClick={(e) => ClosePane(e)}
                  >
                    <Image src={CloseBtn} alt="Close" />
                  </div>
                }
              </>
            ) : (
              <div className="close-pane" onClick={(e) => ClosePane(e)}>
                <Image src={CloseBtn} alt="Close" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.PaneContent}>
          {children ? children : "DsPane Content Area"}
        </div>
      </div>
    </>
  );
}
export default DsPane;

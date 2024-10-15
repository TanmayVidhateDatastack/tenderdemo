"use client";
import Image from "next/image";

import React from "react";
import styles from "./DsPane.module.css";

import CloseBtn from "../../Icons/mediumIcons/cross.svg";


export interface DsPaneProps {
  type?:string;
  side?: string;
  className?: string;
  title?: string;
  width?: string;
  paneMenus?: React.ReactNode;
  children?: React.ReactNode;
}
/**
 * DsPane component displays pane.
 *
 * @param {string} type - Set type of pane i.e. Simple (default), ClosePane(DsPane with close button)
 * @param {string} side - The side where the Ane will be displayed (e.g., left, right).
 * @param {string} className - Additional class names to be applied to the main DsPane div.
 * @param {string} title - The title displayed in the DsPane component.
 * @param {React.ReactNode} paneMenus - The menu items that will be displayed in the DsPane.
 * @param {React.ReactNode} children - The child elements to be rendered inside the DsPane component.
 */
function ClosePane(e:React.MouseEvent<HTMLDivElement>){
  e.preventDefault();
  const currentPane=(e.target as HTMLElement).closest(".DsPane");
  if(currentPane){
    currentPane.classList.toggle(styles.close);
  }
}
export function DisplayPane(e:React.MouseEvent<HTMLDivElement>){
  e.preventDefault();
  const currentPane=(e.target as HTMLElement).closest(".DsPane");
  if(currentPane){
    currentPane.classList.toggle(styles.close);
  }
}
function DsPane({ type,side, className, title, paneMenus, children }: DsPaneProps) {
  return (
    <>
      <div className={styles.DsPane + ` DsPane ${className!==undefined && className!==null && className} ${side!==undefined && side!==null && side}`}>
        <div className={styles.PaneTitleBar}>
          <div className={styles.PaneTitle}>{title ? title : "DsPane"}</div>
          <div className={styles.PaneMenus}>{
          paneMenus ? (
            <>
              {paneMenus}
              {
                type=="ClosePane" &&
                <div className={styles.closePane} onClick={(e)=>ClosePane(e)}><Image src={CloseBtn} alt="Close"/></div>
              }
            </>
          ) : (
            type=="ClosePane" &&

            <div className="close-pane" onClick={(e)=>ClosePane(e)}><Image src={CloseBtn} alt="Close"/></div>
          )
        }</div>
        </div>
        <div className="PaneContent">
          {children ? children : "DsPane Content Area"}
        </div>
      </div>
    </>
  );
}
export default DsPane;

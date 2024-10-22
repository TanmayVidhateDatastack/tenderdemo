"use client";
import Image from "next/image";

import React from "react";
import styles from "./dsPopup.module.css";

import CloseBtn from "../../Icons/mediumIcons/cross.svg";

export interface DsPopupProps {
  id: string;
  type?: "standard" | "document";
  size?: "small" | "medium" | "large";
  position?: "top" | "center";
  className?: string;
  title: string;
  children: React.ReactNode;
}
export function ClosePopup(id: string) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = "none";
  }
}
export function OpenPopup(id: string) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = "flex";
  }
}
/**
 * DsPopup component displays popup.
 *
 * @param {string} id - Set id for popup.
 * @param {string} className - #Additional class names to be applied to the main DsPane div.
 * @param {string} size - (Small/Medium/Large) # decides the size of popup # default -> Medium
 * @param {string} type - (standard/ document)#Set type of popup i.e.
 *                      (Standard) # default #is basic popup with normal  title bar and no scrolling inside it
 *                      (Document) popup is popup to show documents and in the title bar there will be document specific actions
 * @param {string} position -(top / center) The side where the dsPopup will be displayed (e.g., top, center).
 * @param {string} title - The title displayed in the DsPopup component.
 * @param {React.ReactNode} children - The child elements to be rendered inside the DsPopup component.
 */
function DsPopup({
  id,
  className,
  size = "medium",
  type = "standard",
  position = "top",
  title,
  children,
}: DsPopupProps) {
  return (
    <>
      <div id={id} className={`${styles.popupContainer} ${styles[position]}`}>
        <div
          className={`${styles.popup} ${styles[size]} ${styles[type]} ${className}`}
        >
          <div className={`${styles.popupTitleBar}`}>
            <div className={styles.popupTitle}>{title}</div>
            <div className={styles.popupMenus}>
              {type == "document" && (
                <>
                <div className={styles.popupMenu}>
                  <div>
                    <Image src={CloseBtn} alt="Close"></Image>
                  </div>
                  <div>
                    <Image src={CloseBtn} alt="Close"></Image>
                  </div>
                  <div>
                    <Image src={CloseBtn} alt="Close"></Image>
                  </div>
                </div>
                <div className={styles.popupMenu}>
                  <div>
                    <Image src={CloseBtn} alt="Close"></Image>
                  </div>
                </div>
                <div className={styles.popupMenu}>
                <div>
                  <Image src={CloseBtn} alt="Close"></Image>
                </div>
              </div>
                </>
              )}
              {type == "standard" && (

              <div className={styles.popupMenu}>
                <div onClick={() => ClosePopup(id)}>
                  <Image src={CloseBtn} alt="Close"></Image>
                </div>
              </div>
            )}

            </div>
          </div>
          <div className={`${styles.popupContent}`}>{children}</div>
        </div>
      </div>
    </>
  );
}
export default DsPopup;

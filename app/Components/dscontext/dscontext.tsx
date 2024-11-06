"use client";
import styles from "./dscontext.module.css";
import React, { ReactNode } from "react";

interface PopUpContextProps {
  id?: string;
  containerId?: string;
  content?: string | ReactNode;
}

export const displaycontext = (
  event: React.MouseEvent<HTMLElement>,
  id: string,
  containerId: string
) => {
  event.preventDefault();

  const contextMenu = document.getElementById(id);
  const container = document.getElementById(containerId);

  // If contextMenu is already displayed as flex, hide it by setting it to 'none'
  if (contextMenu?.style.display === "flex") {
    contextMenu.style.display = "none";
    return;
  }

  // Ensure the contextMenu and button are valid before proceeding
  const button = event.currentTarget as HTMLElement;
  if (!contextMenu || !button || !container) return;

  // If context menu is already displayed, no need to show it again
  if (contextMenu.style.display === "flex") return;

  contextMenu.style.display = "flex"; // Show context menu

  // Otherwise, show the contextMenu with 'flex' display
  // contextMenu.style.display = "flex";

  const buttonRect = button.getBoundingClientRect();
  const containerRect = container?.getBoundingClientRect();

  const padx = 4;
  const pady = 4;
  const offset = 10;

  const w = contextMenu.offsetWidth;
  const h = contextMenu.offsetHeight;
  const x = buttonRect.left - containerRect.left;
  const y = buttonRect.bottom - containerRect.top;
  const ww = container.clientWidth;
  const wh = container.clientHeight;
  let fx = x;
  let fy = y + offset;

  // contextMenu.style.width = `${buttonRect.width}px`;
  // contextMenu.style.height = `${buttonRect.height}px`;

  if (y + h + offset > wh - pady) {
    fy = buttonRect.top - containerRect.top - h - offset;
  }
  if (x + w > ww - padx) {
    fx = buttonRect.right - containerRect.left - w;
  }

  contextMenu.style.left = `${fx}px`;
  contextMenu.style.top = `${fy}px`;
};
export const closeContext = (id: string) => {
  const contextMenu = document.getElementById(id);
  if (contextMenu) {
    contextMenu.style.display = "none";
  }
};
const PopUpContext: React.FC<PopUpContextProps> = ({
  id,
  containerId,
  content,
}) => {
  return (
    <div id={containerId} className={styles.container}>
      <div id={id} className={styles.contextMenu}>
        {content}
      </div>
    </div>
  );
};

export default PopUpContext;

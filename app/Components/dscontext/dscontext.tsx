"use client";
import styles from "./dscontext.module.css";
import React from "react";

interface ContextMenuProps {
  id: string;
  containerId: string;
  position?: "vertical" | "horizontal";
  alignment?: "right" | "left" | "center";
  content?: string;
}

export const displaycontext = (
  event: React.MouseEvent<HTMLElement>,
  id: string,
  containerId: string,
  position: "vertical" | "horizontal" = "vertical",
  alignment: "right" | "left" | "center",
) => {
  event.preventDefault();

  const contextMenu = document.getElementById(id);
  const container = document.getElementById(containerId);

  

  const button = event.currentTarget as HTMLElement;
  if (!contextMenu || !button || !container) return;
  if (!contextMenu || !button || !container) return;

  
  contextMenu.style.display = "flex";

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

 
  if ((y + h + offset) > (wh - pady)) {
    fy = buttonRect.top - containerRect.top - h - offset;

  }

  if (position === "horizontal") {

    fy = buttonRect.top-containerRect.top;
    if (x + buttonRect.width + w + offset <= ww - padx) {
      fx = x + buttonRect.width + offset;
  
    }
    else{
      fx=x-buttonRect.width;
    }
    
  }
  else {
    if (alignment === "center") {
      fx = x + (buttonRect.width - w) / 2;
    } else if (alignment === "right") {
      fx = x + buttonRect.width - w;
    } else if (alignment === "left") {
      fx = x;
    }
  }




  contextMenu.style.left = `${fx}px`;
  contextMenu.style.top = `${fy}px`;
};
export const closecontext = (
  id: string,
) => {
  const contextMenu = document.getElementById(id);
  if (contextMenu) {
    contextMenu.style.display = "none";
  }

};

const ContextMenu: React.FC<ContextMenuProps> = ({
  id,
  containerId,
  content

}) => {
  return (
    <div id={containerId} className={styles.container}>
      <div id={id} className={styles.contextMenu}>
        {content}
      </div>
    </div>
  );
};

export default ContextMenu;

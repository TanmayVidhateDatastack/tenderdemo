"use client";
import styles from "./dscontext.module.css";
import React from 'react';

interface PopUpContextProps {
  id: string;
  containerId: string;

}

export const displaycontext = (
  event: React.MouseEvent<HTMLButtonElement>,
  id: string,
  containerId: string,
 
 
) => {
  event.preventDefault();

  const contextMenu = document.getElementById(id);
  const container = document.getElementById(containerId);

  if (contextMenu?.style.display === "block") {
    contextMenu.style.display = "none";
    return;
  }

  const button = event.currentTarget as HTMLButtonElement;
  if (!contextMenu || !button ||!container) return;
  contextMenu.style.display = "block";

  const buttonRect = button.getBoundingClientRect();
  const containerRect = container?.getBoundingClientRect();

  const padx = 4;
  const pady = 4;
  const offset=10;


  const w = contextMenu.offsetWidth;
  const h = contextMenu.offsetHeight;
  const x = buttonRect.left - containerRect.left;
  const y = buttonRect.bottom - containerRect.top;
  const ww = container.clientWidth;
  const wh = container.clientHeight;
  let fx = x;
  let fy = y+offset;

  contextMenu.style.width = `${buttonRect.width}px`;
  contextMenu.style.height = `${buttonRect.height}px`;
   
  if ((y + h+offset) > (wh - pady))
  {
     fy = buttonRect.top - containerRect.top - h-offset;

  }
  if ((x + w) > (ww - padx)) 
  {
    fx = buttonRect.right - containerRect.left - w;
   
  }

  contextMenu.style.left = `${fx}px`;
  contextMenu.style.top = `${fy}px`;
};

const PopUpContext: React.FC<PopUpContextProps> = ({ id, containerId }) => {
  return (
    <div id={containerId} className={styles.container}> 
      <div id={id} className={styles.contextMenu}>
      
      </div>
    </div>
  );
};

export default PopUpContext;

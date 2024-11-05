"use client";
import styles from "./dscontext.module.css";
import React from 'react';

interface PopUpContextProps {
  id: string;
  containerId: string;
  alignment ?:"right"|"left"|"center";

}

export const displaycontext = (
  event: React.MouseEvent<HTMLButtonElement>,
  id: string,
  containerId: string,
  alignment:"right" | "left" | "center" = "center",
 
) => {
  event.preventDefault();

  const contextMenu = document.getElementById(id);
  const container = document.getElementById(containerId);


  const button = event.currentTarget as HTMLButtonElement;
  if (!contextMenu || !button ||!container) return;
  contextMenu.style.display = "flex";

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

  contextMenu.style.width ="100px";
  contextMenu.style.height = "50px";
   
  if ((y + h+offset) > (wh - pady))
  {
     fy = buttonRect.top - containerRect.top - h-offset;

  }
  
    if (alignment === "center") {
      fx = ((x + buttonRect.width-w)/ 2);
    } else if (alignment === "right") {
      fx = x + buttonRect.width - w;
    } else {
      fx = x;
    }
    if ((x + w) > (ww - padx))
       {
        fx = buttonRect.right - containerRect.left - w;
       }

  contextMenu.style.left = `${fx}px`;
  contextMenu.style.top = `${fy}px`;
};
export  const handlerblur=( 
  id: string,
)=>{
    const contextMenu = document.getElementById(id);
    if (contextMenu) {
      contextMenu.style.display = "none";
    }

  };

const PopUpContext: React.FC<PopUpContextProps> = ({ id, containerId ,alignment = "center" }) => {
  console.log(alignment);
  return (
    <div id={containerId} className={styles.container}> 
      <div id={id} className={styles.contextMenu}>  
      
      </div>
    </div>
  );
};

export default PopUpContext;

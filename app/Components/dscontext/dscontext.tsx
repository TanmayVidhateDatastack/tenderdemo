"use client";
import styles from "./dscontext.module.css";
import React from "react";

interface ContextMenuProps {
  id: string;
  containerId: string;
  position?: "vertical" | "horizontal";
  alignment?: "right" | "left" | "center";
  content?: string;
 showArrow:boolean;
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
  let arrowPosition: "top" | "left" | "right" | "bottom" = "bottom";

//if the space not available in top then disaply bottom 
  if ((y + h + offset) > (wh - pady)) {
     arrowPosition="top";
    fy = buttonRect.top - containerRect.top - h - offset;
    //fy = y + offset; 
  }
  else{
    arrowPosition="bottom";

  }

  if (position === "horizontal") {
      // Horizontal position: align  with button height
    fy = buttonRect.top-containerRect.top;
    
    //check if space is avialble for right then right
    if (x + buttonRect.width + w + offset <= ww - padx) {
      fx = x + buttonRect.width + offset;
      arrowPosition="right";
  
    }
    else{
      fx = x -w-offset ;//then left positioning
      arrowPosition="left";
    }
    
  }
  else {//for vertically postion 
    if (alignment === "center") {//center
      fx = x + (buttonRect.width - w) / 2;
    } else if (alignment === "right") {//right
      fx = x + buttonRect.width - w;
    } else if (alignment === "left") {
      fx = x;//left
    }
  }

  contextMenu.style.left = `${fx}px`;
  contextMenu.style.top = `${fy}px`;
  contextMenu.querySelector(`.${styles.arrow}`)?.classList.add(styles[arrowPosition])
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
  content,
  showArrow,
 
}) => {
  
  return (
    <div id={containerId} className={styles.container}>
      <div id={id} className={styles.contextMenu}>
        {content}
        {showArrow && (
          <div className={`${styles.arrow} `} /> 
        )}
      </div>
    </div>
  );
};

export default ContextMenu;

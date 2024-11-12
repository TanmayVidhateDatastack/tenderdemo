"use client";
import React from "react";
import styles from "./dsContextHolder.module.css";

interface ContextMenuProps {
  id: string;
  content?: string | React.ReactElement;
 showArrow:boolean;
}
// }

export function displayContext(
  event: React.MouseEvent<HTMLElement> | React.FocusEvent,
  id: string,
  position: "vertical" | "horizontal"|undefined = "vertical",
  alignment: "right" | "left" | "center"|undefined="center",
  content?: string | React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showArrow:boolean=false,

) {
  event.preventDefault();

  const context = document.getElementById(id);

  const target = event.target as HTMLElement;
  if (!context || !target) return;
  if (!context || !target) return;
  if (context.style.display == "flex") {
    context.style.display = "none";
    return;
  }
  context.style.display = "flex";

  const eleRect = target.getBoundingClientRect();

  const xBorder = 4;
  const yBorder = 4;
  const distance = 5;
  let arrowPosition: "top" | "left" | "right" | "bottom" = "bottom";

  const contextW = context.offsetWidth;
  const contextH = context.offsetHeight;
  const eleX = eleRect.left;
  const eleY = eleRect.bottom;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  let contextX = eleX;
  let contextY = eleY + distance;

  if (eleY + contextH + distance > winH - yBorder) {
    arrowPosition="bottom";
    contextY = eleRect.top - contextH - distance;
  }
  else{
    arrowPosition="top";
  }
  console.log(position)

  if (position === "horizontal") {
    console.log(position)
    contextY = eleRect.top;
    if (eleRect.right + contextW + distance <= winW - xBorder) {
      contextX = eleRect.right + distance;
      arrowPosition="left";

    } else {
      contextX = eleX - contextW - distance;
      arrowPosition="right";

    }
  } else {
    if (alignment === "center") {
      contextX = eleX + (eleRect.width - contextW) / 2;
    } else if (alignment === "right") {
      contextX = eleX + eleRect.width - contextW;
    } else if (alignment === "left") {
      contextX = eleX;
    }
  }

  context.style.left = `${contextX}px`;
  context.style.top = `${contextY}px`;
  context.querySelector(`.${styles.arrow}`)?.setAttribute("class",styles.arrow+" "+ styles[arrowPosition])
};
export const closeContext = (id: string) => {
  const contextMenu = document.getElementById(id);
  if (contextMenu) {
    contextMenu.style.display = "none";
  }
};

// const ContextMenu: React.FC<ContextMenuProps> = ({ id, content ,
//   showArrow,

// }) => {
//   return (
//     <div id={id} className={styles.contextMenu}>
//       {content}
//       {showArrow && (
//           <div className={`${styles.arrow} `} /> 
//         )}
//     </div>
//   );
// };
const ContextMenu: React.FC<ContextMenuProps> = ({
  id,
  content,
  showArrow,
}) => {
  return (
    <div id={id} className={styles.contextMenu}>
      {content && <div>{content}</div>}
      {showArrow && <div className={`${styles.arrow}`} />}
    </div>
  );
};
export default ContextMenu;

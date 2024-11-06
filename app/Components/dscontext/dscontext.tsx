"use client";
import React from "react";
import styles from "./dscontext.module.css";

interface ContextMenuProps {
  id: string;
  containerId: string;
  position?: "vertical" | "horizontal";
  alignment?: "right" | "left" | "center";
  content?: string | React.ReactElement;
}

export const displaycontext = (
  event: React.MouseEvent<HTMLElement> | React.FocusEvent,
  id: string,
  containerId: string,
  position: "vertical" | "horizontal" = "vertical",
  alignment: "right" | "left" | "center"
) => {
  event.preventDefault();

  const contextMenu = document.getElementById(id);

  const button = event.target as HTMLElement;
  if (!contextMenu || !button ) return;
  if (!contextMenu || !button ) return;

  contextMenu.style.display = "flex";

  const buttonRect = button.getBoundingClientRect();

  const padx = 4;
  const pady = 4;
  const offset = 3;

  const w = contextMenu.offsetWidth;
  const h = contextMenu.offsetHeight;
  const x = buttonRect.left ;
  const y = buttonRect.bottom ;
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  let fx = x;
  let fy = y + offset;

  if (y + h + offset > wh - pady) {
    fy = buttonRect.top - h - offset;
  }

  if (position === "horizontal") {
    fy = buttonRect.top;
    if (buttonRect.right + w + offset <= ww - padx) {
      fx = buttonRect.right + offset;
    } else {
      fx = x - buttonRect.width;
    }
  } else {
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
export const closecontext = (id: string) => {
  const contextMenu = document.getElementById(id);
  if (contextMenu) {
    contextMenu.style.display = "none";
  }
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  id,
  content,
}) => {
  return (
      <div id={id} className={styles.contextMenu}>
        {content}
      </div>
  );
};

export default ContextMenu;

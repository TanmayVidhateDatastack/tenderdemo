"use client";
import React from "react";
import styles from "./dscontext.module.css";

interface ContextMenuProps {
  id: string;
  containerId: string;
  position?: "vertical" | "horizontal";
  alignment?: "right" | "left" | "center";
  content?: string | React.ReactNode;
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
  contextMenu.style.display = "flex";

  const buttonRect = button.getBoundingClientRect();
  const containerRect = container?.getBoundingClientRect();

  const padx = 4;
  const pady = 4;
  const offset = 3;

  const w = contextMenu.offsetWidth;
  const h = contextMenu.offsetHeight;
  const x = buttonRect.left - containerRect.left;
  const y = buttonRect.bottom - containerRect.top;
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  let fx = x;
  let fy = y + offset;

  if (y + h + offset > wh - pady) {
    fy = buttonRect.top - containerRect.top - h - offset;
  }

  if (position === "horizontal") {
    fy = buttonRect.top - containerRect.top;
    if (x + buttonRect.width + w + offset <= ww - padx) {
      fx = x + buttonRect.width + offset;
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

export default ContextMenu;

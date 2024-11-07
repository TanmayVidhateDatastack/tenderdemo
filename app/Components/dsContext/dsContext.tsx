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

export function displaycontext (
  event: React.MouseEvent<HTMLElement> | React.FocusEvent,
  id: string,
  containerId: string,
  position: "vertical" | "horizontal"|undefined = "vertical",
  alignment: "right" | "left" | "center"|undefined="center"
) {
  event.preventDefault();

  const context = document.getElementById(id);

  const target = event.target as HTMLElement;
  if (!context || !target) return;
  if (!context || !target) return;

  context.style.display = "flex";

  const eleRect = target.getBoundingClientRect();

  const xBorder = 4;
  const yBorder = 4;
  const distance = 5;

  const contextW = context.offsetWidth;
  const contextH = context.offsetHeight;
  const eleX = eleRect.left;
  const eleY = eleRect.bottom;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  let contextX = eleX;
  let contextY = eleY + distance;

  if (eleY + contextH + distance > winH - yBorder) {
    contextY = eleRect.top - contextH - distance;
  }

  if (position === "horizontal") {
    contextY = eleRect.top;
    if (eleRect.right + contextW + distance <= winW - xBorder) {
      contextX = eleRect.right + distance;
    } else {
      contextX = eleX - contextW - distance;
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
};
export const closecontext = (id: string) => {
  const contextMenu = document.getElementById(id);
  if (contextMenu) {
    contextMenu.style.display = "none";
  }
};

const ContextMenu: React.FC<ContextMenuProps> = ({ id, content }) => {
  return (
    <div id={id} className={styles.contextMenu}>
      {content}
    </div>
  );
};

export default ContextMenu;

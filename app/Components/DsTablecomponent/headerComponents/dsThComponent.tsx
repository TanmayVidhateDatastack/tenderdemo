import React from "react";
import styles from "../DsTable.module.css";
export interface thprops {
  className?: string;
  children?: React.ReactNode;
  content?: string | React.ReactNode;
  columnHeader?: React.ReactNode | string;
  columnIndex: number;
  alignment?: "left" | "center" | string;
}

const ThComponent: React.FC<thprops> = ({
  className,
  children,
  content,
  columnHeader,
  columnIndex,
  alignment,
}) => {
  const thclassName =
    alignment == "center"
      ? `${styles["ds-th-center"]} ${className}`
      : `${styles["ds-th-component"]} ${className}`;
  return (
    <>
      <th
        className={thclassName}
        data-column-name={columnHeader}
        data-column-index={columnIndex}
      >
        {content != null && (
          <span className={`${styles["th-text-content"]}`}>{content}</span>
        )}
        {children}
      </th>
    </>
  );
};

export default ThComponent;

import styles from "./DsTable.module.css";
export interface thprops {
  className: string;
  children?: React.ReactNode;
  content?: string;
  columnHeader?: string;
  columnIndex: number;
}

const ThComponent: React.FC<thprops> = ({
  className,
  children,
  content,
  columnHeader,
  columnIndex,
}) => {
  return (
    <>
      <th
        className={`${styles["ds-th-component"]} ${className}`}
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

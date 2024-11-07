import styles from "../DsTable.module.css";
export interface trprops {
  className?: string;
  children?: React.ReactNode;
  content?: string;
  onRowClick?: () => void;
}

const TrComponent: React.FC<trprops> = ({
  className,
  children,
  content,
  onRowClick,
}) => {
  return (
    <>
      <tr
        className={`${styles["ds-tr-component"]} ${className}`}
        onClick={onRowClick}
      >
        {children || content}
      </tr>
    </>
  );
};

export default TrComponent;

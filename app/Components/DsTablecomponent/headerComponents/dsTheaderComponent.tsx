import styles from "../DsTable.module.css";
export interface theaderprops {
  className: string;
  children?: React.ReactNode;
  alignment?: string;
}

const TheaderComponent: React.FC<theaderprops> = ({
  className,
  children,
  alignment,
}) => {
  const thclassName =
    alignment == "center"
      ? `${styles["ds-th-center"]} ${styles[className]}`
      : `${styles["ds-tableHeader"]} ${styles[className]}`;
  return (
    <>
      <thead className={thclassName}>{children}</thead>
    </>
  );
};

export default TheaderComponent;

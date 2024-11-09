import styles from "../DsTable.module.css";
export interface theaderprops {
  className: string;
  children?: React.ReactNode;
}

const TheaderComponent: React.FC<theaderprops> = ({ className, children }) => {
  return (
    <>
      <thead className={`${styles["ds-tableHeader"]} ${className}`}>
        {children}
      </thead>
    </>
  );
};

export default TheaderComponent;

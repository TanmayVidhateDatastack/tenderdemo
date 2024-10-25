import styles from "./DsTable.module.css";
export interface tfooterprops {
  className: string;
  children?: React.ReactNode;
}

const TfooterComponent: React.FC<tfooterprops> = ({ className, children }) => {
  return (
    <>
      <tfoot className={`${styles["ds-footer"]} ${className}`}>
       

        {children}
          
      </tfoot>
    </>
  );
};

export default TfooterComponent;

import styles from "../DsTable.module.css";
export interface tfooterprops {
  className: string;
  children?: React.ReactNode;
  alignment?: string;
}

const TfooterComponent: React.FC<tfooterprops> = ({
  className,
  children,
  alignment,
}) => {
  const tdClassNames =
    alignment == "center"
      ? `${styles["ds-footer-center"]} ${styles[className]}`
      : `${styles["ds-footer"]} ${styles[className]}`;
  return (
    <>
      <tfoot className={tdClassNames}>{children}</tfoot>
    </>
  );
};

export default TfooterComponent;

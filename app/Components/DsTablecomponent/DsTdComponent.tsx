import styles from "./DsTable.module.css";
export interface tdprops {
  className: string;
  children?: React.ReactNode;
  content?: string | React.ReactNode;
}

const TdComponent: React.FC<tdprops> = ({ className, children, content }) => {
  return (
    <>
      <td className={`${styles["ds-td-component"]} ${className}`}>
        {content != null && <span>{content}</span>}
        {children}
      </td>
    </>
  );
};

export default TdComponent;

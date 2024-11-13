import styles from "../DsTable.module.css";
export interface tdprops {
  className: string;
  children?: React.ReactNode;
  content?: string | React.ReactNode;
  alignment: string;
  colSpan?: number;
}

const TdComponent: React.FC<tdprops> = ({
  className,
  children,
  content,
  alignment,
  colSpan = 1,
}) => {
  const tdClassNames =
    alignment == "center"
      ? `${styles["ds-td-center"]} ${styles[className]}`
      : `${styles["ds-td-component"]} ${styles[className]}`;
  return (
    <>
      <td className={tdClassNames} colSpan={colSpan}>
        {content != null && <span>{content}</span>}
        {children}
      </td>
    </>
  );
};

export default TdComponent;

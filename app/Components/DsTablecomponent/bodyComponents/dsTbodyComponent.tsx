import styles from "../DsTable.module.css";
export interface tbodyprops {
  className: string;
  children?: React.ReactNode;
}

const TbodyComponent: React.FC<tbodyprops> = ({ className, children }) => {
  return (
    <>
      <tbody className={`${styles["ds-tableBody"]} ${className}`}>
        {children}
      </tbody>
    </>
  );
};

export default TbodyComponent;

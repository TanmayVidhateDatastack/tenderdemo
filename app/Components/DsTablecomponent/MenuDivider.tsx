import styles from "./DsTable.module.css";

interface MenuDividerProps {
  classNames?: string;
}
const MenuDivider: React.FC<MenuDividerProps> = ({ classNames }) => {
  return <hr className={`my-1 ${styles["menu-divider"]} ${classNames}`} />;
};

export default MenuDivider;

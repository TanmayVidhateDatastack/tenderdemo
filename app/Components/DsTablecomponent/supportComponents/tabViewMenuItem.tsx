import styles from "../DsTable.module.css";

interface MenuItemProps {
  children?: React.ReactNode;
  id?: string;
  menu?: string;
  classNames?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const TabViewMenuItem: React.FC<MenuItemProps> = ({
  id,
  menu,
  classNames,
  handleOnClick,
  children,
}) => {
  return (
    <button
      id={id}
      className={`${styles["MenuItem"]} py-1  ${classNames}`}
      onClick={handleOnClick}
    >
      {menu || children}
    </button>
  );
};

export default TabViewMenuItem;

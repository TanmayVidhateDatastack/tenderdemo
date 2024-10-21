interface MenuDividerProps {
  classNames?: string;
}
const MenuDivider: React.FC<MenuDividerProps> = ({ classNames }) => {
  return <hr className={`my-1 ${classNames}`} />;
};

export default MenuDivider;

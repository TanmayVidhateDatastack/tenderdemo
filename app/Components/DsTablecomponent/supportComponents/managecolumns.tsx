import PopUpContext from "../../dscontext/dscontext";

export interface menuprops {
  columnIndex: number;
  className?: string;
  children?: React.ReactNode;

  manageColumns?: () => void;
  hideShowColumn: (column: string | number) => void;
}

const MenuComponent: React.FC<menuprops> = ({ columnIndex, children }) => {
  return (
    <>
      <PopUpContext
        containerId={"menu" + columnIndex}
        id={"menucontext" + columnIndex}
        content={<>{children}</>}
      />
    </>
  );
};

export default MenuComponent;

import { useState } from "react";
import IconButton from "./IconButton";
import MenuDivider from "./MenuDivider";
import TabViewMenuItem from "./TabViewMenuItem";

export interface menuprops {
  columnIndex: number;
  className?: string;
  sortDataOnlyOnSpecifiedColumn: (column: string | number) => void;
  clearSortOnColumn: (
    e: React.MouseEvent,
    columnIndex: string | number
  ) => void;
  manageColumns?: () => void;
  hideShowColumn: (column: string | number) => void;
}

const MenuComponent: React.FC<menuprops> = ({
  columnIndex,
  className,
  sortDataOnlyOnSpecifiedColumn,
  clearSortOnColumn,
  manageColumns,
  hideShowColumn,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [columnKey, setColumnKey] = useState<number>(0);

  const sortTableAscending = (columnIndex: number) => {
    sortDataOnlyOnSpecifiedColumn(columnIndex);
    setMenuVisible(false);
  };
  const handleOnClick = () => {
    setColumnKey(columnIndex);
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <div
        className={`d-flex h-7 icon-button bg-blue-500 w-5 justify-content-center ml-3 align-items-left ${className}`}
      >
        <IconButton
          id="icon-button"
          srcImg={"dotsFillIMG"}
          title="column-menu"
          handleOnClick={handleOnClick}
        />
      </div>

      {menuVisible && columnKey === columnIndex && (
        <div key={columnIndex} className="absolute bg-blue-500 ml-auto">
          <TabViewMenuItem
            menu="Sort By Asc"
            handleOnClick={() => sortTableAscending(columnIndex)}
          />
          <MenuDivider />
          <TabViewMenuItem
            menu="Clear Sort"
            handleOnClick={(e) => {
              setMenuVisible(false);
              clearSortOnColumn(e, columnIndex);
            }}
          />
          <MenuDivider />
          <TabViewMenuItem
            menu="Filter"
            handleOnClick={() => {
              setMenuVisible(false);
            }}
          />
          <MenuDivider />
          <TabViewMenuItem
            menu="Hide Column"
            handleOnClick={() => {
              hideShowColumn(columnIndex);
              setMenuVisible(false);
            }}
          />
          <MenuDivider />
          {manageColumns && (
            <TabViewMenuItem
              menu="Manage Column"
              handleOnClick={() => {
                manageColumns();
                setMenuVisible(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MenuComponent;

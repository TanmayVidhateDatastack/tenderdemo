import { MouseEvent, useState } from "react";
import styles from "../DsTable.module.css";
import MenuDivider from "./menuDivider";
import TabViewMenuItem from "./tabViewMenuItem";
import PopupContext from "../../dsContextHolder/dsContextHolder";
export interface menuprops {
  columnIndex: number;
  className?: string;
  children?: React.ReactNode;

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
  children,
  sortDataOnlyOnSpecifiedColumn,
  clearSortOnColumn,
  manageColumns,
  hideShowColumn,
}) => {
  const sortTableAscending = (columnIndex: number) => {
    sortDataOnlyOnSpecifiedColumn(columnIndex);
  };
  const [isManageColumnVisible, setIsManageColumnVisible] =
    useState<boolean>(false);
  return (
    <>
      {/* {menuVisible && columnKey === columnIndex && ( */}
      {isManageColumnVisible == false && (
        <PopupContext
          id={"menucontext" + columnIndex}
          content={
            <>
              <TabViewMenuItem
                menu="Sort By Asc"
                handleOnClick={() => sortTableAscending(columnIndex)}
              />
              <TabViewMenuItem
                menu="Clear Sort"
                handleOnClick={(e) => {
                  clearSortOnColumn(e, columnIndex);
                }}
              />
              <MenuDivider classNames={`${styles["filtertab"]} ${className}`} />
              <TabViewMenuItem
                classNames={`${styles["filtertab"]}`}
                menu="Filter"
                handleOnClick={() => {}}
              />
              <MenuDivider />
              <TabViewMenuItem
                menu="Hide Column"
                handleOnClick={() => {
                  hideShowColumn(columnIndex);
                }}
              />
              {manageColumns && (
                <TabViewMenuItem
                  menu="Manage Column"
                  handleOnClick={() => {
                    setIsManageColumnVisible(!isManageColumnVisible);
                  }}
                />
              )}
            </>
          }
        />
      )}

      {isManageColumnVisible && (
        <>
          <PopupContext
            id={"menucontext" + columnIndex}
            content={<>{children}</>}
          />
        </>
      )}
      {/* )} */}
    </>
  );
};

export default MenuComponent;

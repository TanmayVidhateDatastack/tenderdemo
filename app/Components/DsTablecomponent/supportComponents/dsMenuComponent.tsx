import { MouseEvent, useState } from "react";
import styles from "../DsTable.module.css";
import MenuDivider from "./menuDivider";
import TabViewMenuItem from "./tabViewMenuItem";
import PopupContext from "../../dsContextHolder/dsContextHolder";
import { tcolumn } from "../helpers/types";
import FilterComponent from "./filterComponent";
export interface menuprops {
  column: tcolumn;
  className: string;
  children?: React.ReactNode;

  sortDataOnlyOnSpecifiedColumn: (column: string | number) => void;
  clearSortOnColumn: (
    e: React.MouseEvent,
    columnIndex: string | number
  ) => void;
  sortDataUsingInputValueOnlyOnSpecifiedColumn: (
    e: React.ChangeEvent<HTMLElement>,
    columnIndex?: number
  ) => void;
  manageColumns?: () => void;
  hideShowColumn: (column: string | number) => void;
}
const MenuComponent: React.FC<menuprops> = ({
  column,
  className,
  children,
  sortDataOnlyOnSpecifiedColumn,
  clearSortOnColumn,
  sortDataUsingInputValueOnlyOnSpecifiedColumn,
  manageColumns,
  hideShowColumn,
}) => {
  const sortTableAscending = (columnIndex: number) => {
    sortDataOnlyOnSpecifiedColumn(columnIndex);
  };
  const [isManageColumnVisible, setIsManageColumnVisible] =
    useState<boolean>(false);
  const [isFilterColumnVisible, setIsFilterColumnVisible] =
    useState<boolean>(false);
  return (
    <>
      {/* {menuVisible && columnKey === columnIndex && ( */}
      {isManageColumnVisible == false && isFilterColumnVisible == false && (
        <PopupContext
          id={"menucontext" + column.columnIndex}
          content={
            <>
              <TabViewMenuItem
                menu="Sort By Asc"
                handleOnClick={() => sortTableAscending(column.columnIndex)}
              />
              <TabViewMenuItem
                menu="Clear Sort"
                handleOnClick={(e) => {
                  clearSortOnColumn(e, column.columnIndex);
                }}
              />
              <MenuDivider
                classNames={`${styles["filtertab"]} ${styles[className]}`}
              />
              <TabViewMenuItem
                classNames={`${styles["filtertab"]}`}
                menu="Filter"
                handleOnClick={() => setIsFilterColumnVisible(true)}
              />
              <MenuDivider />
              <TabViewMenuItem
                menu="Hide Column"
                handleOnClick={() => {
                  hideShowColumn(column.columnIndex);
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
          showArrow={false}
        />
      )}

      {isManageColumnVisible && isFilterColumnVisible == false && (
        <>
          <PopupContext
            id={"menucontext" + column.columnIndex}
            content={<>{children}</>}
            showArrow={false}
          />
        </>
      )}

      {isFilterColumnVisible && isManageColumnVisible == false && (
        <PopupContext
          id={"menucontext" + column.columnIndex}
          content={
            <>
              <FilterComponent
                column={column}
                sortDataUsingInputValueOnlyOnSpecifiedColumn={
                  sortDataUsingInputValueOnlyOnSpecifiedColumn
                }
              ></FilterComponent>
            </>
          }
          showArrow={false}
        />
      )}
      {/* )} */}
    </>
  );
};

export default MenuComponent;

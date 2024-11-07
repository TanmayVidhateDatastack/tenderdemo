import MenuDivider from "./MenuDivider";
import TabViewMenuItem from "./TabViewMenuItem";
import styles from "./DsTable.module.css";
import PopUpContext from "../dsContextHolder/dsContextHolder";

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
  sortDataOnlyOnSpecifiedColumn,
  clearSortOnColumn,
  manageColumns,
  hideShowColumn,
}) => {
  const sortTableAscending = (columnIndex: number) => {
    sortDataOnlyOnSpecifiedColumn(columnIndex);
  };

  return (
    <>
      {/* {menuVisible && columnKey === columnIndex && ( */}
      <PopUpContext
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
            <MenuDivider classNames={`${styles["filtertab"]}`} />
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
                  manageColumns();
                }}
              />
            )}
          </>
        }
      />
      {/* )} */}
    </>
  );
};

export default MenuComponent;

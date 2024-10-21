"use client";
// components/TableComponents/TableHeaders.tsx
import { useState } from "react";
import IconButton from "./IconButton";
// import dotsFillIMG from "../../images/dotsFill.png";
import MenuDivider from "./MenuDivider";
import TabViewMenuItem from "./TabViewMenuItem";
import { tcolumn } from "./types";
import "../../globals.css";

export interface TableHeaderProps {
  columns: tcolumn[];
  sortTable: (e: React.MouseEvent, type: "ASC" | "DESC") => void;
  sortDataOnlyOnSpecifiedColumn: (column: string | number) => void;
  clearSortOnColumn: (
    e: React.MouseEvent,
    columnIndex: string | number
  ) => void;
  manageColumns?: () => void;
  hideShowColumn: (column: string) => void;
}

const TableHeaders: React.FC<TableHeaderProps> = ({
  columns,
  sortTable,
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

  return (
    <thead className="py-2">
      <tr className="flex">
        {columns.map((column, index) =>
          column.isHidden ? null : (
            <th
              key={index}
              className={
                column.className
                  ? `${column.className} ds_tableHeader d-flex`
                  : "ds_tableHeader d-flex"
              }
              data-column-name={column.columnHeader}
              data-column-index={column.columnIndex}
            >
              {column.columnHeader}

              <div
                key={index}
                className={`arrow-container column-index-${index}`}
              >
                <span
                  className="cursor-pointer sort-icon up"
                  onClick={(e) => sortTable(e, "ASC")}
                >
                  ▲
                </span>
                <span
                  className="cursor-pointer sort-icon down"
                  onClick={(e) => sortTable(e, "DESC")}
                >
                  ▼
                </span>
              </div>

              <div className="d-flex h-7 icon-button bg-blue-500 w-5 justify-content-center ml-3 align-items-left">
                <IconButton
                  id="icon-button"
                  srcImg={"dotsFillIMG"}
                  title="column-menu"
                  handleOnClick={() => {
                    setColumnKey(index);
                    setMenuVisible(!menuVisible);
                  }}
                />
              </div>

              {menuVisible && columnKey === index && (
                <div key={index} className="absolute bg-blue-500 ml-auto">
                  <TabViewMenuItem
                    menu="Sort By Asc"
                    handleOnClick={() => sortTableAscending(column.columnIndex)}
                  />
                  <MenuDivider />
                  <TabViewMenuItem
                    menu="Clear Sort"
                    handleOnClick={(e) => {
                      setMenuVisible(false);
                      clearSortOnColumn(e, column.columnIndex);
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
                      hideShowColumn(column.columnHeader);
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
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default TableHeaders;

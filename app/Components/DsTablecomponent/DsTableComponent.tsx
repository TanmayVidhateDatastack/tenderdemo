"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  convertToDate,
  parseFormattedNumber,
  tcolumn,
  trow,
} from "./helpers/types";
import SortComponent from "./supportComponents/sortComponent";
import styles from "./DsTable.module.css";
import RadioCheckButton from "./supportComponents/RadioCheckButton";
import TextField from "../DsTextField/DsTextField";
import DSButton from "../dsButton/DsButton";
import Image from "next/image";

import threedot from "../../Icons/smallIcons/threedot.svg";
import TbodyComponent from "./bodyComponents/dsTbodyComponent";
import TdComponent from "./bodyComponents/dsTdComponent";
import TrComponent from "./bodyComponents/dsTrComponent";
import TfooterComponent from "./footerComponents/dsTfooterComponent";
import ThComponent from "./headerComponents/dsThComponent";
import TheaderComponent from "./headerComponents/dsTheaderComponent";
import MenuComponent from "./supportComponents/dsMenuComponent";
import { displayContext } from "../dsContextHolder/dsContextHolder";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hook/hook";
import { setRows } from "@/app/Redux/slice/TableSlice/tableSlice";
import React from "react";
// Define the component props
interface TableComponentProps {
  className: string;
  id: string;
  alignment: "left" | "center" | string;
  isSortable?: boolean;
  hasSearch?: boolean;
  columns: tcolumn[];
  rows: trow[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  className,
  id,
  alignment = "left",
  isSortable = true,
  hasSearch = false,
  columns,
  rows,
}) => {
  const [newRows, setNewRows] = useState<trow[]>(rows);
  const [tableRows, setTableRows] = useState<trow[]>(rows);
  const rowsContainer = useRef<trow[]>(rows);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setRows(rowsContainer.current));
  }, [dispatch]);
  const sliceRows = useAppSelector((state) => state.table["rows"]);

  useEffect(() => {
    setNewRows(sliceRows);
  }, [sliceRows]);

  useEffect(() => {
    setTableRows(newRows);
  }, [newRows]);

  const [sortingOrderType, setSortingOrderType] = useState<
    "NONE" | "ASC" | "DESC"
  >("NONE");
  const [activeColumnIndex, setActiveColumnIndex] = useState<number>(-1);
  const [columnSort, setColumnSort] = useState(
    columns.map((x) => ({
      columnName: x.columnHeader,
      columnIndex: x.columnIndex,
      sortType: "NONE" as "NONE" | "ASC" | "DESC",
    }))
  );

  const sortTable = (
    e: React.MouseEvent,
    columnIndex: number,
    type: "ASC" | "DESC"
  ) => {
    if (e.ctrlKey) {
      const currentTargetElement = e.currentTarget;
      let columnIndex = 0;
      if (currentTargetElement) {
        columnIndex = parseInt(
          currentTargetElement
            .closest("th")
            ?.getAttribute("data-column-index") ?? "1"
        );

        if (columnIndex === activeColumnIndex && type === sortingOrderType) {
          currentTargetElement.classList.remove(`${styles["active"]}`);
          setActiveColumnIndex(-1);
          setSortingOrderType("NONE");
          setSortType(columnIndex, "NONE");
          sortTableAccordingToRowIndex();
          return;
        }

        const activeElement = currentTargetElement
          .closest("th")
          ?.querySelector(".active");
        activeElement?.classList.remove(`${styles["active"]}`);
        currentTargetElement.classList.add(`${styles["active"]}`);

        if (type === "ASC") {
          setSortType(columnIndex, "ASC");
          sortTableAscending(columnIndex);
        } else if (type === "DESC") {
          setSortType(columnIndex, "DESC");
          sortTableDescending(columnIndex);
        }

        setSortingOrderType(type);
        setActiveColumnIndex(columnIndex);
      }
    } else {
      if (type === "ASC") {
        sortTableAscending(columnIndex);
      } else if (type === "DESC") {
        sortTableDescending(columnIndex);
      }
    }
  };

  const getComparableValue = (value: React.ReactNode | string): string => {
    return typeof value === "string" ? value : value?.toString() || "";
  };

  const sortTableAscending = (columnIndex: number | string) => {
    const column = columns.find((x) => x.columnIndex == columnIndex);

    if (column?.columnContentType == "date") {
      sortDateColumn(column.columnIndex, "ASC");
    } else if (column?.columnContentType == "number") {
      sortTableOnNumber(column.columnIndex, "ASC");
    } else {
      const sortedRows = [...newRows].sort((rowA, rowB) => {
        const cellA = getComparableValue(
          rowA.content?.find((x) => x.columnIndex === columnIndex)?.content
        );
        const cellB = getComparableValue(
          rowB.content?.find((x) => x.columnIndex === columnIndex)?.content
        );
        return cellA.localeCompare(cellB);
      });
      setNewRows(sortedRows);
    }
  };

  const sortTableDescending = (columnIndex: number) => {
    const column = columns.find((x) => x.columnIndex == columnIndex);

    if (column?.columnContentType == "date") {
      sortDateColumn(column.columnIndex, "DESC");
    } else if (column?.columnContentType == "number") {
      sortTableOnNumber(column.columnIndex, "DESC");
    } else {
      const sortedRows = [...newRows].sort((rowA, rowB) => {
        const cellA = getComparableValue(
          rowA.content?.find((x) => x.columnIndex === columnIndex)?.content
        );
        const cellB = getComparableValue(
          rowB.content?.find((x) => x.columnIndex === columnIndex)?.content
        );
        return cellB.localeCompare(cellA);
      });

      setNewRows(sortedRows);
    }
  };

  const sortTableAccordingToRowIndex = () => {
    const sortedRows = [...newRows].sort(
      (rowA, rowB) => rowA.rowIndex - rowB.rowIndex
    );
    setNewRows(sortedRows);
  };

  const sortDateColumn = (columnIndex: number, sortType: string) => {
    const sortedRows = [...newRows].sort((rowA, rowB) => {
      const cellA =
        rowA.content?.find((x) => x.columnIndex === columnIndex)?.content || "";
      const cellB =
        rowB.content?.find((x) => x.columnIndex === columnIndex)?.content || "";

      // Convert cells to Date objects
      const dateA = convertToDate(cellA.toString());
      const dateB = convertToDate(cellB.toString());

      // Handle undefined or invalid dates
      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0; // Both invalid
      if (isNaN(dateA.getTime())) return 1; // Place invalid dateA last
      if (isNaN(dateB.getTime())) return -1; // Place invalid dateB last

      // Compare dates based on sort type
      if (sortType === "ASC") {
        return dateA.getTime() - dateB.getTime(); // Ascending order
      } else {
        return dateB.getTime() - dateA.getTime(); // Descending order
      }
    });

    setNewRows(sortedRows);
  };
  const sortTableOnNumber = (columnIndex: number, sortOrderType: string) => {
    const sortedRows = [...newRows].sort((rowA, rowB) => {
      if (columnIndex == 5 || columnIndex == 6) {
        const cellA = parseFormattedNumber(
          rowA.content
            ?.find((x) => x.columnIndex === columnIndex)
            ?.content?.toString() || ""
        );
        const cellB = parseFormattedNumber(
          rowB.content
            ?.find((x) => x.columnIndex === columnIndex)
            ?.content?.toString() || " "
        );
        if (sortOrderType === "ASC") {
          return cellA - cellB;
        } else {
          return cellB - cellA;
        }
      } else {
        const cellA = Number(
          rowA.content?.find((x) => x.columnIndex === columnIndex)?.content
        );

        const cellB = Number(
          rowB.content?.find((x) => x.columnIndex === columnIndex)?.content
        );
        if (sortOrderType === "ASC") {
          return cellA - cellB;
        } else {
          return cellB - cellA;
        }
      }
    });

    setNewRows(sortedRows);
  };

  const [optionsArray, setOptionArray] = useState<string[]>([]);
  useEffect(() => {
    setOptionArray(columns.map((x) => x.columnHeader?.toString() ?? ""));
  }, [columns]);

  const hideShowColumn = (value: string | number) => {
    if (typeof value == "string") {
      columns.forEach((col) => {
        if (col.columnHeader === value) col.isHidden = !col.isHidden;
      });
    }

    if (typeof value == "number") {
      columns.forEach((col) => {
        if (col.columnIndex === value) col.isHidden = !col.isHidden;
      });
    }

    const array = columns
      .filter((x) => !x.isHidden)
      .map((x) => x.columnHeader?.toString() ?? "");
    setOptionArray(array);
    setColumnSort(columnSort);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const sortDataUsingInputValue = (event: React.ChangeEvent<HTMLElement>) => {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    setInputValue((event.target as HTMLInputElement).value);
    inputValue.trim();
    let filteredRows: trow[] = [];
    // if (searchValue === "") {
    //   // If the search input is empty, show all rows
    //   filteredRows = rowsContainer.current;
    // } else {
    // Filter rows based on the search value
    filteredRows = [...sliceRows].filter((row) =>
      row.content?.some(
        (cell) =>
          (typeof cell.content === "string" ||
            typeof cell.content === "number") &&
          cell.content.toString().toLowerCase().includes(searchValue)
      )
    );
    // }

    // Update the rows with the filtered results
    setNewRows(filteredRows);

    // Maintain the sorting order
    maintainSortingOrder(filteredRows);
  };

  const sortDataUsingInputValueOnlyOnSpecifiedColumn = (
    event: React.ChangeEvent<HTMLElement>,
    columnIndex?: number
  ) => {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    setInputValue((event.target as HTMLInputElement).value);
    console.log(searchValue);
    let filteredRows: trow[] = [];
    if (searchValue === "") {
      // If the search input is empty, show all rows
      filteredRows = sliceRows;
    } else {
      // Filter rows based on the search value
      filteredRows = [...sliceRows].filter((row) =>
        row.content?.some(
          (cell) =>
            (typeof cell.content === "string" ||
              React.isValidElement(cell.content) === false) &&
            cell.columnIndex === columnIndex &&
            cell.content?.toString().toLowerCase().includes(searchValue)
        )
      );
    }

    // Update the rows with the filtered results
    setNewRows(filteredRows);
    // Maintain the sorting order
    maintainSortingOrder(filteredRows);
  };

  const maintainSortingOrder = (filteredRows: trow[]) => {
    if (activeColumnIndex !== -1) {
      const sortedRows = [...filteredRows].sort((rowA, rowB) => {
        const cellA = rowA.content?.find(
          (x) => x.columnIndex === activeColumnIndex
        )?.content;
        const cellB = rowB.content?.find(
          (x) => x.columnIndex === activeColumnIndex
        )?.content;

        // Use getComparableValue to handle null or undefined values
        const comparableA = getComparableValue(cellA);
        const comparableB = getComparableValue(cellB);

        // Perform the sort based on the sorting order
        if (sortingOrderType === "ASC") {
          return comparableA < comparableB
            ? -1
            : comparableA > comparableB
            ? 1
            : 0;
        } else if (sortingOrderType === "DESC") {
          return comparableA > comparableB
            ? -1
            : comparableA < comparableB
            ? 1
            : 0;
        }
        return 0;
      });
      setNewRows(sortedRows);
    } else {
      // Default sorting by rowIndex if no column is active
      const sortedRows = [...filteredRows].sort(
        (rowA, rowB) => rowA.rowIndex - rowB.rowIndex
      );
      setNewRows(sortedRows);
    }
  };

  // const clearSortOnColumn = (e: React.MouseEvent, column: string | number) => {
  const clearSortOnColumn = (e: React.MouseEvent) => {
    sortTableAccordingToRowIndex();
    const activeElement = e.currentTarget
      .closest("th")
      ?.querySelector(".active");
    activeElement?.classList.remove("active");
  };

  const setSortType = (column: number, sortType: "ASC" | "DESC" | "NONE") => {
    columnSort.forEach((x) => {
      if (x.columnIndex === column) {
        x.sortType = sortType;
      }
    });
  };

  useEffect(() => {
    const handleOnScroll = () => {
      document
        .querySelectorAll(".context")
        .forEach((x) => ((x as HTMLElement).style.display = "none"));
    };
    document
      .querySelectorAll("*")
      ?.forEach((x) =>
        (x as HTMLElement).addEventListener("scroll", handleOnScroll)
      );
    return () => {
      document
        .querySelectorAll("*")
        ?.forEach((x) =>
          (x as HTMLElement).removeEventListener("scroll", handleOnScroll)
        );
    };
  }, []);
  return (
    <>
        <div className={styles.tableContainer}>
          {hasSearch && (
            <div className={`${styles["ds-search-input-div"]}`}>
              <TextField
                placeholder="Search SO"
                id="serach-data"
                label="Search Names"
                handleInputChange={(e: ChangeEvent<HTMLElement>) =>
                  sortDataUsingInputValue(e)
                }
              />
            </div>
          )}
          <table
            className={`${className ? className : ""} ${
              alignment == "center"
                ? styles["ds-table-center"]
                : styles["ds-table"]
            } `}
            id={id}
          >
            <TheaderComponent className={""} alignment={alignment}>
              <TrComponent className={``}>
                {columns.map((column) =>
                  column.isHidden ? null : (
                    <ThComponent
                      key={column.columnHeader?.toString()}
                      className={""}
                      content={column.columnHeader}
                      columnIndex={column.columnIndex}
                      columnHeader={column.columnHeader}
                      alignment={alignment}
                    >
                      {isSortable && (
                        <>
                          <div className={`${styles["slide-component"]}`}>
                            <SortComponent
                              key={column.columnHeader?.toString() ?? ""}
                              columnIndex={column.columnIndex}
                              sortTable={sortTable}
                            />

                            <DSButton
                              id="chatBtn"
                              type="icon_image"
                              // buttonSize="btnSmall"
                              className={`${styles["menu_button"]}`}
                              handleOnClick={(e) => {
                                displayContext(
                                  e,
                                  "menucontext" + column.columnIndex
                                );
                              }}
                              startIcon={<Image src={threedot} alt="menu" />}
                              tooltip="Menu"
                            />
                          </div>
                        </>
                      )}
                    </ThComponent>
                  )
                )}
              </TrComponent>
            </TheaderComponent>

            <TbodyComponent className={""}>
              {tableRows.map((newRow) => {
                const row = rows.find((x) => x.rowIndex === newRow.rowIndex);

                return (
                  <TrComponent className={""} key={newRow.rowIndex}>
                    {columns.map((col) => {
                      const cell = row?.content?.find(
                        (data) => data.columnIndex == col.columnIndex
                      );

                      if (!col.isHidden && cell) {
                        return (
                          <TdComponent
                            key={col.columnHeader?.toString() ?? ""}
                            className={cell.colSpan ? "colSpan" : ""}
                            content={cell.content}
                            alignment={alignment}
                            colSpan={cell.colSpan}
                          ></TdComponent>
                        );
                      } else return null;
                    })}
                  </TrComponent>
                );
              })}
            </TbodyComponent>
            <TfooterComponent className={""} alignment={alignment}>
              <TrComponent>
                <TdComponent className={""} alignment={alignment} colSpan={columns.length}>
                  Showing {tableRows.length} of {rowsContainer.current.length}{" "}
                </TdComponent>
              </TrComponent>
            </TfooterComponent>
          </table>
          {columns.map((column) => {
            return (
              <MenuComponent
                key={column.columnIndex}
                column={column}
                sortDataOnlyOnSpecifiedColumn={sortTableAscending}
                clearSortOnColumn={clearSortOnColumn}
                sortDataUsingInputValueOnlyOnSpecifiedColumn={
                  sortDataUsingInputValueOnlyOnSpecifiedColumn
                }
                hideShowColumn={hideShowColumn}
                manageColumns={() => alert("manage columns")}
              >
                <>
                  <div key={"manage"} className="column-visibility">
                    <RadioCheckButton
                      groupName="Column visibility"
                      options={columns
                        .filter((col) => typeof col.columnHeader === "string") // Only include columns with string headers
                        .map((col) => ({
                          id: col.columnIndex.toString(),
                          type: "checkbox",
                          value: col.columnHeader as string,
                          code: col.columnIndex.toString(),
                          className: "d-flex",
                        }))}
                      handleOnChange={(e) =>
                        hideShowColumn(e.currentTarget.value)
                      }
                      selectedOption={optionsArray}
                    />
                  </div>
                </>
              </MenuComponent>
            );
          })}
        </div>
    </>
  );
};

export default TableComponent;

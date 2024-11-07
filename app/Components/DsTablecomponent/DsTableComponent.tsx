"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { convertToDate, parseFormattedNumber, tcolumn, trow } from "./types";
import TheaderComponent from "./DsTheaderComponent";
import TrComponent from "./DsTrComponent";
import ThComponent from "./DsThComponent";
import TbodyComponent from "./DsTbodyComponent";
import TfooterComponent from "./DsTfooterComponent";
import TdComponent from "./DsTdComponent";
import SortComponent from "./sortComponent";
import MenuComponent from "./DsMenuComponent";
import styles from "./DsTable.module.css";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import RadioCheckButton from "./RadioCheckButton";
import TextField from "../DsTextField/DsTextField";
import DSButton from "../dsButton/dsButton";
import { displayContext } from "../dsContextHolder/dsContextHolder";
import Image from "next/image";
import threedot from "../../Icons/smallIcons/threedot.svg";

// Define the component props
interface TableComponentProps {
  className: string;
  id: string;
  columns: tcolumn[];
  rows: trow[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  className,
  id,
  columns,
  rows,
}) => {
  const [newRows, setNewRows] = useState<trow[]>(rows);
  const [tableRows, setTableRows] = useState<trow[]>(rows);
  const rowsContainer = useRef<trow[]>(rows);

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

  const sortTable = (e: React.MouseEvent, type: "ASC" | "DESC") => {
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
          currentTargetElement.classList.remove("active");
          setActiveColumnIndex(-1);
          setSortingOrderType("NONE");
          setSortType(columnIndex, "NONE");
          sortTableAccordingToRowIndex();
          return;
        }

        const activeElement = currentTargetElement
          .closest("th")
          ?.querySelector(".active");
        activeElement?.classList.remove("active");
        currentTargetElement.classList.add("active");

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
    setOptionArray(columns.map((x) => x.columnHeader));
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

    const array = columns.filter((x) => !x.isHidden).map((x) => x.columnHeader);
    setOptionArray(array);
    setColumnSort(columnSort);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const sortDataUsingInputValue = (event: React.ChangeEvent<HTMLElement>) => {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    setInputValue((event.target as HTMLInputElement).value);
    inputValue.trim();
    let filteredRows: trow[] = [];

    if (searchValue === "") {
      // If the search input is empty, show all rows
      filteredRows = rowsContainer.current;
    } else {
      // Filter rows based on the search value
      filteredRows = rows.filter((row) =>
        row.content?.some(
          (cell) =>
            (typeof cell.content === "string" ||
              typeof cell.content === "number") &&
            cell.content.toString().toLowerCase().includes(searchValue)
        )
      );
    }

    // Update the rows with the filtered results
    setNewRows(filteredRows);

    // Maintain the sorting order
    maintainSortingOrder(filteredRows);
  };

  // const sortDataUsingInputValueOnlyOnSpecifiedColumn = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   columnIndex?: number
  // ) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   setInputValue(event.target.value);

  //   let filteredRows: trow[] = [];

  //   if (searchValue === "") {
  //     // If the search input is empty, show all rows
  //     filteredRows = rowsContainer.current;
  //   } else {
  //     // Filter rows based on the search value
  //     filteredRows = rows.filter((row) =>
  //       row.content?.some(
  //         (cell) =>
  //           typeof cell.content === "string" &&
  //           cell.columnIndex === columnIndex &&
  //           cell.content.toLowerCase().includes(searchValue)
  //       )
  //     );
  //   }

  //   // Update the rows with the filtered results
  //   setNewRows(filteredRows);

  //   // Maintain the sorting order
  //   maintainSortingOrder(filteredRows);
  // };

  const maintainSortingOrder = (filteredRows: trow[]) => {
    if (activeColumnIndex !== -1) {
      const sortedRows = filteredRows.sort((rowA, rowB) => {
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
      const sortedRows = filteredRows.sort(
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

  const [rangeFrom, setRangeFrom] = useState<number>(20240199900001);
  const [rangeTo, setRangeTo] = useState<number>(20240199900010);
  const setRangeFromValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRangeFrom(Number(e.target.value));
  };
  const setRangeToValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRangeTo(Number(e.target.value));
  };

  const rangeFilter = () => {
    const filteredRows = [...rows].filter((row) =>
      row.content?.some(
        (cell) =>
          cell.contentType === "number" &&
          cell.columnIndex === 0 &&
          Number(cell.content) >= rangeFrom &&
          Number(cell.content) <= rangeTo
      )
    );

    setNewRows(filteredRows);
    return filteredRows;
  };
  const applyFilter = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    const rows1 = rangeFilter();
    const rows2 = filterOnDate(1);
    const rows3 = filterRowsOnInputTypeRange(6);
    const rows4: trow[] = [];
    rows.map((row) => {
      if (
        rows1.some((x) => x.rowIndex === row.rowIndex) &&
        rows2.some((y) => y.rowIndex === row.rowIndex) &&
        rows3.some((z) => z.rowIndex === row.rowIndex)
      ) {
        rows4.push(row);
      }
    });
    setNewRows(rows4);
    console.log("rows1 length = ", rows1.length);
    console.log("rows2 length = ", rows2.length);
    console.log("rows3 length = ", rows3.length);

    console.log("rows4 length = ", rows4.length);
    // searchDataOnSpecifiedColumnUsingCommaSeparatedValues(1);
  };

  const [dateFrom, setDateFrom] = useState<Date>(new Date("2022-10-19"));
  const [dateTo, setDateTo] = useState<Date>(new Date("2024-12-11"));

  // const [dateTo, setDateTo] = useState<Date>(new Date(Date.now.toString()));
  const setDateFromValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDateFrom(new Date(e.target.value));
    // console.log(dateFrom);
  };
  const setDateToValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDateTo(new Date(e.target.value));
  };

  const filterOnDate = (columnIndex: number) => {
    const filteredRows = [...rows].filter((row) =>
      row.content?.some(
        (cell) =>
          typeof cell.content === "string" &&
          cell.contentType === "date" &&
          cell.columnIndex === columnIndex &&
          convertToDate(cell.content) >= dateFrom &&
          convertToDate(cell.content) <= dateTo
      )
    );
    setNewRows(filteredRows);
    return filteredRows;
  };

  // const minValue = useRef<number>(0);
  // const maxValue = useRef<number>(0);

  // const getLowestBiggestValue = (columnIndex: number) => {
  //   rows.map((row) =>
  //     row.content?.forEach((cell) => {
  //       if (cell.columnIndex == columnIndex) {
  //         minValue.current = Number(cell.content);
  //       }
  //     })
  //   );

  //   columns.map((col: tcolumn) => {
  //     rows.map((row) => {
  //       row.content?.forEach((cell) => {
  //         if (
  //           col.columnIndex == columnIndex &&
  //           col.columnIndex == row.content?.[0].columnIndex &&
  //           Number(cell.content) < minValue.current
  //         ) {
  //           minValue.current = Number(cell.content);
  //         }
  //         if (
  //           col.columnIndex == columnIndex &&
  //           Number(cell.content) > maxValue.current
  //         ) {
  //           maxValue.current = Number(cell.content);
  //         }
  //       });
  //     });
  //   });
  //   console.log("minvalue = ", minValue.current);
  //   console.log("maxvalue = ", maxValue.current);
  // };

  // getLowestBiggestValue(6);

  // const [rangeValue, setRangeValue] = useState<number>(34);
  // const setGrossRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRangeValue(Number(e.target.value));
  // };
  // const filterRowsOnInputTypeRange = (columnIndex: number) => {
  //   const min = Number(minValue.current); // Ensure minValue is a number
  //   const max = Number(rangeValue); // Ensure rangeValue is a number

  //   const filteredRows = [...rows].filter((row) =>
  //     row.content?.some((cell) => {
  //       const isNumericString =
  //         typeof cell.content === "string" && !isNaN(Number(cell.content)); // Ensure it's a valid number string
  //       return (
  //         isNumericString &&
  //         cell.contentType === "number" &&
  //         cell.columnIndex === columnIndex &&
  //         Number(cell.content) >= min &&
  //         Number(cell.content) <= max
  //       );
  //     })
  //   );

  //   setNewRows(filteredRows);
  //   return filteredRows;
  // };

  const minValue = useRef<number>(Infinity);
  const maxValue = useRef<number>(-Infinity);
  const [rangeValue, setRangeValue] = useState<number>(1200200);

  // Function to parse a number from the formatted string

  const getLowestBiggestValue = (columnIndex: number) => {
    minValue.current = Infinity;
    maxValue.current = -Infinity;

    rows.forEach((row) => {
      row.content?.forEach((cell) => {
        if (
          cell.columnIndex === columnIndex &&
          typeof cell.content == "string"
        ) {
          const numericValue = parseFormattedNumber(cell.content);
          if (!isNaN(numericValue)) {
            minValue.current = Math.min(minValue.current, numericValue);
            maxValue.current = Math.max(maxValue.current, numericValue);
          }
        }
      });
    });

    console.log("minValue =", minValue.current);
    console.log("maxValue =", maxValue.current);
  };
  getLowestBiggestValue(6);
  const setGrossRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseFormattedNumber(e.target.value));
  };

  const filterRowsOnInputTypeRange = (columnIndex: number) => {
    const min = minValue.current;
    const max = rangeValue;

    const filteredRows = rows.filter((row) =>
      row.content?.some((cell) => {
        const isNumericString =
          typeof cell.content === "string" &&
          !isNaN(parseFormattedNumber(cell.content));
        return (
          isNumericString &&
          typeof cell.content === "string" &&
          cell.contentType === "number" &&
          cell.columnIndex === columnIndex &&
          parseFormattedNumber(cell.content) >= min &&
          parseFormattedNumber(cell.content) <= max
        );
      })
    );

    setNewRows(filteredRows);
    return filteredRows;
  };

  // const [commaSeparatedValue, setCommaSeparatedValue] = useState<string[]>([]);
  // const setCommaValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const commaValue = e.target.value.split(",");
  //   setCommaSeparatedValue(commaValue);
  // };
  // const searchDataOnSpecifiedColumnUsingCommaSeparatedValues = (
  //   columnIndex: number
  // ) => {
  //   const filteredRows = rows.filter((row) =>
  //     row.content?.some(
  //       (cell) =>
  //         typeof cell.content === "string" &&
  //         cell.contentType === "string" &&
  //         cell.columnIndex === columnIndex &&
  //         commaSeparatedValue.some((item) =>
  //           cell.content
  //             ?.toString()
  //             .toLowerCase()
  //             .includes(item.toString().toLowerCase())
  //         )
  //     )
  //   );
  //   setNewRows(filteredRows);
  // };

  // const [dropDownOptions, setDropDownOptions] = useState<string[]>([]);
  // const filterOnDropdown = (columnIndex: number) => {
  //   const filteredRows = rows.filter((row) =>
  //     row.content?.some(
  //       (cell) =>
  //         typeof cell.content === "string" &&
  //         cell.contentType === "string" &&
  //         cell.columnIndex === columnIndex &&
  //         dropDownOptions.some((item) =>
  //           cell.content
  //             ?.toString()
  //             .toLowerCase()
  //             .includes(item.toString().toLowerCase())
  //         )
  //     )
  //   );
  //   setNewRows(filteredRows);
  // };

  // const [statusOptions, setStatusOptions] = useState<string[]>([]);
  // const filterOnStatus = (columnIndex: number) => {
  //   const filteredRows = rows.filter((row) =>
  //     row.content?.some(
  //       (cell) =>
  //         typeof cell.content === "string" &&
  //         cell.contentType === "string" &&
  //         cell.columnIndex === columnIndex &&
  //         statusOptions.some((item) =>
  //           cell.content
  //             ?.toString()
  //             .toLowerCase()
  //             .includes(item.toString().toLowerCase())
  //         )
  //     )
  //   );
  //   setNewRows(filteredRows);
  // };

  return (
    <>
      <div className="data-table">
        <div className="column-visibility">
          <RadioCheckButton
            groupName="Column visibility"
            options={columns.map((col) => ({
              id: col.columnIndex.toString(),
              type: "checkbox",
              value: col.columnHeader,
              code: col.columnIndex.toString(),
              className: "d-flex",
            }))}
            handleOnChange={(e) => hideShowColumn(e.currentTarget.value)}
            selectedOption={optionsArray}
          />
        </div>
        <div className={`${styles["ds-search-input-div"]}`}>
          <TextField
            placeholder="Search data"
            id="serach-data"
            label="Search Names"
            handleInputChange={(e: ChangeEvent<HTMLElement>) =>
              sortDataUsingInputValue(e)
            }
          />
        </div>

        <AdvancedFilterComponent
          setRangeFromValue={setRangeFromValue}
          setRangeToValue={setRangeToValue}
          setDateFromValue={setDateFromValue}
          setDateToValue={setDateToValue}
          setGrossRangeValue={setGrossRangeValue}
          applyFilter={applyFilter}
          minValue={minValue.current}
          maxValue={maxValue.current}
          rangeValue={rangeValue}
        ></AdvancedFilterComponent>
        <table
          className={`${className ? className : ""} ${styles["ds-table"]} `}
          id={id}
        >
          <TheaderComponent className={""}>
            <TrComponent className={""}>
              {columns.map((column) =>
                column.isHidden ? null : (
                  <ThComponent
                    key={column.columnHeader}
                    className={""}
                    content={column.columnHeader}
                    columnIndex={column.columnIndex}
                    columnHeader={column.columnHeader}
                  >
                    <>
                      <div
                        className={`${styles["slide-component"]}   ${className}`}
                      >
                        <SortComponent
                          key={column.columnHeader}
                          columnIndex={column.columnIndex}
                          sortTable={sortTable}
                        />

                        <DSButton
                          id="chatBtn"
                          type="icon_image"
                          buttonSize="btnSmall"
                          // buttonClass={btnStyles.btnSmall + " " + btnStyles.icon_image}
                          className={styles.menu_btn}
                          handleOnClick={(e) => {
                            displayContext(
                              e,
                              "menucontext" + column.columnIndex
                            );
                            // Call first function
                          }}
                          startIcon={<Image src={threedot} alt="menu" />}
                          tooltip="Menu"
                        />
                      </div>
                    </>
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
                          key={col.columnHeader}
                          className={""}
                          content={cell.content}
                        ></TdComponent>
                      );
                    } else return null;
                  })}
                </TrComponent>
              );
            })}
          </TbodyComponent>

          <TfooterComponent className={""}>
            <TrComponent>
              <TdComponent className={""}>
                Showing {newRows.length} of {rowsContainer.current.length} Rows
              </TdComponent>
            </TrComponent>
          </TfooterComponent>
        </table>
        {columns.map((column) => {
          return (
            <MenuComponent
              key={column.columnIndex}
              columnIndex={column.columnIndex}
              sortDataOnlyOnSpecifiedColumn={sortTableAscending}
              clearSortOnColumn={clearSortOnColumn}
              hideShowColumn={hideShowColumn}
              manageColumns={() => alert("manage columns")}
            ></MenuComponent>
          );
        })}
      </div>
    </>
  );
};

export default TableComponent;

"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import RadioCheckButton from "./RadioCheckButton";
import InputText from "./Input_component";
import { tcolumn, trow } from "./types";
import TheaderComponent from "./DsTheaderComponent";
import TrComponent from "./DsTrComponent";
import ThComponent from "./DsThComponent";
import TbodyComponent from "./DsTbodyComponent";
import TfooterComponent from "./DsTfooterComponent";
import TdComponent from "./DsTdComponent";
import SortComponent from "./sortComponent";
import MenuComponent from "./DsMenuComponent";
import DSButton from "../DsButton/DsButton";
import TextField from "../DsTextField/DsTextField";

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
  };

  const sortTableDescending = (columnIndex: number) => {
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
  };

  const sortTableAccordingToRowIndex = () => {
    const sortedRows = [...newRows].sort(
      (rowA, rowB) => rowA.rowIndex - rowB.rowIndex
    );
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
  const sortDataUsingInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = event.target.value.toLowerCase();
    setInputValue(event.target.value);

    let filteredRows: trow[] = [];

    if (searchValue === "") {
      // If the search input is empty, show all rows
      filteredRows = rowsContainer.current;
    } else {
      // Filter rows based on the search value
      filteredRows = rows.filter((row) =>
        row.content?.some(
          (cell) =>
            typeof cell.content === "string" &&
            cell.content.toLowerCase().includes(searchValue)
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

  const clearSortOnColumn = (e: React.MouseEvent, column: string | number) => {
    console.log(column);
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

  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [rangeTo, setRangeTo] = useState<number>(0);
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

  const applyFilter = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // const filteredRows = [...rows].filter((row) =>
    //   row.content?.some(
    //     (cell) =>
    //       cell.contentType === "number" &&
    //       cell.columnIndex === 0 &&
    //       Number(cell.content) >= rangeFrom &&
    //       Number(cell.content) <= rangeTo
    //   )
    // );

    // setNewRows(filteredRows);
    // filterOnDate(3);
    // filterRowsOnInputTypeRange(2);
    searchDataOnSpecifiedColumnUsingCommaSeparatedValues(1);
  };

  const [dateFrom, setDateFrom] = useState<Date>(new Date("2024-10-02"));
  const [dateTo, setDateTo] = useState<Date>(new Date(Date.now.toString()));
  const setDateFromValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDateFrom(new Date(e.target.value));
  };
  const setDateToValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDateTo(new Date(e.target.value));
  };

  const filterOnDate = (columnIndex: number) => {
    const filteredRows = rows.filter((row) =>
      row.content?.some(
        (cell) =>
          typeof cell.content === "string" &&
          cell.contentType === "date" &&
          cell.columnIndex === columnIndex &&
          new Date(cell.content.toString()) >= new Date(dateFrom?.toString()) &&
          new Date(cell.content.toString()) <= new Date(dateTo?.toString())
      )
    );
    setNewRows(filteredRows);
  };

  const minValue = useRef<number>(0);
  const maxValue = useRef<number>(0);

  const getLowestBiggestValue = (columnIndex: number) => {
    rows.map((row) =>
      row.content?.forEach((cell) => {
        if (cell.columnIndex == columnIndex) {
          minValue.current = Number(cell.content);
        }
      })
    );

    columns.map((col: tcolumn) => {
      rows.map((row) => {
        row.content?.forEach((cell) => {
          if (
            col.columnIndex == columnIndex &&
            col.columnIndex == row.content?.[0].columnIndex &&
            Number(cell.content) < minValue.current
          ) {
            minValue.current = Number(cell.content);
          }
          if (
            col.columnIndex == columnIndex &&
            Number(cell.content) > maxValue.current
          ) {
            maxValue.current = Number(cell.content);
          }
        });
      });
    });
  };

  getLowestBiggestValue(2);

  const [rangeValue, setRangeValue] = useState<number>(25);
  const setGrossRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  };
  const filterRowsOnInputTypeRange = (columnIndex: number) => {
    const filteredRows = rows.filter((row) =>
      row.content?.some(
        (cell) =>
          typeof cell.content === "string" &&
          cell.contentType === "number" &&
          cell.columnIndex === columnIndex &&
          Number(cell.content) >= minValue.current &&
          Number(cell.content) <= rangeValue
      )
    );
    setNewRows(filteredRows);
  };

  const [commaSeparatedValue, setCommaSeparatedValue] = useState<string[]>([]);
  const setCommaValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const commaValue = e.target.value.split(",");
    setCommaSeparatedValue(commaValue);
  };
  const searchDataOnSpecifiedColumnUsingCommaSeparatedValues = (
    columnIndex: number
  ) => {
    const arr = ["Doe", "ali"];
    const filteredRows = rows.filter((row) =>
      row.content?.some(
        (cell) =>
          typeof cell.content === "string" &&
          cell.contentType === "string" &&
          cell.columnIndex === columnIndex &&
          cell.content.includes(arr[0])
      )
    );
    setNewRows(filteredRows);
  };

  return (
    <>
      <div className="h-parent overflow-auto data-table">
        <div className="column-visibility">
          <RadioCheckButton
            groupName="columnVisibility"
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
        <div>
          <InputText
            placeholder="Search data"
            id="serach-data"
            value={inputValue}
            handleInputChange={(e: ChangeEvent<HTMLInputElement>) =>
              sortDataUsingInputValue(e)
            }
          />
        </div>
        <div className="apply-filter">
          <div className="range-filter">
            <TextField
              placeholder={"Range From "}
              type={"singleline"}
              handleInputChange={setRangeFromValue}
              inputType="number"
              label={"range from"}
              disable={false}
            ></TextField>
            <TextField
              placeholder={"Range To "}
              type={"singleline"}
              handleInputChange={setRangeToValue}
              inputType="number"
              label={"range to"}
              disable={false}
            ></TextField>
          </div>
          <div className="date-filter">
            <TextField
              placeholder={"Date From "}
              type={"singleline"}
              handleInputChange={setDateFromValue}
              inputType="date"
              label={"date from"}
              disable={false}
            ></TextField>
            <TextField
              placeholder={"Date To "}
              type={"singleline"}
              handleInputChange={setDateToValue}
              inputType="date"
              label={"date to"}
              disable={false}
            ></TextField>
          </div>
          <input
            type="range"
            min={minValue.current}
            max={maxValue.current}
            className="range-input"
            onChange={setGrossRangeValue}
          ></input>
          <DSButton buttonText={"Apply"} handleOnClick={applyFilter}></DSButton>
        </div>

        <table
          className={`flex flex-col h-parent w-full ${
            className ? className : ""
          } divide-y divide-gray-200`}
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
                      <SortComponent
                        key={column.columnHeader}
                        columnIndex={column.columnIndex}
                        sortTable={sortTable}
                      />
                      <MenuComponent
                        columnIndex={column.columnIndex}
                        sortDataOnlyOnSpecifiedColumn={sortTableAscending}
                        clearSortOnColumn={clearSortOnColumn}
                        hideShowColumn={hideShowColumn}
                        manageColumns={() => alert("manage columns")}
                      ></MenuComponent>
                    </>
                  </ThComponent>
                )
              )}
            </TrComponent>
          </TheaderComponent>

          <TbodyComponent
            className={`h-parent overflow-auto divide-y divide-gray-200`}
          >
            {tableRows.map((newRow) => {
              const row = rows.find((x) => x.rowIndex === newRow.rowIndex);

              return (
                <TrComponent
                  className={`${row?.className}`}
                  key={newRow.rowIndex}
                >
                  {columns.map((col) => {
                    const cell = row?.content?.find(
                      (data) => data.columnIndex == col.columnIndex
                    );

                    if (!col.isHidden && cell) {
                      const cellClassName = col.className
                        ? `${cell.className ? cell.className : ""} py-2 ${
                            col.className
                          }`
                        : `${cell.className ? cell.className : "py-2"}`;

                      return (
                        <TdComponent
                          key={col.columnHeader}
                          className={cellClassName}
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
            Showing {newRows.length} of {rowsContainer.current.length} Rows
          </TfooterComponent>
        </table>
      </div>
    </>
  );
};

export default TableComponent;

"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import TableHeaders from "./tableHeaders";
import RadioCheckButton from "./RadioCheckButton";
import InputText from "./Input_component";
import TableBody from "./tableBody";
import { tcolumn, trow } from "./types";

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
            ?.getAttribute("data-column-index") ?? "0"
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

  const sortTableDescending = (columnIndex: number | string) => {
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

  const hideShowColumn = (value: string) => {
    columns.forEach((col) => {
      if (col.columnHeader === value) col.isHidden = !col.isHidden;
    });

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

        <table
          className={`flex flex-col h-parent w-full ${
            className ? className : ""
          } divide-y divide-gray-200`}
          id={id}
        >
          <TableHeaders
            sortTable={sortTable}
            columns={columns}
            sortDataOnlyOnSpecifiedColumn={sortTableAscending}
            clearSortOnColumn={clearSortOnColumn}
            manageColumns={() => {}}
            hideShowColumn={hideShowColumn}
          />
          <TableBody
            className=""
            rows={rows}
            newRows={tableRows}
            columns={columns}
          />
        </table>
      </div>
    </>
  );
};

export default TableComponent;

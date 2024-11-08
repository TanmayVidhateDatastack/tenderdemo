// Type definitions
export class tcolumn {
  columnIndex: number = 1;
  className?: string;
  columnHeader: string = "";
  isHidden?: boolean = false;
  sort?: string;
  columnContentType?: string;
}

export class cellData {
  columnIndex: number = 1;
  className?: string;
  content: React.ReactNode | string | number;
  contentType?: string;
}

export class trow {
  rowIndex: number = 1;
  className?: string;
  content?: cellData[];
}

export class filterType {
  columnIndex?: number;
  columnHeader?: string;
  filterType?: string;
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const convertToDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
};

export const parseFormattedNumber = (value: string): number => {
  return Number(value.replace(/,/g, "")); // Remove commas and convert to number
};

// export const determineFilterType = (columns: tcolumn[]) => {
//   const filterTypes: filterType[] = [{}];
//   // let type = "";
//   columns.map((col) => {
//     // if (col.columnContentType === "string") {
//     //   type = "CSV";
//     // } else if (col.columnContentType === "number") {
//     //   type = "NRF";
//     // } else if (col.columnContentType === "date") {
//     //   type = "DRF";
//     // } else {
//     //   type = "CSV";
//     // }
//     const obj = {
//       columnIndex: col.columnIndex,
//       columnHeader: col.columnHeader,
//       filterType: col.columnContentType,
//     };
//     filterTypes.push(obj);
//   });
//   return filterTypes;
// };

export const determineFilterType = (columns: tcolumn[]) => {
  const filterTypes: filterType[] = [{}];
  let type = "";
  columns.map((col) => {
    if (col.columnContentType === "string") {
      type = "CSV";
    } else if (col.columnContentType === "number") {
      type = "NRF";
    } else if (col.columnContentType === "date") {
      type = "DRF";
    } else {
      type = "DDF";
    }
    const obj = {
      columnIndex: col.columnIndex,
      columnHeader: col.columnHeader,
      filterType: type,
    };
    filterTypes.push(obj);
  });
  return filterTypes;
};

// Function to parse a number from the formatted string

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

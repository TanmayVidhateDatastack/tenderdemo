import { trow } from "./helpers/types";

 const rangeFilter = (rows:trow[],rangeFrom:number,rangeTo:number,columnIndex:number) => {
    const filteredRows = [...rows].filter((row) =>
      row.content?.some(
        (cell) =>
          cell.contentType === "number" &&
          cell.columnIndex === columnIndex &&
          Number(cell.content) >= rangeFrom &&
          Number(cell.content) <= rangeTo
      )
    );

    return filteredRows;
  };
export default rangeFilter;
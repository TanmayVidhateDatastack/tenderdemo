import { useRef, useState } from "react";
import DSButton from "../DsButton/DsButton";
import TextField from "../DsTextField/DsTextField";
import {
  convertToDate,
  filterType,
  parseFormattedNumber,
  trow,
} from "./helpers/types";
import { setRows } from "@/app/Redux/slice/TableSlice/tableSlice";
import { useAppDispatch } from "@/app/Redux/hook/hook";

interface advancedFilterComponent {
  rows: trow[];
  filterTypes: filterType[];
}

const AdvancedFilterComponent: React.FC<advancedFilterComponent> = ({
  filterTypes,
  rows,
}) => {
  const dispatch = useAppDispatch();
  // const [newRows, setNewRows] = useState<trow[]>(rows);
  const [isFilterVisible, setFilterVisible] = useState<boolean>(false);

  const numberColumn = filterTypes.find((x) => x.filterType == "NRF");

  const rangeColumn = filterTypes.find((x) => x.filterType == "NRF");
  const dateColumn = filterTypes.find((x) => x.filterType == "DRF");
  const csvColumn = filterTypes.find((x) => x.filterType == "CSV");
  // const dropdownColumn = filterTypes.find((x) => x.filterType == "DDF");

  const [rangeFrom, setRangeFrom] = useState<number>(-Infinity);
  const [rangeTo, setRangeTo] = useState<number>(Infinity);
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
          cell.columnIndex === numberColumn?.columnIndex &&
          Number(cell.content) >= rangeFrom &&
          Number(cell.content) <= rangeTo
      )
    );

    return filteredRows;
  };

  const [dateFrom, setDateFrom] = useState<Date>(new Date("2022-09-19"));
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
    return filteredRows;
  };

  const minValue = useRef<number>(Infinity);
  const maxValue = useRef<number>(-Infinity);
  const [rangeValue, setRangeValue] = useState<number>(1200200);
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

    return filteredRows;
  };

  const [commaSeparatedValue, setCommaSeparatedValue] = useState<string[]>([
    "",
  ]);
  const setCommaValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const commaValue = e.target.value.split(",");
    setCommaSeparatedValue(commaValue);
  };
  const searchDataOnSpecifiedColumnUsingCSV = (columnIndex: number) => {
    const filteredRows = [...rows].filter((row) =>
      row.content?.some(
        (cell) =>
          typeof cell.content === "string" &&
          cell.contentType === "string" &&
          cell.columnIndex === columnIndex &&
          commaSeparatedValue.some((item) =>
            cell.content
              ?.toString()
              .toLowerCase()
              .includes(item.toString().toLowerCase())
          )
      )
    );
    return filteredRows;
  };

  // const applyFilter = (e: React.MouseEvent<HTMLElement>) => {
  const applyFilter = () => {
    const rows1 = rangeFilter();
    const rows2 = filterOnDate(1);
    const rows3 = filterRowsOnInputTypeRange(6);
    const rows4 = searchDataOnSpecifiedColumnUsingCSV(3);
    const rows5: trow[] = [];
    rows.map((row) => {
      if (
        rows1.some((x) => x.rowIndex === row.rowIndex) &&
        rows2.some((y) => y.rowIndex === row.rowIndex) &&
        rows3.some((z) => z.rowIndex === row.rowIndex) &&
        rows4.some((z) => z.rowIndex === row.rowIndex)
      ) {
        rows5.push(row);
      }
    });
    dispatch(setRows(rows5));
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="apply-filter">
      <div className="range-filter">
        <TextField
          placeholder={`${numberColumn?.columnHeader} From`}
          type={"singleline"}
          handleInputChange={setRangeFromValue}
          inputType="number"
          label={`${numberColumn?.columnHeader} From`}
          disable={false}
        ></TextField>
        <TextField
          placeholder={`${numberColumn?.columnHeader} To`}
          type={"singleline"}
          handleInputChange={setRangeToValue}
          inputType="number"
          label={`${numberColumn?.columnHeader} To`}
          disable={false}
        ></TextField>
      </div>
      <div className="date-filter">
        <TextField
          placeholder={`${dateColumn?.columnHeader} From`}
          type={"singleline"}
          handleInputChange={setDateFromValue}
          inputType="date"
          label={`${dateColumn?.columnHeader} From`}
          disable={false}
        ></TextField>
        <TextField
          placeholder={`${dateColumn?.columnHeader} To`}
          type={"singleline"}
          handleInputChange={setDateToValue}
          inputType="date"
          label={`${dateColumn?.columnHeader} To`}
          disable={false}
        ></TextField>
      </div>
      {rangeColumn?.columnHeader} From
      <input
        type="range"
        min={minValue.current}
        max={maxValue.current}
        value={rangeValue}
        className="range-input"
        onChange={setGrossRangeValue}
      ></input>
      {rangeValue}
      {`               `} {rangeColumn?.columnHeader} To
      <TextField
        placeholder={`Type multiple ${csvColumn?.columnHeader} name and use comma`}
        type={"singleline"}
        handleInputChange={setCommaValue}
        inputType="text"
        label={`Customer`}
        disable={false}
      ></TextField>
      <DSButton label={"Apply"} handleOnClick={applyFilter}></DSButton>
    </div>
  );
};
export default AdvancedFilterComponent;
